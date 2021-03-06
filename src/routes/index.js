import express from 'express';
import config from '../config';
import middleware from '../middleware'
import initializeDb from '../db';
import foodtruck from '../controller/foodtruck';
import Account from '../controller/account';

let router = express();

//Connect to db
initializeDb(db => {

  //internal middleware
  router.use(middleware({config,db}));

  //api route v1
  router.use('/foodtruck', foodtruck({config,db}));
  router.use('/account', Account({config,db}));


});

export default router;
