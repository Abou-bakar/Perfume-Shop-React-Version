import ProductCarousel from "../ProductCarousel/ProductCarousel";

import product4 from "../../assets/images/product4.png";
import product5 from "../../assets/images/product5.png";
import product6 from "../../assets/images/product6.png";

const dealsProducts = [
  {image: product4, title: "Deal 1", price: "Rs. 15,000" },
  {image: product5, title: "Deal 2", price: "Rs. 15,000" },
  {image: product6, title: "Deal 3", price: "Rs. 15,000" },
]

const TopDeals = () => (
  <ProductCarousel 
    heading="Top Deals"
    products={[...dealsProducts, ...dealsProducts]}
    paginationClass="deals-pagination"
    showViewAll
  />
)


export default TopDeals;
