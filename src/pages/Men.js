import ProductCard from '../components/Product/ProductCard'
import { menProducts } from '../data/products';
import '../styles/products.css'

import FilterBar from '../components/FilterBar/FilterBar'
import SortBar from '../components/SortBar/SortBar'
import { useMemo, useState } from 'react';

const Men = () => {
  const [sortBy, setSortBy] = useState('default');

  // Sort products
   const sortedProducts = useMemo(() => {
    let products = [...menProducts];

     switch (sortBy) {
      case 'sale':
        products = products.filter(product => product.isSale);
        break;
      case 'price-low-high':
        products.sort((a, b) => {
          const priceA = parseFloat((a.price || '0').replace(/[Rs.,\s]/g, ''));
          const priceB = parseFloat((b.price || '0').replace(/[Rs.,\s]/g, ''));
          return priceA - priceB;
        });
        break;
      case 'price-high-low':
        products.sort((a, b) => {
          const priceA = parseFloat((a.price || '0').replace(/[Rs.,\s]/g, ''));
          const priceB = parseFloat((b.price || '0').replace(/[Rs.,\s]/g, ''));
          return priceB - priceA;
        });
        break;
      default:
        break;
    }

    return products;
  }, [sortBy]);

  return (
    <section className='product-container'>
      <div className='product-controls'>
         {/* No filter for Men page, only sort */}
         <div style={{ visibility: 'hidden' }}>
        <FilterBar selectedCategory="men" onCategoryChange={() => {}} />
        </div>
        <SortBar sortBy={sortBy} onSortChange={setSortBy} />
      </div>
      <div className='product-grid'>
        {sortedProducts.length === 0 ? (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#666' }}>
            No products found
          </p>
        ) : (
          sortedProducts.map((product) => (
            <ProductCard 
              key={product.id}
              {...product}
            />
          ))
        )}
      </div>
    </section>
  )
}

export default Men