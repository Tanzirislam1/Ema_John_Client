import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const { cart } = props;
    /* cart add kore onno page e gale cart abar 0 hoye jacche tai amra console kore cart add kore dekhtase page onojai cart change hocche aita hoyoar kotha nh aita hocche karon amra pagination use kore cart add kortase */
    console.log(cart);
    console.log(props.children);
    let total = 0;
    let shipping = 0;
    let quantity = 0;
    for(const product of cart){
        quantity = quantity + product.quantity;
        total = total + product.price * product.quantity;
        shipping = shipping + product.shipping;
    }
    const tax = parseFloat((total * 0.1).toFixed(2));
    const grandTotal = total + shipping + tax;
    return (
        <div className='cart'>
            <h4>Order Summary</h4>
            <p>Selected Items: {quantity}</p>
            <p>Total price: ${total}</p>
            <p>Total Shipping: ${shipping}</p>
            <p>Tax: {tax}</p>
            <h5>Grand Total: {grandTotal.toFixed(2)}</h5>
            {props.children}
        </div>
    );
};

export default Cart;