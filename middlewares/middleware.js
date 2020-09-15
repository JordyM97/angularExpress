const jwt = require ('jwt-simple');
const moment = require('moment')

const checktoken= (req, res,next)=>{
    if(!req.headers['token']){
        return res.send(401).json({message: "Agrega token en headers"})
    }
    const usuarioToken=req.headers['token'];
    let payload ={}
    try {
        payload= jwt.decode(usuarioToken, 'secreto');

    } catch (error) {
       
        return res.status(401).json({ message: "Error en token incorrecto"});
    }
    if (payload.expiredAt < moment().unix()) {
        
        return res.send(401).json({ message: "El token expiro!"});
    }
    req.usuarioId = payload.usuarioId;
    next();
}
module.exports = {
    checktoken: checktoken
}