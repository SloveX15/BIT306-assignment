//import { Department } from '../models/Department.model';
const mongoose = require ('mongoose');

const usersSchema = mongoose.Schema({
  employeeId: {type: String,required :true},
  password:{type: String, required:true},
  name: { type:String , requried : true},
  position: {type: String, required: true},
  email: { type:String , requried : true},
  FWAstatus: { type:String , requried : true},
  supervisorID: {type: String,},
  deptID:{ type: String, },
  
});

module.exports = mongoose.model('Users', usersSchema );
