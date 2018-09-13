import usersController from '../controllers/usersController';
import promiseRouter from 'express-promise-router';
import {validateBody, schemas} from '../helpers/routeHelpers';
import passport from 'passport';

// noinspection JSUnusedLocalSymbols
const passportConf = require('../passport');
const router = promiseRouter();
const passportSingIn = passport.authenticate('local', {session: false});
const passportJWT = passport.authenticate('jwt', {session: false});


router.route('/signup')
  .post(validateBody(schemas.authSchema), usersController.signUp);

router.route('/signin')
  .post(validateBody(schemas.authSchema), passportSingIn, usersController.signIn);

router.route('/secret')
  .get(passportJWT, usersController.secret);

module.exports = {
  router
};