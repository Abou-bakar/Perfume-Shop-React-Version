import React from 'react'
import ProductImages from './ProductImages/ProductImages'
import ProductInfo from './ProductInfo'
import FaqItem from '../Faqtem/FaqItem'

import './ProductDetail.css'

const ProductDetail = ({product}) => {
  return (
    <div className='product-detail'>
        <ProductImages images={product.images || [product.image]} />

        <ProductInfo
        product={product}
        />
        <div className="accordion-container">
        <FaqItem question="Description"
      answer={product.description || "A premium fragrance that embodies elegance and sophistication."}/>

        <FaqItem question="How to Use?"
      answer=" <strong>Spray on Pulse Points:</strong> Apply on wrists, neck,
              behind ears, or inner elbows for a lasting fragrance. <br />
              <strong>Avoid Rubbing:</strong> Let the scent settle naturally on
              your skin. <br />
              <strong>Layer for Longevity:</strong> For a stronger scent, apply
              on moisturized skin or use a matching lotion."/>

        <FaqItem question=" Shipping & Returns"
      answer="  Shipping calculated at checkout. <br />
              <br />
              <strong>Hassle-Free Returns & Exchanges</strong> <br />
              <br />
              If you're not satisfied, we offer a 20-day return and exchange
              policy."/>


        </div>
    </div>
  )
}

export default ProductDetail