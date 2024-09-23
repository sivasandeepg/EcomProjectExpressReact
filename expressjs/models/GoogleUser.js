const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  displayName: String,
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  photo: String,
  provider: String
});

mongoose.model('GoogleUser', userSchema);
 