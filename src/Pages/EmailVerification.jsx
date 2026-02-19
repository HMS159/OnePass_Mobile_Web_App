import React, { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import MobileHeader from "../Components/MobileHeader";
import { EMAIL_VERIFICATION_UI } from "../constants/ui";

const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");

  useEffect(() => {
    // ✅ Get email from navigation state
    if (location.state?.email) {
      setEmail(location.state.email);

      // Optional: store in localStorage if you still want persistence
      localStorage.setItem("userEmail", location.state.email);
    } else {
      // Fallback if user refreshes page
      const storedEmail = localStorage.getItem("userEmail");
      if (storedEmail) {
        setEmail(storedEmail);
      }
    }
  }, [location.state]);

  // ✅ Open default email application
  const handleOpenEmailApp = () => {
    if (email) {
      window.location.href = `mailto:${email}`;
      // ⏳ Delay navigation (example: 3 seconds)
      setTimeout(() => {
        navigate("/consent", {
          state: {
            email,
            businessType: location.state?.businessType,
            businessPlan: location.state?.businessPlan,
          },
        });
      }, 3000); // 3000ms = 3 seconds
    }
  };

  const handleResend = () => {
    console.log("Resend email logic here");
  };

  return (
    <div className="w-full h-dvh bg-white px-4 py-5 flex flex-col overflow-y-auto">
      <MobileHeader />

      {/* ICON + TEXT */}
      <div className="flex flex-col items-center text-center mt-10">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Mail size={32} className="text-[#1b3631]" />
        </div>

        <h1 className="text-2xl font-bold text-[#111827] mb-3">
          {EMAIL_VERIFICATION_UI.TITLE}
        </h1>

        <p className="text-sm text-gray-500 leading-[22px] max-w-xs">
          We've sent a verification link to{" "}
          <span className="font-semibold text-[#111827]">{email}</span>. Please
          click the link to confirm your email address and continue with your
          check-in.
        </p>
      </div>

      <div className="flex-1" />

      {/* BUTTON SECTION */}
      <div className="space-y-4 mb-6">
        <button
          onClick={handleOpenEmailApp}
          className="w-full h-14 rounded-[6px] bg-[#1b3631] text-white font-semibold flex items-center justify-center gap-2 shadow-md hover:opacity-95 transition"
        >
          <Mail size={18} />
          {EMAIL_VERIFICATION_UI.PRIMARY_BUTTON}
        </button>

        <button
          onClick={() => navigate("/email")}
          className="w-full text-sm text-gray-600 font-medium"
        >
          {EMAIL_VERIFICATION_UI.CHANGE_EMAIL}
        </button>
      </div>

      {/* RESEND */}
      <p className="text-center text-sm text-gray-500">
        {EMAIL_VERIFICATION_UI.RESEND_TEXT}{" "}
        <button onClick={handleResend} className="font-semibold text-[#1b3631]">
          {EMAIL_VERIFICATION_UI.RESEND_BUTTON}
        </button>
      </p>
    </div>
  );
};

export default EmailVerification;
