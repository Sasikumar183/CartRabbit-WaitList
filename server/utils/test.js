const sendEmail = require('./sendEmail');
sendEmail('sasikumar.n2021it@gmail.com', 'Test Email', 'This is a test email.')
  .then(info => console.log('Test email sent:', info))
  .catch(err => console.error('Error sending test email:', err));
