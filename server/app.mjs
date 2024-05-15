import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import indexRouter from './routes/index.mjs';
import userRouter from './routes/user.mjs';
import webauthnRouter from './routes/webauthn.mjs';
import bodyParser from "body-parser";

const app = express();
dotenv.config();
const port = process.env.PORT | 5050;

app.set('view engine', 'pug');

app.use(cors());
app.use(express.json());
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/webauthn', webauthnRouter);

app.use(bodyParser.urlencoded({extended: true}));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
