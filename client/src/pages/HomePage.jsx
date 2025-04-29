import React, { useState, useEffect } from "react";
import {
  Compass,
  DollarSign,
  Heart,
  Leaf,
  Mail,
  MapPin,
  Phone,
  ShoppingCart,
  Truck,
  Search,
  User,
  Menu,
  X,
  ChevronRight,
  Star,
} from "lucide-react";

// Mock data for categories
const categories = [
  { name: "Fruits & Vegetables", icon: "🍎", color: "bg-red-100" },
  { name: "Dairy & Eggs", icon: "🥛", color: "bg-yellow-100" },
  { name: "Bakery", icon: "🍞", color: "bg-amber-100" },
  { name: "Meat & Seafood", icon: "🥩", color: "bg-orange-100" },
  { name: "Beverages", icon: "🥤", color: "bg-blue-100" },
  { name: "Snacks", icon: "🍿", color: "bg-purple-100" },
  { name: "Household", icon: "🧹", color: "bg-gray-100" },
  { name: "Personal Care", icon: "🧴", color: "bg-pink-100" },
];

// Mock data for featured products
const featuredProducts = [
  {
    id: 1,
    name: "Organic Apples",
    price: 2.99,
    rating: 4.8,
    image: "/api/placeholder/200/200",
    discount: "20% OFF",
    tag: "Organic",
  },
  {
    id: 2,
    name: "Farm Fresh Eggs",
    price: 3.49,
    rating: 4.7,
    image: "/api/placeholder/200/200",
    discount: "",
    tag: "Local",
  },
  {
    id: 3,
    name: "Whole Grain Bread",
    price: 1.99,
    rating: 4.5,
    image: "/api/placeholder/200/200",
    discount: "Buy 1 Get 1",
    tag: "",
  },
  {
    id: 4,
    name: "Premium Coffee",
    price: 9.99,
    rating: 4.9,
    image: "/api/placeholder/200/200",
    discount: "",
    tag: "Premium",
  },
];

// Mock data for top deals
const topDeals = [
  {
    name: "Fresh Berries",
    discount: "30% OFF",
    image: "/api/placeholder/120/120",
    color: "bg-red-500",
  },
  {
    name: "Dairy Products",
    discount: "25% OFF",
    image: "/api/placeholder/120/120",
    color: "bg-blue-500",
  },
  {
    name: "Breakfast Items",
    discount: "Buy 2 Get 1",
    image: "/api/placeholder/120/120",
    color: "bg-yellow-500",
  },
];

const CategoryCarousel = () => {
  return (
    <div className="py-4 overflow-x-auto hide-scrollbar">
      <div className="flex space-x-4 px-2 min-w-max">
        {categories.map((category, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-sm cursor-pointer transition-all hover:shadow-md w-24 h-24 ${category.color}`}
          >
            <span className="text-2xl mb-1">{category.icon}</span>
            <span className="text-xs font-medium text-center text-gray-800">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const DealsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {topDeals.map((deal, idx) => (
        <div
          key={idx}
          className={`relative overflow-hidden rounded-xl cursor-pointer transition-transform hover:scale-105 h-36 ${deal.color}`}
        >
          <div className="absolute inset-0 flex items-center">
            <div className="pl-6 flex-1">
              <h3 className="text-white font-bold text-xl">{deal.discount}</h3>
              <p className="text-white text-sm mt-1">{deal.name}</p>
              <button className="mt-2 bg-white text-xs font-medium py-1 px-3 rounded-full flex items-center">
                Shop Now <ChevronRight size={14} className="ml-1" />
              </button>
            </div>
            <div className="w-1/3 flex justify-center">
              <img
                src={deal.image}
                alt={deal.name}
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full object-cover h-40"
        />
        {product.discount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount}
          </span>
        )}
        {product.tag && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.tag}
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-medium text-gray-800">{product.name}</h3>
        <div className="flex items-center mt-1 text-sm">
          <span className="flex items-center text-yellow-400">
            <Star fill="currentColor" size={14} strokeWidth={0} />
            <span className="ml-1 text-gray-700">{product.rating}</span>
          </span>
          <span className="ml-auto font-semibold text-green-700">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <button className="w-full mt-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition flex items-center justify-center">
          <ShoppingCart size={14} className="mr-1" /> Add to Cart
        </button>
      </div>
    </div>
  );
};

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseClasses =
    "font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2";

  const variantClasses = {
    primary: "bg-green-600 text-white hover:bg-green-700",
    outlined: "border-2 border-green-600 text-green-700 hover:bg-green-50",
    text: "text-green-700 hover:text-green-800 underline",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 pb-12">
        {/* Hero Section */}
        <section
          className={`mt-6 md:mt-8 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0 translate-y-10"}`}
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500 to-green-700">
            <div className="absolute top-0 right-0 w-1/2 h-full hidden md:block">
              <div className="h-full w-full bg-white/10 backdrop-blur-sm">
                <img
                  src="/api/placeholder/600/500"
                  alt="Fresh Groceries"
                  className="object-cover h-full w-full mix-blend-overlay opacity-70"
                />
              </div>
            </div>

            <div className="relative z-10 p-6 md:p-12 md:w-3/5">
              <h1 className="text-3xl md:text-5xl font-extrabold text-white">
                Fresh Groceries, <br />
                <span className="text-green-100">Delivered Fast</span>
              </h1>
              <p className="mt-4 text-green-50 max-w-md">
                Your trusted online grocery partner – delivering freshness and
                savings straight to your doorstep in 30 minutes or less!
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button className="px-6 py-3 rounded-full text-sm md:text-base flex items-center gap-2">
                  <ShoppingCart size={18} /> Shop Now
                </Button>
                <Button
                  variant="outlined"
                  className="px-6 py-3 rounded-full border-white text-white hover:bg-white/20 text-sm md:text-base flex items-center gap-2"
                >
                  <Compass size={18} /> How It Works
                </Button>
              </div>

              <div className="mt-8 hidden md:flex gap-6">
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Truck size={16} className="text-green-700" />
                  </div>
                  <span className="text-xs text-white">Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Leaf size={16} className="text-green-700" />
                  </div>
                  <span className="text-xs text-white">Organic Options</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 p-2 rounded-full">
                    <DollarSign size={16} className="text-green-700" />
                  </div>
                  <span className="text-xs text-white">Best Prices</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Deals Section */}
        <section className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Top Deals
            </h2>
            <Button variant="text" className="text-sm flex items-center">
              View All <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
          <DealsSection />
        </section>

        {/* Categories Section */}
        <section className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Shop By Category
            </h2>
            <Button variant="text" className="text-sm flex items-center">
              View All <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
          <CategoryCarousel />
        </section>

        {/* Features Section */}
        <section className="mt-10 py-8 px-6 bg-white rounded-2xl shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-8">
            Why Shop With Us
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: <Truck className="text-green-600" size={24} />,
                title: "Express Delivery",
                desc: "In 30 minutes or less",
              },
              {
                icon: <Leaf className="text-green-600" size={24} />,
                title: "Fresh Products",
                desc: "Farm to table quality",
              },
              {
                icon: <DollarSign className="text-green-600" size={24} />,
                title: "Best Prices",
                desc: "Lowest price guaranteed",
              },
              {
                icon: <Heart className="text-green-600" size={24} />,
                title: "Trusted by Many",
                desc: "10,000+ happy customers",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-4"
              >
                <div className="mb-3 p-3 bg-green-100 rounded-full">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Featured Products
            </h2>
            <Button variant="text" className="text-sm flex items-center">
              View All <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* App Promotion */}
        <section className="mt-10 relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="absolute top-0 right-0 h-full w-1/3 hidden md:block">
            <img
              src="/api/placeholder/300/600"
              alt="Mobile App"
              className="h-full object-cover blend-overlay"
            />
          </div>

          <div className="p-6 md:p-10 md:w-2/3">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Download Our App
            </h2>
            <p className="mt-2 text-white/80 max-w-md">
              Get exclusive deals, track your orders in real-time, and enjoy a
              seamless shopping experience.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-xl flex items-center">
                <span className="mr-2">🍎</span>
                <div className="flex flex-col items-start">
                  <span className="text-xs">Download on the</span>
                  <span className="font-medium">App Store</span>
                </div>
              </Button>
              <Button className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-xl flex items-center">
                <span className="mr-2">🤖</span>
                <div className="flex flex-col items-start">
                  <span className="text-xs">Get it on</span>
                  <span className="font-medium">Google Play</span>
                </div>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact & Support */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl shadow-sm flex flex-col items-center md:items-start text-center md:text-left">
            <Phone className="text-green-600 mb-3" size={24} />
            <h3 className="font-semibold text-gray-800">Customer Support</h3>
            <p className="text-sm text-gray-500 mt-1">
              Need help? Our team is available 24/7
            </p>
            <Button variant="text" className="mt-3 text-sm">
              Contact Us
            </Button>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm flex flex-col items-center md:items-start text-center md:text-left">
            <MapPin className="text-green-600 mb-3" size={24} />
            <h3 className="font-semibold text-gray-800">Store Locator</h3>
            <p className="text-sm text-gray-500 mt-1">
              Find our physical stores across the country
            </p>
            <Button variant="text" className="mt-3 text-sm">
              Find Stores
            </Button>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm flex flex-col items-center md:items-start text-center md:text-left">
            <Mail className="text-green-600 mb-3" size={24} />
            <h3 className="font-semibold text-gray-800">Newsletter</h3>
            <p className="text-sm text-gray-500 mt-1">
              Subscribe for deals and updates
            </p>
            <div className="mt-3 flex w-full">
              <input
                type="email"
                placeholder="Your email"
                className="py-1 px-3 text-sm bg-gray-100 rounded-l-lg flex-1 border-none focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <Button className="py-1 px-3 text-sm rounded-r-lg rounded-l-none">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-green-900 text-white mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">ShopMart</h3>
              <p className="text-green-100 text-sm">
                Your trusted online grocery partner since 2020.
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-white hover:text-green-100">
                  <span className="sr-only">Facebook</span>
                  📱
                </a>
                <a href="#" className="text-white hover:text-green-100">
                  <span className="sr-only">Twitter</span>
                  📱
                </a>
                <a href="#" className="text-white hover:text-green-100">
                  <span className="sr-only">Instagram</span>
                  📱
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-green-100">
                <li>
                  <a href="#" className="hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Products
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Categories</h3>
              <ul className="space-y-2 text-sm text-green-100">
                <li>
                  <a href="#" className="hover:text-white">
                    Fruits & Vegetables
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Dairy & Eggs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Meat & Seafood
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Beverages
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-green-100">
                <li className="flex items-start">
                  <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
                  <span>Patna, Bihar, India</span>
                </li>
                <li className="flex items-center">
                  <Phone size={16} className="mr-2 flex-shrink-0" />
                  <span>+91-9876543210</span>
                </li>
                <li className="flex items-center">
                  <Mail size={16} className="mr-2 flex-shrink-0" />
                  <span>support@ShopMart.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-green-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-green-100">
              © 2025 ShopMart. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6 text-sm text-green-100">
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white">
                FAQ
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Float-to-top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 p-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all"
        aria-label="Back to top"
      >
        <svg
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>

      {/* Add some custom styles */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
