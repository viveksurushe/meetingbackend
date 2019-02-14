const express = require('express');
const router = express.Router();
const meetngController = require("./../../app/controllers/meetingController");
const appConfig = require("./../../config/appConfig")

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/meeting`;

    // defining routes.

    app.get(`${baseUrl}/getall`, meetngController.getMeetingFun);

    /**
     * @apiGroup MEETING
     * @apiVersion  1.0.0
     * @api {get} /api/v1/meeting/getall api for geting all meeting.
     *
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "All Meeting Details Found",
            "status": 200,
            "data": [
                    {
                                "_id": "5c5e94c4244b4d0c474733da",
                                "createdOn": "2019-02-09T08:52:20.000Z",
                                "color": "#aa7942",
                                "title": "hello",
                                "end": "2019-02-09T13:00:00.000Z",
                                "start": "2019-02-09T12:00:00.000Z",
                                "setBy": "vivek surushe",
                                "meetId": "K4sNKV4kv",
                                "__v": 0
                            },
                            {
                                "_id": "5c5e953d244b4d0c474733db",
                                "createdOn": "2019-02-09T08:54:21.000Z",
                                "color": "#00f900",
                                "title": "new one",
                                "end": "2019-02-09T14:00:00.000Z",
                                "start": "2019-02-09T13:00:00.000Z",
                                "setBy": "vivek surushe",
                                "meetId": "OHBoD5op3",
                                "__v": 0
                            }
                        ]
        }
    */
   

    // params: userId
    app.post(`${baseUrl}/getUserMeet`, meetngController.getUserMeet);

    /**
    * @apiGroup MEETING
    * @apiVersion  1.0.0
    * @api {post} /api/v1/meeting/getUserMeet to get specific user meeting.
    *
    * @apiParam {string} userId of the user.(body params) (required)
    *
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Users All Meeting Details Found",
            "status": 200,
            "data": [
                {
                    "_id": "5c5ea560cd4b700cf9c254e5",
                    "createdOn": "2019-02-09T10:03:12.000Z",
                    "color": "#ff40ff",
                    "title": "js",
                    "end": "2019-02-20T12:00:00.000Z",
                    "start": "2019-02-19T12:00:00.000Z",
                    "setBy": "vivek surushe",
                    "meetId": "nrFdbtRnd",
                    "__v": 0
                },
                {
                    "_id": "5c62787b910e75fc0433f7b9",
                    "updatedOn": null,
                    "createdOn": "2019-02-12T07:40:43.000Z",
                    "color": "#0433ff",
                    "purpose": "purpose of meeting",
                    "where": "mumbai",
                    "title": "all are here",
                    "end": "2019-02-20T14:00:00.000Z",
                    "start": "2019-02-20T12:00:00.000Z",
                    "forAll": "",
                    "setTo": "all",
                    "setBy": "viveks Surushe",
                    "meetId": "d4fguYssO",
                    "__v": 0
                }
            ]
        }
    */

   // params: setBy, setTo, title, purpose, where, start, end, color
    app.post(`${baseUrl}/save`, meetngController.setMeetingFun);

    /**
     * @apiGroup MEETING
     * @apiVersion  1.0.0
     * @api {post} /api/v1/meeting/save to Create new meeting.
     *
     * @apiParam {string} setBy meeting setBy.(body params) (required)
     * @apiParam {string} setTo meeting Set to user(body params) (required)
     * @apiParam {string} title title of the meeting(body params) (required)
     * @apiParam {string} purpose purpose of meeting(body params) (required)
     * @apiParam {string} where location (body params) (required)
     * @apiParam {string} meeting start time (body params) (required)
     * @apiParam {string} end meetnig end time (body params) (required)
     * @apiParam {string} color Calender color meeting(body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
                {
                    "error": false,
                    "message": "Meeting created",
                    "status": 200,
                    "data": {
                                "__v": 0,
                                "_id": "5c62abd4247a292cca570f8b",
                                "updatedOn": null,
                                "createdOn": "2019-02-12T11:19:48.000Z",
                                "color": "#ff0000",
                                "purpose": "testing",
                                "where": "at home",
                                "title": "postman",
                                "end": "2019-02-20T14:00:00.000Z",
                                "start": "2019-02-20T13:00:00.000Z",
                                "setTo": "all",
                                "setBy": "vivek surushe",
                                "meetId": "BnGt4Iazg"
                    }
                }
    */

  // params: meetId
   app.post(`${baseUrl}/delete`, meetngController.deleteMeetFun);

   /**
    * @apiGroup MEETING
    * @apiVersion  1.0.0
    * @api {post} /api/v1/meeting/delete to Delete Meeting.
    *
    * @apiParam {string} meetId Meeting Id of perticular meeting.(body params) (required)
    *
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Meeting Deleted Successfully",
            "status": 200,
            "data": null
        }
   */

       // params: setBy, setTo, title, purpose, where, start, end, color, meetId, email 
       app.post(`${baseUrl}/update`, meetngController.updateMeetingFun);

       /**
        * @apiGroup MEETING
        * @apiVersion  1.0.0
        * @api {post} /api/v1/meeting/update to update Meeting.
        *
        * @apiParam {string} setBy meeting setBy.(body params) (required)
        * @apiParam {string} setTo meeting Set to user(body params) (required)
        * @apiParam {string} title title of the meeting(body params) (required)
        * @apiParam {string} purpose purpose of meeting(body params) (required)
        * @apiParam {string} where location (body params) (required)
        * @apiParam {string} start start time (body params) (required)
        * @apiParam {string} end meetnig end time (body params) (required)
        * @apiParam {string} color Calender color meeting(body params) (required)
        * @apiParam {string} meetId meeting that tobe updated(body params) (required)
        * @apiParam {string} email to send Notification on mail(body params) (required)
        *
        * @apiSuccess {object} myResponse shows error status, message, http status code, result.
        * 
        * @apiSuccessExample {object} Success-Response:
                    {
                        "error": false,
                        "message": "Meeting Updated with Mail Send Successful",
                        "status": 200,
                        "data": null
                    }
       */

}
