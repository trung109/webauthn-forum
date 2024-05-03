var express = require('express');
var app = express();
var port = 61255;

app.set('view engine', 'pug');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');

app.use('/', indexRouter);
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
