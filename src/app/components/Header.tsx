import React from "react";
import Link from "next/link";
import { Home, Menu, ChefHat, Utensils } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gray-100 text-gray-800 p-8 shadow-md">
     
      <div className="text-center mb-8">
        <Link href="/">
          <h1 className="text-3xl lg:text-3xl font-bold text-teal-600">Your Recipe Maker</h1>
        </Link>
        <h2 className="px-6 py-2 bg-teal-100 rounded-lg mt-4 inline-block text-2xl lg:text-3xl font-semibold transition-transform transform  hover:shadow-sm">
          Good Food Good Life
        </h2>
        <p className="mt-4 text-lg lg:text-xl font-medium">
          Powered by <span className="bg-teal-500 rounded px-2 py-1 text-white hover:shadow-lg">AI!</span>
        </p>
      </div>

      {/* Navigation Section */}
      <nav className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
        <Link href="/" className="hover:text-teal-600 transition flex items-center space-x-2">
          <Home size={24} className="text-teal-500  hover:scale-105" />
          <span className="  hidden md:inline">Home</span>
        </Link>
        <Link href="/recipes" className="hover:text-teal-600 transition flex items-center space-x-2">
          <Utensils size={24} className="text-teal-500 hover:scale-105" />
          <span className="hidden md:inline">Recipes</span>
        </Link>
        <Link href="/menu" className="hover:text-teal-600 transition flex items-center space-x-2">
          <Menu size={24} className="text-teal-500 hover:scale-105" />
          <span className="hidden md:inline">Menu</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
