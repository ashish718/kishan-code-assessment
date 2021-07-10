let messageSchema = require('./Models/messageSchema')

module.exports.add = async (object, deliver_date)=>{
    
    let MessageSchema = new messageSchema({
        gen_otp : object.otp,
        phone: object.phone,
        timestamp : deliver_date,
        name: object.full_name
    })
    let save_to_db = await MessageSchema.save()
    return save_to_db
}

module.exports.get_message = async()=>{
   let message_data =  await messageSchema.find({}).sort({timestamp:-1})
   return message_data;
}