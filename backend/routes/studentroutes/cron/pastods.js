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
    const selectquery=`select * from acceptedodhodinternal where enddate<?`;
    const selectquery1=`select * from acceptedodcoe where enddate<?`;
    hodconnection.query(selectquery,[currentDate],(selecterror,selectresult)=>{
        if(selecterror){
            console.log("error occured");
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
            const rejectedBy = "System";
            teacherconnection.query(insertQuery,[od.email,od.rollno,od.username,od.classs,od.section,od.reason,od.applieddate,od.startdate,od.enddate,
                od.total_days,od.relatedto,od.pdf,od.photo,od.presentyear,od.odtype,od.year,reason,rejectedBy
            ],(inserterror,insertresult)=>{
                if(inserterror){
                    console.log("error occured");
                }
                const deletequery="delete from acceptedodhodinternal where id=?";
                hodconnection.query(deletequery,[od.id],(deleteerr,deleteresult)=>{
                    if(deleteerr){
                        console.log("error occured")
                    }
                })
            })
    
        })
    })




    coeconnection.query(selectquery1,[currentDate],(selecterror,selectresult)=>{
        if(selecterror){
            console.log("error occured");
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
            const rejectedBy = "System";
            teacherconnection.query(insertQuery,[od.email,od.rollno,od.username,od.classs,od.section,od.reason,od.applieddate,od.startdate,od.enddate,
                od.total_days,od.relatedto,od.pdf,od.photo,od.presentyear,od.odtype,od.year,reason,rejectedBy
            ],(inserterror,insertresult)=>{
                if(inserterror){
                    console.log("error occured");
                }
                const deletequery="delete from acceptedodcoe where id=?";
                coeconnection.query(deletequery,[od.id],(deleteerr,deleteresult)=>{
                    if(deleteerr){
                        console.log("error occured")
                    }
                })
            })
    
        })
    })


})


module.exports={}