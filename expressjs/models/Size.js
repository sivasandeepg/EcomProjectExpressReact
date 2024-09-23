const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  model: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Model'
  }
});

const Size = mongoose.model('Size', sizeSchema);

module.exports = Size;
  