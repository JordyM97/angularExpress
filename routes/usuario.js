module.exports = app => {
    const usuarios = require("../controllers/usuario.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", usuarios.create);
    router.post("/login",usuarios.login);
    // Retrieve all Tutorials
    router.get("/", usuarios.findAll);
    router.get("/pedidos/:id", usuarios.finUserPedidos);
    // Retrieve all published Tutorials
    router.get("/Admin", usuarios.findAllAdmins);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", usuarios.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", usuarios.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", usuarios.delete);
  
    // Delete all Tutorials
    router.delete("/", usuarios.deleteAll);
  
    app.use('/api/usuario', router);
  };