import ProductCarousel from "../ProductCarousel/ProductCarousel";
import { topDealsProducts } from "../../data/products";

const TopDeals = () => {
  // Create duplicates with unique IDs
    const duplicatedProducts = [
      ...topDealsProducts,
      ...topDealsProducts.map((product)=> ({
        ...product,
        id: `${product.id}_duplicate`, // Make IDs unique
      }))
    ]

    return (
  <ProductCarousel 
    heading="Top Deals"
    products={duplicatedProducts}
    paginationClass="deals-pagination"
    showViewAll
  />
    )
}


export default TopDeals;
