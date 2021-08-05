

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