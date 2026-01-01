import ProductCarousel from "../ProductCarousel/ProductCarousel";

import product1 from "../../assets/images/product1.png";
import product2 from "../../assets/images/product2.png";
import product3 from "../../assets/images/product3.png";


  const products = [
    {
      image: product1,
      title: "Mint",
      price: "Rs. 12,000",
    },

    {
      image: product2,
      title: "Pink Floral",
      price: "Rs. 10,000",
    },
    
    {
      image: product3,
      title: "Paradox",
      price: "Rs. 15,000",
    },
  ];

const TopSellers = () => (
  <ProductCarousel 
    heading="Top Deals"
    products={[...products, ...products]}
    paginationClass="sellers-pagination"
  />
)

export default TopSellers;
