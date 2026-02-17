import React from "react";
import { X, Lock, ArrowRight } from "lucide-react";
import { HOME_UI } from "../constants/ui";
import Logo from "../assets/images/1pass_logo.png";
import { useNavigate, useParams } from "react-router-dom";

const Home = () => {
  const { guestNumber, restaurantId } = useParams();
  // Remove country code (91) if present
  const cleanNumber = guestNumber?.startsWith("91")
    ? guestNumber.slice(2)
    : guestNumber;

  const restaurants = {
    1: "Google HQ",
    2: "Microsoft Office",
    3: "Apple Park",
    4: "Amazon Spheres",
  };

  const propertyName = restaurants[restaurantId] || "Sunrise Diner";

  const phoneNumber = guestNumber
    ? `+${guestNumber.slice(0, 2)} ••••••${guestNumber.slice(-4)}`
    : 91 + " ••••••" + 7890;

  const navigate = useNavigate();

  const handleContinue = () => {
    if (cleanNumber === "9586023883") {
      navigate("/email");
    } else if (cleanNumber === "8401159610") {
      navigate("/welcome-back");
    } else {
      // default fallback
      navigate("/email");
    }
  };

  return (
    <>
      <div className="flex-1 bg-[#F7F7F7] relative flex items-center justify-center px-3 py-5">
        <div className="w-full bg-white rounded-3xl p-6 relative overflow-hidden border border-black/10">
          {/* Top Bar */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center bg-none">
              <img
                src={Logo}
                alt="1Pass Logo"
                className="h-15 object-contain bg-none"
              />
            </div>

            <div className="w-5" />
          </div>

          {/* Content */}
          <div className="text-center space-y-4">
            <p className="text-xs tracking-widest text-gray-500 font-semibold leading-[20px]">
              {HOME_UI.VERIFICATION_LABEL}
            </p>

            <h1 className="text-2xl font-bold text-[#1b3631] leading-snug">
              {HOME_UI.getTitle(propertyName).line1} <br />
              <span>{HOME_UI.getTitle(propertyName).propertyName}</span>
            </h1>

            <p className="text-sm text-gray-600 leading-[20px]">
              {HOME_UI.getDescription(propertyName, phoneNumber)}
            </p>

            {/* Dots */}
            <div className="flex justify-center gap-2 pt-2">
              <span className="w-2 h-2 bg-[#1b3631] rounded-full" />
              <span className="w-2 h-2 bg-gray-300 rounded-full" />
              <span className="w-2 h-2 bg-gray-300 rounded-full" />
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className="w-full h-14 mt-4 bg-brand text-white rounded-[6px] font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
            >
              {HOME_UI.CONTINUE_BUTTON}
              <ArrowRight size={18} />
            </button>

            {/* Privacy */}
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
    </>
  );
};

export default Home;
