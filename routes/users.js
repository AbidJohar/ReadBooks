const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/readbooks')

// Define the schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  profileimg: String,
  password:String,

});
userSchema.plugin(plm);

// Create a model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
