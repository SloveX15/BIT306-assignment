const mongoose = require ('mongoose');

const requestSchema = mongoose.Schema({
  reqId: {type: String,},
  reqDate: { type:Date , requried : true},
  workType: { type:String , requried : true},
  description: { type:String , requried : true},
  reason: {type: String, required: true},
  status: { type:String , requried : true}, 
  comment: {type: String,},
  employeeID: { type:String , requried : true}
});

module.exports = mongoose.model('Request', requestSchema );
