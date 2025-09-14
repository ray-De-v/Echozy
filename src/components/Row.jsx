import React from "react";
import { motion } from "framer-motion"; 

const tabs = ["posts", "friends", "photos"];

const Row = ({ activeTab, setActiveTab }) => {
  return (
    <div className="relative flex gap-4 justify-between items-center px-4 py-4 bg-white shadow rounded-xl max-sm:text-sm">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className="relative px-4 py-2 text-gray-500 font-semibold cursor-pointer"
        >
          <span
            className={`${
              activeTab === tab ? "text-primary" : ""
            } relative z-10`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </span>
          {/* Animated underline */}
          {activeTab === tab && (
            <motion.div
              layoutId="underline"
              className="absolute left-0 right-0 bottom-0 h-1 bg-primary rounded"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default Row;
