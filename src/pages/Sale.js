import ProductCard from '../components/Product/ProductCard'
import FilterBar from '../components/FilterBar/FilterBar'
import SortBar from '../components/SortBar/SortBar'
import '../styles/products.css'
import { useMemo, useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import ProductCardSkeleton from '../components/ProductSkeleton/ProductCardSkeleton';
import { motion } from "framer-motion";

const Sale = () => {
  const [sortBy, setSortBy] = useState('default');
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch sale products from Firestore
  useEffect(() => {
    const fetchSaleProducts = async () => {
      try {
        setLoading(true);
        // Query only products where "isSale" is true
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          .filter(product => product.isSale === true); // Filter after fetching

        console.log("Sale products fetched:", productsData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching sale products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSaleProducts()

  }, [])


  const sortedProducts = useMemo(() => {
    let filteredProducts = [...products];

    switch (sortBy) {
      case 'price-low-high':
        filteredProducts.sort((a, b) => {
          const priceA = typeof a.discountedPrice === 'number' ? a.discountedPrice : parseInt(a.discountedPrice || 0);
          const priceB = typeof b.discountedPrice === 'number' ? b.discountedPrice : parseInt(b.discountedPrice || 0);
          return priceA - priceB;
        });
        break;
      case 'price-high-low':
        filteredProducts.sort((a, b) => {
          const priceA = typeof a.discountedPrice === 'number' ? a.discountedPrice : parseInt(a.discountedPrice || 0);
          const priceB = typeof b.discountedPrice === 'number' ? b.discountedPrice : parseInt(b.discountedPrice || 0);
          return priceB - priceA;
        });
        break;
      default:
        break;
    }

    return filteredProducts;
  }, [products, sortBy]);

  if (loading) {
    return (
      <section className="product-container">
        <div className="product-controls">
          <FilterBar selectedCategory="" onCategoryChange={() => { }} disabled />
          <SortBar sortBy={sortBy} onSortChange={setSortBy} />
        </div>

        <div className="product-grid">
          {[...Array(8)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className='product-container'>
      <div className='product-controls'>
        <div style={{ visibility: 'hidden' }}>
          <FilterBar selectedCategory="sale" onCategoryChange={() => { }} />
        </div>
        <SortBar
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>
      <div className='product-grid'>
        {sortedProducts.map(product => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProductCard {...product} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Sale