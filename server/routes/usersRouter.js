import express from 'express';
import usersController from '../controllers/usersController';
import promiseRouter from 'express-promise-router';
import {validateBody, schemas} from '../helpers/routeHelpers';
import passport from 'passport';

const passportConf = require('../passport');
const router = promiseRouter();


router.route('/signup')
  .post(validateBody(schemas.authSchema), usersController.signUp);

router.route('/signin')
  .post(validateBody(schemas.authSchema), passport.authenticate('local', { session: false}), usersController.signIn);

router.route('/secret')
  .get(passport.authenticate('jwt', { session: false }), usersController.secret);

module.exports = {
  router
};