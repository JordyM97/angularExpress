const db = require("../models");
const Usuario = db.usuarios;
const Op = db.Sequelize.Op;
const bcrypt= require('bcryptjs'); //hash 
const jwt = require('jwt-simple'); //token
const moment = require('moment'); //tiempo
// Create and HAsh  
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.Cedula) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    req.body.Password=bcrypt.hashSync(req.body.Password,10);
    let usuario = {
      Cedula: req.body.Cedula,
      Token: req.body.Token,
      Nombre: req.body.Nombre,
      Apellido: req.body.Apellido,
      Email: req.body.Email,
      Username: req.body.Username,
      Password: req.body.Password,
      Tipo:req.body.Tipo
    };
  
    Usuario.create(usuario)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating uuariio."
        });
      });
  };


//auth and login

  const createToken = (usuario)=>{
    //metodo para generar el token
    const payload= {
      usuarioId : usuario.id,
      createdAt: moment().unix(),
      expiredAt: moment().add(15, 'minutes').unix()
    }
    return jwt.encode(payload, 'secreto');
  }


exports.login = async (req,res) => {
  let usuario = await  Usuario.findOne({ where: { Email: req.body.Email}});
  if(usuario){
    const match= bcrypt.compareSync(req.body.Password, usuario.Password);
    if(match){
      usuario.Token=createToken(usuario)
      req.body.Token=createToken(usuario);
      req.body.Password=bcrypt.hashSync(req.body.Password,10);
      await Usuario.update(req.body, {
        where: { id: usuario.id }
      })
      console.log(usuario.Token)
      res.json(usuario);//message: createToken(usuario)})
    }else{
      res.json({ message: "Error en Usuario / Contrasena"});
    }
  }else{
    res.json({ message: "Error en email, no existe"});
  }


};
exports.findAll = (req, res) => {
    
  
    Usuario.findAll({ include: ["pedidos","visitas"]})
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

exports.findOne = (req, res) => {
    const Cedula = req.params.id;
  
    Usuario.findByPk(Cedula)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with cedula=" + Cedula
        });
      });
  };

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    req.body.Password=bcrypt.hashSync(req.body.Password,10);
    Usuario.update(req.body, {
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
exports.delete = (req, res) => {
    const Cedula = req.params.id;
  
    Usuario.destroy({
      where: { id: Cedula }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${Cedula}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + Cedula
        });
      });
  };

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Usuario.destroy({
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
exports.finUserPedidos= (req, res) => {
  Usuario.findAll({ where: { id: req.body.id }, include: [db.pedidos]  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
// Find all published Tutorials
exports.findAllAdmins = (req, res) => {
    Usuario.findAll({ where: { id: req.body.id }})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };