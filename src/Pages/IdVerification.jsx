import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MobileHeader from "../Components/MobileHeader";

const IdVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { email, businessType, businessPlan } = location.state || {};
  const [selectedId, setSelectedId] = useState("");

  const isValid = selectedId !== "";

  return (
    <div className="w-full h-dvh bg-white shadow-xl px-4 py-5 flex flex-col overflow-y-auto">
      {/* ✅ Using MobileHeader only */}
      <MobileHeader />

      {/* Title */}
      <h1 className="text-2xl font-bold text-[#1b3631] mb-2">
        Choose an ID for verification
      </h1>

      <p className="text-gray-500 text-sm mb-6 leading-relaxed">
        Please select the identification document you have ready. You will use a
        digital service to validate this document.
      </p>

      {/* Dropdown */}
      <div>
        <label className="block text-xs font-bold text-[#1b3631] tracking-wide mb-2">
          Identity Document Type
        </label>

        <div className="relative">
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full bg-white text-sm h-12 rounded-[6px] border border-gray-200 px-4 appearance-none outline-none focus:border-gray-300"
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="aadhaar">Aadhaar</option>
            <option value="passport">Passport</option>
            <option value="voter">Voter ID</option>
            <option value="dl">Driving License</option>
          </select>
        </div>
      </div>

      <div className="flex-1" />

      {/* Button */}
      <button
        disabled={!isValid}
        onClick={() => {
          localStorage.setItem("selectedId", selectedId);
          navigate("/consent", {
            state: { email, businessType, businessPlan },
          });
        }}
        className={`w-full h-14 rounded-[6px] font-bold transition
          ${
            isValid
              ? "bg-[#1b3631] text-white shadow-lg"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }
        `}
      >
        Proceed Securely
      </button>

      {/* Footer */}
      <p className="text-[10px] text-gray-400 text-center mt-4 uppercase tracking-wider">
        Encrypted & Secure iPass Check-in
      </p>
    </div>
  );
};

export default IdVerification;
