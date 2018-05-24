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
  Customer.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
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