import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  contactNo: z.string().min(10, "Contact number must be at least 10 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const Auth = (): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Diagnose", path: "/diagnose" },
    { label: "About", path: "/about" },
    { label: "Login/Signup", path: "/auth" },
  ];

  return (
    <div className="bg-[#56153a] min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="flex justify-end p-6">
        <div className="flex gap-8">
          {navItems.map((item) => (
            <Link key={item.label} to={item.path}>
              <button className="px-6 py-2 rounded-[32px] bg-white/90 [font-family:'Calistoga',Helvetica] font-normal text-[#56153a] text-2xl">
                {item.label}
              </button>
            </Link>
          ))}
        </div>
      </nav>

      <div className="flex-1 flex">
        {/* Left Side - Image */}
        <div className="flex-1 relative">
          <img
            src="public/breast_1.png"
            alt="Breast Cancer Awareness"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <Card className="w-[500px] bg-white rounded-[32px] shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-4xl font-bold text-[#56153a] mb-8 text-center [font-family:'Calistoga',Helvetica]">
                Generate Your Profile
              </h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                  {...register("firstName")}
                  placeholder="First Name"
                  className="w-full p-4 rounded-lg bg-[#e4e4f0] border-none"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{`${errors.firstName.message}`}</p>
                )}

                <input
                  {...register("lastName")}
                  placeholder="Last Name"
                  className="w-full p-4 rounded-lg bg-[#e4e4f0] border-none"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{`${errors.lastName.message}`}</p>
                )}

                <input
                  {...register("email")}
                  placeholder="Email Id"
                  type="email"
                  className="w-full p-4 rounded-lg bg-[#e4e4f0] border-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{`${errors.email.message}`}</p>
                )}

                <input
                  {...register("contactNo")}
                  placeholder="Contact No."
                  type="tel"
                  className="w-full p-4 rounded-lg bg-[#e4e4f0] border-none"
                />
                {errors.contactNo && (
                  <p className="text-red-500 text-sm">{`${errors.contactNo.message}`}</p>
                )}

                <input
                  {...register("password")}
                  placeholder="Password"
                  type="password"
                  className="w-full p-4 rounded-lg bg-[#e4e4f0] border-none"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{`${errors.password.message}`}</p>
                )}

                <input
                  {...register("confirmPassword")}
                  placeholder="Confirm Password"
                  type="password"
                  className="w-full p-4 rounded-lg bg-[#e4e4f0] border-none"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{`${errors.confirmPassword.message}`}</p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-[#56153a] text-white p-4 rounded-[32px] text-xl [font-family:'Calistoga',Helvetica]"
                >
                  Create Profile
                </Button>
              </form>

              <p className="text-center mt-4 text-[#56153a] [font-family:'Calistoga',Helvetica]">
                Already a user? Click here to{" "}
                <Link to="/login" className="text-blue-600 underline">
                  Log In
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};