const express = require('express')

const bodyParser = require('body-parser');
const DSchedule = require('./models/dSchedule')

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

app.listen(3000, () => {
  console.log('Server started on port 3001');
});
module.exports = app;
