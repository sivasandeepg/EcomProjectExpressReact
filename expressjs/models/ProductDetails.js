const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define the Category Schema
const categorySchema = new Schema({
  name: { type: String, required: true },
});

// Define the Brand Schema
const brandSchema = new Schema({
  name: { type: String, required: true },
  categories: [categorySchema],
 
}); 
 
// Define the Model Schema
const modelSchema = new Schema({
  name: { type: String, required: true },
  brand: [brandSchema],
});
 
// Define the Size Schema
const sizeSchema = new Schema({
  value: { type: String, required: true },
  model: [modelSchema],
});

   





// Create Mongoose models
const Size = mongoose.model('Size', sizeSchema);
const Model = mongoose.model('Model', modelSchema);
const Brand = mongoose.model('Brand', brandSchema);
const Category = mongoose.model('Category', categorySchema);

module.exports = { Category, Brand, Model, Size };
