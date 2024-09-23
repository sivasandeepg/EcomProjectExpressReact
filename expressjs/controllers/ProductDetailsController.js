const Category = require('../models/Category');
const Brand = require('../models/Brand');
const Model = require('../models/Model');
const Size = require('../models/Size');  
 
// Controller logic to handle adding new data
 
exports.addCategory = async (req, res) => {
  try {
    const category = new Category({ name: req.body.name });
    await category.save();
    res.status(201).send('Category added successfully.');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.addBrand = async (req, res) => {
  try {
    const { name, category } = req.body;
    const brand = new Brand({ name, category });
    await brand.save();
    res.status(201).send('Brand added successfully.');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.addModel = async (req, res) => {
  try {
    const { name, brand } = req.body;
    const model = new Model({ name, brand });
    await model.save();
    res.status(201).send('Model added successfully.');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.addSize = async (req, res) => {
  try {
    const { name, model } = req.body;
    const size = new Size({ name, model });
    await size.save();
    res.status(201).send('Size added successfully.');
  } catch (err) {
    res.status(400).send(err.message);
  }
};



  
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// exports.getBrands = async (req, res) => {
//   try {
//     const { categoryId } = req.params;
//     const brands = await Brand.find({ category: categoryId });
//     res.status(200).json(brands);
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// };
   
  
exports.getBrands = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const brands = await Brand.find({ category: categoryId }).populate('category', 'name');
    res.status(200).json(brands);
  } catch (err) {
    res.status(400).send(err.message);
  }
};  


 
  
exports.getModels = async (req, res) => {
  try {
    const { brandId } = req.params;
    const models = await Model.find({ brand: brandId }).populate('brand', 'name');   
    res.status(200).json(models);
  } catch (err) {
    res.status(400).send(err.message);
  }
}; 

   
exports.getSizes = async (req, res) => {
  try {
    const { modelId } = req.params;
    const sizes = await Size.find({ model: modelId }).populate('model', 'name');
    res.status(200).json(sizes);
  } catch (err) {
    res.status(400).send(err.message);
  }
}; 