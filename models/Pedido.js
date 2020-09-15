module.exports = (sequelize, Sequelize) => {
    const Pedido = sequelize.define("Pedido", {
      Cantidad:{
        type: Sequelize.INTEGER
      },
      Precio: {
        type: Sequelize.FLOAT
      },
      Producto: {
        type: Sequelize.INTEGER
      }
      
    });
  
  

  
    return Pedido;
    
  };