// Define the Sequelize model
const { DataTypes } = require("sequelize");
const { rogerSequelize } = require("../../../../common/sequelize");

// Define Status model
const Blogs = rogerSequelize.define("sfp_blogs", {
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
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  video_link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_by: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

Blogs.sync({ alter: true })
  .then(() => {
    console.log("Blogs table created successfully.");
  })
  .catch((err) => {
    console.error("Error creating Blogs table:", err);
  });

// Export models
module.exports = {
  Blogs,
};
