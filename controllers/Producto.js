const db = require("../models");
const Producto = db.producto;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.Nombre) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    const producto = {
      Nombre: req.body.Nombre,
      Categoria: req.body.Categoria,
      Costo: req.body.Costo,
      Stock: req.body.Stock,
      Img: req.body.Img,
      CntVentas: req.body.CntVentas
    };
  
    // Save Tutorial in the database
    Producto.create(producto)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating Producto."
        });
      });
  };

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const Nombre = req.query.Nombre;
    var condition = Nombre ? { Nombre: { [Op.like]: `%${Nombre}%` } } : null;
  
    Producto.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving producto."
        });
      });
  };

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const Nombre = req.params.id;
  
    Producto.findByPk(Nombre)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with cedula=" + Nombre
        });
      });
  };
exports.sell =(req,res)=>{
  const id ={
    "id": req.body.id
  }
  Producto.increment({'CntVentas':1 , 'Stock':-1}, {by: 1,where:{ id: id.id}})
  .then(num =>{
    res.send(num)
  }).catch(err => {
    res.status(500).send({
      message: "Error "
    });
  });
}
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Producto.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with cedula=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating usuario with id=" + id
        });
      });
  };

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Producto.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  };

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Producto.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Tutorials were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
  };
