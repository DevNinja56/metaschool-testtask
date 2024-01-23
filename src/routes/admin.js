const express = require('express')
const bodyParser = require('body-parser');
const { isAdmin, handleRequestValidation } = require('../middleware/authorize')
const { check } = require('express-validator');
const { addAnswer, addQuestion, addSection, addAssessment } = require('../utils/adminUtils');


const router = express.Router();
router.use(bodyParser.json());


router.post(
    '/assessments',
    isAdmin,
    [
        check('title').notEmpty().withMessage('Title is required'),
    ],
    handleRequestValidation,
    async (req, res) => {
        try {
            const assessment = await addAssessment(req);
            return res.status(201).json({ assessment });
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
            const section = await addSection(req);
            return res.status(201).json({ section });
        } catch (error) {
            return res.status(500).json({ error: 'Unexpected Error' });
        }
    }
);

router.post(
    '/sections/:sectionId/questions',
    isAdmin,
    [
        check('question').notEmpty().withMessage('Question is required'),
        check('type').isIn(['MCQ', 'MSQ']).withMessage('Type must be MCQ or MSQ'),
    ],
    handleRequestValidation,
    async (req, res) => {
        try {
            const question = await addQuestion(req);
            return res.status(201).json({ question });
        } catch (error) {
            return res.status(500).json({ error: 'Unexpected Error' });
        }
    }
);

router.post(
    '/questions/:questionId/answers',
    isAdmin,
    [
        check('answer').notEmpty().withMessage('Answer is required'),
        check('isCorrect').isBoolean().withMessage('isCorrect must be a boolean'),
    ],
    handleRequestValidation,
    async (req, res) => {
        try {
            const answer = await addAnswer(req);
            return res.status(201).json({ answer });
        } catch (error) {
            return res.status(500).json({ error: 'Unexpected Error' });
        }
    }
);

router.get('/user-attempts/:userId', isAdmin, async (req, res) => {
    try {
        const { Assessment, UserAssessment } = req.app.get('models')
        const { userId } = req.params;

        const user = await User.findOne({ where: { userId } });

        if (!user) {
            return res.status(404).json({ error: 'User does not exist' });
        }

        const userAttempts = await UserAssessment.findAll({
            where: { userId: user.id },
            include: [
                {
                    model: Assessment,
                    attributes: ['title'],
                },
            ],
            attributes: ['attemptedAt'],
        });

        const results = userAttempts.map((attempt) => ({
            title: attempt.Assessment.title,
            attemptTime: attempt.createdAt,
        }));

        return res.json({ results });
    } catch (error) {
        return res.status(500).json({ error: 'Unexpected Error' });
    }
});

module.exports = router