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
  lastContact: { type: Date, default: Date.now },
  customerLifetimeValue: { type: Date, default: Date.now }  
});

module.exports = mongoose.model('Customer', CustomerSchema);