import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import {router} from './routes/usersRouter'
import mongoose from 'mongoose';
import cors from 'cors';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/TrainingBuddy');

const appServer = express();

//Middlewares
appServer.use(morgan(`dev`));
appServer.use(bodyParser.json());
appServer.use(cors());

//Routes
appServer.use('/users', router);

//Start the server
const port = process.env.PORT || 3030;
appServer.listen(port);
console.log(`Server listening @ ${port}`);