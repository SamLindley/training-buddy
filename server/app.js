import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import {router} from './routes/usersRouter'
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/TrainingBuddy');

const app = express();

//Middlewares
app.use(morgan(`dev`));
app.use(bodyParser.json());

//Routes
app.use('/users', router);

//Start the server
const port = process.env.PORT || 3030;
app.listen(port);
console.log(`Server listening @ ${port}`);