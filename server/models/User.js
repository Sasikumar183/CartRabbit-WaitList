const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    email:String,
    name:String,
    password:String,
    rank:Number,
    referralcode: { type: String, required: true, unique: true } 
})

const UserModel=mongoose.model('users',UserSchema)

module.exports=UserModel