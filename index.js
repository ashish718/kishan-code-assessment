require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require('mongoose')
const app = express();
var bodyParser = require('body-parser')
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const cors = require('cors')
let {add, get_message} = require('./services')
let port = process.env.PORT || 8000
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites:false,
  useCreateIndex: true
},(err)=>{
  if (err) {
    console.log(err, "mongo error");
  }
  else {
    console.log("db is connected")
  }
})

// middlewares
app.use(bodyParser.urlencoded({ extended: false }))


// parse application/json
app.use(bodyParser.json())

app.use(cors())

app.get('/', (req, res)=>{
  res.send('live')
})

app.post('/send', async(req, res)=>{
    client.messages
      .create({body: `Hi. Your OTP is ${req.body.otp}.`, from: process.env.TWILIO_PHONE, to: req.body.phone})
      .then(async (message) =>{
        let add_db = await add(req.body, message.dateUpdated)
         return res.json({message:message, status:"200"})
      }).catch(error=>{
        console.log(error, "error is--->");
        return res.json({message:error, status:"409"})
      })

})

app.get('/message', async(req, res)=>{
  let fetch_message = await get_message()
  res.json({data:fetch_message, status:"200"})
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
    console.log(`Server is running on port 8000...`);
  });
