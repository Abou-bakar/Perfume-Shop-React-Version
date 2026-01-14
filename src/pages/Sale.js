import ProductCard from '../components/Product/ProductCard'
import FilterBar from '../components/FilterBar/FilterBar'
import SortBar from '../components/SortBar/SortBar'
import '../styles/products.css'
import { saleProducts } from '../data/products';
import { useMemo, useState } from 'react';

const Sale = () => {
  const [sortBy, setSortBy] = useState('default');

  const sortedProducts = useMemo(() => {
    let products = [...saleProducts];

    switch (sortBy) {
      case 'price-low-high':
        products.sort((a, b) => {
          const priceA = parseFloat((a.discountedPrice || '0').replace(/[Rs.,\s]/g, ''));
          const priceB = parseFloat((b.discountedPrice || '0').replace(/[Rs.,\s]/g, ''));
          return priceA - priceB;
        });
        break;
      case 'price-high-low':
        products.sort((a, b) => {
          const priceA = parseFloat((a.discountedPrice || '0').replace(/[Rs.,\s]/g, ''));
          const priceB = parseFloat((b.discountedPrice || '0').replace(/[Rs.,\s]/g, ''));
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
          <FilterBar selectedCategory="sale" onCategoryChange={() => {}} />
        </div>
        <SortBar 
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>
      <div className='product-grid'>
        {sortedProducts.map((product) => (
          <ProductCard 
            key={product.id}
            {...product}
          />
        ))}
      </div>
    </section>
  )
}

export default Sale