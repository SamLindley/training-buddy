import usersController from '../controllers/usersController';
import promiseRouter from 'express-promise-router';
import {validateBody, schemas} from '../helpers/routeHelpers';
import passport from 'passport';

const passportConf = require('../passport');
const router = promiseRouter();

const noSession = {session: false};
const passportLocal = passport.authenticate('local', noSession);
const passportJWT = passport.authenticate('jwt', noSession);
const passportGoogle = passport.authenticate('googleToken', noSession);


router.route('/signup')
  .post(validateBody(schemas.authSchema), usersController.signUp);

router.route('/signin')
  .post(validateBody(schemas.authSchema), passportLocal, usersController.signIn);


router.route('/oauth/facebook')
  .post(passport.authenticate('facebookToken', noSession), usersController.facebookOAuth)

router.route('/oauth/google')
  .post(passportGoogle, usersController.googleOAuth);

router.route('/secret')
  .get(passportJWT, usersController.secret);

module.exports = {
  router
};