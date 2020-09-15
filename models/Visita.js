

module.exports = (sequelize, Sequelize) => {
    const Visita = sequelize.define("Visita", {
      Contador: {
        type: Sequelize.INTEGER
      },
      Pagina: {
          type: Sequelize.STRING
      },Usuario:{
        type: Sequelize.STRING
      }
    });
    
    return Visita;
  };