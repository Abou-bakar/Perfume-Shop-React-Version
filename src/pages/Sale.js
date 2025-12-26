import ProductCard from '../components/Product/ProductCard'
import FilterBar from '../components/FilterBar/FilterBar'
import SortBar from '../components/SortBar/SortBar'
import '../styles/products.css'
// import '../styles/sale.css'
const Sale = () => {
  return (
    <>

     <section className="product-container">
      <div className="product-controls">
        <FilterBar />
        <SortBar />
      </div>

     <div className="product-grid">
        <ProductCard 
        image="https://i.postimg.cc/85CvY1bC/IMG-20250908-WA0015.jpg"
        title="Ameer-Al-Oudh Intense"
        isSale={true}
        salePercent={20}
        originalPrice="Rs. 15,000"
        discountedPrice="Rs. 12,000"
        />
        <ProductCard 
        image="https://groovypakistan.com/cdn/shop/files/2_889298a9-b619-4baf-801d-1b781f99e985.jpg?v=1735233448&width=460"
        title="Teriaq Intense"
        isSale={true}
        salePercent={20}
        originalPrice="Rs. 15,000"
        discountedPrice="Rs. 12,000"
        />
        <ProductCard 
        image="https://lattafapakistan.com/cdn/shop/files/Ameer-Al-Oudh-Intense-61477394.png?v=1753974236"
        title="Ameer-Al-Oudh Intense"
        isSale={true}
        salePercent={20}
        originalPrice="Rs. 15,000"
        discountedPrice="Rs. 12,000"
        />
        <ProductCard 
        image="https://lattafapakistan.com/cdn/shop/files/The-Kingdom-for-Men-61521561.png?v=1753977803"
        title="The Kingdom for Men"
        isSale={true}
        salePercent={20}
        originalPrice="Rs. 15,000"
        discountedPrice="Rs. 12,000"
        />
        <ProductCard 
       image="https://lattafapakistan.com/cdn/shop/files/Khamrah-61480297.png?v=1753975734"
        title="Khamrah"
        isSale={true}
        salePercent={20}
        originalPrice="Rs. 15,000"
        discountedPrice="Rs. 12,000"
        />
        <ProductCard 
       image="https://lattafapakistan.com/cdn/shop/files/Asad-Bourbon-61571337.png?v=1753974640"
        title="Asad Bourbon"
        isSale={true}
        salePercent={20}
        originalPrice="Rs. 15,000"
        discountedPrice="Rs. 12,000"
        />
        <ProductCard 
       image="https://lattafapakistan.com/cdn/shop/files/Badee-Al-Oud-Honor-61570323.png?v=1753974823"
        title="Badee Al-Oud Honor"
        isSale={true}
        salePercent={20}
        originalPrice="Rs. 15,000"
        discountedPrice="Rs. 12,000"
        />
        <ProductCard 
       image="https://lattafapakistan.com/cdn/shop/files/Badee-Al-Oud-Glory-61570657.png?v=1753974783"
        title="Badee Al-Oud Glory"
        isSale={true}
        salePercent={20}
        originalPrice="Rs. 15,000"
        discountedPrice="Rs. 12,000"
        />
        <ProductCard 
       image="https://lattafapakistan.com/cdn/shop/files/Badee-Al-Oud-Glory-61570657.png?v=1753974783"
        title="Badee Al-Oud Glory"
        isSale={true}
        salePercent={20}
        originalPrice="Rs. 15,000"
        discountedPrice="Rs. 12,000"
        />
        <ProductCard 
       image="https://lattafapakistan.com/cdn/shop/files/Badee-Al-Oud-Amethyst-61570964.png?v=1753974760"
        title="Badee Al-Oud Amethyst"
        isSale={true}
        salePercent={20}
        originalPrice="Rs. 15,000"
        discountedPrice="Rs. 12,000"
        />
     </div>
    </section>
    </>
  )
}

export default Sale