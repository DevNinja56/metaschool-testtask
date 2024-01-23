const { Assessment, Section, Question, Answer, User } = require('../model');

/* WARNING THIS WILL DROP THE CURRENT DATABASE */
seed();

async function seed() {
  // create tables
  await Assessment.sync({ force: true });
  await Section.sync({ force: true });
  await Question.sync({ force: true });
  await Answer.sync({ force: true });
  await User.sync({ force: true });
  //insert data
  await Promise.all([
    User.create({
      user_id: 1,
      email: 'admin@metaschool.so'
    }),
    User.create({
      user_id: 2,
      email: 'student_user_1@metaschool.so'
    }),
    User.create({
      user_id: 3,
      email: 'student_user_2@metaschool.so'
    }),
    Assessment.create({
      title: "Sample Assessment",
    }),
    Section.create({
      title: "Sample Section",
      AssessmentId: 1
    }),
    Question.create({
      question: "Sample Question",
      type: "MCQ",
      SectionId: 1
    }),
    Answer.create({
      answer: "Sample Answer 1",
      isCorrect: true,
      QuestionId: 1
    }),
    Answer.create({
      answer: "Sample Answer 2",
      isCorrect: false,
      QuestionId: 1
    }),
  ]);
}
