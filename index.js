import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import errorhandler from 'errorhandler';
import express from 'express';
import routes from './server/routes';
// import './server/database/config/passport';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';


// Create global app objects
const app = express();

app.use(cors());

// initial passport for persistent session
// app.use(passport.initialize());
// Normal express config defaults
app.use(require('morgan')('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('method-override')());

app.use(express.static(`${__dirname}/'public'`));

if (!isProduction) {
  app.use(errorhandler());
}

app.use(routes);

// catch 404 and forward to error handler

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace

if (!isProduction) {
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

// production error handler
// no stacktraces leaked to user
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

// finally, let's start our server...
const server = app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log(`'Listening on port '${server.address().port}`);
});

export default app;
