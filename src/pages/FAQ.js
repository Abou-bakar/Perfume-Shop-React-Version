import FaqItem from '../components/Faqtem/FaqItem'
import '../styles/faq.css'

const FAQ = () => {
  return (
    <>

    <section class="faqs">
      <div class="container">
        <h1>FAQ</h1>

    <FaqItem
      question="Do you have physical outlets where I can visit?"
      answer="Yes, we have two physical outlets in Karachi where you can explore
              our products in person. Feel free to visit us for an in-store
              experience, test your favorite fragrances, and get personalized
              assistance from our staff."
    />
    <FaqItem
      question="Will you accept returns on my products?"
      answer="Absolutely. We will accept returns on products you have purchased
              from shop.alharamainperfumes.com, as long as all the conditions
              outlined in our Return Policy are met."
    />
    <FaqItem
      question="When will you deliver my order?"
      answer=" Here’s what you can expect: <br></br>
              <strong>Karachi:</strong> 2-5 business days <br></br>
              <strong>Other cities:</strong> 3–7 business days <br></br>
              During peak sale periods, delivery may take longer." 
    />
    <FaqItem
      question=" How long does it take to receive my order?"
      answer="The delivery promise for our major destinations in the United Arab
              Emirates is 24hrs." 
    />
    <FaqItem
      question="My order has been shipped, what next?"
      answer="You can track your order through your account. If you do not see
              full updates, you can contact us via phone, email, or through our
              contact us form." 
    />
    <FaqItem
      question="I’ve been waiting longer than your delivery promised, what should I
            do?"
      answer="Contact us immediately via phone, email, or through our contact us
              form, so that one of our friendly customer service team will
              assist you." 
    />
    <FaqItem
      question="I do not want to receive my order, what should I do?"
      answer="As stated in our Return Policy, you can cancel your order at any
              time before the order has been shipped from our warehouse and a
              dispatch confirmation is sent. If you wish to cancel your order
              and the goods have been shipped, you will have to return the
              product, and the provisions of the Return Policy will apply." 
    />
    <FaqItem
      question="What if the item I received is damaged on delivery?"
      answer="At Al Haramain Perfumes, we always take extra care in packaging
              your items. However, in case the item you received was damaged,
              please inform us immediately. We will advise you of further action
              you should take." 
    />
    <FaqItem
      question="Can I pay with cash on delivery?"
      answer="You can pay with cash on delivery if you are ordering the goods
              within the UAE and your shipping destination is within the UAE.
              For orders to be shipped outside the UAE are not eligible for cash
              on delivery method." 
    />
    <FaqItem
      question="Can I track my order?"
      answer="You can see the exact status of each item in your order from your
              order details page. Click the <strong>Order Details</strong> button on your
              orders page for more information." 
    />
    <FaqItem
      question="Can I cancel orders that have already shipped?"
      answer="You can cancel your order until we have prepared the items
              therefore orders cannot be cancelled after they are prepared for
              shipment. In the case of returning an order, the shipping fees (if
              any) cannot be refunded." 
    />
        </div>
        </section>
    </>
  )
}

export default FAQ