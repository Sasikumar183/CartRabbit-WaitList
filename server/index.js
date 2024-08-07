const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/User');
const RankModel = require('./models/Rank'); 
const generateReferral = require('./utils/generateReferral');
const sendEmail = require('./utils/sendEmail'); 
const app = express();
const port = 3000;
const sub='Congratulations!'
const body='We are excited to announce that you’ve achieved Rank 1 in our referral program for the new iPhone product! Your enthusiasm and support in referring friends have truly set you apart. As a token of our gratitude, we are delighted to provide you with an exclusive coupon code: VHI8945KJIO. This code is your reward for reaching the top of our referral leaderboard. Use this code to enjoy special benefits and discounts on your next purchase. Thank you for your incredible efforts and for helping us spread the word about our new iPhone product!'

// Middleware
app.use(express.json());
app.use(cors());

const ADMIN_EMAIL = 'admin123@gmail.com';
const PASSWORD = 'admin@123';

// Connect to MongoDB pass:7NhOV0noXPsJ6TPj
//Atlas: mongoose.connect("mongodb+srv://sasikumarn2021it:7NhOV0noXPsJ6TPj@cluster0.zxsj197.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {

//localhost: mongoose.connect("mongodb://localhost:27017/waitlist", {
 
mongoose.connect("mongodb+srv://sasikumarn2021it:7NhOV0noXPsJ6TPj@cluster0.zxsj197.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Error connecting to MongoDB:", err));

// Admin Login endpoint
app.post('/admin', (req, res) => {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === PASSWORD) {
        UserModel.find({})
            .then(users => {
                res.json({ status: 'Success', users });
            })
            .catch(error => {
                console.error("Error fetching users: ", error);
                res.status(500).json({ status: 'Error', message: 'Internal server error' });
            });
    } else {
        res.json({ status: 'Invalid credentials' });
    }
});

// Fetch all users to admin endpoint
app.get('/adminhome/users', (req, res) => {
    UserModel.find({})
        .sort({ rank: 1 }) 
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ error: err.message }));
});
// Add user endpoint
app.post('/adminadd', async (req, res) => {
    try {
        let rank = await RankModel.findOne();
        if (!rank) {
            rank = new RankModel();
            await rank.save();
        }
        const userRank = rank.currentRank;
        rank.currentRank += 1;
        await rank.save();

        const referralcode = generateReferral();

        const user = new UserModel({ ...req.body, rank: userRank, referralcode });
        await user.save();

        console.log(`User rank: ${user.rank}`);

        if (user.rank === 1) {
            console.log(`User ${user.email} has rank 1. Sending email.`);
            
            await sendEmail(user.email, sub,body)
                .then(info => console.log('Email sent successfully:', info))
                .catch(err => console.error('Error sending email:', err));
        }

        const users = await UserModel.find({});
        res.json({ status: 'Success', users });
    } catch (err) {
        console.error("Error registering user: ", err);
        res.status(400).json({ status: 'Error', message: "Error registering user", error: err.message });
    }
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json({
                        status: "Success",
                        user: {
                            email: user.email,
                            name: user.name,
                            rank: user.rank,
                            referralcode: user.referralcode
                        }
                    });
                } else {
                    res.json({ status: "Invalid Password" });
                }
            } else {
                res.json({ status: 'User not exist' });
            }
        })
        .catch(error => {
            console.error("Error finding user: ", error);
            res.status(500).json({ status: 'Error', message: 'Internal server error' });
        });
});


// Register endpoint
app.post('/register', async (req, res) => {
    try {
        const { referralcode, ...userData } = req.body;

        let rank = await RankModel.findOne();
        if (!rank) {
            rank = new RankModel();
            await rank.save();
        }
        const userRank = rank.currentRank;
        rank.currentRank += 1;
        await rank.save();

        if (referralcode) {
            const referringUser = await UserModel.findOne({ referralcode });
            if (referringUser) {
                referringUser.rank -=1;
                if (referringUser.rank <= 0) {
                    referringUser.rank = 1;
                }
                await referringUser.save();

                if(referringUser.rank==1){
                    await sendEmail(referringUser.email,sub,body);
                }
               }
        }

        const newUserReferralCode = generateReferral();
        const user = new UserModel({ ...userData, rank: userRank, referralcode: newUserReferralCode });
        const result = await user.save();

        if (user.rank === 1) {
            console.log(`Sending email to ${user.email} for rank 1`);
            await sendEmail(user.email, 'Congratulations!', 'You have achieved rank 1 and a coupon code is VHI8945KJIO.')
                .then(info => console.log('Email sent successfully'))
                .catch(err => console.error('Error sending email:', err));
        }

        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ message: "Error registering user", error: err.message });
    }
});

// Get user details endpoint
app.get('/adminhome/edituser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById(id)
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Update user details endpoint
app.put('/adminhome/edituser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate(
        id,
        {
            email: req.body.email,
            name: req.body.name
        },
        { new: true }
    )
    .then(user => res.json(user))
    .catch(err => res.status(500).json(err));
});

app.delete('/adminhome/deleteuser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete(id)
        .then(() => res.json({ status: 'Success', message: 'User deleted successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Contest Status endpoint
app.get('/contest-status', async (req, res) => {
    try {
        // Check if any user has rank 1
        const topRankUser = await UserModel.findOne({ rank: 1 });
        
        if (topRankUser) {
            res.json({ status: 'closed' });
        } else {
            res.json({ status: 'open' });
        }
    } catch (err) {
        console.error('Error fetching contest status:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(port, () => 
    console.log(`Server listening on port ${port}!`));
