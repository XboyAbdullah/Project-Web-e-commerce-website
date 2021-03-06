const app = require('./app')
const connectDatabase = require('./config/database');
const dotenv = require('dotenv');


// setting up config file
dotenv.config({path: 'backend/config/config.env'});

// connecting to database
connectDatabase();


const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

// Handle unhandled promise rejection
process.on('unhandledPromiseRejection', err => {
    console.log(`Error : ${err.message}`);
    console.log(`Shuttinng down the server`);
    server.close(() => {
        process.exit(1)     
    })
})


