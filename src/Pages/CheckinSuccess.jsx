import React, { useEffect, useState } from "react";
import { Check, X, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CHECKIN_SUCCESS_UI } from "../constants/ui";

const CheckinSuccess = () => {
  const navigate = useNavigate();

  const [businessType, setBusinessType] = useState("");
  const [businessPlan, setBusinessPlan] = useState("");
  const [isUserVerified, setIsUserVerified] = useState(false);

  useEffect(() => {
    // Get values from localStorage (adjust if coming from context)
    const type = localStorage.getItem("businessType");
    const plan = localStorage.getItem("businessPlan");
    const verified = localStorage.getItem("isVerifiedUser");

    setBusinessType(type);
    setBusinessPlan(plan);
    setIsUserVerified(verified === "true");
  }, []);

  const handleDoneNavigation = () => {
    const isCorporateOrHospitality =
      businessType === "Corporate" || businessType === "Hospitality";

    const isSmbOrEnterprise =
      businessPlan === "SMB" || businessPlan === "Enterprise";

    if (isCorporateOrHospitality && isSmbOrEnterprise && isUserVerified) {
      navigate("/history");
    } else {
      navigate("/profile");
    }
  };

  return (
    <div className="w-full h-dvh bg-gray-100 flex flex-col items-center justify-center px-4 py-5">
      {/* Card */}
      <div className="w-full bg-white rounded-[6px] p-6 shadow-sm border border-gray-200 relative text-center">
        {/* Close Button */}
        <button
          onClick={() => navigate("/history")}
          className="absolute top-4 right-4 text-gray-400"
        >
          <X size={18} />
        </button>

        {/* 🔥 Animated Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative flex items-center justify-center">
            <span className="absolute w-15 h-15 rounded-full bg-brand/20 animate-ping"></span>

            <div className="w-20 h-20 rounded-full bg-brand flex items-center justify-center shadow-lg animate-pop">
              <Check size={28} className="text-white" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl text-brand mb-3">{CHECKIN_SUCCESS_UI.TITLE}</h1>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 leading-[20px]">
          {CHECKIN_SUCCESS_UI.DESCRIPTION}
        </p>

        {/* Subtext */}
        <p className="text-xs text-gray-400 tracking-wide mb-6 leading-[20px]">
          {CHECKIN_SUCCESS_UI.SUBTEXT}
        </p>

        {/* ✅ Done Button with Conditional Navigation */}
        <button
          onClick={handleDoneNavigation}
          className="w-full h-14 bg-brand text-white rounded-[6px] font-semibold hover:opacity-90 transition"
        >
          {CHECKIN_SUCCESS_UI.DONE_BUTTON}
        </button>
      </div>

      {/* Help Section */}
      <div className="flex items-center gap-2 mt-6 text-gray-400 text-sm">
        <HelpCircle size={14} />
        {CHECKIN_SUCCESS_UI.HELP_TEXT}
      </div>
    </div>
  );
};

export default CheckinSuccess;
