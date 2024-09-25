const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session'); // Import express-session
const passport = require('./config/passport');
const path = require("path");

// Load environment variables from .env file
dotenv.config();

const UserAuth = require("./routes/userRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const productRouters = require("./routes/productRouters");
const ProductDetailsRouters = require("./routes/ProductDetailsRouters");
const CartRoutes = require("./routes/CartRoutes");
const PaymentGatewayRoutes = require("./routes/PaymetGatewayRoutes");  
const orderRoutes = require('./routes/OrdersRoutes');
const GoogleAuthRoutes = require('./routes/GoogleAuthRoutes');

// Initialize Express app
const app = express();

// Middleware for session management
app.use(session({
    secret: process.env.SESSION_SECRET, // Use your session secret
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(bodyParser.json()); 

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB Connected Successfully");
}).catch((error) => {
    console.error(`MongoDB connection error: ${error}`);
});

// Middleware
app.use("/auth", UserAuth);
app.use("/auth/google", GoogleAuthRoutes);
app.use("/employees", employeeRoutes);
app.use("/product", productRouters);
app.use("/productdetails", ProductDetailsRouters);
app.use("/cart", CartRoutes); 
app.use("/payment", PaymentGatewayRoutes);
app.use('/order', orderRoutes); 

app.use("/images", express.static("public/uploads"));
app.use(express.static(path.join(__dirname, "public")));

console.log('JWT_SECRET:', process.env.JWT_SECRET); 

app.listen(PORT, () => {
    console.log(`Server Started and Running at ${PORT}`);
});
 