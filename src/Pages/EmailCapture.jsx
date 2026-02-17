import React, { useState } from "react";
import MobileHeader from "../Components/MobileHeader";
import { EMAIL_CAPTURE_UI } from "../constants/ui";
import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmailCapture = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  // Simple email validation
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="w-full h-dvh bg-white shadow-xl px-4 py-5 flex flex-col overflow-y-auto">
      <MobileHeader />

      {/* Title */}
      <h1 className="mb-3 text-2xl text-brand">{EMAIL_CAPTURE_UI.TITLE}</h1>

      {/* Description */}
      <p className="text-gray-500 text-sm mb-6 leading-[20px]">
        {EMAIL_CAPTURE_UI.DESCRIPTION}
      </p>

      {/* Email Label */}
      <label className="block text-xs font-semibold text-gray-500 tracking-wide mb-2">
        {EMAIL_CAPTURE_UI.EMAIL_LABEL}
      </label>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={EMAIL_CAPTURE_UI.EMAIL_PLACEHOLDER}
        autoComplete="off"
        className={`w-full bg-white text-sm h-12 rounded-[6px] border px-4 transition
    outline-none focus:outline-none focus:ring-0 focus:border-gray-300
    ${
      email.length > 0
        ? isValidEmail
          ? "border-gray-300"
          : "border-red-400"
        : "border-gray-300"
    }
  `}
      />

      <div className="flex-1" />

      <div>
        <p className="text-sm text-gray-400 mb-6 flex items-start gap-2 leading-[20px]">
          <ShieldCheck size={14} className="text-gray-400 mt-1 shrink-0" />
          {EMAIL_CAPTURE_UI.PRIVACY_TEXT}
        </p>

        <button
          disabled={!isValidEmail}
          onClick={() => navigate("/consent")}
          className={`w-full h-14 rounded-[6px] font-semibold transition
            ${
              isValidEmail
                ? "bg-brand text-white hover:opacity-90"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
        >
          {EMAIL_CAPTURE_UI.CONTINUE_BUTTON}
        </button>
      </div>
    </div>
  );
};

export default EmailCapture;
