import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCard = [];

        // step-1 : get id 
        for (const id in storedCart) {
            // step-2 : get the product by using id 
            const addedProduct = products.find(product => product.id ===id)
            //console.log(addedProduct)

            // step 3 get quantity of the product
           if(addedProduct){
            const quantity = storedCart[id];
            addedProduct.quantity  = quantity ;
            // step 4: add the addedProduct to the saved cart 
            savedCard.push(addedProduct);
           }

        }
        //step -5: set the cart
        setCart(savedCard);
    }, [products])

   
    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart)
        addToDb(product.id)
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(product => <Product key={product.id} product={product} handleAddToCart={handleAddToCart} ></Product>)
                }
            </div>
            <div className="card-container">
                <Cart cart={cart} />
            </div>
        </div>
    );
};

export default Shop;