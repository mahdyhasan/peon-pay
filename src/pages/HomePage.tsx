
// src/pages/HomePage.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Seamless Payments, Simplified.
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl">
            PeonPay is your all-in-one solution for fast, secure, and easy money transfers. Manage your finances with confidence.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              to="/login"
              className="bg-white text-indigo-600 px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-100"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900">Why Choose PeonPay?</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold">Lightning Fast</h3>
              <p className="mt-2 text-gray-600">Send money to anyone, anywhere, in seconds.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold">Secure & Reliable</h3>
              <p className="mt-2 text-gray-600">Your transactions are protected with industry-leading security.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-semibold">Easy to Use</h3>
              <p className="mt-2 text-gray-600">Intuitive dashboard designed for a seamless user experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Ready to take control of your finances?</h2>
          <p className="mt-4 text-lg">Join thousands of users who trust PeonPay.</p>
          <Link
            to="/login"
            className="mt-8 inline-block bg-white text-indigo-600 px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-100"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;