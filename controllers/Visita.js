const db = require("../models");
const Visita = db.visita;
const Op = db.Sequelize.Op;

// Create and Save a new 
exports.create = (req, res) => {
    // Validate request
    if (!req.body.Pagina) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Categoria
    const categoria = {
      Contador: req.body.Contador,
      Pagina: req.body.Pagina,
      User: req.body.User
    };
  
    // Save Tutorial in the database
    Visita.create(categoria)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating Visita."
        });
      });
  };

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    
  Visita.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Visita."
        });
      });
  };

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Visita.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Visita with id=" + id
        });
      });
  };

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Visita.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with Visita=${id}. Maybe Visita was not found or req.body is empty!`
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
  
    Visita.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Visita was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Visita with id=${id}. Maybe Visita was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Visita with id=" + id
        });
      });
  };

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Visita.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Visita were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Visita."
        });
      });
  };
