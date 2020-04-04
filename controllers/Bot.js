// const dotenv = require('dotenv');
// const twilio = require('twilio');

// dotenv.config();

// module.exports = const whatsappBot = () => {
//   const client = twilio(process.env.accountSid, process.env.authToken); 

//   const { MessagingResponse } = twilio.twiml;

//   client.messages 
//         .create({ 
//           body: 'Your appointment is coming up on July 21 at 3PM', 
//           from: 'whatsapp:+14155238886',       
//           to: 'whatsapp:+2347057325184' 
//         }) 
//         .then(message => console.log(message.sid)) 
//         .done();
// }