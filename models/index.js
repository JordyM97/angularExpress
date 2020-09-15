const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  storage: dbConfig.storage,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
const test = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    console.error("----------------------", error);
  }
};


db.visita =require("./Visita.js")(sequelize, Sequelize);
db.contacto =require("./Contacto.js")(sequelize, Sequelize);
db.categoria =require("./Categoria.js")(sequelize, Sequelize);

db.producto =require("./Producto.js")(sequelize, Sequelize);
db.pedidos =require("./Pedido.js")(sequelize, Sequelize);
db.usuarios =require("./usuario.js")(sequelize, Sequelize);
test();
db.usuarios.hasMany(db.pedidos, {as: "pedidos"})
db.usuarios.hasMany(db.visita, {as: "visitas"})
db.visita.belongsTo(db.usuarios, { foreignKey: "UserId", as: "usuario"})
db.pedidos.belongsTo(db.usuarios, { foreignKey: "UserId", as: "usuario"})
db.pedidos.hasMany(db.producto, {as: "productos"})
db.producto.belongsTo(db.pedidos,{foreignKey: "PedidoId", as: "pedido"})
db.categoria.hasMany(db.producto, { as:"productos"})
db.producto.belongsTo(db.categoria,{foreignKey: "CategoriaId", as: "categoria"})

module.exports = db;