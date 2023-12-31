const db = require("../models")
const ROLES = db.ROLES
const User = db.user

checkDuplicateUsernameOrEmail = (req, res, next) => {
    //username
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user){
            res.status(400).send({
                message: "Failed! Username alredy is use!"
            })
            return
        }
        
        //Email
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user){
                res.status(400).send({
                    message: "Failed! Email alredy is use!"
                })
                return
            }
            next()
        })
    })
}

checkRolesExisted = (req, res, next) => {
    if(req.body.roles){
        for(let i = 0; i < req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                })
                return
            }
        }
    }

    next()
}

const verifySingUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
}

module.exports = verifySingUp