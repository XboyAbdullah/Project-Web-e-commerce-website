const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true,
        maxlength: 100,
    },
    price:{
        type: Number,
        required: true,
        maxlength:5,
        default: 0.0
    },
    description:{
        type: String,
        required: true,
    },
    ratings:{
        type: Number,
        default: 0,
    },
    Images:[
        {
            public_id: {
                type: String,
                required: true
            },
            url:{
                type: String,
                required: true
            }
        }
    ],
    Category:{
        type: String,
        required: true,
        enum:{
            values:[
                'Electronics',
                'Accessories',
                'Clothes',
                'Shoes',
                'Books',
                'Beauty/Health'
                
            ],
            message:'Please select corrct category for product'
        }
    },
    Seller:{
        type: String,
        required: true
    },
    stock:{
        type : Number,
        maxlength: 5,
        default: 0
    },
    Number_of_reviews:{
        type : Number,
        default: 0
    },
    reviews:[{

        name : {
            type: String,
            required: true
        },
        rating : {
            type: Number,
            required: true
        },
        comment : {
            type: String,
            required: true
        }
    }],
    createdAt:{
        type: Date,
        default: Date.now
    }

});

const Products = mongoose.model("Products", productSchema);
module.exports = Products;
