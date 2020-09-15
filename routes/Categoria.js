module.exports = app => {
    const Categoria = require("../controllers/Categoria.js");
    const middleware =  require("../middlewares/middleware.js")
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", Categoria.create);
    // Retrieve all Tutorials
    router.get("/", Categoria.findAll);
  
    // Retrieve all published Tutorials
  
    // Retrieve a single Tutorial with id
    router.get("/:id", Categoria.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", Categoria.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", Categoria.delete);
  
    // Delete all Tutorials
    router.delete("/", Categoria.deleteAll);

// Descomentar para cuando ya tengas valores y quieras verificar
// el token del user 

    app.use('/api/categoria', middleware.checktoken,router);
    //app.use('/api/productos',router);
  };