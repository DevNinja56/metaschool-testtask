const express = require('express')
const bodyParser = require('body-parser');
const { handleRequestValidation } = require('../middleware/authorize')
const { check } = require('express-validator');
const { getAssessments, getAssessmentById, getSectionById, getQuestionById } = require('../utils/userUtils');

const router = express.Router();
router.use(bodyParser.json());

router.get('/', async (req, res) => {
    try {
        const assessments = await getAssessments(req);
        res.render('assessments-page', { assessments });
    } catch (error) {
        res.status(500).send('Unexpected Error');
    }
});

router.get('/assessment/:id', async (req, res) => {
    try {
        const assessment = await getAssessmentById(req.params.id, req);
        res.render('assessment-detail-page', { assessment });
    } catch (error) {
        res.status(500).send('Unexpected Error');
    }
});

// UIs to add new assessments, sections, questions and answers

router.get('/add/section/:assessmentId', async (req, res) => {
    try {
        const assessment = await getAssessmentById(req.params.assessmentId, req);
        res.render('add-section-page', { assessment });
    } catch (error) {
        res.status(500).send('Unexpected Error');
    }
});

router.get('/add/assessment/', async (req, res) => {
    try {
        const assessments = await getAssessments(req);
        res.render('add-assessment-page', { assessments });
    } catch (error) {
        res.status(500).send('Unexpected Error');
    }
});

router.get('/add/question/:sectionId', async (req, res) => {
    try {
        const section = await getSectionById(req.params.sectionId, req);
        res.render('add-question-page', { section });
    } catch (error) {
        res.status(500).send('Unexpected Error');
    }
});


router.get('/add/answer/:questionId', async (req, res) => {
    try {
        const question = await getQuestionById(req.params.questionId, req);
        res.render('add-answer-page', { question });
    } catch (error) {
        res.status(500).send('Unexpected Error');
    }
});

module.exports = router