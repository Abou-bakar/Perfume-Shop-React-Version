import MobileCategories from '../components/Categories/CategoriesMobile'
import Hero from '../components/Hero/Hero'
import TopSellers from '../components/TopSellers/TopSellers'
import ImageGallery from '../components/ImageGallery/ImageGallery'
import TopDeals from '../components/TopDeals/TopDeals'
import Landscape from '../components/Landscape/Landscape'


const Home = () => {
  return (
    <>
    <Hero />
    <MobileCategories />
    <TopSellers heading="Top Sellers" />
    <ImageGallery />
    <TopDeals />
    <Landscape />
    </>
  )
}

export default Home

    

    // <script src="https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js"></script>
    // <script src="../assets/js/script.js"></script>
    // <script src="../assets/js/cart.js"></script>
    // <script src="../assets/js/hamburger.js"></script>
