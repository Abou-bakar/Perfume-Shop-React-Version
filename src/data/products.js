// Import all images
import product1 from '../assets/images/product1.png';
import product2 from '../assets/images/product2.png';
import product3 from '../assets/images/product3.png';
import product4 from '../assets/images/product4.png';
import product5 from '../assets/images/product5.png';
import product6 from '../assets/images/product6.png';

// Women's products
import eclaire from '../assets/images/Eclaire.webp';
import anaAbiyedhPoudree from '../assets/images/Ana-Abiyedh-Poudree.webp';
import haya from '../assets/images/Haya.webp';
import petra from '../assets/images/Petra.png';
import teriaq from '../assets/images/Teriaq.webp';
import theKingdomWomen from '../assets/images/The-Kingdom-for-Women.webp';
import velvetRose from '../assets/images/Velvet-Rose.webp';
import yara from '../assets/images/Yara.webp';
import layaan from '../assets/images/Layaan.png';

// Central product database
export const allProducts = {
    // Men's / General products
    mint: {
    id: "mint_001",
    image: product1,
    title: "Mint",
    price: "12,000",
    category: "men"
  },
  pinkFloral: {
    id: "pink_floral_002",
    image: product2,
    title: "Pink Floral",
    price: "10,000",
    category: "men"
  },
  paradox: {
    id: "paradox_003",
    image: product3,
    title: "Paradox",
    price: "15,000",
    category: "men"
  },
  coco: {
    id: "coco_004",
    image: product4,
    title: "Coco",
    price: "15,000",
    category: "men"
  },
  amouage: {
    id: "amouage_005",
    image: product5,
    title: "Amouage",
    price: "15,000",
    category: "men"
  },
  cocoNoir: {
    id: "coco_noir_006",
    image: product6,
    title: "Coco Noir",
    price: "15,000",
    category: "men"
  },
  teriaqIntense: {
    id: "teriaq_intense_007",
    image: "https://lattafapakistan.com/cdn/shop/files/Teriaq-Intense-61522983.png?v=1753977612",
    title: "Teriaq Intense",
    price: "15,000",
    category: "men"
  },
  ameerAlOudh: {
    id: "ameer_al_oudh_008",
    image: "https://lattafapakistan.com/cdn/shop/files/Ameer-Al-Oudh-Intense-61477394.png?v=1753974236",
    title: "Ameer-Al-Oudh Intense",
    price: "15,000",
    category: "men"
  },

  // Women's products
  eclaire: {
    id: "eclaire_009",
    image: eclaire,
    title: "Eclaire",
    price: "15,000",
    category: "women"
  },
  anaAbiyedhPoudree: {
    id: "ana_abiyedh_010",
    image: anaAbiyedhPoudree,
    title: "Ana Abiyedh Poudree",
    price: "10,000",
    category: "women"
  },
  haya: {
    id: "haya_011",
    image: haya,
    title: "Haya",
    price: "15,000",
    category: "women"
  },
  petra: {
    id: "petra_012",
    image: petra,
    title: "Petra",
    price: "18,000",
    category: "women"
  },
  teriaqWomen: {
    id: "teriaq_women_013",
    image: teriaq,
    title: "Teriaq",
    price: "16,000",
    category: "women"
  },
  theKingdomWomen: {
    id: "kingdom_women_014",
    image: theKingdomWomen,
    title: "The Kingdom For Women",
    price: "15,000",
    category: "women"
  },
  velvetRose: {
    id: "velvet_rose_015",
    image: velvetRose,
    title: "Velvet Rose",
    price: "12,000",
    category: "women"
  },
  yara: {
    id: "yara_016",
    image: yara,
    title: "Yara",
    price: "12,000",
    category: "women"
  },
  layaan: {
    id: "layaan_017",
    image: layaan,
    title: "Layaan",
    price: "12,000",
    category: "women"
  },

    // Sale items
    ameerAlOudhSale: {
    id: "ameer_al_oudh_sale_018",
    image: "https://i.postimg.cc/85CvY1bC/IMG-20250908-WA0015.jpg",
    title: "Ameer-Al-Oudh Intense",
    originalPrice: "15,000",
    discountedPrice: "12,000",
    price: "12,000",
    isSale: true,
    salePercent: 20,
    category: "sale"
  },
  teriaqIntenseSale: {
    id: "teriaq_intense_sale_019",
    image: "https://groovypakistan.com/cdn/shop/files/2_889298a9-b619-4baf-801d-1b781f99e985.jpg?v=1735233448&width=460",
    title: "Teriaq Intense",
    originalPrice: "15,000",
    discountedPrice: "12,000",
    price: "12,000",
    isSale: true,
    salePercent: 20,
    category: "sale"
  },
  theKingdomMen: {
    id: "kingdom_men_020",
    image: "https://lattafapakistan.com/cdn/shop/files/The-Kingdom-for-Men-61521561.png?v=1753977803",
    title: "The Kingdom for Men",
    originalPrice: "15,000",
    discountedPrice: "12,000",
    price: "12,000",
    isSale: true,
    salePercent: 20,
    category: "sale"
  },
  khamrah: {
    id: "khamrah_021",
    image: "https://lattafapakistan.com/cdn/shop/files/Khamrah-61480297.png?v=1753975734",
    title: "Khamrah",
    originalPrice: "15,000",
    discountedPrice: "12,000",
    price: "12,000",
    isSale: true,
    salePercent: 20,
    category: "sale"
  },
  asadBourbon: {
    id: "asad_bourbon_022",
    image: "https://lattafapakistan.com/cdn/shop/files/Asad-Bourbon-61571337.png?v=1753974640",
    title: "Asad Bourbon",
    originalPrice: "15,000",
    discountedPrice: "12,000",
    price: "12,000",
    isSale: true,
    salePercent: 20,
    category: "sale"
  },
  badeeAlOudhHonor: {
    id: "badee_honor_023",
    image: "https://lattafapakistan.com/cdn/shop/files/Badee-Al-Oud-Honor-61570323.png?v=1753974823",
    title: "Badee Al-Oud Honor",
    originalPrice: "15,000",
    discountedPrice: "12,000",
    price: "12,000",
    isSale: true,
    salePercent: 20,
    category: "sale"
  },
  badeeAlOudhGlory: {
    id: "badee_glory_024",
    image: "https://lattafapakistan.com/cdn/shop/files/Badee-Al-Oud-Glory-61570657.png?v=1753974783",
    title: "Badee Al-Oud Glory",
    originalPrice: "15,000",
    discountedPrice: "12,000",
    price: "12,000",
    isSale: true,
    salePercent: 20,
    category: "sale"
  },
  badeeAlOudhAmethyst: {
    id: "badee_amethyst_025",
    image: "https://lattafapakistan.com/cdn/shop/files/Badee-Al-Oud-Amethyst-61570964.png?v=1753974760",
    title: "Badee Al-Oud Amethyst",
    originalPrice: "15,000",
    discountedPrice: "12,000",
    price: "12,000",
    isSale: true,
    salePercent: 20,
    category: "sale"
  },
};

// Collections
export const topSellersProducts = [
    allProducts.mint,
  allProducts.pinkFloral,
  allProducts.paradox,
]

export const topDealsProducts = [
    allProducts.coco,
  allProducts.amouage,
  allProducts.cocoNoir,
]

// Filter products by category
export const menProducts = Object.values(allProducts).filter(
    product => product.category === "men"
);

export const womenProducts = Object.values(allProducts).filter(
    product => product.category === "women"
);

export const saleProducts = Object.values(allProducts).filter(
    product => product.category === "sale"
);

export const allProductsArray = Object.values(allProducts);