const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./model');
const path = require('path');


const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


const adminRoute = require("./routes/admin")
const userRoute = require("./routes/user")
const uiRoute = require("./routes/ui")
const adminUIRoute = require("./routes/adminUI")

app.use('/admin', adminRoute)
app.use('/user', userRoute)
app.use('/', uiRoute)
app.use('/form', adminUIRoute)

module.exports = app;
