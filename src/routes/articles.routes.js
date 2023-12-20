const {verifySingUp} = require("../middleware")
const { authJwt } = require("../middleware");
const controller = require("../controllers/article.controller")
const controller2 = require("../controllers/payment.controller")

module.exports = function(app){

    app.use(function(req,res,next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        )
        next()
    })
    
    app.get("/api/test/articles", controller.getArticle)
    app.post("/api/test/articles", [authJwt.verifyToken], controller.postArticle)
    app.post("/api/test/articles", [authJwt.verifyToken, authJwt.isAdmin], controller.postArticleAdmin)
    app.put("/api/test/articles:id", [authJwt.verifyToken, authJwt.isAdmin], controller.putArticle)
    app.delete("/api/test/articles:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteArticle)

    app.post("/create-order", [authJwt.verifyToken], controller2.createOrder);
    app.get("/success", [authJwt.verifyToken], controller2.success)
    app.get("/failure", [authJwt.verifyToken], controller2.failure)
    app.get("/pending", [authJwt.verifyToken], controller2.pending)
    app.post("/webhook", [authJwt.verifyToken], controller2.webhook)
}