import { useState, useEffect } from 'react';
import ProductCarousel from "../ProductCarousel/ProductCarousel";
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from '../../config/firebase';

const TopSellers = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
   const fetchTopSellers = async () => {
    try {
      setLoading(true)
      const q = query(
        collection(db, "products"),
        where("isSale", "==", false),
        limit(6)
      );
      const querySnapshot = await getDocs(q);
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData)
    } catch (error) {
       console.error("Error fetching top sellers:", error);
    } finally {
      setLoading(false)
    }
   }

   fetchTopSellers()
  }, [])

  if (!loading && products.length === 0) {
  return null;
}

    return (
  <ProductCarousel 
    heading="Top Sellers"
    products={products}
    paginationClass="sellers-pagination"
    loading={loading}
  />
    )
}

export default TopSellers;
