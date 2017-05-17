const path = require('path');
const express = require('express');

const port = process.env.PORT || 8080;
const app = express();

app.use(express.static('dist'))

const INVALID_ACCESS = 'INVALID_ACCESS';

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

app.get('*', (req, res, next) => {
  let err = new Error(INVALID_ACCESS);
  err.message = INVALID_ACCESS;
  next(err);
});

app.use(function(err, req, res, next) {
  if (err.message === INVALID_ACCESS) {
    console.error('[express]', '[error handler]', err.toString());
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
    console.log(`env: ${process.env.NODE_ENV} msg: Webpack Dev Server ${port}`);
  }
})
