import FilterBar from '../components/FilterBar/FilterBar'
import SortBar from '../components/SortBar/SortBar'
import ProductCard from '../components/Product/ProductCard'
import { useMemo, useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import Loader from '../components/Loader/Loader';

const Women = () => {
  const [sortBy, setSortBy] = useState('default');
   const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch women's products from Firestore
  useEffect(() => {
     const fetchMenProducts = async () => {
   try {
    setLoading(true)
    // Query only products where "for" field is "men"
    const q = query(collection(db, "products"), where("for", "==", "women"));
    const querySnapshot = await getDocs(q);
    const productsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    setProducts(productsData)
   } catch (error) {
    console.error("Error fetching men's products:", error);
   } finally {
    setLoading(false)
   }
  };

  fetchMenProducts();
  }, [])

  // Sort products
  const sortedProducts = useMemo(() => {
    let filteredProducts = [...products];

    switch (sortBy) {
      case 'sale':
        filteredProducts = filteredProducts.filter(product => product.isSale);
        break;
      case 'price-low-high':
        filteredProducts.sort((a, b) => {
          const priceA = parseFloat((a.price || '0').replace(/[Rs.,\s]/g, ''));
          const priceB = parseFloat((b.price || '0').replace(/[Rs.,\s]/g, ''));
          return priceA - priceB;
        });
        break;
      case 'price-high-low':
        filteredProducts.sort((a, b) => {
          const priceA = parseFloat((a.price || '0').replace(/[Rs.,\s]/g, ''));
          const priceB = parseFloat((b.price || '0').replace(/[Rs.,\s]/g, ''));
          return priceB - priceA;
        });
        break;
      default:
        break;
    }

    return filteredProducts;
  }, [products, sortBy]);

  if (loading) {
    return <Loader />
  }

  return (
    <section className='product-container'>
      <div className='product-controls'>
          <FilterBar selectedCategory="women" onCategoryChange={() => {}} disabled={true} />
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