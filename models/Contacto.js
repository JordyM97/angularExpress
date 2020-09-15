module.exports = (sequelize, Sequelize) => {
    const Contacto = sequelize.define("Contacto", {
      Nombre: {
        type: Sequelize.STRING
      },
      Apellido: {
        type: Sequelize.STRING
      },
      Email: {
          type: Sequelize.STRING
      },
      Birth: {
        type: Sequelize.DATE
      },
      Genero: {
        type: Sequelize.STRING
      },
      Categoria: {
        type: Sequelize.STRING
      },
      Mensaje: {
      type: Sequelize.STRING,
   }

    });
    
    return Contacto;
  };