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
        <h4>
          Since its inception in 2007, Perfumes has perfected its product
          portfolio as a perfume house, and its fragrances are now present in
          over 120 countries across the GCC region, Europe, Australia, USA,
          Africa and Russia and more.
        </h4>
        <p>
          <br></br>
          AFNAN is a brand that has showcased that it is more than just
          perfumes: it is design, experience, expertise.
          <br></br>
          <br></br>
          AFNAN has provided essential memories for local and international
          markets, bringing to life key experiences through each design.
          <br></br>
          <br></br>
          Our designs reflect the unique and crafted experience our scents and
          packaging offer to the market as well as our heritage and unique
          quality.
          <br></br>
          <br></br>
          We are inspired and motivated by an organic love for the perfume
          industry, as well as for a love of caring for the end user. From the
          ingredient's design up to the bottle's feel, AFNAN markets to a
          sophisticated yet youthful generation with multicultural consumers.
          <br></br>
          <br></br>
          Over the years, AFNAN has built a generation of perfume expertise
          through a brand driven by an explorer spirit, finding new collections,
          directions and experiences to share with the market. brings years of
          perfume expertise, providing exclusive memories to buyers.
          <br></br>
          <br></br>
          According to <strong>Imran Fazlani,</strong> Founder and Managing
          Director of Afnan Perfumes, the UAE possesses a market that is very
          central and developed in a way that helps Afnan Perfumes' suppliers
          and customers meet and explore business opportunities.
          <br></br>
          <br></br>
          Being the nose of the business, Imran Fazlani has created a trade that
          can challenge the market by building unique, detailed, crafted
          fragrances that inspire experiences through product quality and
          design.
          <br></br>
          <br></br>
          Building his product portfolio with an intention to share a connection
          to different life experiences, Mr.Fazlani also helps develop the
          curiosity and desire of consumers looking for an exotic feel of mixed
          ethnics in the UAE.
          <br></br>
          <br></br>
          Succeeding in his goal to build a unique perfume house, Mr.Fazlani,
          with his 20 years of expertise, has established a one-of-a-kind scent
          organization through organic growth, driven by life knowledge and
          independent motivation. These elements have inspired every collection,
          all produced with conviction and direction.
        </p>
      </div>
    </section>
    </>
  )
}

export default About