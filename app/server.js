import express from 'express';
import {
  urlencoded,
  json
} from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import router from './routes/routes';
import userRouter from './routes/userRouter';
import eventRouter from './routes/eventRouter';
import tagRouter from './routes/tagRouter';


const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use('/', userRouter);
app.use('/', eventRouter);
app.use('/', tagRouter);

app.use(urlencoded({
  extended: false
}));
app.use(json());

app.use(session({
  secret: 'secret',
  resave: 'true',
  saveUninitialized: 'true'
}))

// app.use(passport.session());
// app.use(passport.initialize());


app.listen(port, () => console.log(`PORT: ${port}`));