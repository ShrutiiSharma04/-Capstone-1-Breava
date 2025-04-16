import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export const Diagnose = (): JSX.Element => {
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
        <Card className="max-w-3xl mx-auto bg-white rounded-[32px] shadow-lg">
          <CardContent className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#56153a] mb-8 text-center [font-family:'Calistoga',Helvetica]">
              Breast Cancer Diagnosis
            </h1>

            <div className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-[#f5f5fa] rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-[#56153a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload files</h3>
                <p className="text-gray-500">Select and upload the files of your choice</p>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="mx-auto w-12 h-12 mb-4 text-gray-400">
                  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-lg mb-2">Choose a file or drag & drop it here</p>
                <p className="text-sm text-gray-500">JPEG, PNG, PDG, and MP4 formats, up to 500MB</p>
                <Button className="mt-4 bg-[#f5f5fa] text-[#56153a] hover:bg-[#e4e4f0]">
                  Browse File
                </Button>
              </div>

              <Button className="w-full bg-[#56153a] text-white hover:bg-[#421130] text-lg py-6 rounded-[32px]">
                Submit for Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};