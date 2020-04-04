const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
const twilio = require("twilio");
const axios = require("axios");

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

  let welcome = ``;
  const msg = [];

  async function fetchData() {
    await axios
      .get("https://pomber.github.io/covid19/timeseries.json")
      .then(response => {
        const { data } = response;
        for (var country in data) {
          if (data.hasOwnProperty(country)) {
            const put = {
              country,
              ...data[country][0]
            };

            msg.push(put);
          }
        }

    welcome = `
    *Welcome to the WavyNerd COVID-19 Helper* %0a
    %0a
    Get Information and guidance from WHO regarding the current outbreak of coronavirus %0a
    %0a
    For Now we are still working on the bot, but you can view this information for now %0a
    %0a
    *Countries stats about corona virus*
    %0a
    ${msg.map(record => {
      return `
        *${record.country}*%0a
        *confirmed*: ${record.confirmed}%0a
        *deaths*: ${record.deaths}%0a
        *recovered*: ${record.recovered}%0a
        %0a
      `;
    })}

    `;

        client.messages
          .create({
            body: `${welcome}`,
            from: "whatsapp:+14155238886",
            to: "whatsapp:+2347057325184"
          })
          .then(message => console.log(message.sid))
          .done();
      });
  }

  fetchData();
});

router.get("/test", (req, res) => {
  console.log("loading");
});

module.exports = router;
