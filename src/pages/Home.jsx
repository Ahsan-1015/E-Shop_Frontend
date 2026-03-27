import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/common/Loader";
import ProductCard from "../components/product/ProductCard";
import { getProducts } from "../services/productService";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              🎉 Free Shipping on Orders Over $50
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Discover Your
              <span className="block text-yellow-300">Perfect Style</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
              Explore our curated collection of premium products. From
              electronics to fashion, find everything you need at unbeatable
              prices.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/"
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-yellow-300 hover:text-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Shop Now
              </Link>
              <Link
                to="/"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                View Collections
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/20">
              <div>
                <p className="text-3xl font-bold">10K+</p>
                <p className="text-white/80 text-sm">Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl font-bold">500+</p>
                <p className="text-white/80 text-sm">Products</p>
              </div>
              <div>
                <p className="text-3xl font-bold">50+</p>
                <p className="text-white/80 text-sm">Brands</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Handpicked selections just for you. Discover our most popular items
            loved by customers worldwide.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
