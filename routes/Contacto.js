module.exports = app => {
    const Contacto = require("../controllers/Contacto.js");
    const middleware =  require("../middlewares/middleware.js")
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", Contacto.create);
    // Retrieve all Tutorials
    router.get("/", Contacto.findAll);
  
  
    // Retrieve a single Tutorial with id
    router.get("/:id", Contacto.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", Contacto.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", Contacto.delete);
  
    // Delete all Tutorials
    router.delete("/", Contacto.deleteAll);

// Descomentar para cuando ya tengas valores y quieras verificar
// el token del user 

    app.use('/api/contacto',router);
    //app.use('/api/productos',router);
  };