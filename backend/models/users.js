'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Users.hasMany(models.Message);
    }
  };
  Users.init({
    user_pseudo: DataTypes.STRING,
    user_mail: DataTypes.STRING,
    user_password: DataTypes.STRING,
    user_image: DataTypes.STRING,
    user_isadmin: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};