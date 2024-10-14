const express=require("express");
const pastods=express.Router();
const cron = require('node-cron');

const studentconnection = require("../../../mysql/databases/studentdatabase/connections/hostconnection");
const teacherconnection = require("../../../mysql/databases/teacherdatabase/connections/hostconnection");
const hodconnection = require("../../../mysql/databases/hoddatabase/connections/hostconnection");
const coeconnection = require("../../../mysql/databases/coedatabase/connections/hostconnection");
cron.schedule('* * * * *', async () => {

    console.log("hello bhai")
    console.log("Checking for ODs past their enddate...");
    const currentDate = new Date();
    const selectquery=`select * from acceptedodhodinternal where enddate<? and isActive=true`;
    const selectquery1=`select * from acceptedodcoe where enddate<? and isActive=true`;
    hodconnection.query(selectquery,[currentDate],(selecterror,selectresult)=>{
        if(selecterror){
            console.log("error occured",selecterror);
        }
        selectresult.forEach((od)=>{
            const insertQuery = `
            INSERT INTO rejectedod (
                email, 
                rollno, 
                username, 
                classs, 
                section, 
                reason, 
                applieddate, 
                startdate, 
                enddate, 
                total_days, 
                relatedto, 
                pdf, 
                photo, 
                presentyear, 
                odtype, 
                year,
                reasonofrejection,
                rejectedby
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const reason=`not uploadeddddddddd geotag`;
            const rejectedBy = "System";
            teacherconnection.query(insertQuery,[od.email,od.rollno,od.username,od.classs,od.section,od.reason,od.applieddate,od.startdate,od.enddate,
                od.total_days,od.relatedto,od.pdf,od.photo,od.presentyear,od.odtype,od.year,reason,rejectedBy
            ],(inserterror,insertresult)=>{
                if(inserterror){
                    console.log("error occured",inserterror);
                }
                const deletequery="update acceptedodhodinternal set isActive=false where id=?";
                hodconnection.query(deletequery,[od.id],(deleteerr,deleteresult)=>{
                    if(deleteerr){
                        console.log("error occured",deleteerr)
                    }
                    const query2="delete from oddays where email=? and appliedtime=?";
                    studentconnection.query(query2,[od.email,od.appliedtime],(delerr,delres)=>{
                     if(delerr){
                         console.log("error occured",delerr)
                     }
                })
                })
            })
    
        })
    })




    coeconnection.query(selectquery1,[currentDate],(selecterror,selectresult)=>{
        if(selecterror){
            console.log("error occured",selecterror);
        }
        selectresult.forEach((od)=>{
            const insertQuery = `
            INSERT INTO rejectedod (
                email, 
                rollno, 
                username, 
                classs, 
                section, 
                reason, 
                applieddate, 
                startdate, 
                enddate, 
                total_days, 
                relatedto, 
                pdf, 
                photo, 
                presentyear, 
                odtype, 
                year,
                reasonofrejection,
                rejectedby
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const reason=`not uploaded geotag`;
            const rejectedBy = "Systeeem";
            teacherconnection.query(insertQuery,[od.email,od.rollno,od.username,od.classs,od.section,od.reason,od.applieddate,od.startdate,od.enddate,
                od.total_days,od.relatedto,od.pdf,od.photo,od.presentyear,od.odtype,od.year,reason,rejectedBy
            ],(inserterror,insertresult)=>{
                if(inserterror){
                    console.log("error occured",inserterror);
                }
                const deletequery="update acceptedodcoe set isActive=FALSE where id=?";
                coeconnection.query(deletequery,[od.id],(deleteerr,deleteresult)=>{
                    if(deleteerr){
                        console.log("error occured",deleteerr)
                    }
                    const query2="delete from oddays where email=? and appliedtime=?";
                    studentconnection.query(query2,[od.email,od.appliedtime],(delerr,delres)=>{
                     if(delerr){
                         console.log("error occured",delerr)
                     }
                })
            })
            })
    
        })
    })


})


module.exports={}