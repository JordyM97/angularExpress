module.exports = app => {
    const Visita = require("../controllers/Visita.js");
    const middleware =  require("../middlewares/middleware.js")
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", Visita.create);
    // Retrieve all Tutorials
    router.get("/", Visita.findAll);
  
    // Retrieve all published Tutorials
  
    // Retrieve a single Tutorial with id
    router.get("/:id", Visita.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", Visita.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", Visita.delete);
  
    // Delete all Tutorials
    router.delete("/", Visita.deleteAll);

// Descomentar para cuando ya tengas valores y quieras verificar
// el token del user 

    app.use('/api/visita',router);
    //app.use('/api/productos',router);
  };