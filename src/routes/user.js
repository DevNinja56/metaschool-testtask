const express = require('express')
const bodyParser = require('body-parser');
const { handleRequestValidation } = require('../middleware/authorize')
const { check } = require('express-validator');
const { getAssessments } = require('../utils/userUtils');

const router = express.Router();
router.use(bodyParser.json());


router.get('/assessments', async (req, res) => {
    try {
        const assessments = await getAssessments(req)
        return res.json({ assessments });
    } catch (error) {
        return res.status(500).json({ error: 'Unexpected Error' });
    }
});

router.post(
    '/attempts',
    [
        check('email').notEmpty().withMessage('Email is required'),
        check('assessmentId').notEmpty().withMessage('Assessment Id is required'),
    ],
    handleRequestValidation,
    async (req, res) => {
        try {
            const { Assessment, User } = req.app.get('models')
            const { email, assessmentId } = req.body;

            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(404).json({ error: 'User does not exist' });
            }

            const assessment = await Assessment.findOne({ where: { id: assessmentId } });

            if (!assessment) {
                return res.status(404).json({ error: 'Assessment does not exist' });
            }

            const existingAttempt = await UserAssessment.findOne({
                where: { userId: user.id, assessmentId },
            });

            if (existingAttempt) {
                return res.status(400).json({ error: 'User has already attempted this assessment' });
            }

            await UserAssessment.create({ userId: user.id, assessmentId, attemptedAt: new Date() });

            return res.status(201).json({ success: true });
        } catch (error) {
            return res.status(500).json({ error: 'Unexpected Error' });
        }
    });

    module.exports = router