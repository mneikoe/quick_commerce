import React from "react";
import { Container } from "@mui/material";
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

import Topbar from "../components/ui/Topbar";
import Button from "../components/ui/Button";

import CategoryCarousel from "../components/ui/category/CategoryCarousel";

const HomePage = () => {
  return (
    <>
      <Topbar />
      <div className="h-auto px-4 py-8 mx-auto max-w-7xl">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center px-4 py-16 text-center shadow-lg rounded-2xl bg-gradient-to-r from-green-100 via-white to-green-100 animate-fade-in-up">
          <h1 className="text-3xl font-extrabold text-green-700 md:text-5xl">
            Welcome to <span className="text-green-900">ShopMart</span>
          </h1>
          <p className="max-w-2xl mt-4 text-base text-gray-700 md:text-lg">
            Your trusted online grocery partner – delivering freshness and
            savings at your doorstep!
          </p>
          <div className="flex flex-col items-center gap-4 mt-8 sm:flex-row">
            <Button className="flex items-center gap-2 px-6 py-3 text-white bg-green-600 rounded-full hover:bg-green-700">
              <ShoppingCart size={20} /> Shop Now
            </Button>
            <Button
              variant="outlined"
              className="flex items-center gap-2 px-6 py-3 text-green-700 border-2 border-green-600 rounded-full hover:bg-green-50"
            >
              <Compass size={20} /> Explore More
            </Button>
          </div>
        </section>

        {/* Categories Section */}
        <Container maxWidth="lg" sx={{ mt: 10 }}>
          <section>
            <h2 className="mb-6 text-3xl font-bold text-center text-green-700">
              Browse Categories
            </h2>
            <CategoryCarousel />
          </section>
        </Container>

        {/* Why Choose Us Section */}
        <Container maxWidth="lg" sx={{ mt: 10 }}>
          <section className="flex flex-col items-center gap-8 p-6 shadow-md md:flex-row bg-green-50 rounded-2xl animate-fade-in-left">
            {/* Image */}
            <div className="flex justify-center flex-1 w-full">
              <img
                src="/grocery.avif"
                alt="Grocery"
                className="object-cover w-full max-w-sm shadow-lg rounded-xl"
              />
            </div>

            {/* Features */}
            <div className="flex-1 space-y-6">
              <h2 className="text-2xl font-extrabold text-green-700 md:text-4xl">
                Why Choose Us?
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                    title: "Loved by Thousands",
                    desc: "10,000+ happy customers and counting.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 transition bg-white shadow-sm rounded-xl hover:shadow-md"
                  >
                    <div>{item.icon}</div>
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
          </section>
        </Container>

        {/* Featured Products */}
        {/* Uncomment when needed */}
        {/* <section className="my-16">
          <h2 className="mb-8 text-3xl font-bold text-center text-green-700">
            Featured Products
          </h2>
          <ProductGrid products={product} />
        </section> */}

        {/* Contact Us Section */}
        <section className="flex flex-col items-center gap-8 px-6 py-10 mt-10 shadow-md bg-green-50 rounded-2xl md:flex-row animate-fade-in-up">
          {/* Contact Info */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h2 className="text-2xl font-extrabold text-green-700 md:text-3xl">
              Contact Us
            </h2>
            <p className="text-gray-600">
              Have any questions or feedback? We'd love to hear from you!
            </p>
            <div className="mt-4 space-y-3">
              <p className="flex items-center justify-center gap-2 md:justify-start">
                <Phone className="w-5 h-5 text-green-600" /> +91-9876543210
              </p>
              <p className="flex items-center justify-center gap-2 md:justify-start">
                <Mail className="w-5 h-5 text-green-600" /> support@ShopMart.com
              </p>
              <p className="flex items-center justify-center gap-2 md:justify-start">
                <MapPin className="w-5 h-5 text-green-600" /> Patna, Bihar,
                India
              </p>
            </div>
          </div>

          {/* Contact Image */}
          <div className="justify-center flex-1 hidden md:flex">
            <img
              src="/assets/contact-support.png"
              alt="Contact Support"
              className="object-contain w-full max-w-xs"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
