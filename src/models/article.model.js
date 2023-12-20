module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("articles", {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      titulo: {
        type: Sequelize.STRING
      },
      dias_uso: {
        type: Sequelize.INTEGER
      },
      costo: {
        type: Sequelize.INTEGER
      },
      ejercicios: {
        type: Sequelize.STRING
      },
      cant_ejer: {
        type: Sequelize.INTEGER
      },
      tiempo_ejer: {
        type: Sequelize.INTEGER
      },
      acceso_maquinas: {
        type: Sequelize.STRING
      },
      consejos_nutr: {
        type: Sequelize.STRING
      },
      agenda_semanal: {
        type: Sequelize.STRING
      },
      horario_per: {
        type: Sequelize.STRING
      },
      eventos: {
        type: Sequelize.STRING
      },
      proteina: {
        type: Sequelize.STRING
      },
      clases_per: {
        type: Sequelize.STRING
      }
    });
  
  return Article;
};