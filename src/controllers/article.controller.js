const { Articule } = require("../models/article.model");
const db = require("../models")
const Articles = db.article;

const getArticle = (req, res) => {
  Articles.findAll()
    .then((articles) => {
      res.status(200).json(articles);
    })
    .catch((error) => {
      console.error('Error al obtener los artículos:');
      res.status(500).json({ message: 'Ocurrió un error al obtener los artículos' });
    });
};

//CREACION DE ARTICULOS PARA EL ADMIN
const postArticle = (req,res) => {
  Articles.create({
    titulo: req.body.titulo,
    dias_uso: req.body.dias_uso,
    costo:req.body.costo,
    ejercicios: req.body.ejercicios,
    cant_ejer: req.body.cant_ejer,
    tiempo_ejer: req.body.tiempo_ejer,
    acceso_maquinas: req.body.acceso_maquinas,
    consejos_nutr: req.body.consejos_nutr,
    agenda_semanal: req.body.agenda_semanal,
    horario_per: req.body.horario_per,
    eventos: req.body.eventos,
    proteina: req.body.proteina,
    clases_per: req.body.clases_per,
    articleId: req.body.articleId
  }).then((articles) => {
    res.status(200).json(articles);
  })
  .catch((error) => {
    console.error('Error al crear los artículos:');
    res.status(500).json({ message: 'Ocurrió un error al crear los artículos' });
  });
}

//CREACION DE ARTICULOS PARA EL ADMIN
const postArticleAdmin = (req,res) => {
  Articles.create({
    titulo: req.body.titulo,
    dias_uso: req.body.dias_uso,
    costo:req.body.costo,
    ejercicios: req.body.ejercicios,
    cant_ejer: req.body.cant_ejer,
    tiempo_ejer: req.body.tiempo_ejer,
    acceso_maquinas: req.body.acceso_maquinas,
    consejos_nutr: req.body.consejos_nutr,
    agenda_semanal: req.body.agenda_semanal,
    horario_per: req.body.horario_per,
    eventos: req.body.eventos,
    proteina: req.body.proteina,
    clases_per: req.body.clases_per,
    articleId: null
  }).then((articles) => {
    res.status(200).json(articles);
  })
  .catch((error) => {
    console.error('Error al crear los artículos:');
    res.status(500).json({ message: 'Ocurrió un error al crear los artículos' });
  });
}

//ACTUALIZACION DE ARTICULOS PARA EL ADMIN
const putArticle = (req,res) => {

  const id = req.params.id;

  Articles.update({
    titulo: req.body.titulo,
    dias_uso: req.body.dias_uso,
    costo:req.body.costo,
    ejercicios: req.body.ejercicios,
    cant_ejer: req.body.cant_ejer,
    tiempo_ejer: req.body.tiempo_ejer,
    acceso_maquinas: req.body.acceso_maquinas,
    consejos_nutr: req.body.consejos_nutr,
    agenda_semanal: req.body.agenda_semanal,
    horario_per: req.body.horario_per,
    eventos: req.body.eventos,
    proteina: req.body.proteina,
    clases_per: req.body.clases_per,
    articleId: req.body.articleId
  },{
    where: {
      id: id
    }
  }).then((result) => {
    if (result[0] === 1) {
      res.status(200).json({ message: 'Artículo actualizado con éxito' });
    } else {
      res.status(404).json({ message: 'Artículo no encontrado' });
    }
  })
  .catch((error) => {
    console.error('Error al actualizar el artículo:', error);
    res.status(500).json({ message: 'Ocurrió un error al actualizar el artículo' });
  });
};

//ELIMINACION DE ARTICULOS PARA EL ADMIN
const deleteArticle = (req,res) => {

  const id = req.params.id;

  Articles.destroy({
    where: {
      id: id
    }
  }).then((result) => {
    if (result === 1) {
      res.status(200).json({ message: 'Artículo eliminado con éxito' });
    } else {
      res.status(404).json({ message: 'Artículo no encontrado' });
    }
  })
  .catch((error) => {
    console.error('Error al eliminar el artículo:', error);
    res.status(500).json({ message: 'Ocurrió un error al eliminar el artículo' });
  });
};


module.exports = {
  getArticle,
  postArticle,
  postArticleAdmin,
  putArticle,
  deleteArticle
};
