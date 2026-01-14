import FilterBar from '../components/FilterBar/FilterBar'
import SortBar from '../components/SortBar/SortBar'
import ProductCard from '../components/Product/ProductCard'
import { womenProducts } from '../data/products';
import { useMemo, useState } from 'react';

const Women = () => {
  const [sortBy, setSortBy] = useState('default');

  const sortedProducts = useMemo(() => {
    let products = [...womenProducts];

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
        <div style={{ visibility: 'hidden' }}>
          <FilterBar selectedCategory="women" onCategoryChange={() => {}} />
        </div>
        <SortBar 
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
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

export default Women