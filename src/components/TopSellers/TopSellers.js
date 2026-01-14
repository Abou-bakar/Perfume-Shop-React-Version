import ProductCarousel from "../ProductCarousel/ProductCarousel";
import { topSellersProducts } from "../../data/products";

const TopSellers = () => {
  // Create duplicates with unique IDs
  const duplicatedProducts = [
    ...topSellersProducts,
    ...topSellersProducts.map((product) => ({
      ...product,
      id: `${product.id}_duplicate`, // Make IDs unique
    }))
  ];

    return (
  <ProductCarousel 
    heading="Top Sellers"
    products={duplicatedProducts}
    paginationClass="sellers-pagination"
  />
    )
}

export default TopSellers;
