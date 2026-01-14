import { useState, useMemo } from 'react';
import ProductCard from '../components/Product/ProductCard';
import { allProductsArray } from '../data/products';
import '../styles/products.css';
import FilterBar from '../components/FilterBar/FilterBar';
import SortBar from '../components/SortBar/SortBar';

const AllProducts = () => {
    const [selectedCategory, setSelectedCategory] = useState('')
    const [sortBy, setSortBy] = useState('default')

    // Filter and sort products
    const filteredAndSortedProducts = useMemo(() => {
        let products = [...allProductsArray]

        // Filter by category
        if (selectedCategory) {
            products = products.filter(product => product.category === selectedCategory)
        }

        // Sort products
        switch (sortBy) {
            case 'sale':
                products = products.filter(product => product.isSale)
                break;
            case 'price-low-high':
                products.sort((a, b) => {
                    const priceA = parseFloat((a.price || '0').replace(/[Rs.,\s]/g, ''))
                    const priceB = parseFloat((b.price || '0').replace(/[Rs.,\s]/g, ''))
                     return priceA - priceB;
                })
                break;
                case 'price-high-low':
                    products.sort((a, b) => {
                    const priceA = parseFloat((a.price || '0').replace(/[Rs.,\s]/g, ''))
                    const priceB = parseFloat((a.price || '0').replace(/[Rs.,\s]/g, ''))
                    return priceB - priceA;
                     });
                     break;
                     case 'best-selling':
                     
                     break;
            default:
                // Default sorting (original order)
                break;
        }

        return products;
    }, [selectedCategory, sortBy])

    return (
        <section className='product-container'>
            <div className='product-controls'>
        <FilterBar 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <SortBar 
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>
      <div className='product-grid'>
        {filteredAndSortedProducts.length === 0 ? (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#666' }}>
            No products found
          </p>
        ) : (
          filteredAndSortedProducts.map((product) => (
            <ProductCard 
              key={product.id}
              {...product}
            />
          ))
        )}
      </div>
        </section>
    )
  return (
    <div>AllProducts</div>
  )
}

export default AllProducts