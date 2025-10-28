// import { useState } from 'react';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid.jsx';
import {products} from '../../../starting-code/data/products.js';  
import './HomePage.css';

export function HomePage({ cart }) {

    // useEffect(() => {
    //     axios.get('/api/products')
    //         .then((response) => setProducts(response.data));
    // }, []);

    return (
        <>
            <Header cart={cart} />

            <title>Ecommerce Project</title>

            <div className="home-page">
                <ProductsGrid products={products}/>
            </div>
        </>
    );
}