import React, { useState } from "react";

const CompanyLiveBids = () => {
  const [bidAmount, setBidAmount] = useState("");

  const handleBid = () => {
    console.log("Bid submitted:", bidAmount);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 w-full max-w-3xl mx-auto transition-all duration-300 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Live Bids</h2>
        <span className="bg-gray-100 text-gray-700 border border-gray-300 text-xs font-medium px-3 py-1 rounded-full">
          2 Active Bids
        </span>
      </div>

      {/* Bid Card */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all duration-300 hover:shadow-md">
        {/* Left Section */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">Inspection</h3>
          <p className="text-sm text-gray-500">ID: SAMPLE-003</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm text-gray-700">
            <div>
              <p className="font-medium text-gray-600">Location</p>
              <p className="text-gray-500">—</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Volume</p>
              <p className="text-gray-500">—</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Urgency</p>
              <span className="inline-block bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full mt-1 border border-red-300">
                High
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-600">Budget</p>
              <p className="text-green-600 font-semibold mt-1">$800 - $1200</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="$ Enter"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            className="bg-white text-gray-800 placeholder-gray-400 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-600 transition"
          />
          <button
            onClick={handleBid}
            className="bg-black hover:bg-gray-800 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300"
          >
            Bid
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyLiveBids;
