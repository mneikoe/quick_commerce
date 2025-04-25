import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../actions/userAction";
import Topbar from "../components/ui/Topbar";
import ProductGrid from "../components/ui/products/ProductGrid";
import product from "../components/ui/products/Product.json";
import Button from "../components/ui/Button";
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
} from "lucide-react";
import CategoryCard from "../components/ui/category/CategoryCard";
import CategoryData from "../components/ui/category/category.json";
import CategoryCarousel from "../components/ui/category/CategoryCarousel";
const HomePage = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  return (
    <>
      <Topbar />
      <div className="h-auto px-4 py-8 mx-auto max-w-7xl ">
        {/* Hero Section */}
        <div className="px-4 py-20 mb-16 text-center shadow-md bg-gradient-to-r from-green-100 via-white to-green-100 rounded-xl">
          <h1 className="mb-4 text-5xl font-extrabold leading-tight text-green-700 md:text-6xl animate-fade-in-up">
            Welcome to <span className="text-green-900">ShopMart</span>
          </h1>

          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-700 delay-75 md:text-xl animate-fade-in-up">
            Your trusted online grocery partner – delivering freshness and
            savings at your doorstep!
          </p>

          <div className="flex flex-col items-center justify-center gap-4 mt-8 delay-150 sm:flex-row animate-fade-in-up">
            <Button className="flex items-center gap-2 px-6 py-3 text-lg font-semibold text-white bg-green-600 rounded-full shadow-lg hover:bg-green-700">
              <ShoppingCart size={20} /> Shop Now
            </Button>

            <Button
              variant="contained"
              className="flex items-center gap-2 px-6 py-3 text-lg font-semibold text-green-700 border-green-600 rounded-full hover:bg-green-50"
            >
              <Compass size={20} /> Explore More
            </Button>
          </div>
        </div>
        {/* category  */}
        <div>
          <h2 className="mb-6 text-3xl font-bold text-center text-green-700 md:text-left">
            Category
          </h2>
          <CategoryCarousel />
        </div>
        {/* Why We Are the Best Section */}
        <div className="items-center justify-between gap-10 p-8 mb-16 shadow-sm bg-green-50 rounded-xl md:flex">
          {/* Left Side Image */}
          <div className="flex justify-center mb-8 md:w-1/2 md:mb-0 animate-fade-in-left">
            <img
              src="/grocery.avif"
              alt="Grocery Girl"
              className="max-w-full border border-green-200 rounded-lg shadow-xl "
            />
          </div>

          {/* Right Content */}
          <div className="space-y-6 md:w-1/2 animate-fade-in-right">
            <h2 className="mb-4 text-3xl font-extrabold text-green-700 md:text-4xl">
              Why We Are the Best?
            </h2>

            {/* Features List */}
            <div className="space-y-4">
              {[
                {
                  icon: <Truck className="w-6 h-6 text-green-600" />,
                  title: "Fastest Delivery",
                  desc: "Groceries delivered in under 30 minutes.",
                },
                {
                  icon: <Leaf className="w-6 h-6 text-green-600" />,
                  title: "Freshness Guaranteed",
                  desc: "Fresh produce straight from the source.",
                },
                {
                  icon: <DollarSign className="w-6 h-6 text-green-600" />,
                  title: "Affordable Prices",
                  desc: "Quality groceries at unbeatable prices.",
                },
                {
                  icon: <Heart className="w-6 h-6 text-green-600" />,
                  title: "Trusted by Thousands",
                  desc: "Loved by 10,000+ happy customers.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 transition-all bg-white rounded-lg shadow-sm hover:shadow-md"
                >
                  <div className="mt-1">{item.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-800">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* feature products */}
        {/* <div className="mb-16">
          <h2 className="mb-6 text-3xl font-bold text-center text-green-700 md:text-left">
            Featured Products
          </h2>
          <ProductGrid products={product} />
        </div> */}

        {/* // Contact Section */}
        <div className="gap-10 p-8 text-center shadow-md bg-green-50 rounded-xl md:text-left md:flex md:justify-between md:items-center animate-fade-in-up">
          {/* Contact Info */}
          <div className="space-y-4 md:w-2/3">
            <h2 className="text-3xl font-extrabold text-green-700">
              Contact Us
            </h2>
            <p className="text-gray-600 text-md">
              Have any questions or feedback? We'd love to hear from you!
            </p>

            <div className="mt-4 space-y-3 text-gray-700">
              <p className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-green-600" />
                <span>+91-9876543210</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-green-600" />
                <span>support@ShopMart.com</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600" />
                <span>Patna, Bihar, India</span>
              </p>
            </div>
          </div>

          {/* Optional Contact Image or Icon */}
          <div className="hidden md:block md:w-1/3">
            <img
              src="/assets/contact-support.png" // Optional: update to your image
              alt="Map "
              className="w-full max-w-xs mx-auto md:mx-0"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
