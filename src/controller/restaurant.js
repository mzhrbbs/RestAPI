import mongoose from 'mongoose';
import {Router} from 'express';
import Restaurant from '../models/restaurant';

export default ({config,db}) => {
  let api = Router();

  // '/v1/restaurant/add'
  api.post('/add',(req,res) => {
    let newRestaurant = new Restaurant();
    newRestaurant.name = req.body.name;

    newRestaurant.save((err) =>{
      if (err) {
        res.send(err);
      }
      res.json({message: "Restaurant saved succes!"});
    });
  });

  return api;

}
