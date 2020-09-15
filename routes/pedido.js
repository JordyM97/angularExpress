module.exports = app => {
    const pedidos = require("../controllers/Pedido.js");
    const middleware =  require("../middlewares/middleware.js")
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", pedidos.create);
    // Retrieve all Tutorials
    router.get("/", pedidos.findAll);
  
    // Retrieve all published Tutorials
  
    // Retrieve a single Tutorial with id
    router.get("/:id", pedidos.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", pedidos.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", pedidos.delete);
  
    // Delete all Tutorials
    router.delete("/", pedidos.deleteAll);

// Descomentar para cuando ya tengas valores y quieras verificar
// el token del user 

    //app.use('/api/pedidos', middleware.checktoken,router);
    app.use('/api/pedido',router);
  };