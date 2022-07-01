const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080;

//Log Requests
app.use(morgan('tiny'));

// MongoDB connection
connectDB();

// Pass Request to bodyparser
app.use(bodyparser.urlencoded({extended: true}));
// Set view engine
app.set('view engine', 'ejs');
// Load assets
app.use('/css',express.static(path.resolve(__dirname, 'assets/css')))
app.use('/img',express.static(path.resolve(__dirname, 'assets/img')))
app.use('/js',express.static(path.resolve(__dirname, 'assets/js')))


// Load Routers
app.use('/', require('./server/routes/router'))

app.listen(PORT, () => {console.log(`listening on http://localhost:${PORT}`)})