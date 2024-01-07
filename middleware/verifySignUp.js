const User = require( "../models" ).User;

const checkForDuplicateEmail = (req, res, next) => {
  User
    .findOne({ 
        where: { 
            email: req.body.email
        }
    })
    .then(user => {
        if(user) {
            return res.status(400).send({ 
                message: "Email already taken" 
            });
        }
        next();
    });
}
module.exports = { checkForDuplicateEmail };