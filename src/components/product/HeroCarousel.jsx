import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

const HeroCarousel = ({ products = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  
  const discountedProducts = products
    .filter(p => p.discount && p.discount > 0)
    .slice(0, 4);

  const featuredProducts = products.slice(0, 4);

  const slides = [
    {
      id: 1,
      title: "Flash Sale",
      subtitle: "Limited Time Offer",
      description: "Get up to 50% off on premium products. Don't miss out on these amazing deals!",
      cta: "Shop Now",
      ctaLink: "/#products",
      gradient: "from-red-600 via-orange-500 to-yellow-500",
      bgImage: "https://images.unsplash.com/photo-1607082350899-7e2aa7117727?w=1920&q=80",
      category: "sale"
    },
    {
      id: 2,
      title: "New Collection",
      subtitle: "Just Arrived",
      description: "Discover the latest trends and hottest products in our new collection.",
      cta: "Explore Now",
      ctaLink: "/#products",
      gradient: "from-indigo-600 via-purple-600 to-pink-500",
      bgImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80",
      category: "new"
    },
    {
      id: 3,
      title: "Free Shipping",
      subtitle: "Delivery Info",
      description: "Enjoy free shipping on all orders over $50. Fast and reliable delivery!",
      cta: "View All",
      ctaLink: "/#products",
      gradient: "from-emerald-600 via-teal-500 to-cyan-500",
      bgImage: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1920&q=80",
      category: "shipping"
    }
  ];

  const handleCTAClick = (link) => {
    if (link.startsWith('/#')) {
      const element = document.getElementById(link.replace('/#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(link);
    }
  };

  const goToSlide = useCallback((index) => {
    if (!isAnimating && index !== currentSlide) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 700);
    }
  }, [isAnimating, currentSlide]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide, slides.length]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, goToSlide, slides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section 
      className="relative w-full overflow-hidden"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Hero carousel"
    >
      <div className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              index === currentSlide 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 translate-x-full pointer-events-none"
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-40 sm:w-56 md:w-72 h-40 sm:h-56 md:h-72 bg-white/5 rounded-full blur-3xl" />
              </div>
            </div>

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 w-full items-center">
                <div className="lg:col-span-7 text-center lg:text-left z-10">
                  <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-black/40 backdrop-blur-md rounded-full text-xs sm:text-sm font-semibold text-white mb-4 sm:mb-6 border border-white/20">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
                    {slide.subtitle}
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 sm:mb-4 leading-tight drop-shadow-lg">
                    {slide.title}
                  </h2>
                  
                  <p className="text-sm sm:text-base md:text-lg text-white/95 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0 font-medium drop-shadow-md">
                    {slide.description}
                  </p>
                  
                  <button
                    onClick={() => handleCTAClick(slide.ctaLink)}
                    className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 hover:shadow-2xl hover:shadow-white/30 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base">{slide.cta}</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>

                <div className="lg:col-span-5 hidden lg:block">
                  {index === 0 && discountedProducts.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {discountedProducts.map((product) => (
                        <button
                          key={product._id}
                          onClick={() => handleProductClick(product._id)}
                          className="group bg-white/10 backdrop-blur-md rounded-2xl p-3 hover:bg-white/20 transition-all duration-300 hover:scale-105 text-left"
                        >
                          <div className="relative overflow-hidden rounded-xl mb-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-16 object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                              -{product.discount}%
                            </div>
                          </div>
                          <div className="text-white">
                            <p className="font-semibold text-sm truncate">{product.name}</p>
                            <div className="flex items-center justify-between mt-1">
                              <span className="font-bold text-lg">${product.price}</span>
                              {product.originalPrice && (
                                <span className="text-xs text-white/60 line-through">
                                  ${product.originalPrice}
                                </span>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : index === 1 && featuredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {featuredProducts.map((product) => (
                        <button
                          key={product._id}
                          onClick={() => handleProductClick(product._id)}
                          className="group bg-white/10 backdrop-blur-md rounded-2xl p-3 hover:bg-white/20 transition-all duration-300 hover:scale-105 text-left"
                        >
                          <div className="relative overflow-hidden rounded-xl mb-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-16 object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                            {product.isNew && (
                              <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                NEW
                              </div>
                            )}
                          </div>
                          <div className="text-white">
                            <p className="font-semibold text-sm truncate">{product.name}</p>
                            <div className="flex items-center justify-between mt-1">
                              <span className="font-bold text-lg">${product.price}</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 text-center hover:bg-white/15 transition-all duration-300">
                        <div className="text-6xl sm:text-7xl mb-4">🚚</div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Free Delivery</h3>
                        <p className="text-white/80 text-sm sm:text-base mb-4">On orders over $50</p>
                        <button
                          onClick={() => handleCTAClick('/#products')}
                          className="mt-4 px-6 py-2 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors"
                        >
                          Browse Products
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all duration-500 ${
              index === currentSlide
                ? "bg-white w-8 sm:w-10"
                : "bg-black/40 hover:bg-black/60 w-3 sm:w-4"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/40 backdrop-blur-md rounded-full items-center justify-center text-white hover:bg-black/60 transition-all duration-300 z-10"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="hidden sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/40 backdrop-blur-md rounded-full items-center justify-center text-white hover:bg-black/60 transition-all duration-300 z-10"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
};

export default HeroCarousel;