import React from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

function Contact() {
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const formItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <Navbar />
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="dark:bg-slate-800 p-5 mt-5"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <motion.div className="mb-4" variants={itemVariants}>
            <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
              <motion.h2
                className="font-heading mb-4 font-bold tracking-tight text-gray-900 dark:text-white text-3xl sm:text-5xl"
                variants={itemVariants}
              >
                Get in Touch
              </motion.h2>
              <motion.p
                className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-slate-400"
                variants={itemVariants}
              >
                Contact us for any questions or inquiries. We would love to hear
                from you
              </motion.p>
            </div>
          </motion.div>
          <div className="flex items-stretch justify-center">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div className="h-full pr-6" variants={containerVariants}>
                <motion.p
                  className="mt-3 mb-12 text-lg text-gray-600 dark:text-slate-400"
                  variants={itemVariants}
                >
                  If you have any questions or need help, feel free to contact
                  us. We will be happy to help you.
                </motion.p>
                <motion.ul
                  className="mb-6 md:mb-0 space-y-6"
                  variants={containerVariants}
                >
                  <motion.li
                    className="flex"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                        <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Our Address
                      </h3>
                      <p className="text-gray-600 dark:text-slate-400">
                        1230 Maecenas Street Donec Road
                      </p>
                      <p className="text-gray-600 dark:text-slate-400">
                        New York, EEUU
                      </p>
                    </div>
                  </motion.li>
                  <motion.li
                    className="flex"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                        <path d="M15 7a2 2 0 0 1 2 2"></path>
                        <path d="M15 3a6 6 0 0 1 6 6"></path>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Contact
                      </h3>
                      <p className="text-gray-600 dark:text-slate-400">
                        Mobile: +1 (123) 456-7890
                      </p>
                      <p className="text-gray-600 dark:text-slate-400">
                        Mail: tailnext@gmail.com
                      </p>
                    </div>
                  </motion.li>
                  <motion.li
                    className="flex"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                        <path d="M12 7v5l3 3"></path>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Working hours
                      </h3>
                      <p className="text-gray-600 dark:text-slate-400">
                        Monday - Friday: 08:00 - 17:00
                      </p>
                      <p className="text-gray-600 dark:text-slate-400">
                        Saturday &amp; Sunday: 08:00 - 12:00
                      </p>
                    </div>
                  </motion.li>
                </motion.ul>
              </motion.div>
              <motion.div
                className="card h-fit max-w-6xl p-5 md:p-12"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                id="form"
              >
                <motion.h2
                  className="mb-4 text-2xl font-bold dark:text-white"
                  variants={itemVariants}
                >
                  Ready to Get Started?
                </motion.h2>
                <form id="contactForm">
                  <div className="mb-6">
                    <div className="mx-0 mb-1 sm:mb-4">
                      <motion.div
                        className="mx-0 mb-1 sm:mb-4"
                        variants={formItemVariants}
                      >
                        <label
                          htmlFor="name"
                          className="pb-1 text-xs uppercase tracking-wider"
                        ></label>
                        <motion.input
                          whileFocus={{ scale: 1.01 }}
                          type="text"
                          id="name"
                          autoComplete="given-name"
                          placeholder="Your name"
                          className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                          name="name"
                        />
                      </motion.div>
                      <motion.div
                        className="mx-0 mb-1 sm:mb-4"
                        variants={formItemVariants}
                      >
                        <label
                          htmlFor="email"
                          className="pb-1 text-xs uppercase tracking-wider"
                        ></label>
                        <motion.input
                          whileFocus={{ scale: 1.01 }}
                          type="email"
                          id="email"
                          autoComplete="email"
                          placeholder="Your email address"
                          className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                          name="email"
                        />
                      </motion.div>
                    </div>
                    <motion.div
                      className="mx-0 mb-1 sm:mb-4"
                      variants={formItemVariants}
                    >
                      <label
                        htmlFor="textarea"
                        className="pb-1 text-xs uppercase tracking-wider"
                      ></label>
                      <motion.textarea
                        whileFocus={{ scale: 1.01 }}
                        id="textarea"
                        name="textarea"
                        cols="30"
                        rows="5"
                        placeholder="Write your message..."
                        className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                      ></motion.textarea>
                    </motion.div>
                  </div>
                  <motion.div
                    className="text-center"
                    variants={formItemVariants}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="w-full bg-white text-black px-6 py-3 font-xl rounded-md sm:mb-0 transition-colors hover:bg-gray-300"
                    >
                      Send Message
                    </motion.button>
                  </motion.div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}

export default Contact;
