import React, { useState, useEffect } from "react";
import { ArrowRight, Building2, Hotel, ChevronDown } from "lucide-react";
import { HOME_UI } from "../constants/ui";
import Logo from "../assets/images/1pass_logo.png";
import { useNavigate, useParams } from "react-router-dom";

const Home = () => {
  const { guestNumber, restaurantId } = useParams();
  const navigate = useNavigate();

  /* =========================
     DEFAULT STATES
  ========================== */

  const [selectedType, setSelectedType] = useState("Hospitality");
  const [selectedPlan, setSelectedPlan] = useState("SMB");

  /* =========================
     PROPERTY NAME
  ========================== */

  const restaurants = {
    1: "Google HQ",
    2: "Microsoft Office",
    3: "Apple Park",
    4: "Amazon Spheres",
  };

  const propertyName = restaurants[restaurantId] || "Sunrise Diner";

  /* =========================
     PLAN LOGIC
  ========================== */

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

  /* =========================
     CONTINUE HANDLER
  ========================== */

  const handleContinue = () => {
    localStorage.setItem("businessType", selectedType);
    localStorage.setItem("businessPlan", selectedPlan);
    navigate("/email");
  };

  return (
    <div className="flex-1 bg-[#F7F7F7] relative flex items-center justify-center px-3 py-5">
      <div className="w-full bg-white rounded-3xl p-6 relative overflow-hidden border border-black/10">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <img src={Logo} alt="1Pass Logo" className="h-15 object-contain" />
        </div>

        <div className="text-center space-y-4">
          {/* 🔥 VERIFICATION LABEL (RESTORED) */}
          <p className="text-xs tracking-widest text-gray-500 font-semibold leading-[20px]">
            {HOME_UI.VERIFICATION_LABEL}
          </p>

          {/* 🔥 TITLE (RESTORED) */}
          <h1 className="text-2xl font-bold text-[#1b3631] leading-snug">
            {HOME_UI.getTitle(propertyName).line1} <br />
            <span>{HOME_UI.getTitle(propertyName).propertyName}</span>
          </h1>

          {/* TYPE SELECTION */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => setSelectedType("Hospitality")}
              className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
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
              className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
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
          <div className="pt-2 text-left">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
              Select Service Plan
            </label>

            <div className="relative mt-1">
              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm font-semibold text-[#1b3631] appearance-none outline-none focus:border-brand/30"
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

          {/* 🔥 DOTS (RESTORED) */}
          <div className="flex justify-center gap-2 pt-2">
            <span className="w-2 h-2 bg-[#1b3631] rounded-full" />
            <span className="w-2 h-2 bg-gray-300 rounded-full" />
            <span className="w-2 h-2 bg-gray-300 rounded-full" />
          </div>

          {/* CONTINUE BUTTON */}
          <button
            onClick={handleContinue}
            className="w-full h-14 mt-4 bg-brand text-white rounded-[6px] font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
          >
            {HOME_UI.CONTINUE_BUTTON}
            <ArrowRight size={18} />
          </button>

          {/* 🔥 PRIVACY TEXT (RESTORED) */}
          <p className="text-xs text-gray-400 pt-2 leading-[20px]">
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
