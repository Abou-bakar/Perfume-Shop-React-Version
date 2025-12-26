import ProductCard from '../components/Product/ProductCard'

import '../styles/products.css'
import product1 from '../assets/images/product1.png'
import product2 from '../assets/images/product2.png'
import product3 from '../assets/images/product3.png'
import product4 from '../assets/images/product4.png'
import product5 from '../assets/images/product5.png'
import product6 from '../assets/images/product6.png'
import FilterBar from '../components/FilterBar/FilterBar'
import SortBar from '../components/SortBar/SortBar'

const Products = () => {
  return (
    <>

    <section className="product-container">
      <div className="product-controls">
        <FilterBar />
        <SortBar  />
      </div>
      <div className="product-grid">
        <ProductCard 
        image={product1}
        title="Mint"
        price="Rs. 15,000"
        />
        <ProductCard 
        image={product2}
        title="Pink Floral"
        price="Rs. 15,000"
        />
        <ProductCard 
        image={product3}
        title="Paradox"
        price="Rs. 15,000"
        />
        <ProductCard 
        image={product4}
        title="Coco"
        price="Rs. 15,000"
        />
        <ProductCard 
        image={product5}
        title="Amouage"
        price="Rs. 15,000"
        />
        <ProductCard 
        image={product6}
        title="Coco Noir"
        price="Rs. 15,000"
        />
        <ProductCard 
        image="https://lattafapakistan.com/cdn/shop/files/Teriaq-Intense-61522983.png?v=1753977612"
        title="Teriaq Intense"
        price="Rs. 15,000"
        />
        <ProductCard 
        image="https://lattafapakistan.com/cdn/shop/files/Ameer-Al-Oudh-Intense-61477394.png?v=1753974236"
        title="Ameer-Al-Oudh Intense"
        price="Rs. 15,000"
        />
      </div>
    </section>
    </>
  )
}

export default Products