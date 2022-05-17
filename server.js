const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// set the view engine to ejs
app.set('view engine', 'ejs');

const mainRoutes = require('./routes/main');
app.use(mainRoutes);

app.listen(3000);
console.log('Server is listening on port 3000');
