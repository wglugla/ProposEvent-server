import express from 'express';
import {
  urlencoded,
  json
} from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import routes from './routes/routes';


const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use('/', routes);

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