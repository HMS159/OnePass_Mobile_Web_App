import React, { useState, useEffect } from "react";
import MobileHeader from "../Components/MobileHeader";
import { EMAIL_CAPTURE_UI } from "../constants/ui";
import { ShieldCheck, ChevronDown, Home, Shield, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmailCapture = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [businessType, setBusinessType] = useState("Hospitality");
  const [businessPlan, setBusinessPlan] = useState("Starter");

  useEffect(() => {
    const type = localStorage.getItem("businessType") || "Hospitality";
    const plan = localStorage.getItem("businessPlan") || "Starter";

    setBusinessType(type);
    setBusinessPlan(plan);
  }, []);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  /* =========================
     UI CONDITIONS
  ========================== */

  const isSMBOrEnterprise =
    businessPlan === "SMB" || businessPlan === "Enterprise";

  const isCorporateStarter =
    businessType === "Corporate" && businessPlan === "Starter";

  // Show ID dropdown
  const shouldShowIdVerification =
    (businessType === "Hospitality" || businessType === "Corporate") &&
    isSMBOrEnterprise;

  // Show description
  const shouldShowDescription = businessPlan === "Starter";

  // Show email help text
  const shouldShowEmailHelp =
    (businessType === "Corporate" || businessType === "Hospitality") &&
    isSMBOrEnterprise;

  // Corporate styled privacy
  const shouldShowCorporatePrivacy = isCorporateStarter;

  const isFormValid = shouldShowIdVerification
    ? isValidEmail && selectedId !== ""
    : isValidEmail;

  const shouldShowYourDetailsTitle =
    (businessType === "Corporate" || businessType === "Hospitality") &&
    businessPlan !== "Starter";

  return (
    <div className="w-full h-dvh bg-white shadow-xl px-4 py-5 flex flex-col overflow-y-auto">
      <MobileHeader />

      {/* Corporate Progress */}

      {(businessType === "Corporate" || businessType === "Hospitality") &&
        isSMBOrEnterprise && (
          <div className="mt-6 mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                Step 2 of 5
              </span>
              <span className="text-[10px] font-bold text-gray-600 tracking-widest uppercase">
                40% Complete
              </span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="w-[40%] h-full bg-[#1b3631] rounded-full" />
            </div>
          </div>
        )}

      {/* Title */}

      <h1 className="mb-3 text-3xl font-bold text-[#1b3631]">
        {shouldShowYourDetailsTitle ? "Your details" : EMAIL_CAPTURE_UI.TITLE}
      </h1>

      {/* Description */}
      {shouldShowDescription && (
        <p className="text-gray-500 text-sm mb-6 leading-[20px]">
          {EMAIL_CAPTURE_UI.DESCRIPTION}
        </p>
      )}

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

          {shouldShowEmailHelp && (
            <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">
              Your email is required for digital receipts and visit records.
            </p>
          )}
        </div>

        {/* ID Verification */}
        {shouldShowIdVerification && (
          <div>
            <label className="block text-xs font-bold text-[#1b3631] tracking-wide mb-2">
              Choose an ID for verification
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
                <option value="aadhaar">Aadhaar Card</option>
                <option value="passport">Passport</option>
                <option value="voter">Voter ID</option>
                <option value="dl">Driving License</option>
              </select>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <ChevronDown size={18} />
              </div>
            </div>

            <p className="text-[11px] text-gray-400 mt-2 leading-relaxed italic">
              You will be guided to securely verify the selected ID in the next
              step.
            </p>
          </div>
        )}
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
            {shouldShowCorporatePrivacy
              ? EMAIL_CAPTURE_UI.PRIVACY_TEXT
              : "Privacy Policy: Your email and ID are collected only for visitor verification and access control."}
          </p>
        </div>

        <button
          disabled={!isFormValid}
          onClick={() => navigate("/consent")}
          className={`w-full h-14 rounded-[8px] font-bold transition flex items-center justify-center gap-2
            ${
              isFormValid
                ? "bg-[#1b3631] text-white hover:opacity-95 shadow-lg shadow-black/10"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          {businessType === "Corporate"
            ? "Continue →"
            : EMAIL_CAPTURE_UI.CONTINUE_BUTTON}
        </button>
      </div>

      {/* Corporate Bottom Nav */}
      {/* {isSMBOrEnterprise && (
        <div className="mt-8 -mx-4 -mb-5 px-6 py-4 border-t border-gray-100 flex justify-between items-center bg-white">
          <button className="text-gray-400 p-2">
            <Home size={22} />
          </button>
          <button className="bg-gray-50 p-3 rounded-xl text-[#1b3631]">
            <Shield size={22} />
          </button>
          <button className="text-gray-400 p-2">
            <User size={22} />
          </button>
        </div>
      )} */}
    </div>
  );
};

export default EmailCapture;
