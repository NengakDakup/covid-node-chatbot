const express = require('express');
const router = express.Router();

const dotenv = require('dotenv');
const twilio = require('twilio');

dotenv.config();


// @route   GET api/auth/test
// @desc    Gets a message from a user
// @access  public
router.post('/', (req, res) => {
    const client = twilio(process.env.twilio_accountSid, process.env.twilio_authToken); 

    const { MessagingResponse } = twilio.twiml;

    client.messages 
        .create({ 
          body: `You sent Me the message ${req.body.Body}` , 
          from: 'whatsapp:+14155238886',       
          to: 'whatsapp:+2347057325184' 
        }) 
        .then(message => console.log(message.sid)) 
        .done();
});

router.get('/test', (req, res) => {
  console.log(process.env);
  
})



module.exports = router;