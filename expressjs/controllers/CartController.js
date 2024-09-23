const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.addCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.Stock < quantity) {
            return res.status(400).json({ message: 'Not enough stock available' });
        }

        // Reduce product stock
        product.Stock -= quantity;
        await product.save();

        // Find or create cart (assuming a single cart for simplicity)
        let cart = await Cart.findOne();
        if (!cart) {
            cart = new Cart({ items: [] });
        }

        // Check if product is already in cart
        const cartItem = cart.items.find(item => item.productId.equals(productId));
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();

        res.json({ message: 'Product added to cart', cart });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
       
   
exports.viewCart = async (req, res) => {
    const websiteDomain = `${req.protocol}://${req.get('host')}`;

    try {
        // Find the cart (assuming a single cart for simplicity)
        const cart = await Cart.findOne().populate('items.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Add image path with base URL to each item in the cart
        const itemsWithImagePath = cart.items.map(item => {
            // Assuming the first image in the Images array is the primary image
            const primaryImagePath = item.productId.Images.length > 0 
                ? `${websiteDomain}/images/${item.productId.Images[0]}` 
                : ''; 
  
            return {
                ...item.toObject(),
                productId: {
                    ...item.productId.toObject(),
                    imagePath: primaryImagePath,
                    Images:primaryImagePath,
                }
            };
        });
   
        res.json({ cart: { ...cart.toObject(), items: itemsWithImagePath } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}; 

 
     
 // Update item quantity
 exports.updateQuantity= async (req, res) => {
    try {
        const { itemId, action } = req.body; // action can be 'increment' or 'decrement'
        const cart = await Cart.findOne().populate('items.productId');
        const item = cart.items.id(itemId);

        if (!item) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        if (action === 'increment') {
            if (item.productId.Stock > item.quantity) {
                item.quantity += 1;
            } else {
                return res.status(400).json({ message: 'Not enough stock available' });
            }
        } else if (action === 'decrement') {
            item.quantity -= 1;
            if (item.quantity <= 0) {
                item.remove();
            }
        } else {
            return res.status(400).json({ message: 'Invalid action' });
        }

        await cart.save();

        res.json({ cart });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

  

exports.removeItem = async (req, res) => { 
    console.log('Request received at /example');
    res.send('Hello World'); 
    try {
        const { itemId } = req.body;

        if (!itemId) {
            console.error('Item ID is missing');
            return res.status(400).json({ message: 'Item ID is required' });
        }

        console.log(`Removing item with ID: ${itemId}`);

        // Find the cart (assuming a single cart for simplicity)
        let cart = await Cart.findOne().populate('items.productId');

        if (!cart) {
            console.error('Cart not found');
            return res.status(404).json({ message: 'Cart not found' });
        }

        console.log('Cart found:', cart);

        // Find the item in the cart
        const item = cart.items.id(itemId);

        if (!item) {
            console.error('Item not found in cart');
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        console.log('Item found in cart:', item);

        // Increase the stock of the product since it is being removed from the cart
        const product = await Product.findById(item.productId);

        if (product) {
            product.Stock += item.quantity;
            await product.save();
            console.log('Product stock updated:', product);
        } else {
            console.error(`Product with ID ${item.productId} not found`);
        }

        // Remove the item from the cart
        item.remove();
        await cart.save();
        console.log('Item removed and cart updated:', cart);

        res.json({ message: 'Item removed from cart', cart });
    } catch (err) {
        console.error('Error removing item from cart:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
 
 


    


//remove cart items    
exports.checkout = async (req, res) => {
    try {
        const cart = await Cart.findOne().populate('items.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        let totalPrice = 0;
        cart.items.forEach(item => {
            totalPrice += item.productId.Price * item.quantity;
        });

        // Here you can add more logic, such as creating an order, handling payments, etc.

        // Clear the cart after checkout
        cart.items = [];
        await cart.save();

        res.json({ message: 'Checkout successful', totalPrice });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}; 