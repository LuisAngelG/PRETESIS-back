const { Sequelize } = require("sequelize");
const config = require("../config/db.config.js");


const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
)

const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

db.user = require("../models/user.model.js")(sequelize,Sequelize)
db.role = require("../models/role.model.js")(sequelize,Sequelize)
db.article = require("./article.model.js")(sequelize,Sequelize)

db.role.belongsToMany(db.user, {
    through: "user_roles"
})

db.user.belongsToMany(db.role, {
    through: "user_roles"
})

//NO IMPLEMENTAR HAY ERRORES
// db.articule.belongsToMany(db.user, {
//     through: "user_articles"
// })

// db.user.belongsToMany(db.articule, {
//     through: "user_articles"
// })

db.user.hasMany(db.article, {
    foreignKey: 'articleId',
    sourceKey: 'id'
})

db.article.belongsTo(db.user, {
    foreignKey: 'articleId',
    sourceKey: 'id'
})

db.ROLES = ["user", "admin"]
// db.ARTICLES = ["BASICO", "MEDIO", "AVANZADO"]

module.exports = db