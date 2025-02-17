const accountSid = "AC86d4f6ac69ca5afd8cb5b6281bc80e64";
const authToken = "c219f6fdc3908184ca17bfac6b24f3e5";
const verifySid = "VA2cec5cbd50d3dcf3e983d1befbd2c934";
const client = require("twilio")(accountSid, authToken);


const sendMessage = async (option) => {
  client.messages.create({
    from: "+12145062870",
    to: "+919309160677",
    body: "Hello Anushree... Are you alive?"
  })
  .then(response => console.log("response"))
  .catch(error => console.log(error))
};

module.exports = sendMessage;