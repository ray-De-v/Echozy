// src/pages/AboutPrerender.jsx
import React, { useEffect } from "react";

const AboutPrerender = () => {

  useEffect(() => {
    document.title = "About Echozy – Modern Social Media Platform to Connect & Share";

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

    setMeta("description", "Echozy is a modern social media platform where you can share posts, connect with friends, discover communities, chat with Echo AI and grow your personal network. Join Echozy free today.");
    setMeta("keywords", "Echozy, Echozy social media, social media platform, connect with friends, share posts, social network, Echo AI, online communities, Echozy app");
    setMeta("og:title", "About Echozy – Modern Social Media Platform to Connect & Share", true);
    setMeta("og:description", "Echozy is a modern social media platform where you can share posts, connect with friends, discover communities, chat with Echo AI and grow your personal network. Join free today.", true);
    setMeta("og:url", "https://echozy.vercel.app/about-prerender", true);
    setMeta("og:image", "https://echozy.vercel.app/og-image.png", true);
    setMeta("og:type", "website", true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "About Echozy – Modern Social Media Platform to Connect & Share");
    setMeta("twitter:description", "Echozy is a modern social media platform where you can share posts, connect with friends, discover communities and grow your network. Join free today.");
    setMeta("twitter:image", "https://echozy.vercel.app/og-image.png");
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* HERO */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-6">
            About Echozy — The Modern Social Media Platform
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Echozy is a modern social media platform built for everyone who wants
            to share moments, connect with friends, discover communities and grow
            their personal network — all in one place.
          </p>
          <div className="mt-8">
            
              href="/login"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors text-lg"
            >
              Join Echozy Free Today
            </a>
          </div>
        </div>

        {/* WHAT IS ECHOZY */}
        <div className="mb-14 bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            What is Echozy?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Echozy is a modern social media platform designed to bring people
            together through authentic conversations, meaningful posts, and
            genuine human connections. Unlike other social media platforms that
            prioritize advertisements and engagement metrics, Echozy puts people
            first.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            On Echozy, you can share posts and photos with your friends and
            followers, send direct messages, connect with new people, explore
            communities that match your interests, and even chat with Echo AI —
            our built-in intelligent assistant powered by Gemini.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Whether you are looking to stay connected with old friends, meet new
            people, or simply share what is on your mind — Echozy is the social
            media platform for you. Join thousands of users already using Echozy
            to connect, share and grow.
          </p>
        </div>

        {/* FEATURES */}
        <div className="mb-14">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Everything You Need in One Social Media Platform
          </h2>
          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">
                Share Posts and Photos
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Express yourself freely on Echozy. Share posts, photos, thoughts
                and life moments with your friends and followers. Your story
                deserves to be heard — Echozy gives you the platform to tell it.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">
                Connect with Friends
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Find and connect with friends, classmates, colleagues and family
                on Echozy. Send friend requests, build your personal network and
                stay updated with the people who matter most to you.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">
                Direct Messaging
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Chat privately with your friends on Echozy using our built-in
                messaging system. Send direct messages, have real conversations
                and stay connected — all within the Echozy social media platform.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">
                Echo AI — Your Smart Assistant
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Echozy comes with Echo AI — an intelligent assistant powered by
                Gemini. Ask questions, get creative ideas, or just have a
                conversation. Echo AI is built directly into the Echozy platform
                so you never have to leave.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">
                Discover Communities
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Explore and join communities on Echozy that match your passions
                and interests. Meet like-minded people, engage in meaningful
                discussions and build connections that go beyond just following
                someone.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">
                Your Personal Profile
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Customize your Echozy profile with a profile photo, cover photo
                and personal bio. Your profile is your identity on the Echozy
                social media platform — make it yours and let people discover
                who you are.
              </p>
            </div>

          </div>
        </div>

        {/* MISSION */}
        <div className="mb-14 bg-blue-600 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Our Mission at Echozy
          </h2>
          <p className="text-blue-100 leading-relaxed mb-4 text-lg">
            The mission of Echozy is simple — to build a social media platform
            that truly serves its users. We believe social media should bring
            people closer together, not drive them apart. We believe in quality
            over quantity, genuine connections over follower counts, and real
            conversations over viral noise.
          </p>
          <p className="text-blue-100 leading-relaxed text-lg">
            At Echozy, we are building a social media platform where every user
            feels heard, valued and connected. A platform where your data is
            protected, your voice matters and your experience is never
            compromised by advertisements or manipulative algorithms.
          </p>
        </div>

        {/* STORY */}
        <div className="mb-14 bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            The Story Behind Echozy
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Echozy was created by Ali Sattar, a passionate full-stack developer
            with a vision to build a social media platform that puts people over
            profits. Ali built Echozy using the MERN stack — MongoDB, Express.js,
            React and Node.js — along with modern technologies like Tailwind CSS
            and the Gemini AI API for Echo AI.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            What started as a personal portfolio project quickly grew into
            something much bigger — a fully functional social media platform with
            real users, real posts, real friendships and real conversations.
            Echozy proves that great social media does not have to come from a
            billion-dollar company.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Today, Echozy continues to grow and improve. New features are added
            regularly, user feedback shapes the roadmap, and the core mission
            remains the same — to be the most people-friendly social media
            platform on the internet.
          </p>
        </div>

        {/* VALUES */}
        <div className="mb-14">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            The Values That Drive Echozy
          </h2>
          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Privacy First
              </h3>
              <p className="text-gray-600">
                Your data belongs to you. Echozy never sells your personal
                information to third parties or advertisers. Your privacy is our
                top priority on the Echozy platform.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-purple-500">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Inclusive Community
              </h3>
              <p className="text-gray-600">
                Echozy is for everyone. We welcome users from all backgrounds,
                cultures and walks of life. Respect and inclusivity are the
                foundation of the Echozy community.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-green-500">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Authentic Communication
              </h3>
              <p className="text-gray-600">
                We encourage real, honest and meaningful conversations on Echozy.
                No fake engagement, no bot followers — just genuine human
                connection between real people.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-yellow-500">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Continuous Improvement
              </h3>
              <p className="text-gray-600">
                Echozy is always evolving. We listen to our users, fix issues
                quickly and constantly add new features to make Echozy the best
                social media platform it can be.
              </p>
            </div>

          </div>
        </div>

        {/* WHY ECHOZY */}
        <div className="mb-14 bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Choose Echozy Over Other Social Media Platforms?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            There are many social media platforms out there — so why choose
            Echozy? The answer is simple. Echozy was built with a clear purpose:
            to create a social media experience that is clean, fast, friendly and
            focused entirely on you.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            On Echozy you will never see manipulative algorithms pushing content
            designed to make you angry or addicted. You will never be bombarded
            with advertisements every few posts. You will never feel like a
            product being sold to the highest bidder.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Echozy is different because it was built by someone who uses social
            media just like you — and wanted something better. If you are looking
            for a modern social media platform that respects your time, your
            attention and your data, then Echozy is the platform for you.
          </p>
        </div>

        {/* CTA */}
        <div className="mb-14 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Join Echozy?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of users already connecting, sharing and growing on
            the Echozy social media platform. Sign up is completely free and
            takes less than 60 seconds.
          </p>
          
            href="/login"
            className="inline-block bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
          >
            Create Your Echozy Account
          </a>
        </div>

        {/* FOOTER */}
        <div className="text-center text-gray-500 text-sm border-t border-gray-200 pt-8">
          <p className="mb-2">
            <strong className="text-gray-700">Echozy</strong> — The Modern Social Media Platform
          </p>
          <p className="mb-2">
            Built with React, Node.js, MongoDB, Express.js and Tailwind CSS
          </p>
          <p className="mb-4 text-gray-400">
            Created by Ali Sattar · Version 1.0.0 · © 2026 Echozy. All rights reserved.
          </p>
          <div className="flex justify-center gap-6">
            <a href="/" className="text-blue-500 hover:text-blue-700 transition-colors">
              Home
            </a>
            <a href="/login" className="text-blue-500 hover:text-blue-700 transition-colors">
              Login
            </a>
            <a href="/about-prerender" className="text-blue-500 hover:text-blue-700 transition-colors">
              About
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPrerender;
