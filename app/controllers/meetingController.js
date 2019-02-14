const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const token = require('../libs/tokenLib')
const check = require('../libs/checkLib')
const passwordLib = require('./../libs/generatePasswordLib');
var EmailLib = require('../libs/emailLib');


/* Models */
const MeetingModel = mongoose.model('meetings');

// start setMeeting function here 
let setMeetingFun = (req, res) => {
   let createMeet=()=>{
        return new Promise((resolve, reject) => {
            let newMeeting = new MeetingModel({
            meetId: shortid.generate(),
            setBy: req.body.setBy,
            setTo: req.body.setTo,
            start: req.body.start,
            end: req.body.end,
            title: req.body.title,
            where: req.body.where,
            purpose: req.body.purpose,
            color: req.body.color,
            createdOn: time.now()
            });
            newMeeting.save((err, newMeeting) => {
                if (err) {
                logger.error(err.message, 'meetingController: setMeetingFun', 10)
                let apiResponse = response.generate(true, 'Failed to save new Meeting', 500, null)
                reject(apiResponse)
                } else {
                    let newMeetingObj = newMeeting.toObject();
                    console.log("newMeetingObj",newMeetingObj);
                    resolve(newMeetingObj)
                }
            });
        })//promise end here
    }
    
    createMeet(req,res)
    .then((resolve) => {
        let emailBody=require('fs').readFileSync('./app/middlewares/emailBody/meeting.html', 'utf8');
        emailBody=emailBody.replace(/__NAME__/g,resolve.setBy);
        emailBody=emailBody.replace(/__MEETINGTITLE__/g,resolve.title);
        emailBody=emailBody.replace(/__PURPOSE__/g,resolve.purpose);
        emailBody=emailBody.replace(/__WHERE__/g,resolve.where);
        emailBody=emailBody.replace(/__STARTS__/g,resolve.start);
        emailBody=emailBody.replace(/__ENDS__/g,resolve.end);
        EmailLib.emailSend({to:req.body.email,subject:"Meeting Created Successfull",text:'hello',html:emailBody});
        let apiResponse = response.generate(false, 'Meeting created', 200, resolve)
        res.send(apiResponse)
      })
      .catch((err) => {
        res.send(err);
      })
  
}// end setMeeting Function 
 

// start of getMeetingFun function 
let getMeetingFun = (req, res) => {
    console.log("inside get meeting");
    MeetingModel.find()
    .lean()
    .exec((err, result) => { 
        if (err) {
            console.log(err)
            logger.error(err.message, 'Meeting Controller: getMeetingFun', 10)
            let apiResponse = response.generate(true, 'Failed To Get Meeting Details Details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'Meeting Controller: GetMeeting')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'All Meeting Details Found', 200, result)
            res.send(apiResponse)
        }
    })
}
// end of the getMeetingFun function 

//getUserMeet start
let getUserMeet=(req,res)=>{
    console.log("inside get user meeting");
    //{$in: [req.body.userId,'all']}
    MeetingModel.find({setTo:{$in: [req.body.userId,'all']}})
    .lean()
    .exec((err, result) => {
        console.log("result",result)
        if (err) {
            console.log(err)
            logger.error(err.message, 'Meeting Controller: getMeetingFun', 10)
            let apiResponse = response.generate(true, 'Failed To Get Meeting Details Details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'Meeting Controller: GetMeeting')
            let apiResponse = response.generate(true, 'No Meeting Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Users All Meeting Details Found', 200, result)
            res.send(apiResponse)
        }
    })
}//getUserMeet end

//start of meeting delete function
let deleteMeetFun = (req, res) => {
    MeetingModel.deleteOne({meetId: req.body.meetId}, (err, result) => {
        console.log(result);
        if (err) {
            console.log(err)
            logger.error(err.message, 'meetingController: deleteMeetFun', 10)
            let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, 'No such meeting presnt,chcek meeting Id', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Meeting Deleted Successfully', 200, null)
            let emailBody=require('fs').readFileSync('./app/middlewares/emailBody/deleteMeeting.html', 'utf8');
            emailBody=emailBody.replace(/__NAME__/g,req.body.setBy);
            emailBody=emailBody.replace(/__MEETINGTITLE__/g,req.body.title);
            EmailLib.emailSend({to:req.body.email,subject:"Meeting Deleted Successfully! ",text:'hello',html:emailBody});
            res.send(apiResponse)
        }
      })
} // end of the deleteMeetFun function.

//updateMeetingFun function start
let updateMeetingFun=(req,res)=>{
    MeetingModel.findOneAndUpdate({meetId:req.body.meetId}, {"$set":{"setBy":req.body.setBy,"setTo":req.body.setTo,"start":req.body.start,"end":req.body.end,"title":req.body.title,"where":req.body.where,"purpose":req.body.purpose,"color":req.body.color,"updatedOn":time.now()}}, {new: true}, (err, doc) => {
        if (err) {
            logger.error('Something wrong when updating data!', 'meetingController: updateMeetingFun', 10);
            let apiResponse = response.generate(true, 'Failed To Update Meeting', 500, null)
            res.send(apiResponse)
        }else{
            let emailBody=require('fs').readFileSync('./app/middlewares/emailBody/updatemeet.html', 'utf8');
            emailBody=emailBody.replace(/__NAME__/g,req.body.setBy);
            emailBody=emailBody.replace(/__MEETINGTITLE__/g,req.body.title);
            emailBody=emailBody.replace(/__PURPOSE__/g,req.body.purpose);
            emailBody=emailBody.replace(/__WHERE__/g,req.body.where);
            emailBody=emailBody.replace(/__STARTS__/g,req.body.start);
            emailBody=emailBody.replace(/__ENDS__/g,req.body.end);
            EmailLib.emailSend({to:req.body.email,subject:"Meeting Updated Successfully! ",text:'hello',html:emailBody});
            let apiResponse = response.generate(false, 'Meeting Updated with Mail Send Successful', 200, null)
            res.send(apiResponse)
        }
    });
}//end of the updateMeetingFun

module.exports = {

  getMeetingFun: getMeetingFun,
  setMeetingFun: setMeetingFun,
  deleteMeetFun:deleteMeetFun,
  updateMeetingFun:updateMeetingFun,
  getUserMeet:getUserMeet

}// end exports