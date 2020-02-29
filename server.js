/*
const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const path = require('path');

const app = express();

app.use(
  expressStaticGzip(path.join(__dirname, 'build/static'), {
    enableBrotli: true, // only if you have brotli files too
  })
);

// app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000);

const express = require('express');
const path = require('path');
const app = express();

app.use('/static', express.static(path.join(__dirname, 'build/static')));
app.get('*', function(req, res) {
  res.sendFile('index.html', {
    root: path.join(__dirname, 'build/'),
  });
});
app.listen(9000);

 app.use(express.static(path.join(__dirname, 'build')));

app.get('/ *', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
 */
