import { useEffect, useState } from "react"
import { getStoredCart } from "../utilities/fakedb";

const useCart = () => {
    /* amra order.js theke aikhane products k destructure kore nitase nh and dependency hisabe products k set kortase nh amra keys er moddhe object theke keys k nitase ter moddhe amra storedCart k set kortase terpor amader cart e jei jei item gulo ase amara add korse ter id gulo k nitase.. id gulo object er akare ase tai amra Object theke keys gulo access kortase ter moddhe storedCart k set kortase terpor shei item gulo load kortase fetch kore and post method kore body er moddhe keys gulo k pathacchi...*/
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = [];
        const keys = Object.keys(storedCart);
        console.log(keys);

        fetch('http://localhost:5000/productByKeys', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(keys)
        })
            .then(res => res.json())
            .then(products => {
                console.log(products);
                for(const id in storedCart){
                    const addedProduct = products.find(product => product._id === id);
                    if(addedProduct){
                        const quantity = storedCart[id];
                        addedProduct.quantity = quantity;
                        savedCart.push(addedProduct);
                    }
                }
                setCart(savedCart);
            })
    }, []);

    return [cart, setCart];
}

export default useCart;