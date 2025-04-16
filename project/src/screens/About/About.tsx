import React from "react";
import { Link } from "react-router-dom";

export const About = (): JSX.Element => {
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Diagnose", path: "/diagnose" },
    { label: "About", path: "/about" },
    { label: "Login/Signup", path: "/auth" },
  ];

  return (
    <div className="bg-[#f5f5fa] min-h-screen">
      {/* Navigation */}
      <nav className="flex justify-end p-4 bg-white shadow-md">
        <div className="flex gap-4">
          {navItems.map((item) => (
            <Link key={item.label} to={item.path}>
              <button className="px-4 py-2 rounded-[32px] bg-[#f5f5fa] hover:bg-[#e4e4f0] transition-colors [font-family:'Calistoga',Helvetica] font-normal text-[#56153a] text-lg md:text-xl">
                {item.label}
              </button>
            </Link>
          ))}
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl text-[#56153a] mb-8 [font-family:'Calistoga',Helvetica]">
            About Our Platform
          </h1>

          <div className="bg-white rounded-[32px] shadow-lg p-8 mb-8">
            <p className="text-lg mb-6">
              Our breast cancer detection platform combines advanced machine learning models with medical expertise to provide accurate and reliable screening assistance.
            </p>
            <p className="text-lg mb-6">
              We utilize three powerful algorithms:
              <br />
              SVM, KNN, and NAIVE BAYESIAN, each bringing unique strengths to the detection process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-[32px] p-6 text-center shadow-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#56153a] rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#56153a]">Reliable</h3>
              <p className="text-gray-600">High accuracy rates with multiple model validation</p>
            </div>

            <div className="bg-white rounded-[32px] p-6 text-center shadow-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#56153a] rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#56153a]">Fast</h3>
              <p className="text-gray-600">Quick results without compromising accuracy</p>
            </div>

            <div className="bg-white rounded-[32px] p-6 text-center shadow-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#56153a] rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#56153a]">Intelligent</h3>
              <p className="text-gray-600">Advanced ML algorithms for precise detection</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};