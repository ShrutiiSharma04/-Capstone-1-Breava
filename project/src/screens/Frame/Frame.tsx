import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../components/ui/navigation-menu";

export const Frame = (): JSX.Element => {
  const navItems = [
    { label: "Home", path: "/", active: true },
    { label: "Diagnose", path: "/diagnose", active: false },
    { label: "About", path: "/about", active: false },
    { label: "Login/Signup", path: "/auth", active: false },
  ];

  const featureCards = [
    {
      title: "AI-Powered Analysis",
      description:
        "Advanced machine learning models work together to provide accurate detection results.",
      icon: "/iconixto-solid-ai.svg",
    },
    {
      title: "Quick Results",
      description:
        "Get comprehensive analysis results within minutes, with detailed explanations.",
      icon: "/iconixto-linear-chart.svg",
    },
    {
      title: "Privacy First",
      description:
        "Your data is protected with enterprise-grade security and encryption.",
      icon: "/icon.png",
    },
  ];

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-full max-w-[1440px] relative">
        {/* Navigation */}
        <header className="flex justify-center pt-4 px-4">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-4">
              {navItems.map((item, index) => (
                <NavigationMenuItem key={index}>
                  <Link to={item.path}>
                    <NavigationMenuLink
                      className={`px-4 py-2 rounded-[32px] [font-family:'Calistoga',Helvetica] font-normal text-[#56153a] text-lg md:text-2xl text-center tracking-[0] leading-normal whitespace-nowrap transition-all ${
                        item.active
                          ? "bg-[#e4e4f0] shadow-shadow-2"
                          : "bg-[#f5f5fa] hover:bg-[#e4e4f0] shadow-[-10px_-10px_20px_#ffffff,10px_10px_20px_#aaaacc80]"
                      }`}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col items-center mt-16 md:mt-24">
          <img
            className="w-48 h-48 md:w-64 md:h-64 object-cover"
            alt="Pink ribbon breast cancer awareness"
            src="/image-1.png"
          />

          <h1 className="mt-16 md:mt-24 [font-family:'Calistoga',Helvetica] font-normal text-[#56153a] text-4xl md:text-6xl lg:text-7xl text-center leading-tight">
            Early Detection
            <br />
            Saves Lives
          </h1>

          <p className="mt-8 opacity-70 [font-family:'Calistoga',Helvetica] font-normal text-black text-lg md:text-2xl text-center leading-relaxed max-w-3xl px-4">
            Our AI-powered breast cancer detection platform combines advanced
            machine learning with medical expertise for accurate and
            early detection.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-8 md:mt-16 px-4">
            <Button className="w-full md:w-48 h-12 md:h-16 bg-[#56153a] shadow-shadow-3 rounded-[32px] [font-family:'Calistoga',Helvetica] font-normal text-white text-lg md:text-xl">
              Start Free Diagnose
            </Button>

            <Button
              className="w-full md:w-48 h-12 md:h-16 bg-[#f5f5fa] shadow-shadow-3 rounded-[32px] [font-family:'Calistoga',Helvetica] font-normal text-[#56153a] text-lg md:text-xl"
              variant="outline"
            >
              Learn More
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 md:mt-24 px-4 mb-16">
          {featureCards.map((card, index) => (
            <Card
              key={index}
              className="bg-[#e4e4f0] shadow-shadow-2 rounded-[32px] overflow-hidden border-none"
            >
              <CardContent className="p-6">
                <img
                  className="w-12 h-12 mb-6"
                  alt={card.title}
                  src={card.icon}
                />

                <h3 className="[font-family:'Calistoga',Helvetica] font-normal text-[#56153a] text-2xl mb-4">
                  {card.title}
                </h3>

                <p className="[font-family:'Calistoga',Helvetica] font-normal text-black text-lg">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Footer CTA Section */}
        <section className="w-full bg-[#56153a] py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="[font-family:'Calistoga',Helvetica] font-normal text-white text-3xl md:text-5xl mb-8">
              Take the First Step Towards Early Detection
            </h2>

            <p className="[font-family:'Calistoga',Helvetica] font-normal text-white text-lg md:text-2xl mb-8">
              Our platform is designed to support you every step of the way. Start
              your free check today.
            </p>

            <Button
              className="w-48 h-12 md:h-16 bg-white text-[#56153a] hover:bg-gray-100 rounded-[32px] [font-family:'Calistoga',Helvetica] font-normal text-lg md:text-xl"
              variant="outline"
            >
              Start Free Diagnose
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};