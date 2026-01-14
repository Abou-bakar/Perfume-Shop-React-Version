import ProductDetail from '../components/ProductDetail/ProductDetail'
import TopSellers from '../components/TopSellers/TopSellers'
import { useParams, useNavigate } from 'react-router-dom';
import { allProducts } from '../data/products';
import { useEffect } from 'react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the product by ID
  const product = Object.values(allProducts).find(p => p.id === id);

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])
  

   // If product not found, redirect to 404
   useEffect(() => {
    if (!product) {
      navigate('/404');
    }
  }, [product, navigate]);

  // Show loading or nothing while redirecting
  if (!product) {
    return null;
  }

  return (
    <>
    <ProductDetail key={id} product={product}/>
    <TopSellers heading="You May Also Like" />
    </>
  )
}

export default ProductDetails