const express = require('express');
const app = express();

const errorMiddleWere = require('./middlewares/Errors')


app.use(express.json());



// Importing all routes
const products = require('./routes/products');
const  user = require('./routes/Users');

app.use('/api/v1', products);
app.use('/api/v1', user);


// Middlewere to handle errors
app.use(errorMiddleWere);



module.exports = app;

