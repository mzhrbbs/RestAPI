'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _foodtruck = require('../models/foodtruck');

var _foodtruck2 = _interopRequireDefault(_foodtruck);

var _review = require('../models/review');

var _review2 = _interopRequireDefault(_review);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  //CRUD - Create , Read , Update , Delete

  // '/v1/foodtruck/add'-- Create
  api.post('/add', function (req, res) {
    var newFoodTruck = new _foodtruck2.default();
    newFoodTruck.name = req.body.name;
    newFoodTruck.foodtype = req.body.foodtype;
    newFoodTruck.avgcost = req.body.avgcost;
    newFoodTruck.geometry.coordinates = req.body.geometry.coordinates;

    newFoodTruck.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: "FoodTruck saved succes!" });
    });
  });

  // '/v1/foodtruck ' -- Read
  api.get('/', function (req, res) {
    _foodtruck2.default.find({}, function (err, foodtrucks) {
      if (err) {
        res.send(err);
      }
      res.json(foodtrucks);
    });
  });

  // 'v1/foodtruck/:id'  -- Read one
  api.get('/:id', function (req, res) {
    _foodtruck2.default.findById(req.params.id, function (err, foodtruck) {
      if (err) {
        res.send(err);
      }
      res.json(foodtruck);
    });
  });

  // 'v1/foodtruck/:id' -- Update
  api.put('/:id', function (req, res) {
    _foodtruck2.default.findById(req.params.id, function (err, foodtruck) {
      if (err) {
        res.send(err);
      }
      foodtruck.name = req.body.name;
      foodtruck.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: "FoodTruck info udpated !" });
      });
    });
  });

  // 'v1/foodtruck/:id ' -- Delete
  api.delete('/:id', function (req, res) {
    _foodtruck2.default.remove({
      _id: req.params.id
    }, function (err, foodtruck) {
      if (err) {
        res.send(err);
      }
      res.json({ message: "FoodTruck deleted successfully !" });
    });
  });

  // Add review for specific food truck id
  // 'v1/foodtruck/reviews/add/:id'
  api.post('reviews/add/:id', function (req, res) {
    _foodtruck2.default.findById(req.params.id, function (err, foodtruck) {
      if (err) {
        res.send(err);
      }
      var newReview = new _review2.default();
      newReview.title = req.body.title, newReview.text = req.body.text, newReview.foodtruck = foodtruck._id, newReview.save(function (err, review) {
        if (err) {
          res.send(err);
        }
        foodtruck.reviews.push(newReview);
        foodtruck.save(function (err) {
          if (err) {
            console.log("here is the error");
            res.send(err);
          }
          res.json({ message: "FoodTruck review saved !" });
        });
      });
    });
  });

  return api;
};
//# sourceMappingURL=foodtruck.js.map