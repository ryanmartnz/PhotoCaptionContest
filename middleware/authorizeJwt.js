const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');

function verifyToken(req, res, next) {
  let token = req.cookies.token;

  if(!token) {
    return res.status(403).send({ 
      message: "No token provided" 
    });
  }

  jwt.verify(token, config.secret, (error, decoded) => {
    if(error) {
      return res.status(401).send({ 
        message: "Unauthorized" 
      });
    }
    req.curUserId = decoded.id;
    next();
  });
}

module.exports = {
  verifyToken: verifyToken
};