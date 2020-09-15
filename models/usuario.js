
module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("Usuario", {
      Cedula: {
        type: Sequelize.STRING,
        unique: true
      },
      Token:{
        type: Sequelize.STRING
      },
      Nombre: {
        type: Sequelize.STRING
      },
      Apellido: {
        type: Sequelize.STRING
      },
      Email: {
          type: Sequelize.STRING
      },
      Username: {
        type: Sequelize.STRING
      },
      Password: {
        type: Sequelize.STRING
      },
      Tipo: {
        type: Sequelize.STRING,
        defaultValue: "Cliente"
     }

    });
    
    
    return Usuario;
  };