const express = require('express');
const wsuQuestionnaireRoutes = express.Router();

let Wsu_Quesionnaire = require('./wsu_questionnaire.model');

wsuQuestionnaireRoutes.route('/add').post(function (req, res) {
    let wsu_questionnaire = new Wsu_Quesionnaire(req.body);
    wsu_questionnaire.save()
        .then(wsu_questionnaire => {
            res.status(200).json({ 'wsu_questionnaire': 'wsu_questionnaire in added successfully' });
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

wsuQuestionnaireRoutes.route('/').get(function (req, res) {
    Wsu_Quesionnaire.find(function (err, wsu_questionnaires) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(wsu_questionnaires);
        }
    });
});

module.exports = wsuQuestionnaireRoutes;
