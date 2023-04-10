const express = require('express')

const bodyParser = require('body-parser');
const DSchedule = require('./models/dSchedule');
const DUsers = require ('./models/dUsers');
const DRequets = require ('./models/dRequest');
const mongoose = require('mongoose');

// const bcrypt = require("bcrypt");
// const User = require('./models/user');
// const jwt = require('jsonwebtoken');

// const checkAuth = require('./middleware/check-auth');

const app = express();

mongoose.connect("mongodb+srv://max:max123@cluster0.un8ev6b.mongodb.net/node-angular?retryWrites=true&w=majority").then ( ()=> {
  console.log("Connected to database");
}).catch( (err)=> {
  console.log("connection failed" , err);
}
);

app.use(bodyParser.json());

app.use((req, res, next) =>{
  console.log("app.use set header n nove nxt");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");
  next();
});

app.post("/api/dailySchedules", (req, res, next) => {
  const dSchedule = new DSchedule({
    employeeId : req.body.employeeId,
    workLocation : req.body.workLocation,
    workHours : req.body.workHours,
    workReport : req.body.workReport,
    date : req.body.date,
    comment : req.body.comment,
    isEditMode : req.body.isEditMode,
   });
   dSchedule.save().then((createdDSchedule)=> {
    res.status(201).json({
      message : 'Daily Schedule added successfully',
      dScheduleId : createdDSchedule.id
    });
  });

});

app.get('/api/dailySchedules', (req, res, next) => {
  DSchedule.find()
    .then((documents) => {
      res.status(200).json({
        message: 'Daily Schedules fetched successfully',
        dailySchedules: documents,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
});

app.put("/api/dailySchedules/:id",(req, res, next)=>{
  const ds = new DSchedule({
    _id: req.body.id,
    employeeId : req.body.employeeId,
    workLocation : req.body.workLocation,
    workHours : req.body.workHours,
    workReport : req.body.workReport,
    date : req.body.date,
    comment : req.body.comment,
    isEditMode : req.body.isEditMode,
  });

  DSchedule.updateOne({_id:req.params.id} , ds).then (
  result => {
   console.log(result);
   res.status(200).json({message: " update successful"});
  }
  );

});

//for users api call
app.post("/api/users", (req, res, next) => {
  const users = new DUsers({
    password : req.body.password,
    employeeId: req.body.employeeId,
    name : req.body.name,
    position : req.body.position,
    email : req.body.email,
    FWAstatus : req.body.FWAstatus,
    supervisorID : req.body.supervisorID,
    department : req.body.department
   });
   DUsers.save().then((createdDUsers)=> {
    res.status(201).json({
      message : 'Users registered successfully',
      dUsersId : createdDUsers.id
    });
  });

});

app.get('/api/users', (req, res, next) => {
  DUsers.find()
    .then((documents) => {
      res.status(200).json({
        message: 'Users fetched successfully',
        users: documents,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
});

app.put("/api/users/:id",(req, res, next)=>{
  const users = new DUsers({
    _id: req.body.id,
    employeeId: req.body.employeeId,
    password : req.body.password,
    name : req.body.name,
    position : req.body.position,
    email : req.body.email,
    FWAstatus : req.body.FWAstatus,
    supervisorID: req.body.supervisorID,
    department: req.body.department,
  });

  DUsers.updateOne({ID:req.params.ID} , users).then (
  result => {
   console.log(result);
   res.status(200).json({message: " user details update successful"});
  }
  );

});

//for request api call
app.post("/api/request", (req, res, next) => {
  const dRequest = new DRequets({
    reqId : req.body.reqId,
    reqDate : req.body.reqDate,
    workType : req.body.workType,
    description : req.body.description,
    reason : req.body.reason,
    status : req.body.status,
    comment : req.body.comment,
    employeeId : req.body.employeeId,
   });
   dRequest.save().then((createdDRequests)=> {
    res.status(201).json({
      message : 'Request added successfully',
      dRequestId : createdDRequests.id
    });
  });

});

app.get('/api/request', (req, res, next) => {
  DRequets.find()
    .then((documents) => {
      res.status(200).json({
        message: 'Request fetched successfully',
        request: documents,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
});

app.put("/api/request/:id",(req, res, next)=>{
  const request = new DRequets({
    _id: req.body.id,
    reqId : req.body.reqId,
    reqDate : req.body.reqDate,
    workType : req.body.workType,
    description : req.body.description,
    reason : req.body.reason,
    status : req.body.status,
    comment : req.body.comment,
    employeeId : req.body.employeeId,
  });

  DRequets.updateOne({_id:req.params.id} , request).then (
  result => {
   console.log(result);
   res.status(200).json({message: " update successful"});
  }
  );

});



app.listen(3000, () => {
  console.log('Server started on port 3001');
});
module.exports = app;

