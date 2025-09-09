const express = require('express');

const usersRouter = require('./user_router');
const colorsRouter = require('./color_router');
const fontsRouter = require('./font_router');
const authRouter = require('./auth_router');
const profileRouter = require('./profile_router');


function routerApi(app){
  const router = express.Router();
  app.use('/api', router);
  router.use('/users', usersRouter);
  router.use('/colors', colorsRouter);
  router.use('/fonts', fontsRouter);
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);


}

module.exports = routerApi;
