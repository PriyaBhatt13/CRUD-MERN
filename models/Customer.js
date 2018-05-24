var mongoose = require('mongoose');
var CustomerSchema = new mongoose.Schema({
  customerID: {
    type: Number
  },
  name: {
    first: String,
    last:  String
  },
  birthday: { type: Date },
  gender: String,
  creationDate: {type:Date, default: Date.now},
  lastContact: { type: Date, default: Date.now }  
});

module.exports = mongoose.model('Customer', CustomerSchema);