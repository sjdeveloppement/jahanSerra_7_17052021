const commentSchema = function(comment){
    this.comment_id = comment.comment_id;
    this.user_id = comment.user_id;
    this.message_id = comment.message_id;
    this.comment_content = comment.comment_content;
}
module.exports = commentSchema;