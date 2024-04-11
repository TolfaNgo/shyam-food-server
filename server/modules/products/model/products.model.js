// Define the Sequelize model
const { DataTypes } = require("sequelize");
const { rogerSequelize } = require("../../../../common/sequelize");

// Define Status model
const Products = rogerSequelize.define("sfp_products", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  images: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  is_popular: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  is_special: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

const Unit = rogerSequelize.define("sfp_unit", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "sfp_products", // Correctly reference the Products table name
      key: "id",
    },
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Define association between Product and Unit
Products.hasMany(Unit, { foreignKey: "product_id" }); // Assuming the foreign key in the Unit model is 'product_id'

// Define association between Unit and Product
Unit.belongsTo(Products, { foreignKey: "product_id" }); // Assuming the foreign key in the Unit model is 'product_id'

Unit.sync({ alter: true });
// Synchronize the model with the database
Products.sync({ alter: true })
  .then(() => {
    console.log("Products table created successfully.");
  })
  .catch((err) => {
    console.error("Error creating Products table:", err);
  });

// Export models
module.exports = {
  Products,
  Unit,
};
