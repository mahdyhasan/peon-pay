// src/pages/AboutUsPage.tsx

import React from 'react';

const AboutUsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900">About PeonPay</h1>
      <div className="mt-6 prose prose-lg text-gray-600">
        <p>
          Welcome to PeonPay, where we believe that managing your money should be simple, secure, and stress-free. Founded in 2023, our mission is to revolutionize the way people handle their daily transactions.
        </p>
        <h2>Our Mission</h2>
        <p>
          To provide a seamless and intuitive payment platform that empowers individuals and businesses to transact with confidence and ease.
        </p>
        <h2>Our Vision</h2>
        <p>
          To become the world's most trusted and user-friendly digital payment solution, bridging financial gaps and fostering global connectivity.
        </p>
        <h2>Our Values</h2>
        <ul>
          <li><strong>Customer-Centricity:</strong> Our users are at the heart of everything we do.</li>
          <li><strong>Security:</strong> We prioritize the safety and security of your funds and data above all else.</li>
          <li><strong>Innovation:</strong> We constantly strive to improve and innovate our platform.</li>
          <li><strong>Integrity:</strong> We operate with transparency and honesty in all our dealings.</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutUsPage;