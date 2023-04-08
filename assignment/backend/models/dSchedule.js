const mongoose = require ('mongoose');

const scheduleSchema = mongoose.Schema({
  employeeId: {type: String,},
  workLocation: { type:String , requried : true},
  workHours: {type: String, required: true},
  workReport: { type:String , requried : true},
  date: { type:Date , requried : true},
  comment: {type: String,},
  isEditMode: { type:Boolean , requried : true}
});

module.exports = mongoose.model('DailySchedule', scheduleSchema );
