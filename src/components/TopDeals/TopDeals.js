import { useState, useEffect } from 'react';
import ProductCarousel from "../ProductCarousel/ProductCarousel";
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from '../../config/firebase';
import ProductCardSkeleton from "../ProductSkeleton/ProductCardSkeleton";

const TopDeals = () => {
 const [products, setProducts] = useState([])
 const [loading, setLoading] = useState(true)

 useEffect(() => {
  const fetchTopDeals = async () => {
     try {
      setLoading(true)
      // Fetch sale products (top deals are sale items)
      const q = query(
        collection(db, "products"),
        where("isSale", "==", true),
        limit(6) // Get 6 products
      );
      const querySnapshot = await getDocs(q);
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData)
  } catch (error) {
    console.error("Error fetching top deals:", error);
  } finally {
    setLoading(false)
  }
  };

  fetchTopDeals()
 }, [])

 if (!loading && products.length === 0) {
  return null;
}

    return (
  <ProductCarousel 
    heading="Top Deals"
    products={products}
    paginationClass="deals-pagination"
    loading={loading}
    showViewAll
  />
    )
}


export default TopDeals;
