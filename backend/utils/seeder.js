const Products = require('../Models/Products')
const dotenv = require('dotenv')
const connectDatabase = require('../config/database')
const product = require('../data/product');

// setting dotenv file
dotenv.config({path : 'backend/config/config.env'});


connectDatabase();

const seedProducts = async ()=> {
    try{
        await Products.deleteMany();
        console.log('Products are deleted');

        await Products.insertMany(product);
        console.log('Products are added');

        process.exit()


    }catch(error){
        console.log(error.message);
        process.exit();
    }
};

seedProducts()