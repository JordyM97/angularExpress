module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define("Producto", {
      Nombre: {
        type: Sequelize.STRING
      },
      Categoria: {
        type: Sequelize.INTEGER
      },
      Costo: {
        type: Sequelize.FLOAT
      },
      Pedido: {
        type: Sequelize.INTEGER
      },
      Stock: {
        type: Sequelize.FLOAT
      },
      Img: {
        type: Sequelize.STRING
      },
      CntVentas: {
        type: Sequelize.FLOAT
      }
    });
  
    return Producto;
  };