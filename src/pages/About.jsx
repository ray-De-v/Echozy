import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { FiHeart, FiUsers, FiMessageSquare, FiGlobe } from 'react-icons/fi'

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />
      
      <main className="lg:ml-14 pt-16 px-4 py-8">
        <div className="max-w-lg mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">About Echozy</h1>
            <p className="text-gray-600">A social platform designed for meaningful connections</p>
          </div>

          {/* Mission Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700">
              Echozy was created to provide a space for authentic conversations and genuine connections. 
              We're building a platform that prioritizes people over algorithms and quality interactions over vanity metrics.
            </p>
          </div>

          {/* What We Offer */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What We Offer</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                  <FiUsers className="text-blue-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Connect with Friends</h3>
                  <p className="text-gray-600 text-sm">Build your network and stay connected with people who matter</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-lg mr-4">
                  <FiMessageSquare className="text-purple-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Share Your Story</h3>
                  <p className="text-gray-600 text-sm">Express yourself through posts, photos, and conversations</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-lg mr-4">
                  <FiGlobe className="text-green-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Discover Communities</h3>
                  <p className="text-gray-600 text-sm">Find and engage with communities that share your interests</p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Story */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-700 mb-3">
              Echozy began as a personal project by Ali Sattar, a developer passionate about creating social technology that serves people rather than exploits attention.
            </p>
            <p className="text-gray-700">
              What started as an idea has grown into a platform dedicated to fostering genuine human connection in the digital space.
            </p>
          </div>

          {/* Values */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Values</h2>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <FiHeart className="text-red-500 mr-3" />
                <span className="text-gray-700">User privacy and data protection</span>
              </div>
              <div className="flex items-center">
                <FiUsers className="text-blue-500 mr-3" />
                <span className="text-gray-700">Inclusive and respectful community</span>
              </div>
              <div className="flex items-center">
                <FiMessageSquare className="text-purple-500 mr-3" />
                <span className="text-gray-700">Authentic communication</span>
              </div>
              <div className="flex items-center">
                <FiGlobe className="text-green-500 mr-3" />
                <span className="text-gray-700">Global perspective with local relevance</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default About