import React from 'react';

function About() {
  return (
    <div className="bg-[#bebebe] text-gray-800 px-6 py-12 min-h-screen flex justify-center">
      <div className="max-w-3xl h-100 bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">About Us</h1>

        <p className="text-lg mb-4 leading-relaxed">
          <span className="font-semibold text-[#d2b48c]">E-Commerce</span> is a modern online shopping platform offering quality tech gadgets at affordable prices. We focus on user experience, fast delivery, and secure transactions.
        </p>

        <p className="text-lg mb-4 leading-relaxed">
          Built using the latest web technologies, our platform ensures speed, responsiveness, and reliability across all devices.
        </p>

        <p className="text-lg mb-4 leading-relaxed">
          Our goal is simple — to provide a hassle-free shopping experience with trusted service and continuous innovation.
        </p>

        <p className="text-sm text-gray-500 text-center mt-6">
          © {new Date().getFullYear()} E-Commerce. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default About;
