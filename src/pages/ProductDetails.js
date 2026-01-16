import ProductDetail from '../components/ProductDetail/ProductDetail'
import TopSellers from '../components/TopSellers/TopSellers'
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import ProductSkeleton from '../components/ProductSkeleton/ProductSkeleton';
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch product from Firestore
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({
            id: docSnap.id,
            ...docSnap.data()
          })
        } else {
          // Product not found, redirect to 404
          navigate('/404');
        }
      } catch (error) {
         console.error("Error fetching product:", error);
        navigate('/404');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0)
  }, [id, navigate])

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  // Show loading while fetching
  if (loading) {
    return <ProductSkeleton />
  }

  // If product not found (shouldn't reach here due to redirect, but as fallback)
  if (!product) {
    return null;
  }

  return (
    <>
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <ProductDetail key={id} product={product} />
    </motion.div>

    <TopSellers heading="You May Also Like" />
    </>
  )
}

export default ProductDetails