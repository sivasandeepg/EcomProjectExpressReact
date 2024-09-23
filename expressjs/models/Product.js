const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = new mongoose.Schema({
  ProductName: Joi.string().min(1).required(),
  Category: Joi.string().min(1).required(),
  Brand: Joi.string().min(1).required(),
  Model: Joi.string().min(1).required(),
  Stock: Joi.number().integer().min(0).required(),
  Price: Joi.number().min(0).required(),
  Colour: Joi.string().required(),
  Size: Joi.string().required(),
  Images: Joi.array().items(Joi.string().uri()).required(), // Array of image URLs
  CouponType: { type: String, required: true },
  CouponCode: { type: String, required: false },
  Description: Joi.string().min(1).required(),
  CheckboxValues: Joi.string().required() // Comma-separated values
});

module.exports = mongoose.model('Product', productSchema);
  