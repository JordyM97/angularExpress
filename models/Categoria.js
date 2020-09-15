module.exports = (sequelize, Sequelize) => {
    const Categoria = sequelize.define("Categoria", {
      Detalle: {
        type: Sequelize.STRING
      }
    });
  
    return Categoria;
  };