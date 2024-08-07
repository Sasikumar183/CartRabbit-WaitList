const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'waitwise311@gmail.com',
    pass: 'gcyl erag ahky oyeo'
  },
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'waitwise311@gmail.com',
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions)
    .then(info => {
      console.log('Email sent:', info.response);
      return info;
    })
    .catch(error => {
      console.error('Error sending email:', error);
      throw error;
    });
};

module.exports = sendEmail;
