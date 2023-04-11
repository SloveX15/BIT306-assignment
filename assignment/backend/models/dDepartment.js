const mongoose = require ('mongoose');

const requestSchema = mongoose.Schema({
  deptId: {type: String,},
  deptName: { type:String , requried : true},
  flexiHours: { type:String , requried : true},
  workFromHome: { type:String , requried : true},
  hybrid: { type:String , requried : true},
});

module.exports = mongoose.model('Request', scheduleSchema );
