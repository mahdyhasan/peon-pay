// src/pages/AboutUsPage.tsx

import React from 'react';

const AboutUsPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About PeonPay</h1>
          
          <div className="prose max-w-none text-gray-600">
            <p className="text-lg leading-relaxed mb-4">
              Founded in 2024, PeonPay was born from a simple idea: sending money should be as easy as sending a message. We are a team of dedicated developers and finance professionals committed to creating a secure, fast, and user-friendly payment platform for everyone.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Mission</h2>
            <p className="mb-4">
              Our mission is to democratize financial services by providing a transparent and low-cost platform for personal and business transactions. We believe in empowering our users with the tools they need to manage their money efficiently and safely.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Values</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Security First:</strong> We use industry-leading encryption and security practices to protect your data and funds.</li>
              <li><strong>Customer-Centric:</strong> Your experience is our top priority. We are always listening to your feedback to improve our service.</li>
              <li><strong>Innovation:</strong> We are constantly exploring new technologies to make payments faster and more accessible.</li>
              <li><strong>Integrity:</strong> We operate with transparency and honesty. No hidden fees, no surprises.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Meet the Team</h2>
            <p>
              We are a diverse group of engineers, designers, and financial experts spread across the globe, united by our passion for building a better financial future.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;