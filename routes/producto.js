module.exports = app => {
    const productos = require("../controllers/Producto.js");
    const middleware =  require("../middlewares/middleware.js")
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", productos.create);
    // Retrieve all Tutorials
    router.get("/", productos.findAll);
    router.post("/sell", productos.sell);
    // Retrieve all published Tutorials
  
    // Retrieve a single Tutorial with id
    router.get("/:id", productos.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", productos.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", productos.delete);
  
    // Delete all Tutorials
    router.delete("/", productos.deleteAll);

// Descomentar para cuando ya tengas valores y quieras verificar
// el token del user 

    //app.use('/api/productos', middleware.checktoken,router);
    app.use('/api/productos',router);
  };