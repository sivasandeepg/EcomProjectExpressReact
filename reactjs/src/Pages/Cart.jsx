import React from 'react';
import CartView from '../Customer/Components/Cart/CartView';
import '../Styles/Customer/CartView.css'; // Ensure the path is correct

const Cart = () => {
    return (
        <div className="cart-page-container">
            <CartView />
        </div>
    );
};

export default Cart;
 