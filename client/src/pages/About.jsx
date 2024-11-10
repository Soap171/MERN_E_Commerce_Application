import React from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const counterAnimation = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div>
      <Navbar />
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="py-24 relative mt-5 p-5 text-white"
      >
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
            <motion.div
              className="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last"
              variants={containerVariants}
            >
              <motion.div
                className="pt-24 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex"
                variants={imageVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  className="rounded-xl object-cover"
                  src="https://pagedone.io/asset/uploads/1717741205.png"
                  alt="about Us image"
                  initial={{ filter: "blur(5px)" }}
                  animate={{ filter: "blur(0px)" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
              <motion.img
                className="sm:ml-0 ml-auto rounded-xl object-cover"
                src="https://pagedone.io/asset/uploads/1717741215.png"
                alt="about Us image"
                variants={imageVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                initial={{ filter: "blur(5px)" }}
                animate={{ filter: "blur(0px)" }}
              />
            </motion.div>
            <motion.div
              className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex"
              variants={containerVariants}
            >
              <div className="w-full flex-col justify-center items-start gap-8 flex">
                <motion.div
                  className="w-full flex-col justify-start lg:items-start items-center gap-3 flex"
                  variants={textVariants}
                >
                  <motion.h2
                    className="text-4xl font-bold font-manrope leading-normal lg:text-start text-center"
                    variants={textVariants}
                  >
                    Empowering Each Other to Succeed
                  </motion.h2>
                  <motion.p
                    className="text-gray-200 text-base font-normal leading-relaxed lg:text-start text-center"
                    variants={textVariants}
                  >
                    Every project we've undertaken has been a collaborative
                    effort, where every person involved has left their mark.
                    Together, we've not only constructed buildings but also
                    built enduring connections that define our success story.
                  </motion.p>
                </motion.div>
                <motion.div
                  className="w-full lg:justify-start justify-center items-center sm:gap-10 gap-5 inline-flex"
                  variants={statsVariants}
                >
                  <motion.div
                    className="flex-col justify-start items-start inline-flex"
                    variants={counterAnimation}
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.h3
                      className="text-4xl font-bold font-manrope leading-normal"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      33+
                    </motion.h3>
                    <motion.h6
                      className="text-base font-normal leading-relaxed"
                      variants={textVariants}
                    >
                      Years of Experience
                    </motion.h6>
                  </motion.div>
                  <motion.div
                    className="flex-col justify-start items-start inline-flex"
                    variants={counterAnimation}
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.h4
                      className="text-4xl font-bold font-manrope leading-normal"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      125+
                    </motion.h4>
                    <motion.h6
                      className="text-base font-normal leading-relaxed"
                      variants={textVariants}
                    >
                      Successful Projects
                    </motion.h6>
                  </motion.div>
                  <motion.div
                    className="flex-col justify-start items-start inline-flex"
                    variants={counterAnimation}
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.h4
                      className="text-4xl font-bold font-manrope leading-normal"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      52+
                    </motion.h4>
                    <motion.h6
                      className="text-base font-normal leading-relaxed"
                      variants={textVariants}
                    >
                      Happy Clients
                    </motion.h6>
                  </motion.div>
                </motion.div>
              </div>
              <motion.button
                className="sm:w-fit w-full px-3.5 py-2 bg-white hover:bg-gray-300 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={textVariants}
              >
                <span className="px-1.5 text-black text-sm font-medium leading-6">
                  Read More
                </span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default About;
