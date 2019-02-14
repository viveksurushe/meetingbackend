'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let meetingsSchema = new Schema({
    meetId: {
        type: String,
        default: '',
    },
    setBy: {
        type: String,
        default: '',
    },
    setTo: {
        type: String,
        default: '',
    },
    start: {
        type: Date,
        default: '',
    },
    end: {
        type: Date,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    where: {
        type: String,
        default: ''
    },
    purpose: {
        type: String,
        default: ''
    },
    color: {
        type: String,
        default: ''
    },
    createdOn :{
        type:Date,
        default:""
    },
    updatedOn :{
        type:Date,
        default:""
    }

});

mongoose.model('meetings', meetingsSchema);
