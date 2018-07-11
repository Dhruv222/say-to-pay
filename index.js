const express = require('express'),
  app = express(),
  cors = require('cors'),
  bodyparser = require('body-parser'),
  apiError = require('./config/apiError'),
  logger = require('./config/winston'),
  routes = require('./server/routes/index.route');

app.use(cors());
app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
    limit: '2mb',
  }),
);

app.use('/api', routes);

app.use(function(err, req, res, next) {
  logger.error(JSON.stringify(err));
  if (err instanceof apiError) {
    next(err);
  } else {
    console.log(err);
    next(new apiError());
  }
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new apiError('API not found', 404);
  return next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
    stack: err.stack,
  });
});

app.listen(process.env.PORT || 3000, () => {
  logger.info('App Started!', process.env.PORT || 3000);
});
