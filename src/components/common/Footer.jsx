import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-700">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Subscribe to our Newsletter
              </h3>
              <p className="text-gray-400">
                Get the latest updates on new products and upcoming sales
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-80 px-5 py-3 rounded-l-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-r-full font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6 group">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-xl blur-md opacity-60"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-purple-500/40">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
              <span className="text-2xl font-extrabold">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">E</span>
                <span className="text-white drop-shadow-md">Shop</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your one-stop destination for premium products. We bring you the
              best quality at unbeatable prices.
            </p>
            <div className="flex space-x-4">
              <SocialIcon>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </SocialIcon>
              <SocialIcon>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </SocialIcon>
              <SocialIcon>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
            </h4>
            <ul className="space-y-3">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/cart">Shopping Cart</FooterLink>
              <FooterLink to="/login">My Account</FooterLink>
              <FooterLink to="/">Track Order</FooterLink>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-bold mb-6 relative inline-block">
              Customer Service
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
            </h4>
            <ul className="space-y-3">
              <FooterLink to="/">Contact Us</FooterLink>
              <FooterLink to="/">FAQs</FooterLink>
              <FooterLink to="/">Shipping Info</FooterLink>
              <FooterLink to="/">Returns</FooterLink>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <span className="text-gray-400">
                  123 Shopping Street, City, Country
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-gray-400">support@eshop.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <span className="text-gray-400">+1 234 567 890</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              {/* Visa */}
              <div className="h-6 flex items-center">
                <svg viewBox="0 0 48 32" className="h-full w-auto opacity-60 hover:opacity-100 transition-opacity" fill="none">
                  <rect width="48" height="32" rx="4" fill="#1A1F71"/>
                  <path d="M19.5 20.5L17 12H14L16.5 20.5H19.5Z" fill="white"/>
                  <path d="M28.5 12.5C28 12.2 27.2 11.9 26.2 11.9C23.7 11.9 21.8 13.3 21.8 15.3C21.8 16.9 23.2 17.8 24.3 18.3C25.4 18.8 25.8 19.1 25.8 19.6C25.8 20.3 24.9 20.7 24 20.7C22.8 20.7 22.3 20.6 21.4 20.1L21 19.9L20.6 22.1C21.3 22.5 22.6 22.8 24 22.8C26.7 22.8 28.5 21.4 28.5 19.2C28.5 17.8 27.3 16.8 25.8 16.2C24.8 15.8 24.2 15.4 24.2 14.9C24.2 14.5 24.7 14 25.7 14C26.7 14 27.3 14.2 27.9 14.5L28.2 14.6L28.5 12.5Z" fill="white"/>
                </svg>
              </div>
              {/* Mastercard */}
              <div className="h-8 flex items-center">
                <svg viewBox="0 0 48 32" className="h-full w-auto opacity-60 hover:opacity-100 transition-opacity" fill="none">
                  <circle cx="19" cy="16" r="10" fill="#EB001B"/>
                  <circle cx="29" cy="16" r="10" fill="#F79E1B"/>
                  <path d="M24 10.3C25.7 11.5 26.9 13.3 26.9 15.5C26.9 17.7 25.7 19.5 24 20.7C22.3 19.5 21.1 17.7 21.1 15.5C21.1 13.3 22.3 11.5 24 10.3Z" fill="#FF5F00"/>
                </svg>
              </div>
              {/* PayPal */}
              <div className="h-5 flex items-center">
                <svg viewBox="0 0 60 24" className="h-full w-auto opacity-60 hover:opacity-100 transition-opacity" fill="none">
                  <path d="M23.2 3.4H24.6L23.6 20.6H22.2L23.2 3.4Z" fill="#253B8D"/>
                  <path d="M30.6 18.7C30.2 19.1 29.6 19.2 28.9 19.2C27.6 19.2 26.7 18.6 26.3 17.8L23.8 9.3H26.3V7.7H22.9L21.6 15.5C21.4 16.8 22 17.7 23 17.7C23.7 17.7 24.3 17.4 24.8 16.9L25.6 15.3H21.5V20.6H26.6C27.4 20.6 28.1 20.3 28.6 19.8L30.6 18.7Z" fill="#253B8D"/>
                  <path d="M36.4 18.2C35.9 18.9 35 19.3 34 19.3C32.6 19.3 31.7 18.5 31.7 17.3C31.7 16 32.6 15.3 34.2 15.3H35.4V14.3C35.4 12.8 34.5 12 33.3 12C32.2 12 31.6 12.5 31.2 13L30.4 12.1C31 11 32.2 10.2 33.7 10.2C35.7 10.2 37.2 11.5 37.2 14V17.9L37.3 18.2H36.4ZM34.9 17.1C35.5 17.1 36 16.9 36.4 16.5V14.8C36 15.2 35.5 15.4 34.9 15.4C34.2 15.4 33.7 15 33.7 14.3C33.7 13.6 34.2 13.3 34.9 13.3C35.5 13.3 36 13.5 36.4 13.9V12.2C36 11.8 35.5 11.6 34.9 11.6C33.6 11.6 33 12.3 33 13.3C33 14.4 33.6 15 34.9 15H35.4V17.1H34.9Z" fill="#253B8D"/>
                  <path d="M45.3 14C44.9 13.4 44.1 13 43.1 13C41.2 13 39.4 14.6 39.4 17.3C39.4 20 41.2 21.6 43.1 21.6C44.1 21.6 44.9 21.2 45.3 20.6H47.1C46.5 21.9 45 22.8 43 22.8C39.7 22.8 37.3 20.3 37.3 16.8C37.3 13.4 39.7 10.8 43 10.8C45 10.8 46.5 11.7 47.1 13H45.3V14ZM43.9 19.4C44.9 19.4 45.7 18.7 45.7 17.2C45.7 15.7 44.9 15 43.9 15C43 15 42.2 15.7 42.2 17.2C42.2 18.7 43 19.4 43.9 19.4Z" fill="#253B8D"/>
                  <path d="M56.4 18.2C55.9 18.9 55 19.3 54 19.3C52.6 19.3 51.7 18.5 51.7 17.3C51.7 16 52.6 15.3 54.2 15.3H55.4V14.3C55.4 12.8 54.5 12 53.3 12C52.2 12 51.6 12.5 51.2 13L50.4 12.1C51 11 52.2 10.2 53.7 10.2C55.7 10.2 57.2 11.5 57.2 14V17.9L57.3 18.2H56.4ZM54.9 17.1C55.5 17.1 56 16.9 56.4 16.5V14.8C56 15.2 55.5 15.4 54.9 15.4C54.2 15.4 53.7 15 53.7 14.3C53.7 13.6 54.2 13.3 54.9 13.3C55.5 13.3 56 13.5 56.4 13.9V12.2C56 11.8 55.5 11.6 54.9 11.6C53.6 11.6 53 12.3 53 13.3C53 14.4 53.6 15 54.9 15H55.4V17.1H54.9Z" fill="#253B8D"/>
                  <path d="M13.4 10.2L12.2 16.9C12 17.8 12.5 18.3 13.1 18.3H15.2L14.7 21.1L12.2 21.3L9.9 10.4H11.9L12.6 13.3H12.8L13.4 10.2Z" fill="#253B8D"/>
                  <path d="M19.5 10.2H17.2L17.6 12.9H17.4L16.3 10.2H14L15.2 14L14.9 15.6H15.1L16.1 18.2H18.4L20.2 14L19.5 10.2Z" fill="#253B8D"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300"
    >
      {children}
    </Link>
  </li>
);

const SocialIcon = ({ children }) => (
  <a
    href="#"
    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transform hover:-translate-y-1 transition-all duration-300"
  >
    {children}
  </a>
);

export default Footer;
