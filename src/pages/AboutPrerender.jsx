// src/pages/AboutPrerender.js
import React, { useEffect } from "react";

const AboutPrerender = () => {
  useEffect(() => {
    // Set page title
    document.title = "About Echozy – Connect with Community";


    const setCanonical = (url) => {
    let link = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = url;
    };

   setCanonical("https://echozy.vercel.app/about-prerender");
    

    // SEO meta tags
    const setMeta = (name, content, isProperty = false) => {
      try {
        let tag;
        if (isProperty) {
          tag = document.querySelector(`meta[property="${name}"]`);
          if (!tag) {
            tag = document.createElement("meta");
            tag.setAttribute("property", name);
            document.head.appendChild(tag);
          }
        } else {
          tag = document.querySelector(`meta[name="${name}"]`);
          if (!tag) {
            tag = document.createElement("meta");
            tag.name = name;
            document.head.appendChild(tag);
          }
        }
        tag.content = content;
      } catch (err) {
        console.warn("Meta update failed:", err);
      }
    };

    setMeta("description", "Learn about Echozy, a social media platform for authentic connections, communities, and meaningful conversations.");
    setMeta("og:title", "About Echozy – Connect with Community", true);
    setMeta("og:description", "Learn about Echozy, a social media platform for authentic connections, communities, and meaningful conversations.", true);
    setMeta("og:url", "https://echozy.vercel.app/about-prerender", true);
    setMeta("og:image", "https://echozy.vercel.app/favicon-16x16.png", true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
            About Echozy
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            A social platform designed for meaningful connections
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Echozy was created to provide a space for authentic conversations and genuine connections. We prioritize people over algorithms and quality interactions over vanity metrics.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <ul className="space-y-4 list-disc list-inside text-gray-700">
            <li>
              <strong>Connect with Friends:</strong> Build your network and stay connected with people who matter.
            </li>
            <li>
              <strong>Share Your Story:</strong> Express yourself through posts, photos, and conversations.
            </li>
            <li>
              <strong>Discover Communities:</strong> Find and engage with communities that share your interests.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed">
            Echozy(echozy) began as a personal project by Ali Sattar, a developer passionate about creating social technology that serves people rather than exploits attention. What started as an idea has grown into a platform dedicated to fostering genuine human connection in the digital space.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <ul className="space-y-2 list-disc list-inside text-gray-700">
            <li>User privacy and data protection</li>
            <li>Inclusive and respectful community</li>
            <li>Authentic communication</li>
            <li>Global perspective with local relevance</li>
          </ul>
        </section>

        <footer className="mt-16 text-center text-gray-500 text-sm">
          Version 1.0.0 – Echozy © 2026
        </footer>
      </div>
    </div>
  );
};

export default AboutPrerender;
