const User = require('../models').User;
const bcrypt = require('bcrypt');

const signIn = (req, res) => {
    const signInError = { accessToken: null, message: "Invalid email or password" }; 
    return User
        .findOne({ 
            where: { 
                email: req.body.email 
            }
        })
        .then(user => {
            if(!user) {
                return res.status(400).send(signInError);
            }
            const validPassword = bcrypt.compareSync(req.body.password, user.password);
            if(!validPassword) {
                return res.status(400).send(signInError);
            }
            const token = user.generateToken();
            res.cookie('token', token, {
                secure: true,
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 1000
            });
            return res.status(200).send({ 
                id: user.id, 
                name: user.name,
                email: user.email,
                accessToken: token 
            });
        })
        .catch(error => res.status(500).send({
            message: error.message
        }));
}

const signOut = (req, res) => {
    try {
        delete res.clearCookie("token");
        delete req.curUserId;
        res.status(200).send({
            message: "You have successfully logged out!"
        });
    } catch(error) {
        res.status(500).send(error);
    }
}

module.exports = {
    signIn,
    signOut
}