const jwt = require("jsonwebtoken")
const config = require("../config/auth.config.js")
const db = require("../models")
const { USER } = require("../config/db.config.js")
const User = db.user

verifyToken = (req, res, next) => {
    let token = req.session.token

    if(!token) {
        return res.status(403).send({
            message: "No Token provided!"
        })
    }

    jwt.verify(token,
        config.secret,
        (err, decoded) => {
            if(err){
                return res.status(401).send({
                    message: "Unauthorized!"
                })
            }
            next()
            req.userId = decoded.id
            // res.status(200).send({
            //     message:"Autorizado"
            // })
        })
}

isAdmin = (req, res, next) => {

    try {

      const user = User.findByPk(req.userId);
      const roles = user.getRoles();

      console.log(roles)

      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          return next();
        }
      }
  
      return res.status(403).send({
        message: "Require Admin Role!",
      });
    } catch (error) {
      return res.status(500).send({
        message: "Unable to validate User role!",
      });
    }
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
}

module.exports = authJwt