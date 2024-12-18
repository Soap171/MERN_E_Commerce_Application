import React from "react";
import CategoryItem from "./CategoryItem";

function CategorySection() {
  const categories = [
    { href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
    { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
    { href: "/glasses", name: "Glasses", imageUrl: "/glasses.jpg" },
    { href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
    { href: "/trousers", name: "Trousers", imageUrl: "/trousers.jpg" },
    { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
  ];

  return (
    <div className="relative min-h-screen text-white overflow-hidden p-5">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-gray-100 mb-4">
          Explore Our Categories
        </h1>
        <p className="text-center text-xl text-gray-300 mb-12">
          Discover the latest trends in eco-friendly fashion
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategorySection;
