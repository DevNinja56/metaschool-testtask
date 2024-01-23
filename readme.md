# Assessment System

This is a full stack project according to the requirements in test task. Project is build using Node JS, Express, EJS and Sequelize. Database used is sqlite.


## Setup Guide

- Clone or Download the project
- Open terminal and run command `npm install`
- Run `npm run seed`. This will setup DB with dummy users and assessment data
- After that run `npm start` to start the project.
- Go to `localhost:3000` on browser.


## Flow Guide

The project contains basic UI to interact with the backend APIs. Following are the frontend URLs and Details

- http://localhost:3000/. Page to List all assessments. Also you can click on any assessment and it will take you to **Assessment Detail Page**, which includes all sections, questions and answers of that assessment
- http://localhost:3000/add/assessment. Page to see all assessments and add new assessments. 
- http://localhost:3000/add/section/:assessmentId. Page to see all sections of an assessment and add new section.
- http://localhost:3000/add/question/:sectionId. Page to see all questions of a section and add new question.
- http://localhost:3000/add/answer/:questionId. Page to see all answers of a question and add new answer.

The above `/add` endpoints takes email in the input as well to make sure that only admin could add these. The email must be `admin@metaschool.co` to enable these flows


## Backend APIs

Following is the list of APIs which are included in the Node Express server to enable the functionalities

APIs to add new records.

    - /admin/assessments [POST]
    - /admin/assessments/:assessmentId/section [POST]
    - /admin/sections/:sectionId/questions [POST]
    - /admin/questions/:questionId/answers [POST]

APIs related to assessment attempt

    Get all attempts of given user
    - /admin/user-attempts/:userId [GET]

    Takes assessmentId and userEmail and mark the assessment as attempted by given user.
    - /user/attempts [POST]


APIs to get assessment and its details

    Get all assessments
    - /users/assessments [GET]

    Get assessment details of given Id
    - /assessment/:id [GET]