import express from 'express';
import session from 'express-session';
import userRouter from './routes/userRouter';
import eventRouter from './routes/eventRouter';
import tagRouter from './routes/tagRouter';

import models from './models';

models.sequelize.sync()
  .then(() => {
    console.log('Database looks fine');
  })
  .catch(err => {
    console.log(err, "Something went wrong with the databse update!");
  });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({
  extended: false
}));

app.use(express.json());

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingless.'
}));

app.use('/', userRouter);
app.use('/', tagRouter);
app.use('/', eventRouter);

app.listen(port, () => console.log(`PORT: ${port}`));

export default app;