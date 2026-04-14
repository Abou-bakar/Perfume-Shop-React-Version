import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ProductCard from '../components/Product/ProductCard';
import '../styles/products.css';
import FilterBar from '../components/FilterBar/FilterBar';
import SortBar from '../components/SortBar/SortBar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import ProductCardSkeleton from '../components/ProductSkeleton/ProductCardSkeleton';

const AllProducts = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const urlSearchQuery = searchParams.get('search') || '';

    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState(urlSearchQuery);

    // Sync searchInput when URL param changes (e.g. user searches from navbar)
    useEffect(() => {
        setSearchInput(urlSearchQuery);
    }, [urlSearchQuery]);

    // Fetch products from Firestore
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const querySnapshot = await getDocs(collection(db, "products"));
                const productsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Clear search param from URL when user manually clears the input
    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearchInput(val);
        if (!val) {
            searchParams.delete('search');
            setSearchParams(searchParams);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const trimmed = searchInput.trim();
        if (trimmed) {
            setSearchParams({ search: trimmed });
        } else {
            searchParams.delete('search');
            setSearchParams(searchParams);
        }
    };

    const clearSearch = () => {
        setSearchInput('');
        searchParams.delete('search');
        setSearchParams(searchParams);
    };

    // Filter and sort products
    const filteredAndSortedProducts = useMemo(() => {
        let filtered = [...products];

        // Search filter — matches product name or category
        if (urlSearchQuery) {
            const q = urlSearchQuery.toLowerCase();
            filtered = filtered.filter(p =>
                p.productName?.toLowerCase().includes(q) ||
                p.category?.toLowerCase().includes(q) ||
                p.for?.toLowerCase().includes(q) ||
                p.description?.toLowerCase().includes(q)
            );
        }

        // Category filter
        if (selectedCategory) {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        // Sort
        switch (sortBy) {
            case 'sale':
                filtered = filtered.filter(p => p.isSale);
                break;
            case 'price-low-high':
                filtered.sort((a, b) => {
                    const pa = typeof a.price === 'number' ? a.price : parseInt(a.price || 0);
                    const pb = typeof b.price === 'number' ? b.price : parseInt(b.price || 0);
                    return pa - pb;
                });
                break;
            case 'price-high-low':
                filtered.sort((a, b) => {
                    const pa = typeof a.price === 'number' ? a.price : parseInt(a.price || 0);
                    const pb = typeof b.price === 'number' ? b.price : parseInt(b.price || 0);
                    return pb - pa;
                });
                break;
            default:
                break;
        }

        return filtered;
    }, [products, urlSearchQuery, selectedCategory, sortBy]);

    // Dynamic SEO title based on search
    const pageTitle = urlSearchQuery
        ? `Search results for "${urlSearchQuery}" — Perfumes Mists`
        : 'All Products — Perfumes Mists';

    const pageDescription = urlSearchQuery
        ? `Browse search results for "${urlSearchQuery}" at Perfumes Mists. Discover premium fragrances, perfume oils and mists in Pakistan.`
        : 'Shop premium perfumes, mists and fragrance oils for men and women at Perfumes Mists Pakistan. Free delivery available.';

    if (loading) {
        return (
            <div className="product-grid">
                {[...Array(12)].map((_, i) => (
                    <ProductCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
            </Helmet>

            <section className='product-container'>

                {/* ── Search bar on the page (synced with navbar search) ── */}
                <form className="products-search-bar" onSubmit={handleSearchSubmit}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchInput}
                        onChange={handleSearchChange}
                    />
                    {searchInput && (
                        <button type="button" className="products-search-clear" onClick={clearSearch}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    )}
                </form>

                {/* Active search indicator */}
                {urlSearchQuery && (
                    <div className="search-results-info">
                        <span>
                            Showing <strong>{filteredAndSortedProducts.length}</strong> result{filteredAndSortedProducts.length !== 1 ? 's' : ''} for <strong>"{urlSearchQuery}"</strong>
                        </span>
                        <button className="clear-search-link" onClick={clearSearch}>
                            Clear search
                        </button>
                    </div>
                )}

                <div className='product-controls'>
                    <FilterBar
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                    />
                    <SortBar
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                    />
                </div>

                <div className='product-grid'>
                    {filteredAndSortedProducts.length === 0 ? (
                        <div className="no-results">
                            <p>😕 No products found{urlSearchQuery ? ` for "${urlSearchQuery}"` : ''}.</p>
                            {urlSearchQuery && (
                                <button className="clear-search-link" onClick={clearSearch}>
                                    Clear search and view all products
                                </button>
                            )}
                        </div>
                    ) : (
                        filteredAndSortedProducts.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))
                    )}
                </div>
            </section>
        </>
    );
};

export default AllProducts;