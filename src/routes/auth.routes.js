const {verifySingUp} = require("../middleware")
const controller = require("../controllers/auth.controller")

module.exports = function(app){
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        )
        next()
    })

    app.post("/api/auth/signup",
        [
            verifySingUp.checkDuplicateUsernameOrEmail,
            verifySingUp.checkRolesExisted
        ],
        controller.singup
    )

    app.post("/api/auth/signin", controller.singin)
    
    app.post("/api/auth/signout", controller.signout)
}