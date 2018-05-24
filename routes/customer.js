var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Customer = require('../models/Customer.js');

/* GET ALL CustomerS */
router.get('/', function(req, res, next) {
  Customer.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE Customer BY ID */
router.get('/:id', function(req, res, next) {
  console.log(req.params.id);
  try{
    Customer.aggregate([
      {$match: { "_id": new mongoose.Types.ObjectId(req.params.id)}},
      {$project: {
        customerLifetimeValue: {$subtract: ["$lastContact", "$creationDate"]},
        customerID: 1,
        name: 1,
        birthday: 1,
        gender: 1,
        lastContact: 1       
      },
    }]).exec(function(err,post){
      try{
        console.log(post);
        if (err) {
          console.log('mongoose', err);
          return next(err);
        }
        res.json(post[0]);
      }catch(err){
        console.log('inside catch',err);
      }
      
    })
  }catch(e){
    console.log('outside',e);
  }
  
  /*Customer.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });*/
});

/* SAVE Customer */
router.post('/', function(req, res, next) {
  try{
    Customer.create(req.body, function (err, post) {
      if (err) {
        console.log('mongoose', err);
        return next(err);
      }
      res.json(post);
    });
  }catch(err){
    console.log(err);
  }
  
});

/* UPDATE Customer */
router.put('/:id', function(req, res, next) {
  Customer.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Customer */
router.delete('/:id', function(req, res, next) {
  Customer.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;