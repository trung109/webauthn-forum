import express from "express";
import cors from 'cors'

const app = express();
const port = 61255;

app.use(cors())
app.set('view engine', 'pug');

import indexRouter from './routes/index.js';
import userRouter from './routes/user.js';
import webauthnRouter from './routes/webauthn.js';

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/webauthn', webauthnRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
