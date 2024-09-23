const Product = require('../models/Product');



 

const getProduct = async (req, res) => {
  try {

    const products = await Product.find();
    const websiteDomain = `${req.protocol}://${req.get('host')}`;

    const productsWithImages = products.map(product  => ({
      ...product.toJSON(),
      Images: product.Images.map(imageUrl => `${websiteDomain}/images/${imageUrl}`)
    }));

    res.json(productsWithImages);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
 
 

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params; // Assuming you have a route parameter for the product ID

    // Assuming you have a Product model/schema defined
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Construct the full image URLs using the website domain
    const websiteDomain = `${req.protocol}://${req.get('host')}`; 
    const productWithImages = {
      ...product.toJSON(),
      Images: product.Images.map((imageUrl) => `${websiteDomain}/images/${imageUrl}`),
    };

    res.json(productWithImages);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

  
  

const createProduct = async (req, res) => {
  try {
    const { ProductName, Category, Brand, Model, Stock, Price, Colour, Size, Description, CouponType, CouponCode, CheckboxValues } = req.body;

    // Extracting image filenames from req.files
    const images = req.files.map(file => file.filename);

    const newProduct = new Product({
      ProductName,
      Category,
      Brand,
      Model,
      Stock,
      Price,
      Colour,
      Size,
      Images: images, // Store the image filename if available
      CouponType,
      CouponCode,
      Description,
      CheckboxValues // Store the checkbox values
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.log('There is an error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
   
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params; // Assuming you have a route parameter for the product ID
    const { ProductName, Category, Brand, Model, Stock, Price, Colour, Size, Description,  CouponType, CouponCode, CheckboxValues } = req.body;

    const images = req.files.map(file => file.filename);

    // Assuming you have a Product model/schema defined
    const updatedProduct = await Product.findByIdAndUpdate(
      id, // Product ID to update
      {
        ProductName,
        Category,
        Brand,
        Model,
        Stock,
        Price,
        Colour,
        Size,
        Description,
        CouponType,
        CouponCode,
        Images: images, // Store the image filename if available
        CheckboxValues // Store the checkbox values
      },
      { new: true } // Return the updated product
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

  


     

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params; // Assuming you have a route parameter for the product ID

    // Assuming you have a Product model/schema defined
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

 




module.exports = { createProduct, getProduct, updateProduct , getSingleProduct, deleteProduct };
  