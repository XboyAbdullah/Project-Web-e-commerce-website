const express = require('express');
const app = express();

const errorMiddleWere = require('./middlewares/Errors')
const cookieParser = require('cookie-parser')

app.use(express.json());
app.use(cookieParser());


// Importing all routes
const products = require('./routes/products');
const  user = require('./routes/Users');
const  order = require('./routes/Orders');


app.use('/api/v1', products);
app.use('/api/v1', user);
app.use('/api/v1', order);


// Middlewere to handle errors
app.use(errorMiddleWere);



module.exports = app;

