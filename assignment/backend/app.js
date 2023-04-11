const express = require('express')

const bodyParser = require('body-parser');
const DSchedule = require('./models/dSchedule');
const User = require ('./models/dUsers');
const DRequest = require ('./models/dRequest');
const Ddepartment = require('./models/dDepartment');
const mongoose = require('mongoose');

const bcrypt = require("bcrypt");
const dDepartment = require('./models/dDepartment');
// const User = require('./models/user');
const jwt = require('jsonwebtoken');

const checkAuth = require('./middleware/check-auth');

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

app.post("/api/dailySchedules",checkAuth, (req, res, next) => {
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

app.put("/api/dailySchedules/:id",checkAuth,(req, res, next)=>{
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
app.post("/api/users", checkAuth,(req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const users = new DUsers({
    
      employeeId: req.body.employeeId,
      password : hash,
      name : req.body.name,
      position : req.body.position,
      email : req.body.email,
      FWAstatus : req.body.FWAstatus,
      supervisorID : req.body.supervisorID,
      department : {
        deptID: req.body.department.deptID,
        deptName: req.body.department.deptName,
        flexiHours: req.body.department.flexiHours,
        workFromHome: req.body.department.workFromHome,
        hybrid: req.body.department.hybrid
      } 
     });
     DUsers.save().then((createdDUsers)=> {
      res.status(201).json({
        message : 'Users registered successfully',
        dUsersId : createdDUsers.id
      })
      .catch(err => { // response error if there is error (exm: create with same email)
        res.status(500).json({
          error: err
        });
      });
    });
  });
});

app.get('/api/users', (req, res, next) => {
  User.find()
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

//for department api call
app.get('/api/departments', (req, res, next) => {
  Ddepartment.find()
    .then((documents) => {
      res.status(200).json({
        message: 'Department fetched successfully',
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
app.put("/api/users/:id",checkAuth,(req, res, next)=>{
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


app.post("/api/request", checkAuth,(req, res, next) => {

   const dRequest = new DRequest({

   reqId : req.body.reqId,

   reqDate : req.body.reqDate,

   workType : req.body.workType,

   description : req.body.description,
   reason : req.body.reason,
   status: req.body.status,
   comment : req.body.comment,
   employeeID : req.body.employeeID,

   

  });

  dRequest.save().then((createdRequest)=> {

   res.status(201).json({

   message : 'Request added successfully',

   requestId : createdRequest.id

   });

   });




  });




  app.get('/api/request', (req, res, next) => {

 DRequest.find()

   .then((documents) => {

   res.status(200).json({

   message: 'Request fetched successfully',

   dRequests: documents,

   });

   })

  .catch((error) => {

   console.log(error);

   res.status(500).json({

   error: error,

   });

   });

  });




  app.put("/api/request/:id",checkAuth,(req, res, next)=>{

   const r = new DRequest({

   _id: req.body.id,

   reqId: req.body.reqId,

   reqDate: req.body.reqDate,

  workType: req.body.workType,

   description: req.body.description,

   reason:req.body.reason,

   status: req.body.status,

   comment:req.body.comment,

   employeeId: req.body.employeeId,


   });




   DRequest.updateOne({_id:req.params.id} , r).then (

   result => {

  console.log(result);

  res.status(200).json({message: "request update successful"});

 }

 );




  });

  app.post('/api/users', (req, res, next) => {
    let fetchedUser;
    User.findOne({employeeId: req.body.employeeId})
      .then(user => {
        if(!user){
          return res.status(401).json({
            message: 'Auth failed'
          });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
      })
      .then(result => {
        if(!result){
          return res.status(401).json({
            message: 'Auth failed'
          });
        }
        const token = jwt.sign(
          {employeeId: fetchedUser.employeeId, id: fetchedUser._id},
          'secret_this_should_be_longer',
          {expiresIn: '1h'}
        );
        res.status(200).json({
         token: token,
         user: fetchedUser
        });
      })
      .catch(err => {
        return res.status(401).json({
          message:  'Auth failed'
        })
      })
  })



app.listen(3000, () => {
  console.log('Server started on port 3001');
});
module.exports = app;

