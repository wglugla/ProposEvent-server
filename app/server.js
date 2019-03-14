import express from 'express';
import session from 'express-session';
import userRouter from './routes/userRouter';
import eventRouter from './routes/eventRouter';
import tagRouter from './routes/tagRouter';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({
  extended: false
}));


app.use(express.json());

app.set('view engine', 'ejs');

app.use('/', userRouter);
app.use('/', eventRouter);
app.use('/', tagRouter);


app.use(
  session({
    secret: 'secret',
    resave: 'true',
    saveUninitialized: 'true'
  })
);

app.listen(port, () => console.log(`PORT: ${port}`));