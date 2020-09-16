

const sendmail = require("../mail");
const db = require("../models");
const Contacto = db.contacto;
const Op = db.Sequelize.Op;
// Create and Save a new 
exports.create = (req, res) => {
    // Validate request
    if (!req.body.Nombre) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Categoria
    const contacto = {
      Nombre: req.body.Nombre,
      Apellido: req.body.Apellido,
      Email: req.body.Email,
      Birth: req.body.Birth,
      Genero: req.body.Genero,
      Categoria: req.body.Categoria,
      Mensaje: req.body.Mensaje
    };
  
    // Save Tutorial in the database
    Contacto.create(contacto)
      .then(data => {
        const {Email,Categoria,Mensaje} = req.body;
        console.log(Email,Categoria,Mensaje)
        sendmail(Email,Categoria,Mensaje, (err,data)=>{
          if (err) {
            res.status(500).json({message: 'Internal error'})
          }else{
            res.json({message: 'email sent'});
          }
        });
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating categoria."
        });
      });
  };

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    
  Contacto.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving usuaruio."
        });
      });
  };

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Contacto.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with cedula=" + id
        });
      });
  };

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Contacto.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Contacto was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Contacto with cedula=${id}. Maybe Tutorial was not found or req.body is empty!`
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
  
    Contacto.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Contacto was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Contacto with id=${id}. Maybe Tutorial was not found!`
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
  Contacto.destroy({
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
