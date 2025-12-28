import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
import './HomePage.css';

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchParams] = useSearchParams();
  
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    };

    getHomeData();
  }, []);

  useEffect(() => {
    // Filter products based on search query
    if (searchQuery.trim()) {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.keywords && product.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchQuery.toLowerCase())
        ))
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  return (
    <>
      <title>Ecommerce Project</title>

      <Header cart={cart} />

      <div className="home-page">
        {searchQuery && (
          <div className="search-results-header">
            <h2>Search results for {searchQuery}</h2>
            <p>{filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found</p>
          </div>
        )}
        
        {filteredProducts.length === 0 && searchQuery ? (
          <div className="no-results">
            <p>No products found for {searchQuery}</p>
            <a href="/" className="link-primary">View all products</a>
          </div>
        ) : (
          <ProductsGrid products={filteredProducts} loadCart={loadCart} />
        )}
      </div>
    </>
  );
}