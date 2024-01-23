const addAssessment = async (req) => {
    const { Assessment } = req.app.get('models')
    const { title } = req.body;
    const assessment = await Assessment.create({ title });
    return assessment;
}

const addSection = async (req) => {
    const { Assessment, Section } = req.app.get('models')
    const { assessmentId } = req.params;
    const { title } = req.body;
    const assessment = await Assessment.findByPk(assessmentId);
    if (!assessment) {
        throw 'No Assessment Found Against Given Id'
    }

    const section = await Section.create({ title });
    await assessment.addSection(section);
    return section
}

const addQuestion = async (req) => {
    const { Section } = req.app.get('models')
    const { sectionId } = req.params;
    const { questionContent, type } = req.body;
    const section = await Section.findByPk(sectionId);
    if (!section) {
        throw 'No Section Found Against Given Id';
    }
    const question = await section.createQuestion({ question: questionContent, type });
    return question;
}


const addAnswer = async (req) => {
    const { Question, Answer } = req.app.get('models')
    const { questionId } = req.params;
    const { answerContent, isCorrect } = req.body;
    const question = await Question.findByPk(questionId);
    if (!question) {
        throw 'No Question Found Against Given Id';
    }

    const { count: answersCount, rows: answers } = await Answer.findAndCountAll({
        where: {
            QuestionId: questionId,
        },
    });
    if (answersCount >= 4) {
        throw 'A Question can have 4 answers maximum';
    }
    const answer = await question.createAnswer({ answer: answerContent, isCorrect });
    return answer;
}

module.exports = { addAssessment, addSection, addQuestion, addAnswer };