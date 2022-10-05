import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { addToDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    // const [products, setProducts] = useProducts();
    const [cart, setCart] = useCart();

    /* load data and count data in number for pagination (get page count) : server theke number akare count k pathacchi aikhane amra state er initial value hbe 0 karon count data hocche number...then amra useEffect() er moddhe data load kortase fetch kore then amra res k json() covert kore data theke data.count kore data ta k akta variable er moddhe count  nibo.... akta pagination er jonne koto gulo data thakbe then ai data gulo er jonne koyta page dorker hbe sheita  calculation kore 1 page er moddhe koyta data rakhbo ai kajta korte amra Math.ceil(count/10) Math upor ceil kore count/10 count k devide kora hocche amader shob gulo data k koyta page er moddhe korbo sheita amra /count kore set kore dicchi...  */

    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    /* data size on 1 page : page e koyta default hisabe data dekhabo sheita hisab kore amra number count kore bole dibo...amra uporer shob gulo state er initial vlue 0 korse karon aita number but situation bujhe amrader initial value set korte hbe aikhane 0 dile hobe nh.... */
    const [size, setSize] = useState(10);

    /* Load data based on the page number and size for pagination (custom-hook-data) : amra custom hook er useEfeect kore data load korse code ta copy kore ane dynamic vabe amra query search kore ?page=${page} amra search query er moto search kore amra page ta k dynamic vabe set korse terpor & diye amra page er shate product size tao set kore ditase &size=${size}...proti page er moddhe koyta data thakbe shei jinish ta set kortase...amra pagination use kore ak page theke arek page e jete chai tahole amader button hit korte hbe abr amra jodi size o set korte jai tahole o button hit korte hbe tai amra useEffect er dependency hisabe page er size k set kore dibo jer fole data load page er upor depend korbe abr size er upor o depend korbe...  */
    const [products, setProducts] = useState([]);

    useEffect(() => {
        /* search query perameter */
        fetch(`http://localhost:5000/product?page=${page}&size=${size}`)
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [page, size]);

    /* step-1 (page-count) : load all data to productCount case */
    useEffect(() => {
        fetch('http://localhost:5000/productCount')
            .then(res => res.json())
            .then(data => {
                const count = data.count;
                const pages = Math.ceil(count / 10);
                setPageCount(pages);
            });
    }, [])

    /* amra pagination use kore cart er moddhe product add kortase kinto amader proti ta page er moddhe jei product gulo ase oi product gulo cart e add kortase shei cart gulo next page ba onno page e same product nao thakte pare karon amra pagination kore prdoct gulo set kortase and cart e add kortase tai amra jokhon cart add kortase amader cart gulo page onojai add hoye cart er moddhe save hocche nh...ai product gulo amra shop.js theke use kora jabe nh Cart theke use korte hbe amra upore useCart hook use kore data load kortase tai ai code ta comment kore dise karon useCart er moddhe amra same kaj tae korse tai amra upore hook use korse...  */
    // useEffect(() => {
    //     const storedCart = getStoredCart();
    //     const savedCart = [];
    //     for (const id in storedCart) {
    //         const addedProduct = products.find(product => product._id === id);
    //         if (addedProduct) {
    //             const quantity = storedCart[id];
    //             addedProduct.quantity = quantity;
    //             savedCart.push(addedProduct);
    //         }
    //     }
    //     setCart(savedCart);
    // }, [products])

    const handleAddToCart = (selectedProduct) => {
        console.log(selectedProduct);
        let newCart = [];
        const exists = cart.find(product => product._id === selectedProduct._id);
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else {
            const rest = cart.filter(product => product._id !== selectedProduct._id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }

        setCart(newCart);
        addToDb(selectedProduct._id);
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
                {/* create buttons for pagination : amra []array niye ter moddhe spreed operation kore Array() niye ter moddhe amra pageCount k set kore ditase terpor amra .map() kortase proti ta single page k payoar jonne amra button niye button er moddhe map perameter k call kortase dynamic vabe  */}
                <div className='pagination'>
                    {
                        [...Array(pageCount).keys()]
                            .map(number =>
                                <button
                                    className={page === number ? 'selected' : ''}
                                    onClick={() => setPage(number)}>
                                    {/* amra shudhu number k dynamic vabe call korle pagination 0 theke start hbe abar jodi number er shate + 1 kori tahole 0 er poriborte 1 theke pagination start hbe */}
                                    {number + 1}
                                </button>)
                    }
                    {/* {size} */}

                    {/* set product sizes for a single page  */}
                    <select onChange={e => setSize(e.target.value)}>
                        <option value="5">5</option>
                        <option value="10" selected>10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
            </div>

            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/orders">
                        <button>Review Order </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;