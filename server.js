const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config');

const port = process.env.PORT || 8080;
const app = express();
const compiler = webpack(config);

const FORBIDDEN_CODE = 403;

const INVALID_ACCESS = 'INVALID_ACCESS';

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/dist', express.static('dist'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));

});

app.get('*', (req, res, next) => {
  let err = new Error(INVALID_ACCESS);
  err.message = INVALID_ACCESS;
  next(err);
});

app.use(function(err, req, res, next) {
  if (err.message === INVALID_ACCESS) {
    res.status(403).sendFile(path.join(__dirname, 'dist/invalid.html'));
  } else {
    console.error(err);
    res.status(503).send('Server Internal Error');
  }
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Webpack Dev Server ${port}`);
  }
})
