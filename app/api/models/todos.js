const mongoose = require('mongoose');
// Define a schema
const Schema = mongoose.Schema;
const TodoSchema = new Schema({
  task: {
    type: String,
    trim: true,
    required: true,
  },
  due: {
    type: String,
    trim: true,
    required: true
  },
  user: {
    type: String,
    trim: true,
    required: true
  },
  status: {
    type: Boolean
  }
});

module.exports = mongoose.model('Todo', TodoSchema);