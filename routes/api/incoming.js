const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
const twilio = require("twilio");
const axios = require("axios");

const Bot = require('../../controllers/Bot');

dotenv.config();

// @route   GET api/auth/test
// @desc    Gets a message from a user
// @access  public
router.post("/", (req, res) => {
  const client = twilio(
    process.env.twilio_accountSid,
    process.env.twilio_authToken
  );

  const { MessagingResponse } = twilio.twiml;
  
  const messageSent = req.body.Body;

  const generalStatsURL = 'https://api.thevirustracker.com/free-api?global=stats';
const generalNigerianURL = 'https://api.thevirustracker.com/free-api?countryTotal=NG';
const nigerianStatesURL = 'https://covid9ja.herokuapp.com/api/states/';


  const states = {
    lagos: 'Lagos',
    abuja: 'Abuja FCT',
    osun: 'Osun',
    edo: 'Edo',
    oyo: 'Oyo',
    ogun: 'Ogun',
    bauchi: 'Bauchi',
    kaduna: 'Kaduna',
    akwaibom: 'Akwa Ibom',
    katsina: 'Katsina',
    delta: 'Delta',
    enugu: 'Enugu',
    ekiti: 'Ekiti',
    kwara: 'Kwara',
    nasarawa: 'Nasawara',
    rivers: 'Rivers',
    ondo: 'Ondo',
    benue: 'Benue',
    niger: 'Niger',
    anambra: 'Anambra',
    kano: 'Kano',
    crossriver: 'Cross River',
    plateau: 'Plateau',
    ebonyi: 'Ebonyi',
    gombe: 'Gombe',
    abia: 'Abia',
    adamawa: 'Adamawa',
    sokoto: 'Sokoto',
    bayelsa: 'Bayelsa',
    borno: 'Borno',
    imo: 'Imo',
    jigawa: 'Jigawa',
    kebbi: 'Kebbi',
    kogi: 'Kogi',
    taraba: 'Taraba',
    zamfara: 'Zamfara',
    yobe: 'Yobe'
  }
  
  
    if(messageSent === '1'){
      const axios = require('axios');

      



let global, nigerian;

axios.get(generalStatsURL)
    .then(res => {
      const {results} = res.data;
      global =  results[0];

      axios.get(generalNigerianURL)
        .then(res => {
          const {countrydata} = res.data;
          nigerian = countrydata[0];


          const msg = 
`
*The WavyNerd COVID 19 Helper*
Realtime Stats of Corona Virus infections and deaths.

*Global Stats*
Total Cases: ${global.total_cases}
Total Discharged: ${global.total_recovered}
Total Deaths: ${global.total_deaths}

Total New Cases Today: ${global.total_new_cases_today}
Total New Deaths Today: ${global.total_new_deaths_today}
Total Affected Countries: ${global.total_affected_countries}

*Nigerian Stats*
Total Cases: ${nigerian.total_cases}
Total Discharged: ${nigerian.total_recovered}
Total Detahs: ${nigerian.total_deaths}

Total New Cases Today: ${nigerian.total_new_cases_today}
Total New Deaths Today: ${nigerian.total_new_deaths_today}

Reply with 0 for the Main Menu.
`;

client.messages
        .create({
          body: msg,
          from: "whatsapp:+14155238886",
          to: req.body.From
        })
        .then(message => console.log(message.sid))
        .done();
        })
    
    
      })


    } else if (states[messageSent.toLowerCase()]){
      axios.get(nigerianStatesURL)
        .then(res => {
          const {data} = res;
          let msg;
          let stateData = data.filter(state => state.States === states[messageSent.toLowerCase()]);

          if(stateData.length === 0){
            msg = `
*There are currently no cases in ${messageSent}*
Reply With 0 for the main menu, or reply with the name of another state for stats
            `
          } else {
            msg = `
*Coronavirus stats for ${messageSent}*

Active Cases: ${stateData[0].No_of_cases}
Cases on Admission: ${stateData[0].No_on_admission}
Discharged Cases: ${stateData[0].No_discharged}
Total Deaths: ${stateData[0].No_of_deaths}

Reply With 0 for the main menu, or reply with the name of another state for stats
            `
          }



          client.messages
            .create({
              body: msg,
              from: "whatsapp:+14155238886",
              to: req.body.From
            })
            .then(message => console.log(message.sid))
            .done();


        })
    }
    else {
      const Wbot = new Bot(messageSent);
      let reply = Wbot.decider();

      client.messages
        .create({
          body: reply,
          from: "whatsapp:+14155238886",
          to: req.body.From
        })
        .then(message => console.log(message.sid))
        .done();
    }
  

  

 

  

  res.destroy()
});

router.get("/test", (req, res) => {

  async function fetchGeneralStats(){
    let data = await axios.get('https://api.thevirustracker.com/free-api?global=stats')
      .then(res => {
        const {results} = res.data;
        return results[0];
      })
    return data;
  }

  console.log('fetching....');
  console.log(fetchGeneralStats().then(data =>  data));
  console.log('next...');
});

module.exports = router;
