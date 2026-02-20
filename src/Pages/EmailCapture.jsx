import React, { useState, useEffect } from "react";
import MobileHeader from "../Components/MobileHeader";
import { EMAIL_CAPTURE_UI } from "../constants/ui";
import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmailCapture = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [businessType, setBusinessType] = useState("Hospitality");
  const [businessPlan, setBusinessPlan] = useState("Starter");

  useEffect(() => {
    const type = localStorage.getItem("businessType") || "Hospitality";
    const plan = localStorage.getItem("businessPlan") || "Starter";

    setBusinessType(type);
    setBusinessPlan(plan);
  }, []);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isSMBOrEnterprise =
    businessPlan === "SMB" || businessPlan === "Enterprise";

  const shouldShowIdVerification =
    (businessType === "Corporate" || businessType === "Hospitality") &&
    isSMBOrEnterprise;

  const shouldShowCorporatePrivacy =
    businessType === "Corporate" && businessPlan === "Starter";

  const isFormValid = isValidEmail;

  const handleContinue = () => {
    if (!isFormValid) return;

    // Save email
    localStorage.setItem("visitorEmail", email);

    // If SMB/Enterprise → go to ID page
    if (shouldShowIdVerification) {
      navigate("/email-verification", {
        state: { email, businessType, businessPlan },
      });
    } else {
      // Starter → skip ID page
      navigate("/email-verification", {
        state: { email, businessType, businessPlan },
      });
    }
  };

  return (
    <div className="w-full h-dvh bg-white shadow-xl px-4 py-5 flex flex-col overflow-y-auto">
      <MobileHeader />
      {/* Title */}
      <h1 className="mb-3 text-3xl font-bold text-[#1b3631]">
        {EMAIL_CAPTURE_UI.TITLE}
      </h1>
      {/* Description */}
      <p className="text-gray-500 text-sm mb-6 leading-[20px]">
        {EMAIL_CAPTURE_UI.DESCRIPTION}
      </p>
      {/* Form */}
      <div className="space-y-6">
        {/* Email */}
        <div>
          <label className="block text-xs font-bold text-[#1b3631] tracking-wide mb-2">
            {businessType === "Corporate"
              ? "Email address"
              : EMAIL_CAPTURE_UI.EMAIL_LABEL}
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={
              businessType === "Corporate"
                ? "name@email.com"
                : EMAIL_CAPTURE_UI.EMAIL_PLACEHOLDER
            }
            autoComplete="off"
            className={`w-full bg-white text-sm h-12 rounded-[6px] border px-4 transition
              outline-none focus:outline-none focus:ring-0 focus:border-gray-300
              ${
                email.length > 0
                  ? isValidEmail
                    ? "border-gray-200"
                    : "border-red-400"
                  : "border-gray-200"
              }
            `}
          />
        </div>
      </div>
      <div className="flex-1" />
      {/* Footer */}
      <div className="mt-8">
        <div
          className={`p-4 rounded-lg flex items-start gap-4 mb-8 ${
            shouldShowCorporatePrivacy
              ? "bg-gray-50 border border-gray-100"
              : ""
          }`}
        >
          <ShieldCheck
            size={20}
            className={`${
              shouldShowCorporatePrivacy ? "text-[#1b3631]" : "text-gray-400"
            } mt-1 shrink-0`}
          />
          <p
            className={`text-[10px] leading-relaxed uppercase tracking-wider font-bold ${
              shouldShowCorporatePrivacy ? "text-gray-500" : "text-gray-400"
            }`}
          >
            {shouldShowCorporatePrivacy ? (
              EMAIL_CAPTURE_UI.PRIVACY_TEXT
            ) : (
              <>
                Your data is processed securely and encrypted. We never share
                your personal information with third parties.
                <span className="font-bold text-black">
                  View our Privacy Policy.
                </span>
              </>
            )}
          </p>
        </div>

        <button
          disabled={!isFormValid}
          onClick={handleContinue}
          className={`w-full h-14 rounded-[8px] font-bold transition flex items-center justify-center
            ${
              isFormValid
                ? "bg-[#1b3631] text-white hover:opacity-95 shadow-lg shadow-black/10"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default EmailCapture;
