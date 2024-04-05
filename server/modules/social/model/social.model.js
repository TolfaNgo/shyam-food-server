// Define the Sequelize model
const { DataTypes } = require("sequelize");
const { rogerSequelize } = require("../../../../common/sequelize");

const SocialInfo = rogerSequelize.define("sfp_social_info", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  facebook_link: {
    type: DataTypes.STRING,
    allowNull: true, // Assuming the link can be optional
  },
  instagram_link: {
    type: DataTypes.STRING,
    allowNull: true, // Assuming the link can be optional
  },
  twitter_link: {
    type: DataTypes.STRING,
    allowNull: true, // Assuming the link can be optional
  },
  contact_no: {
    type: DataTypes.BIGINT,
    allowNull: true, // Assuming the contact number can be optional
  },
  contact_email: {
    type: DataTypes.STRING,
    allowNull: true, // Assuming the email can be optional
  },
});
SocialInfo.sync();
// Define any associations or additional configuration here

module.exports = SocialInfo;
