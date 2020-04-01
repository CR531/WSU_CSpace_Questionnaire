const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const autoIncrementModelID = require('./counter.model');
let Wsu_Quesionnaire = new Schema({
    id: { type: Number, unique: true, min: 1 },
    name: {
        type: String
    },
    email: {
        type: String
    },
    wsuid: {
        type: String
    },
    phone: {
        type: String
    },
    major: {
        type: String
    },
    cummulative_Gpa: {
        type: String
    },
    exp_grad_year: {
        type: String
    },
    test_date: {
        type: Date
    },
    ssn_check: {
        type: Boolean
    },
    status: {
        type: String
    }
}, {
    collection: 'wsu_quesionnaire'
});

Wsu_Quesionnaire.pre('save', function (next) {
    if (!this.isNew) {
        next();
        return;
    }

    autoIncrementModelID('activities', this, next);
});
module.exports = mongoose.model('wsu_quesionnaire', Wsu_Quesionnaire);