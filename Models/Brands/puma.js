const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: Number,
    ItemModelNumber: String,
    name: String,
    title: String,
    brand: String,
    color: String,
    price: Number,
    priceOnOffer: Number,
    description: String,
    specifications: String,
    ratting: String,
    like: Number,
    unLike: Number,
    sold: Number,
    inStock: Number,
    image: String,
    occasion: String,
    quality: Number,
    type: String,
    pattern: String
});

module.exports = mongoose.model('puma', userSchema, "Puma");