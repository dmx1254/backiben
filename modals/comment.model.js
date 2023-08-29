const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  commentEmail: {
    type: String,
    required: true,
  },
  commentLastname: {
    type: String,
  },

  commentFirstname: {
    type: String,
  },

  comment: {
    type: String,
    require: true,
  },
  isCommentValid: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
  },
});

const commentModel = mongoose.model("comment", commentSchema);
module.exports = commentModel;
