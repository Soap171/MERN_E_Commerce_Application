import React from "react";
import { motion } from "framer-motion";
import heroImg from "../images/Hero.png";
function Hero() {
  return (
    <section className="bg-gray-900 py-8 antialiased md:py-16 min-h-screen flex items-center">
      <div className="mx-auto grid max-w-screen-xl px-4 pb-8 md:grid-cols-12 lg:gap-12 lg:pb-16 xl:gap-0">
        <motion.div
          className="content-center justify-self-center md:col-span-7 md:text-start"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:max-w-2xl md:text-5xl xl:text-6xl">
            Limited Time Offer!
            <br />
            Up to 50% OFF!
          </h1>
          <p className="mb-4 max-w-2xl text-gray-400 md:mb-12 md:text-lg mb-3 lg:mb-5 lg:text-xl">
            Don't Wait - Limited Stock at Unbeatable Prices!
          </p>
          <motion.a
            href="#"
            className="inline-block rounded-lg bg-primary-600 px-6 py-3.5 text-center font-medium text-black hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-800 bg-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Now
          </motion.a>
        </motion.div>
        <motion.div
          className=" md:col-span-5 md:mt-0 md:flex justify-center items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src={heroImg} alt="shopping illustration" />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
