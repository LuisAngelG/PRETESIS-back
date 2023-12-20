//Para poder listar por suscripciones del usuario
const { Articule } = require("../models/article.model");
const db = require("../models")
const Articles = db.article;
const User = db.user;

const allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

const userBoard = (req, res) => {
  res.status(200)
};

const adminBoard = (req, res) => {
  res.status(200)
};

const getUserArticles = (req,res) => {
  id = req.params.id
  Articles.findAll({
      where:{
          articleId: id
      }
    }).then(articles => {
      res.status(200).json(articles);
    }).catch((error) => {
      console.log("FALLO AL MOMENTO DE MOSTRAR")
    })

}

module.exports = {
    allAccess,
    userBoard,
    adminBoard,
    getUserArticles
}