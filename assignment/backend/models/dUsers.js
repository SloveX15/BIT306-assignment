import { Department } from '../models/Department.model';
const mongoose = require ('mongoose');

const scheduleSchema = mongoose.Schema({
  ID: {type: String,required :true},
  password:{type: String, required:true},
  name: { type:String , requried : true},
  position: {type: String, required: true},
  email: { type:String , requried : true},
  FWAstatus: { type:String , requried : true},
  supervisorID: {type: String,},
  department:{type: Department, required},
  
});

module.exports = mongoose.model('Users', scheduleSchema );
