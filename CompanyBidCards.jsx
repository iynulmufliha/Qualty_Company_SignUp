import React, { useState } from "react";
import { BASE_URL } from "../../../utils/constants";

const CompanyBidCard = ({ bid }) => {
  const [amount, setAmount] = useState("");
  const {
    _id: id,
    inspectionLocation: location,
    urgencyLevel: urgency,
    inspectionBudget: budget,
    commodityCategory: commodity,
    subCommodity,
    volume,
    inspectionDate,
    inspectionTypes,
    contact,
    additionalServices,
    certifications,
    description,
  } = bid;

  const handleBid = async (enquiryId) => {
    const bidAmount = Number(amount);
    if (!bidAmount || bidAmount <= 0) return alert("Enter a valid bid amount");

    try {
      const response = await fetch(`${BASE_URL}/company/bid/${enquiryId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ bidAmount }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Bid placed successfully");
      } else {
        alert(data.message || "Failed to place bid");
      }
    } catch (err) {
      console.error("Bid error:", err);
      alert("Error placing bid");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-300 m-5 flex justify-around shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="mb-2 space-y-1 text-gray-900">
        <p className="text-md font-semibold">
          Commodity: <span className="text-gray-700">{commodity}</span>
        </p>
        <p className="text-md font-semibold">
          SubCommodity: <span className="text-gray-700">{subCommodity}</span>
        </p>
        <p className="text-md font-semibold">
          Location: <span className="text-gray-700">{location}</span>
        </p>
        <p className="text-md font-semibold">
          Urgency:{" "}
          <span
            className={`font-semibold ${
              urgency === "High" ? "text-red-600" : "text-gray-600"
            }`}
          >
            {urgency}
          </span>
        </p>
        <p className="text-md font-semibold">
          Budget: <span className="font-semibold text-gray-800">₹{budget}/-</span>
        </p>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="₹ Enter bid amount"
          className="bg-gray-100 text-gray-900 px-3 py-2 rounded w-full outline-none border border-gray-300 focus:border-gray-600"
        />
        <button
          onClick={() => handleBid(id)}
          className="bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded font-semibold cursor-pointer transition-colors duration-200"
        >
          Bid
        </button>
      </div>
    </div>
  );
};

export default CompanyBidCard;
