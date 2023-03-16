const User = require('../models/user.model');

const checkEmail =  (req, res, next) => {
    const { email, userRole } = req.body;
    User.findByEmail(email, userRole, (_, data) => {
        if (data) {
            res.status(400).send({
                status: 'error',
                message: `A user with email address '${email}' already exits`
            });
            return;
        }
        next();
    });
}

module.exports = checkEmail;