// import React, { useState, useEffect, useMemo } from "react";
// import { motion } from "framer-motion";
// import { assets } from "./../assets/assets";
// import { useAppContext } from "../Context/Context";
// import { Link } from "react-router-dom";

// const LandingPage = () => {
//   const { navigateTo } = useAppContext();
//   const [currentImage, setCurrentImage] = useState(0);

//   // 1️⃣ Page-specific SEO meta
//   useEffect(() => {
//     document.title = "Echozy – Connect, Share & Grow Your Social Network";

//     const updateMeta = (selector, attr, value, isProperty = false) => {
//       try {
//         const meta = document.querySelector(selector);
//         if (meta) {
//           meta.setAttribute(attr, value);
//         } else {
//           const newMeta = document.createElement("meta");
//           if (isProperty) newMeta.setAttribute("property", selector.split('"')[1]);
//           else newMeta.name = selector.split('"')[1];
//           newMeta.setAttribute(attr, value);
//           document.head.appendChild(newMeta);
//         }
//       } catch (error) {
//         console.warn("Meta update failed:", error);
//       }
//     };

//     updateMeta(
//       'meta[name="description"]',
//       "content",
//       "Join Echozy, the modern social media platform to share posts, connect with friends, discover communities and grow your personal network. Sign up free today."
//     );
//     updateMeta('meta[property="og:title"]', "content", "Echozy – Connect, Share & Grow Your Social Network", true);
//     updateMeta(
//       'meta[property="og:description"]',
//       "content",
//       "Join Echozy, the modern social media platform to share posts, connect with friends, discover communities and grow your personal network. Sign up free today.",
//       true
//     );
//     updateMeta('meta[property="og:url"]', "content", "https://echozy.vercel.app/", true);
//     updateMeta('meta[property="og:image"]', "content", "https://echozy.vercel.app/og-image.png", true);
//   }, []);

//   // 2️⃣ Background images - memoized to prevent re-creation
//   const backgroundImages = useMemo(
//     () => [
//       "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
//       "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
//       "https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&auto=format&fit=crop&w=1932&q=80",
//     ],
//     []
//   );

//   // 3️⃣ Rotate background images
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [backgroundImages.length]);

//   // 4️⃣ Optimize floating particles - fewer on mobile
//   const particleCount = typeof window !== "undefined" && window.innerWidth < 768 ? 6 : 15;

//   return (
//     <>
//     <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
//       {/* Dynamic Background Images */}
//       <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
//         {backgroundImages.map((img, index) => (
//           <div
//             key={index}
//             className={`absolute inset-0 transition-opacity duration-1000 ${
//               index === currentImage ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             <img
//               src={img}
//               alt="Landing Background"
//               loading="lazy"
//               className="w-full h-full object-cover mix-blend-overlay"
//             />
//           </div>
//         ))}
//       </div>

//       {/* Gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-transparent to-purple-900/70"></div>

//       {/* Floating particles */}
//       <div className="absolute inset-0 overflow-hidden">
//         {[...Array(particleCount)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-2 h-2 bg-white rounded-full opacity-20"
//             style={{ willChange: "transform" }}
//             initial={{ x: Math.random() * 100 + "vw", y: Math.random() * 100 + "vh" }}
//             animate={{
//               x: [null, Math.random() * 100 + "vw"],
//               y: [null, Math.random() * 100 + "vh"],
//             }}
//             transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, repeatType: "reverse" }}
//           />
//         ))}
//       </div>

//       {/* Main content */}
//       <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center">
//         <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-3xl">
//           {/* Logo */}
//           <motion.div className="flex justify-center mb-6" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
//             <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
//               <span className="text-2xl font-bold text-blue-600">E</span>
//             </div>
//           </motion.div>

//           {/* Heading */}
//           <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
//             Connect with your <span className="text-yellow-300">community</span>
//           </motion.h1>

//           {/* Subheading */}
//           <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
//             Welcome to Echozy, where personalities meet personalities and thoughts meet thoughts.
//           </motion.p>

//           {/* Features */}
//           <motion.div className="flex flex-wrap justify-center gap-6 mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }}>
//             {["Share Moments", "Join Communities", "Discover People"].map((feature, i) => (
//               <motion.div key={i} className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
//                 <span className="text-white text-sm font-medium">{feature}</span>
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.div>

//         {/* Button */}
//         <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9, duration: 0.6 }} className="mt-8">
//           <motion.button whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.3)" }} whileTap={{ scale: 0.95 }} onClick={() => navigateTo("/login")} className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg flex items-center gap-2">
//             Get Started
//             <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
//               →
//             </motion.span>
//           </motion.button>
//         </motion.div>

//         {/* App stats */}
//         <motion.div className="mt-16 grid grid-cols-3 gap-8 text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.8 }}>
//           {["1M+ Users", "100+ Communities", "99% Happy"].map((stat, i) => (
//             <div key={i} className="text-center">
//               <div className="text-2xl font-bold">{stat.split(" ")[0]}</div>
//               <div className="text-sm opacity-80">{stat.split(" ").slice(1).join(" ")}</div>
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </div>


//       {/* SEO Content — visible to Google */}
//         <div className="relative z-10 max-w-4xl mx-auto px-6 pb-16">
          
//           <div className="grid md:grid-cols-3 gap-6 mb-12">
//             <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
//               <h2 className="text-xl font-bold text-white mb-3">
//                 Share Posts on Echozy
//               </h2>
//               <p className="text-blue-100 text-sm leading-relaxed">
//                 Share your thoughts, photos and life moments with friends and followers on Echozy. Express yourself on a social media platform built for real people.
//               </p>
//             </div>
//             <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
//               <h2 className="text-xl font-bold text-white mb-3">
//                 Connect with Friends
//               </h2>
//               <p className="text-blue-100 text-sm leading-relaxed">
//                 Find and connect with friends, classmates and colleagues on Echozy. Send friend requests, build your network and stay updated with people who matter.
//               </p>
//             </div>
//             <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
//               <h2 className="text-xl font-bold text-white mb-3">
//                 Chat with Echo AI
//               </h2>
//               <p className="text-blue-100 text-sm leading-relaxed">
//                 Echozy includes Echo AI — an intelligent assistant powered by Gemini. Get answers, ideas and creative help built directly into your social media experience.
//               </p>
//             </div>
//           </div>

//           <div className="grid md:grid-cols-2 gap-6 mb-12">
//             <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
//               <h2 className="text-xl font-bold text-white mb-3">
//                 Why Choose Echozy Social Media Platform?
//               </h2>
//               <p className="text-blue-100 text-sm leading-relaxed mb-3">
//                 Echozy is a modern social media platform built for everyone. Unlike other social networks that prioritize ads and algorithms, Echozy puts people first. No manipulative feeds, no data selling, no compromise.
//               </p>
//               <p className="text-blue-100 text-sm leading-relaxed">
//                 Whether you want to share posts, connect with friends, send direct messages, discover communities or chat with Echo AI — Echozy is the only social media platform you need.
//               </p>
//             </div>
//             <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
//               <h2 className="text-xl font-bold text-white mb-3">
//                 How Echozy Works
//               </h2>
//               <ul className="space-y-2">
//                 <li className="text-blue-100 text-sm flex items-start gap-2">
//                   <span className="text-yellow-300 font-bold flex-shrink-0">1.</span>
//                   Create your free Echozy account in less than 60 seconds
//                 </li>
//                 <li className="text-blue-100 text-sm flex items-start gap-2">
//                   <span className="text-yellow-300 font-bold flex-shrink-0">2.</span>
//                   Set up your profile with a photo and personal bio
//                 </li>
//                 <li className="text-blue-100 text-sm flex items-start gap-2">
//                   <span className="text-yellow-300 font-bold flex-shrink-0">3.</span>
//                   Find and connect with friends and people you know
//                 </li>
//                 <li className="text-blue-100 text-sm flex items-start gap-2">
//                   <span className="text-yellow-300 font-bold flex-shrink-0">4.</span>
//                   Share your first post and start building your network
//                 </li>
//                 <li className="text-blue-100 text-sm flex items-start gap-2">
//                   <span className="text-yellow-300 font-bold flex-shrink-0">5.</span>
//                   Explore communities and chat with Echo AI anytime
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
//             <h2 className="text-2xl font-bold text-white mb-4">
//               Join Echozy — The Modern Social Media Platform
//             </h2>
//             <p className="text-blue-100 leading-relaxed max-w-2xl mx-auto mb-6">
//               Thousands of users are already connecting, sharing and growing on Echozy. Join the modern social media platform that was built for people, not profit. Sign up completely free today and start your journey on Echozy.
//             </p>
//             <Link
//               to="/login"
//               className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors"
//             >
//               Get Started on Echozy — It is Free
//             </Link>
//           </div>

//           <div className="text-center text-blue-200 text-xs">
//             <p>Echozy — Modern Social Media Platform · Built with MERN Stack · Created by Ali Sattar · © 2026</p>
//             <div className="flex justify-center gap-6 mt-3">
//               <Link to="/login" className="text-blue-300 hover:text-white transition-colors">Login</Link>
//               <Link to="/about-prerender" className="text-blue-300 hover:text-white transition-colors">About Echozy</Link>
//             </div>
//           </div>

//         </div>
      
//       </>
//   );
// };


import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { assets } from "./../assets/assets";
import { useAppContext } from "../Context/Context";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const { navigateTo } = useAppContext();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    document.title = "Echozy – Connect, Share & Grow Your Social Network";

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
      "Join Echozy, the modern social media platform to share posts, connect with friends, discover communities and grow your personal network. Sign up free today."
    );
    updateMeta('meta[property="og:title"]', "content", "Echozy – Connect, Share & Grow Your Social Network", true);
    updateMeta(
      'meta[property="og:description"]',
      "content",
      "Join Echozy, the modern social media platform to share posts, connect with friends, discover communities and grow your personal network. Sign up free today.",
      true
    );
    updateMeta('meta[property="og:url"]', "content", "https://echozy.vercel.app/", true);
    updateMeta('meta[property="og:image"]', "content", "https://echozy.vercel.app/og-image.png", true);
  }, []);

  const backgroundImages = useMemo(
    () => [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&auto=format&fit=crop&w=1932&q=80",
    ],
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const particleCount = typeof window !== "undefined" && window.innerWidth < 768 ? 6 : 15;

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">

      {/* ===== MAIN HERO — your original UI completely unchanged ===== */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex-1">

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
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            {/* Logo */}
            <motion.div
              className="flex justify-center mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-blue-600">E</span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight"
            >
              Connect with your <span className="text-yellow-300">community</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto"
            >
              Welcome to Echozy, where personalities meet personalities and thoughts meet thoughts.
            </motion.p>

            {/* Features */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              {["Share Moments", "Join Communities", "Discover People"].map((feature, i) => (
                <motion.div
                  key={i}
                  className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="text-white text-sm font-medium">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateTo("/login")}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg flex items-center gap-2"
            >
              Get Started
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                →
              </motion.span>
            </motion.button>
          </motion.div>

          {/* App stats */}
          <motion.div
            className="mt-16 grid grid-cols-3 gap-8 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            {["1M+ Users", "100+ Communities", "99% Happy"].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold">{stat.split(" ")[0]}</div>
                <div className="text-sm opacity-80">{stat.split(" ").slice(1).join(" ")}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ===== SEO FOOTER — safe, Google approved, mobile friendly ===== */}
      <footer className="bg-gray-950 py-12 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            <div>
              <h2 className="text-gray-400 text-sm font-semibold mb-2">
                Share Posts on Echozy
              </h2>
              <p className="text-gray-600 text-xs leading-relaxed">
                Share your thoughts, photos and life moments with friends and followers on Echozy. A social media platform built for real people.
              </p>
            </div>
            <div>
              <h2 className="text-gray-400 text-sm font-semibold mb-2">
                Connect with Friends
              </h2>
              <p className="text-gray-600 text-xs leading-relaxed">
                Find and connect with friends, classmates and colleagues on Echozy. Build your personal network and stay connected with people who matter.
              </p>
            </div>
            <div>
              <h2 className="text-gray-400 text-sm font-semibold mb-2">
                Echo AI Assistant
              </h2>
              <p className="text-gray-600 text-xs leading-relaxed">
                Chat with Echo AI built into Echozy — an intelligent assistant powered by Gemini. Get answers and creative help without leaving the platform.
              </p>
            </div>
            <div>
              <h2 className="text-gray-400 text-sm font-semibold mb-2">
                Direct Messaging
              </h2>
              <p className="text-gray-600 text-xs leading-relaxed">
                Send direct messages to friends on Echozy. Chat privately and stay connected with the people in your network anytime.
              </p>
            </div>
            <div>
              <h2 className="text-gray-400 text-sm font-semibold mb-2">
                Discover Communities
              </h2>
              <p className="text-gray-600 text-xs leading-relaxed">
                Explore and join communities on Echozy that match your interests. Meet like-minded people and engage in meaningful conversations.
              </p>
            </div>
            <div>
              <h2 className="text-gray-400 text-sm font-semibold mb-2">
                Why Choose Echozy?
              </h2>
              <p className="text-gray-600 text-xs leading-relaxed">
                Echozy is a modern social media platform built for everyone. No ads, no manipulation — just genuine connections and real conversations.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-700 text-xs text-center sm:text-left">
                Echozy — Modern Social Media Platform · MERN Stack · Created by Ali Sattar · © 2026
              </p>
              <div className="flex gap-6">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-gray-400 text-xs transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/about-prerender"
                  className="text-gray-700 hover:text-gray-400 text-xs transition-colors"
                >
                  About Echozy
                </Link>
              </div>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
