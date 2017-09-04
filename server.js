const env = require('./secret.js');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const tasks = require('./routes/tasks');

const app = express();

const port = 3000;

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// static folder
app.use(express.static(path.join(__dirname, 'client')));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// the url routes, that link to the routes folder
app.use('/', index);
app.use('/api',tasks);

app.listen(port, () => {
    console.log('server is started on port http://localhost:' + port + '/');
})
