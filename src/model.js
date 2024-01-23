const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3'
});



class UserAssessment extends Sequelize.Model {}
UserAssessment.init(
  {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    assessmentId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    attemptedAt: {
      type: Sequelize.TIME,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'UserAssessment',
  }
);

class Assessment extends Sequelize.Model {
  static associate(models) {
    this.belongsToMany(models.User, {
      through: UserAssessment,
      foreignKey: 'assessmentId',
    });
  }
}
Assessment.init(
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Assessment'
  }
);

class Section extends Sequelize.Model {}
Section.init(
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Section'
  }
);

class Question extends Sequelize.Model {}
Question.init(
  {
    question: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type:{
      type: Sequelize.ENUM('MCQ', 'MSQ'),
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Question'
  }
);

class Answer extends Sequelize.Model {}
Answer.init(
  {
    answer: {
      type: Sequelize.STRING,
      allowNull: false
    },
    isCorrect:{
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Answer'
  }
);

class User extends Sequelize.Model {
  static associate(models) {
    this.belongsToMany(models.Assessment, {
      through: UserAssessment,
      foreignKey: 'userId',
    });
  }
}
User.init(
  {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    email:{
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'User'
  }
);


Assessment.hasMany(Section, {as :'Sections',foreignKey:'AssessmentId'})
Section.belongsTo(Assessment, {as: 'Assessment'})

// Assessment.hasMany(User, {as :'Users',foreignKey:'UserId'})
// User.belongsTo(Assessment, {as: 'Assessment'})

// User.hasMany(Assessment, {as :'Assessments',foreignKey:'AssessmentId'})
// Assessment.belongsTo(User, {as: 'User'})

Section.hasMany(Question, {as :'Questions',foreignKey:'SectionId'})
Question.belongsTo(Section, {as: 'Section'})


Question.hasMany(Answer, {as :'Answers',foreignKey:'QuestionId'})
Answer.belongsTo(Question, {as: 'Question'})


module.exports = {
  sequelize,
  Assessment,
  Section,
  Question,
  Answer,
  User,
  UserAssessment
};
