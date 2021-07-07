

const MessageSchema = function(message) {
    //this.message_id = message.message_id;
    this.user_id = message.user_id;
    this.message_title = message.message_title;
    this.message_content = message.message_content;
    this.message_image = message.message_image;
    this.message_appreciation = message.message_appreciation;
    this.message_createdat = message.message_createdat;
    //this.message_updateat = message.message_updateat;
};

//export du schéma
module.exports = MessageSchema;






/*'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     
    static associate(models) {
      // define association here
      models.Message.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  };
  Message.init({
    user_id: DataTypes.INTEGER,
    message_title: DataTypes.STRING,
    message_content: DataTypes.STRING,
    message_image: DataTypes.STRING,
    message_appreciation: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};*/