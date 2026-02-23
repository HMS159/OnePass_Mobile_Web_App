import React, { useState, useEffect } from "react";
import { ArrowRight, Building2, Hotel, ChevronDown } from "lucide-react";
import { HOME_UI } from "../constants/ui";
import Logo from "../assets/images/1pass_logo.png";
import { useNavigate, useParams } from "react-router-dom";

const Home = () => {
  const { guestNumber, restaurantId } = useParams();
  const navigate = useNavigate();

  const VERIFIED_NUMBER = "8401159610";

  const [selectedType, setSelectedType] = useState("Hospitality");
  const [selectedPlan, setSelectedPlan] = useState("SMB");

  const restaurants = {
    1: "Google HQ",
    2: "Microsoft Office",
    3: "Apple Park",
    4: "Amazon Spheres",
  };

  const propertyName = restaurants[restaurantId] || "Sunrise Diner";

  const defaultPlanByType = {
    Hospitality: "SMB",
    Corporate: "Starter",
  };

  const availablePlans =
    selectedType === "Hospitality"
      ? ["SMB", "Enterprise"]
      : ["Starter", "SMB", "Enterprise"];

  useEffect(() => {
    setSelectedPlan(defaultPlanByType[selectedType]);
  }, [selectedType]);

  useEffect(() => {
    if (!guestNumber) {
      // ✅ If no number in URL, clear verification
      localStorage.removeItem("isVerifiedUser");
      localStorage.removeItem("verifiedNumber");
      return;
    }

    const last10Digits = guestNumber.slice(-10);

    if (last10Digits === VERIFIED_NUMBER) {
      console.log("✅ Verified user detected");

      localStorage.setItem("isVerifiedUser", "true");
      localStorage.setItem("verifiedNumber", last10Digits);
    } else {
      localStorage.removeItem("isVerifiedUser");
      localStorage.removeItem("verifiedNumber");
    }
  }, [guestNumber]);

  const handleContinue = () => {
    const isVerified = localStorage.getItem("isVerifiedUser");

    // Always store selected values
    localStorage.setItem("businessType", selectedType);
    localStorage.setItem("businessPlan", selectedPlan);

    const isValidType =
      selectedType === "Corporate" || selectedType === "Hospitality";

    const isValidPlan =
      selectedPlan === "Starter" ||
      selectedPlan === "SMB" ||
      selectedPlan === "Enterprise";

    if (isVerified === "true" && isValidType && isValidPlan) {
      console.log("🚀 Verified + Valid Type + Valid Plan → Welcome Back");
      navigate("/welcome-back");
    } else {
      navigate("/email");
    }
  };

  return (
    <div className="h-dvh w-full bg-white flex flex-col px-4 py-5">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <img src={Logo} alt="1Pass Logo" className="h-15 object-contain" />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Verification Label */}
          <p className="text-xs tracking-widest text-gray-500 font-semibold leading-[20px] text-center">
            {HOME_UI.VERIFICATION_LABEL}
          </p>

          {/* Title */}
          <h1 className="text-2xl font-bold text-[#1b3631] leading-snug text-center">
            {HOME_UI.getTitle(propertyName).line1} <br />
            <span>{HOME_UI.getTitle(propertyName).propertyName}</span>
          </h1>

          {/* TYPE SELECTION */}
          <div className="grid grid-cols-2 gap-3 pt-4">
            <button
              onClick={() => setSelectedType("Hospitality")}
              className={`p-4 rounded-[6px] border-2 flex flex-col items-center gap-2 transition-all ${
                selectedType === "Hospitality"
                  ? "border-brand bg-brand/5 text-brand"
                  : "border-gray-100 bg-gray-50 text-gray-400"
              }`}
            >
              <Hotel size={24} />
              <span className="text-xs font-bold uppercase tracking-wider">
                Hospitality
              </span>
            </button>

            <button
              onClick={() => setSelectedType("Corporate")}
              className={`p-4 rounded-[6px] border-2 flex flex-col items-center gap-2 transition-all ${
                selectedType === "Corporate"
                  ? "border-brand bg-brand/5 text-brand"
                  : "border-gray-100 bg-gray-50 text-gray-400"
              }`}
            >
              <Building2 size={24} />
              <span className="text-xs font-bold uppercase tracking-wider">
                Corporate
              </span>
            </button>
          </div>

          {/* PLAN SELECTION */}
          <div className="pt-3">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
              Select Service Plan
            </label>

            <div className="relative mt-1">
              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full h-14 bg-gray-50 border border-gray-100 rounded-[6px] px-4 text-sm font-semibold text-[#1b3631] appearance-none outline-none focus:border-brand/30"
              >
                {availablePlans.map((plan) => (
                  <option key={plan} value={plan}>
                    {plan} Plan
                  </option>
                ))}
              </select>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <ChevronDown size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div>
          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className="w-full h-14 bg-[#1b3631] text-white rounded-[6px] font-semibold text-md flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            {HOME_UI.CONTINUE_BUTTON}
            <ArrowRight size={18} />
          </button>

          {/* Privacy Text */}
          <p className="text-xs text-gray-400 pt-4 text-center leading-[20px]">
            {HOME_UI.PRIVACY_TEXT}{" "}
            <span className="underline cursor-pointer">
              {HOME_UI.PRIVACY_LINK}
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
