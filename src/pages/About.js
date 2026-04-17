import '../styles/about.css'
import aboutImg from "../assets/images/about.jpg";

const About = () => {
  return (
    <>
      <h1 className="header">ABOUT US</h1>

      <section className="abt">
        <div className="about-image">
          <img src={aboutImg} alt="" />
        </div>
      </section>

      <section className="about-desc">
        <div className="about-para">
          <h2>Our Story</h2>
          <p>
            Perfumes Mists was founded in 2020 with a passion for creating
            unique and captivating fragrances. Our mission is to provide high-quality
            perfumes that inspire confidence and self-expression.
            
            We started as a small boutique and have since grown into a beloved
            brand with a loyal customer base. Our commitment to quality and innovation
            has been the driving force behind our success, and we continue to push
            the boundaries of fragrance creation.
          </p>

          <h2>Our Philosophy</h2>
          <p>
            We believe that fragrance is an art form that allows individuals to
            express their personality and emotions. Our team of expert perfumers
            carefully crafts each scent using the finest ingredients to ensure a
            luxurious and memorable experience.

            At Perfumes Mists, we are dedicated to sustainability and ethical
            sourcing. We strive to minimize our environmental impact and support
            fair trade practices in the fragrance industry.
          </p>

          <h2>Our Vision</h2>
          <p>
            Our vision is to become a leading name in the fragrance industry,
            known for our commitment to quality, innovation, and customer satisfaction.
            We strive to create scents that resonate with our customers and become
            an essential part of their daily lives.

            We are excited about the future and look forward to continuing to create exceptional fragrances that inspire and delight our customers around the world.
          </p>
        </div>
      </section>
    </>
  )
}

export default About