import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import { removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css';

const Orders = () => {
    const [products, setProducts] = useProducts();
    /* amra aikhane useCart er moddhe products gulo k pathaitaselam kinto amra products k remove kore dise amra direct cart theke load korbo tai products k useCart() theke remove korse...amra useCart er moddhe product k pathacchi nh...amra direct useCart hook er moddhe POST method kore data load kortase object theke keys gulo k access kortase and ter moddhe storedCArt set kortase then POST method use kore amra JSON.stringify kore body er moddhe pathacchi....useCart er moddhe gele dekhte parbo..  */
    const [cart, setCart] = useCart();
    const navigate = useNavigate();
    const handleRemoveProduct = product =>{
        const rest = cart.filter(pd => pd._id !== product._id);
        setCart(rest);
        removeFromDb(product._id);
    }

    
    return (
        <div className='shop-container'>
            <div className="review-items-container">
                {
                    cart.map(product => <ReviewItem
                        key={product._id}
                        product ={product}
                        handleRemoveProduct = {handleRemoveProduct}
                    ></ReviewItem>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                        <button onClick={()=>navigate('/shipment')}>Proceed Shipping </button>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;