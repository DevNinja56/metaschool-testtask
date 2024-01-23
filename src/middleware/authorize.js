const { validationResult } = require('express-validator');

const isAdmin = (req, res, next) => {
    const { email } = req.body;
    if(email?.trim() != 'admin@metaschool.co'){
        return res.status(400).json({ message: "Only admin is allowed" });
    }
    next()
}

const handleRequestValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {isAdmin, handleRequestValidation}