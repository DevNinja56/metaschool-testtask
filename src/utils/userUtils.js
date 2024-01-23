const { Sequelize } = require("sequelize");

const getAssessments = async (req) => {
    const { Assessment, Section, Question, Answer } = req.app.get('models')
    const assessments = await Assessment.findAll({
        include:
        {
            model: Section,
            as: 'Sections',
            attributes: ['id', 'title'],
            include: 
            { 
                model: Question,
                as: 'Questions',
                attributes: ['question', 'type'],
                include: 
                { 
                    model: Answer,
                    as: 'Answers',
                    attributes: ['answer', 'isCorrect']
                }
            }
        },
    });
    return assessments
}

const getAssessmentById = async (assessmentId, req) => {
    const { Assessment, Section, Question, Answer } = req.app.get('models')
    const assessment = await Assessment.findOne({ where: { id: assessmentId }, 
        include:
        {
            model: Section,
            as: 'Sections',
            attributes: ['id', 'title'],
            include: 
            { 
                model: Question,
                as: 'Questions',
                attributes: ['question', 'type'],
                include: 
                { 
                    model: Answer,
                    as: 'Answers',
                    attributes: ['answer', 'isCorrect']
                }
            }
        },
    });
    return assessment
}

const getSectionById = async (sectionId, req) => {
    const { Section, Question, Answer } = req.app.get('models')
    const section = await Section.findOne({ where: { id: sectionId }, 
        include: 
        {
            model: Question,
            as: 'Questions',
            attributes: ['id', 'question', 'type'],
            include: 
            { 
                model: Answer,
                as: 'Answers',
                attributes: ['answer', 'isCorrect']
            }
        }
    });
    return section
}

const getQuestionById = async (questionId, req) => {
    const { Question, Answer } = req.app.get('models')
    const question = await Question.findOne({ where: { id: questionId }, 
        include: 
        { 
            model: Answer,
            as: 'Answers',
            attributes: ['id', 'answer', 'isCorrect']
        }
    });
    return question
}


module.exports = { getAssessments, getAssessmentById, getSectionById, getQuestionById }