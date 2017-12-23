import express from 'express';
import config from '../config';
import middleware from '../middleware'
import initializeDb from '../db';

let router = express();

//Connect to db
initializeDb(db => {

  //internal middleware
  router.use(middleware({config,db}));

  //api route v1


});

export default router;
