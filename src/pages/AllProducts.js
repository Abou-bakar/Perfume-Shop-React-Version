import { useState, useMemo, useEffect } from 'react';
import ProductCard from '../components/Product/ProductCard';
// import { allProductsArray } from '../data/products';
import '../styles/products.css';
import FilterBar from '../components/FilterBar/FilterBar';
import SortBar from '../components/SortBar/SortBar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import Loader from '../components/Loader/Loader';

const AllProducts = () => {
    const [selectedCategory, setSelectedCategory] = useState('')
    const [sortBy, setSortBy] = useState('default')
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

// Fetch products from Firestore
useEffect(() => {
  const fetchProducts = async () => {
  try {
    setLoading(true)
    const querySnapshot = await getDocs(collection(db, "products"))
    const productsData = querySnapshot.docs.map(doc => {
       const data = doc.data();
        console.log('Raw Firebase data:', data);  // ADD THIS
        return data;
    })
    console.log("✅ Fetched from Firebase:", productsData)
    setProducts(productsData)
  } catch (error) {
    console.error("Error fetching products:", error)
  } finally {
    setLoading(false)
  }
}
fetchProducts()
}, [])

    // Filter and sort products
    const filteredAndSortedProducts = useMemo(() => {
        let filteredProducts = [...products]

        // Filter by category
        if (selectedCategory) {
            filteredProducts = filteredProducts.filter(product => product.category === selectedCategory)
        }

        // Sort products
        switch (sortBy) {
            case 'sale':
                filteredProducts = filteredProducts.filter(product => product.isSale)
                break;
            case 'price-low-high':
                filteredProducts.sort((a, b) => {
                    const priceA = parseFloat((a.price || '0').replace(/[Rs.,\s]/g, ''))
                    const priceB = parseFloat((b.price || '0').replace(/[Rs.,\s]/g, ''))
                     return priceA - priceB;
                })
                break;
                case 'price-high-low':
                    filteredProducts.sort((a, b) => {
                    const priceA = parseFloat((a.price || '0').replace(/[Rs.,\s]/g, ''))
                    const priceB = parseFloat((b.price || '0').replace(/[Rs.,\s]/g, ''))
                    return priceB - priceA;
                     });
                     break;
                     case 'best-selling':
                     
                     break;
            default:
                // Default sorting (original order)
                break;
        }

        return filteredProducts;
    }, [products, selectedCategory, sortBy])

    if(loading) {
      return <Loader />
    }

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
}

export default AllProducts