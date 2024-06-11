const express = require("express");
const mysql=require("mysql");

const app = express();
const cors = require('cors');
const bcrypt=require('bcrypt');

const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const session=require('express-session');

const saltRounds=10;
//miyata counter
//ippo champion
//ricardo mexican
//alf mexican
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET","POST"],
    credentials: true
}));
app.use(express.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
        key:"userId",
        secret: "power",
        resave:false,
        saveUninitialized: false,
        cookie:{
            expires: 1000 * 60 * 60 * 24 * 7,
        },
    })
)

const db=mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "z@raki123",
    database: "hms",
});

app.post("/register",(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const gender=req.body.gender;
    const address=req.body.address;
    const password=req.body.password;
    const med=req.body.med;
    const condition=req.body.condition;
    const surge=req.body.surge;
    bcrypt.hash(password,saltRounds,(err,hash)=>{
        if(err) console.log(err);
        db.query(
            "INSERT INTO Patient (name, email, gender,address,password) VALUES (?,?,?,?,?)",
            [name,email,gender,address,hash], 
            (err,result)=>{
                if(err)
                    console.log(err);
                db.query(
                    "SELECT id FROM MedicalHistory ORDER BY id DESC LIMIT 1 ;", 
                    (err,result)=>{
                        if(err){
                            console.log(err);
                            console.log("here!");
                        }
                        else{
                            let id=result.length > 0 ? result[0].id + 1 : 1;
                            // console.log(id);
                            db.query(
                                `INSERT INTO MedicalHistory (id, date, conditions, surgeries, medication) VALUES (${id}, curdate(), "${condition}", "${surge}", "${med}")`, 
                                (err1,result1)=>{
                                    if(err1)
                                        console.log(err1);
                                    else{ // purpose of this table? if same email has multiple histories, need for a   primary key?
                                        db.query(
                                            "INSERT INTO PatientsFillHistory (patient, history) VALUES (?,?)",
                                            [email,id], 
                                            (err2,result2)=>{
                                                if(err2)
                                                    console.log(err2);
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    }
                );
            }
        );
        
    });
    
});

app.post("/registerfordoc",(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const gender=req.body.gender;
    const password=req.body.password;
    const schedule=req.body.schedule;
    bcrypt.hash(password,saltRounds,(err,hash)=>{
        if(err) console.log(err);
        db.query(
            "INSERT INTO Doctor (name, email, gender,password) VALUES (?,?,?,?)",
            [name,email,gender,hash], 
            (err,result)=>{
                if(err)
                    console.log(err);
                else{
                    db.query(
                        "INSERT INTO DocsHaveSchedules (sched,doctor) VALUES (?,?)",
                        [schedule,email], 
                        (err,result)=>{
                            if(err)
                                console.log(err);
                        }
                    );
                }
            }
        );
    });
});


app.get("/login",(req,res)=>{
    if(req.session.user){
        if(req.session.user[0].address)
            res.send({loggedIn:true,user:req.session.user,role: "pat"});
        else
            res.send({loggedIn:true,user:req.session.user,role: "doc"}); 
    }
    else 
        res.send({loggedIn:false});
});

app.post("/login",(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const role=req.body.role;
    if(role==="doc"){
        db.query(
            "SELECT * FROM Doctor WHERE email=?;",
            email, 
            (err,result)=>{
                if(err)
                    res.send({err:err});
                if(result.length>0){//result is an array of objects
                    //and we assume the username is unique hence -> result[0]
                    bcrypt.compare(password,result[0].password,(error,response)=>{
                        if(response) {
                                req.session.user=result;
                                // console.log(req.session.user);
                                res.send(result);
                        }
                        else{
                            res.send({message:"wrong username/password combination!"});
                        }
                    })
                }
                else{
                    res.send({message:"user does not exist!"});
                }
            }
        );
    }
    else{
        db.query(
            "SELECT * FROM Patient WHERE email=? ;",
            email, 
            (err,result)=>{
                if(err)
                    res.send({err:err});
                if(result.length>0){//result is an array of objects
                    //and we assume the username is unique hence -> result[0]
                    bcrypt.compare(password,result[0].password,(error,response)=>{
                        if(response) {
                                req.session.user=result;
                                // console.log(req.session.user);
                                res.send(result);
                        }
                        else{
                            res.send({message:"wrong username/password combination!"});
                        }
                    })
                }
                else{
                    res.send({message:"user does not exist!"});
                }
            }
        );
    }
});


app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).send('Logout failed');
      } else {
        res.clearCookie('userId'); // Use your session cookie name here
        res.status(200).send('Logged out successfully');
      }
    });
  });
  
  app.post("/ViewMedHis",(req,res)=>{
    const email=req.body.email;
    // console.log("why?");
    // console.log(email);
        db.query(
        `select T.name,T.email,T.gender,T.address,T.history, M.conditions,M.surgeries,M.medication from MedicalHistory as M inner join(
            select H.name,H.email,H.gender,H.address,P.history from PatientsFillHistory as P inner join patient as H on H.email = P.patient) as T
            on T.history = M.id where T.email = ?;`, email,
            (err,result)=>{
                if(err){
                    console.log(err);
                }
                else{
                    db.query(
                        `select Z.date,Z.concerns, Z.symptoms, T.doctor, T.diagnosis, T.prescription from Diagnose as T inner join (select X.id, X.date, Y.concerns, Y.symptoms from  PatientsAttendAppointments as Y inner join Appointment as X on X.id=Y.appt where X.status='Done' and Y.patient =?) as Z on T.appt=Z.id;`, email,
                            (err1,result1)=>{
                                if(err1){
                                    console.log(err1);
                                }
                                else{
                                    res.send({result:result, result1:result1});
                                }
                            }
                        );
                }
            }
        );
});

app.post("/SchedAppt",(req,res)=>{
    const demail=req.body.doctor; //dname -> doctor name
    const pemail=req.body.patEmail; //pemail -> patient email
    const date=req.body.date;
    const time=req.body.time;
    const concerns=req.body.concerns;
    const symptoms=req.body.symptoms;
        db.query( 
            "SELECT id FROM Appointment ORDER BY id DESC LIMIT 1",
            (err,result)=>{
                if(err)
                    console.log(err);
                else{
                    let id=result.length > 0 ? result[0].id + 1 : 1;
                    const [hours, minutes] = time.split(':').map(Number);
                    const newHours = (hours + 1) % 24;
                    const newTime = `${newHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                    let st="Not Done";
                    const dateObject = new Date(date);
                    const dayOfWeek = dateObject.getDay();
                    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    const day = dayNames[dayOfWeek];
                    db.query('select S.starttime, S.endtime, S.breaktime, S.day from Schedule as S inner join DocsHaveSchedules as D on D.sched = S.id where S.day=?',[day],(err4,result4)=>{
                        if (err4) {
                            console.error(err4);
                            return;
                        }
                        else{
                            let p1=time;
                            let p2=newTime;
                            let d1=result4[0].starttime;
                            let d2=result4[0].endtime;
                            let d3=result4[0].breaktime;
                            if(p1>=d1 && p2<=d2){
                                db.query(
                                    `INSERT INTO Appointment (id, date, starttime, endtime, status) VALUES (?,?,?,?,?)`,[id,date,time,newTime,st], 
                                    (err1,result1)=>{
                                        if(err){
                                            console.log(err);
                                        }
                                        else{
                                            db.query( 
                                                "INSERT INTO PatientsAttendAppointments (patient, appt, concerns,symptoms) VALUES (?,?,?,?) ", [pemail,id,concerns,symptoms],
                                                (err2,result2)=>{
                                                    if(err1)
                                                        console.log(err1);
                                                    else{ 
                                                        let z="na";
                                                        db.query(
                                                            "INSERT INTO Diagnose (appt,doctor, diagnosis,prescription) VALUES (?,?,?,?)",
                                                            [id,demail,z,z], 
                                                            (err3,result3)=>{
                                                                if(err2)
                                                                    console.log(err2);
                                                                else
                                                                res.status(200).json({ success: "Appointment scheduled successfully."}); 
                                                            }
                                                        );
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }
                            else {
                                const alertMessage = "Appointment at that time is not possible. Please refer to the doctor's schedule.";
                                res.status(200).json({ alert: alertMessage });
                            }
                        }
                    });
                    
                }
                
            }
        );
});

app.post("/ViewAppt",(req,res)=>{
    const email=req.body.email;
    // console.log("why?");
    // console.log(email);
        db.query( 
        `select A.id,A.date, A.starttime, A.endtime, P.concerns, P.symptoms, A.status from Appointment as A inner join PatientsAttendAppointments as P on A.id = P.appt where P.patient=?`, email,
            (err,result)=>{
                if(err){
                    console.log(err);
                }
                else{

                    res.send(result);
                }
            }
        );
});

app.post("/Appts",(req,res)=>{
    const email=req.body.email;
    // console.log("why?");
        db.query( 
        `select Z.id, Pt.name, Z.date, Z.starttime, Z.endtime, Z.concerns, Z.symptoms, Z.status, Z.patient from (select  T.id,  T.date, T.starttime, T.endtime, T.concerns, T.symptoms, T.status, T.patient from (select A.id,A.date, A.starttime, A.endtime, P.concerns, P.symptoms, A.status,P.patient from Appointment as A inner join PatientsAttendAppointments as P on A.id = P.appt) as T inner join Diagnose as D on T.id=D.appt where D.doctor=?) as Z inner join Patient as Pt on Pt.email=Z.patient`, email,
            (err,result)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.send(result);
                }
            }
        );
});

app.post("/Diagnose", (req, res) => {
    const { id, diag, pres } = req.body;
    db.query(
        'UPDATE Diagnose SET diagnosis = ?, prescription = ? WHERE appt = ?',
        [diag, pres, id],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Failed to update diagnosis and prescription' });
            } else {
                let st = "Done";
                db.query('UPDATE Appointment SET status=? WHERE id = ?', [st, id], (err1, result1) => {
                    if (err1) {
                        console.error(err1);
                        res.status(500).json({ error: 'Failed to update appointment status' });
                    } else {
                        res.status(200).json({ success: true, message: 'Diagnosis and prescription updated successfully' });
                    }
                });
            }
        }
    );
});

// server.js

app.get("/GetDiagnosis/:id", (req, res) => {
    const appointmentId = req.params.id;
    // Query the database to fetch diagnosis and prescription data for the specified appointment ID
    db.query(
      "SELECT diagnosis, prescription FROM Diagnose WHERE appt = ?",
      [appointmentId],
      (err, result) => {
        if (err) {
          console.error("Error fetching diagnosis and prescription:", err);
          res.status(500).json({ error: "Internal server error" });
        } else {
          if (result.length === 0) {
            // If no record found for the appointment ID
            res.status(404).json({ message: "Diagnosis not found" });
          } else {
            // If diagnosis and prescription data found, send it as JSON response
            const { diagnosis, prescription } = result[0];
            res.status(200).json({ diagnosis, prescription });
          }
        }
      }
    );
  });
  
  app.post('/searchPatients', (req, res) => {
    const { query } = req.body;
    // Query the database to search for patients by name
    db.query(
      'SELECT * FROM Patient WHERE name LIKE ?',
      [`%${query}%`], // Use '%' to perform a wildcard search
      (err, results) => {
        if (err) {
          console.error('Error searching patients:', err);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  app.post("/getPatientDetails", (req, res) => {
    const { name } = req.body;
    db.query(
        "select Z.name, Z.email, Z.address, Z.gender, T.conditions, T.surgeries, T.medication from (select M.conditions, M.surgeries, M.medication,P.patient from MedicalHistory as M inner join PatientsFillHistory as P on P.history=M.id) as T inner join Patient as Z on Z.email=T.patient where Z.name=?",
        [name],
        (err, result) => {
            if (err) {
                console.error("Error fetching patient details:", err);
                res.status(500).json({ error: "Internal server error" });
            } else {
                if (result.length === 0) {
                    // If no record found for the patient name
                    res.status(404).json({ message: "Patient not found" });
                } else {
                    // If patient details found, send it as JSON response
                    res.status(200).json(result[0]);
                }
            }
        }
    );
});


app.get("/getdocdetails",(req,res)=>{
    db.query(
        "SELECT email,name FROM Doctor",
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                // console.log("below is the result");
                // console.log(result);
                res.send(result);
            }
        }
    );
});



app.listen(3001,()=>{ 
    console.log("running server!");
});
