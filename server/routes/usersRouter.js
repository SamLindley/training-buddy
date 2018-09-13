import usersController from '../controllers/usersController';
import promiseRouter from 'express-promise-router';
import {validateBody, schemas} from '../helpers/routeHelpers';
import passport from 'passport';

const passportConf = require('../passport');
const router = promiseRouter();

const noSession = {session: false}


router.route('/signup')
  .post(validateBody(schemas.authSchema), usersController.signUp);

router.route('/signin')
  .post(validateBody(schemas.authSchema), passport.authenticate('local', noSession), usersController.signIn);

router.route('/oauth/google')
  .post(passport.authenticate('googleToken', noSession), usersController.googleOAuth);

router.route('/secret')
  .get(passport.authenticate('jwt', noSession), usersController.secret);

module.exports = {
  router
};