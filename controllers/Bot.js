const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

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

async function fetchGeneralStats(){
  let data = await axios.get(generalStatsURL)
    .then(res => {
      const {results} = res.data;
      return results[0];
    })
  return data;
}

async function fetchNigerianStats(){
  let data = await axios.get(generalNigerianURL)
    .then(res => {
      const {countrydata} = res.data;
      return countrydata[0];
    })

  return data;
}

async function fetchNigerianStates(){
  await axios.get(nigerianStatesURL)
    .then(res => {
      const {data} = res;
      return data;
    })
}


class whatsappBot {
  constructor(option){
    this.option = option;
  }

  decider(){
    switch (this.option) {
      case '0':
        return this.displayMenu();
        break;
      case '1':
        return this.displayStats();
        break;
      case '2':
        return this.displayContacts();
        break;
      case '3':
        return this.displaySymptoms();
        break;
      case '4':
        return this.displaySafetyTips();
        break;
      case '5':
        return this.displayShare();
        break;
      default:
        if(this.isState(this.option)) {
          return this.showStateStats(this.option);
        } else {
          return this.displayMenu('error');
        }
        break;
    }

  }

  displayMenu(val){
    let error = '';
    if(val === 'error'){
      error = 'Sorry, That Option Was\'nt recognized'; 
    }
    const welcomeMsg = 
`
${error}
*Welcome to the WavyNerd COVID 19 Helper*.

Get Information and Guidance from NCDC regarding the current outbreak of Corona Virus.
Reply With a Number at any time to get more information.

1. Coronavirus Stats.
2. Numbers to contact if you feel any symptoms.
3. Signs and Symptoms.
4. Safety Tips.
5. Share This Bot. 
`
    return welcomeMsg;
  }

  async displayStats(){

    let global = await fetchGeneralStats();
    let nigerian = await fetchNigerianStats();

    setTimeout(() => {
          const msg = 
`
*The WavyNerd COVID 19 Helper*
Realtime Stats of Corona Virus infections and deaths.

*Global Stats*
Total Cases: ${global.total_cases}
Total Discharged: ${global.total_recovered}
Total Deaths: ${global.deaths}

Total New Cases Today: ${global.total_new_cases_today}
Total New Deaths Today: ${global.total_new_deaths_today}
Total Affected Countries: ${global.total_affected_countries}

*Nigerian Stats*
Total Cases: ${nigerian.total_cases}
Total Discharged: ${nigerian.total_recovered}
Total Detahs: ${nigerian.total_deaths}

Total New Cases Today: ${nigerian.total_new_cases_today}
Total New Deaths Today: ${nigerian.total_new_deaths_today}

You can Reply with a State in Nigeria to view the stats for that State.

Reply with 0 for the Main Menu.
`;

  return msg;
    }, 5000);

    console.log(global, nigerian);
    

  }

  displayContacts(){
    const msg = 
  `
  *The WavyNerd COVID 19 Helper*.

  Here are some Numbers You can contact if you feel any signs or symptoms.

  Phone: +23480097000010
  Whatsapp: +2347087110839
  SMS: +2348099555577

  Twitter: @NCDCgov

  These numbers are toll free as you won't be charged for making contact.

  Reply with 0 for the main menu.
  `
  return msg;
  }

  displaySymptoms(){
    const msg =
  `
  *The WavyNerd COVID 19 Helper*.

  Here are some common signs and symptoms of Corona virus infection:

  -> Diffuculty in Breathing
  -> Cough
  -> Fever

  Do you Experience any of this symptopms?
  Reply with 2 to view Numbers to call for help / advice.

  Reply with 0 for the main menu.
  ` ;
  return msg;
  }

  displaySafetyTips(){
    const msg =
  `
  *The WavyNerd COVID 19 Helper*.

  Here are some safety tips to help keep you from being infected:

  -> Wash and Sanitize Hands Regularly with soap and water or alchohol based sanitizer if no water or soap is available.
  -> Avoid Touching Public Surfaces 
  -> Use of no touch greetings
  -> Maintain at least 2metres (5feet) physical distance between yourself and anyone who is coughing or sneezing.
  -> Stay At home! Do not go out!
  -> Avoid Crowded spaces such as open markets, crowded supermarkets and pharmacies.
  -> Avoid Social Gatherings like political or religious activities as directed by the Federal Government

  Reply with 0 for the main menu.
  ` ;
  return msg;
  }

  displayShare(){
    const msg=
  `
  *The WavyNerd COVID 19 Helper*.

  Share this Bot with your friends by sending them the link below:

  https://wa.me/14155238886?text=join%20line-myself

  Reply with 0 for the main menu.
  ` ;
  return msg;
  }

  isState(state){
    if(states[state]){
      return true;
    } else return false;
  }

  showStateStats(state){
    let stateStats = fetchNigerianStates();
    let data = stateStats.filter(it => {
      it.States.toLowerCase() === states[state].toLowerCase();
    })

    const {} = data[0];
  }

  

}

module.exports =  whatsappBot;
