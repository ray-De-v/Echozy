import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { assets } from "./../assets/assets";
import { useAppContext } from "../Context/Context";

const LandingPage = () => {
  const { navigateTo } = useAppContext();
  const [currentImage, setCurrentImage] = useState(0);

  // 1️⃣ Page-specific SEO meta
  useEffect(() => {
    document.title = "Echozy – Connect with your Community";

    const updateMeta = (selector, attr, value, isProperty = false) => {
      try {
        const meta = document.querySelector(selector);
        if (meta) {
          meta.setAttribute(attr, value);
        } else {
          const newMeta = document.createElement("meta");
          if (isProperty) newMeta.setAttribute("property", selector.split('"')[1]);
          else newMeta.name = selector.split('"')[1];
          newMeta.setAttribute(attr, value);
          document.head.appendChild(newMeta);
        }
      } catch (error) {
        console.warn("Meta update failed:", error);
      }
    };

    updateMeta(
      'meta[name="description"]',
      "content",
      "Welcome to Echozy, a modern social media platform to connect, share moments, and explore communities."
    );

    updateMeta('meta[property="og:title"]', "content", "Echozy – Connect with your Community", true);
    updateMeta(
      'meta[property="og:description"]',
      "content",
      "Welcome to Echozy, a modern social media platform to connect, share moments, and explore communities.",
      true
    );
    updateMeta('meta[property="og:url"]', "content", "https://echozy.vercel.app/", true);
    updateMeta('meta[property="og:image"]', "content", "https://echozy.vercel.app/favicon-16x16.png", true);
  }, []);

  // 2️⃣ Background images - memoized to prevent re-creation
  const backgroundImages = useMemo(
    () => [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&auto=format&fit=crop&w=1932&q=80",
    ],
    []
  );

  // 3️⃣ Rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // 4️⃣ Optimize floating particles - fewer on mobile
  const particleCount = typeof window !== "undefined" && window.innerWidth < 768 ? 6 : 15;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
      {/* Dynamic Background Images */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        {backgroundImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img}
              alt="Landing Background"
              loading="lazy"
              className="w-full h-full object-cover mix-blend-overlay"
            />
          </div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-transparent to-purple-900/70"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(particleCount)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{ willChange: "transform" }}
            initial={{ x: Math.random() * 100 + "vw", y: Math.random() * 100 + "vh" }}
            animate={{
              x: [null, Math.random() * 100 + "vw"],
              y: [null, Math.random() * 100 + "vh"],
            }}
            transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, repeatType: "reverse" }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-3xl">
          {/* Logo */}
          <motion.div className="flex justify-center mb-6" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-blue-600">E</span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Connect with your <span className="text-yellow-300">community</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Welcome to Echozy, where personalities meet personalities and thoughts meet thoughts.
          </motion.p>

          {/* Features */}
          <motion.div className="flex flex-wrap justify-center gap-6 mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }}>
            {["Share Moments", "Join Communities", "Discover People"].map((feature, i) => (
              <motion.div key={i} className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <span className="text-white text-sm font-medium">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Button */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9, duration: 0.6 }} className="mt-8">
          <motion.button whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.3)" }} whileTap={{ scale: 0.95 }} onClick={() => navigateTo("/login")} className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg flex items-center gap-2">
            Get Started
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              →
            </motion.span>
          </motion.button>
        </motion.div>

        {/* App stats */}
        <motion.div className="mt-16 grid grid-cols-3 gap-8 text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.8 }}>
          {["1M+ Users", "100+ Communities", "99% Happy"].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-bold">{stat.split(" ")[0]}</div>
              <div className="text-sm opacity-80">{stat.split(" ").slice(1).join(" ")}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
