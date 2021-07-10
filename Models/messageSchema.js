const mongoose = require('mongoose');

// Create Schema
const messageSchema = new mongoose.Schema({
  gen_otp:{
    type:String,
    require:true
  },
  phone:{
    type:String,
    require:true
  },
  timestamp:{
    type:Date,
    require:true
  },
  name:{
      type:String,
      require:true
  }
 
});

module.exports = mongoose.model('messageSchema', messageSchema);
