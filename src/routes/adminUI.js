const express = require('express')
const bodyParser = require('body-parser');
const { isAdmin, handleRequestValidation } = require('../middleware/authorize')
const { check } = require('express-validator');
const { addAnswer, addQuestion, addSection, addAssessment } = require('../utils/adminUtils');


const router = express.Router();
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: false }))


router.post(
    '/assessments',
    isAdmin,
    [
        check('title').notEmpty().withMessage('Title is required'),
    ],
    handleRequestValidation,
    async (req, res) => {
        try {
            await addAssessment(req);
            return res.redirect(303, '/add/assessment');
        } catch (error) {
            return res.status(500).json({ error: 'Unexpected Error' });
        }
    }
);

router.post(
    '/assessments/:assessmentId/sections',
    isAdmin,
    [
        check('title').notEmpty().withMessage('Title is required'),
    ],
    handleRequestValidation,
    async (req, res) => {
        try {
            await addSection(req);
            return res.redirect(303, '/add/section/'+ req.params.assessmentId);
        } catch (error) {
            return res.status(500).json({ error: 'Unexpected Error' });
        }
    }
);

router.post(
    '/sections/:sectionId/questions',
    isAdmin,
    [
        check('questionContent').notEmpty().withMessage('Question is required'),
        check('type').isIn(['MCQ', 'MSQ']).withMessage('Type must be MCQ or MSQ'),
    ],
    handleRequestValidation,
    async (req, res) => {
        try {
            await addQuestion(req);
            return res.redirect(303, '/add/question/' + req.params.sectionId);
        } catch (error) {
            return res.status(500).json({ error: 'Unexpected Error' });
        }
    }
);

router.post(
    '/questions/:questionId/answers',
    isAdmin,
    [
        check('answerContent').notEmpty().withMessage('Answer is required'),
    ],
    handleRequestValidation,
    async (req, res) => {
        try {
            req.body.isCorrect = req.body.isCorrect == 'on' ? true : false; 
            await addAnswer(req);
            return res.redirect(303, '/add/answer/' + req.params.questionId);
        } catch (error) {
            return res.status(500).json({ error});
        }
    }
);

module.exports = router;