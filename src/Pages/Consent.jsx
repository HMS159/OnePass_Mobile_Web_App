import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Database,
  Clock,
  Scale,
  ArrowRight,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import MobileHeader from "../Components/MobileHeader";
import { CONSENT_UI } from "../constants/ui";
import { useNavigate } from "react-router-dom";

const iconMap = {
  shield: ShieldCheck,
  database: Database,
  clock: Clock,
  scale: Scale,
};

const Consent = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [businessType, setBusinessType] = useState("Hospitality");
  const [businessPlan, setBusinessPlan] = useState("Starter");
  const [isVerifiedUser, setIsVerifiedUser] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const type = localStorage.getItem("businessType") || "Hospitality";
    const plan = localStorage.getItem("businessPlan") || "Starter";
    const verified = localStorage.getItem("isVerifiedUser") === "true";

    setBusinessType(type);
    setBusinessPlan(plan);
    setIsVerifiedUser(verified);
  }, []);

  const isCorporate = businessType === "Corporate";

  const shouldShowDetailedConsent =
    (businessType === "Corporate" || businessType === "Hospitality") &&
    (businessPlan === "SMB" || businessPlan === "Enterprise");

  const shouldShowStarterConsent =
    (businessType === "Corporate" || businessType === "Hospitality") &&
    businessPlan === "Starter";

  // 🔥 NEW REDIRECT LOGIC
  const shouldRedirectToFaceMatch =
    (businessType === "Corporate" || businessType === "Hospitality") &&
    businessPlan === "Enterprise" &&
    isVerifiedUser;

  const handleContinue = () => {
    if (shouldRedirectToFaceMatch) {
      navigate("/face-match");
    } else if (shouldShowStarterConsent) {
      navigate("/verification-code");
    } else {
      navigate("/verification");
    }
  };

  return (
    <div className="w-full h-dvh bg-white px-4 py-5 flex flex-col overflow-y-auto">
      <MobileHeader />

      <h1
        className={`${
          isCorporate
            ? "text-3xl font-bold text-[#1b3631]"
            : "text-2xl text-brand"
        } mb-4`}
      >
        {CONSENT_UI.TITLE}
      </h1>

      <p className="text-sm text-gray-500 mb-6 leading-[22px]">
        {isCorporate
          ? "To verify your identity for this visit, we need your consent to process your personal data."
          : CONSENT_UI.DESCRIPTION}
      </p>

      {/* Consent Content */}
      {shouldShowDetailedConsent ? (
        <div className="space-y-6 overflow-y-auto pr-2 pb-6">
          <section>
            <h4 className="text-sm font-bold text-[#1b3631] mb-2">
              We will use:
            </h4>
            <ul className="text-sm text-gray-500 space-y-2 list-disc ml-5">
              <li>Your email address</li>
              <li>Your phone number shared at reception</li>
              <li>Details from the ID you selected for verification</li>
            </ul>
          </section>

          <section>
            <h4 className="text-sm font-bold text-[#1b3631] mb-2">
              This information is used only for:
            </h4>
            <ul className="text-sm text-gray-500 space-y-2 list-disc ml-5">
              <li>Visitor identity verification</li>
              <li>Access and security management for this location</li>
            </ul>
          </section>

          <section>
            <h4 className="text-sm font-bold text-[#1b3631] mb-2">
              Your data:
            </h4>
            <ul className="text-sm text-gray-500 space-y-2 list-disc ml-5">
              <li>
                Is processed only for the purpose of this visit and related
                compliance
              </li>
              <li>Is not sold or used for marketing</li>
              <li>
                Is shared only with the hosting organization and its authorized
                service providers
              </li>
              <li>
                Is retained only for as long as required by law or operational
                needs
              </li>
            </ul>
          </section>

          <p className="text-xs text-gray-400 leading-relaxed">
            You can request access, correction, or withdrawal of consent as per
            India's{" "}
            <span className="italic">
              Digital Personal Data Protection (DPDP) Act
            </span>
            .
          </p>

          <a
            href="#"
            className="flex items-center gap-1 text-sm font-bold text-[#1b3631] underline decoration-[#1b3631]/20"
          >
            View privacy notice <ExternalLink size={14} />
          </a>
        </div>
      ) : shouldShowStarterConsent ? (
        <div className="space-y-3">
          {CONSENT_UI.ITEMS.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <div key={item.id} className="flex gap-3">
                <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-brand" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">{item.title}</h4>
                  <p className="text-xs text-gray-500 leading-[20px]">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {!isCorporate && <div className="flex-1" />}

      {/* Checkbox Section */}
      <div
        className={`mt-auto ${
          isCorporate ? "bg-gray-50" : "bg-gray-100"
        } border border-gray-100 rounded-lg p-4 mb-4`}
      >
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className={`mt-1 h-5 w-5 rounded border-gray-300 ${
              isCorporate ? "accent-[#1b3631]" : "accent-brand"
            }`}
          />

          <div>
            {shouldShowStarterConsent ? (
              <>
                <p className="text-sm font-medium text-[#1b3631] leading-[20px]">
                  {CONSENT_UI.CHECKBOX_TEXT}
                </p>
                <p className="text-xs text-gray-500 mt-1 leading-[20px]">
                  {CONSENT_UI.CHECKBOX_SUBTEXT}
                </p>
              </>
            ) : shouldShowDetailedConsent ? (
              <p className="text-sm font-medium text-[#1b3631] leading-[20px]">
                I consent to the processing of my personal data for identity
                verification and visitor access management.
              </p>
            ) : null}
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <button
        disabled={!isChecked}
        onClick={handleContinue}
        className={`w-full h-14 shrink-0 rounded-[8px] font-bold flex items-center justify-center gap-2 transition
          ${
            isChecked
              ? "bg-[#1b3631] text-white hover:opacity-95 shadow-lg shadow-black/10"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }
        `}
      >
        {isCorporate ? "I Accept" : CONSENT_UI.CONTINUE_BUTTON}
        {isCorporate ? <ChevronRight size={18} /> : <ArrowRight size={18} />}
      </button>

      {shouldShowDetailedConsent && (
        <p className="mt-4 text-[10px] text-gray-400 text-center uppercase tracking-widest font-bold">
          Securely processed by 1Pass Verify
        </p>
      )}
    </div>
  );
};

export default Consent;
