import React, { useEffect, useState } from "react";
import {
  ShieldCheck,
  Briefcase,
  ChevronRight,
  Lock,
  User,
  IdCard,
  FileText,
  BadgeCheck,
  Building2,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileHeader from "../Components/MobileHeader";
import { VERIFICATION_UI } from "../constants/ui";

const VerificationCode = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [businessType, setBusinessType] = useState("Hospitality");
  const [businessPlan, setBusinessPlan] = useState("");
  const [showCodeView, setShowCodeView] = useState(false);
  const [isVerifiedUser, setIsVerifiedUser] = useState(false);
  const [selectedId, setSelectedId] = useState("aadhaar");

  useEffect(() => {
    const type = localStorage.getItem("businessType") || "Hospitality";
    const plan = localStorage.getItem("businessPlan") || "";
    const verified = localStorage.getItem("isVerifiedUser") === "true";
    const id = localStorage.getItem("selectedId") || "aadhaar";

    setBusinessType(type);
    setBusinessPlan(plan);
    setIsVerifiedUser(verified);
    setSelectedId(id);

    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const formatted = `${randomNumber.toString().slice(0, 3)} ${randomNumber
      .toString()
      .slice(3)}`;
    setCode(formatted);
  }, []);

  const isEligibleType = ["corporate", "hospitality"].includes(
    businessType?.toLowerCase(),
  );

  const isSMB = businessPlan?.toLowerCase() === "smb";
  const isEnterprise = businessPlan?.toLowerCase() === "enterprise";

  const showCorporateView = isEligibleType && (isSMB || isEnterprise);
  const shouldDirectlyShowCode = isEligibleType && isSMB && isVerifiedUser;

  const getIDContent = () => {
    switch (selectedId) {
      case "passport":
        return {
          title: "Verify with Passport",
          description:
            "Please have your physical Passport ready for digital verification. You will use our electronic service to securely validate your document; there is no need to present it to the receptionist.",
          icon: (
            <div className="relative">
              <User size={40} className="text-[#1b3631]" />
              <div className="absolute -top-1 -right-1">
                <BadgeCheck
                  size={16}
                  className="text-[#1b3631]"
                  fill="#1b3631"
                  stroke="white"
                />
              </div>
            </div>
          ),
          card: null,
          footerLink: "I do not have my passport at this time",
          showStatus: false,
          showImage: false,
          headerText: "1Pass Check-in",
        };
      case "voter":
        return {
          title: "Digital Voter ID Verification",
          description:
            "Please have your physical Voter ID card ready. You will use our electronic verification service to validate your details. You do not need to present your card to the receptionist.",
          icon: <IdCard size={40} className="text-[#1b3631]" />,
          card: null,
          footerLink: "Need help? Contact support",
          showStatus: false,
          showImage: true,
          headerText: "1Pass Check-in",
        };
      case "dl":
        return {
          title: "Digital Identity Verification",
          description:
            "Please have your physical Driver's License ready for our secure electronic validation service. You will not need to show your ID to the receptionist; the entire process is completed digitally for your privacy.",
          icon: <IdCard size={40} className="text-[#1b3631]" />,
          card: null,
          footerLink: null,
          showStatus: true,
          statusText: "ELECTRONIC VALIDATION READY",
          stepText: "Step 2 of 4 • Identity Verification",
          headerText: "Check-in",
        };
      case "aadhaar":
      default:
        return {
          title: "Verify your ID",
          description:
            "Verify your Aadhaar securely to continue. The verification process is encrypted and direct.",
          icon: <ShieldCheck size={40} className="text-[#1b3631]" />,
          card: {
            title: "Aadhaar Verification",
            description:
              "Have your Aadhaar number and registered mobile phone ready for OTP.",
            icon: <Briefcase size={24} className="text-[#1b3631]" />,
          },
          footerLink: null,
          showStatus: false,
          showImage: false,
          headerText: "1Pass Check-in",
        };
    }
  };

  const content = getIDContent();

  const handleContinue = () => {
    if (isSMB) {
      setShowCodeView(true);
    } else if (isEnterprise) {
      navigate("/face-match");
    }
  };

  return (
    <div className="w-full h-dvh bg-white flex flex-col overflow-y-auto">
      {/* Dynamic Header */}
      {showCorporateView && !showCodeView && !shouldDirectlyShowCode ? (
        <div className="w-full h-15 px-6 flex items-center justify-between shrink-0">
          <button onClick={() => navigate(-1)} className="text-[#1b3631]">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold font-black text-[#1b3631] tracking-tighter">
            {selectedId === "aadhaar" ? "1/Pass" : content.headerText}
          </h1>
          <div className="w-6" />
        </div>
      ) : (
        <div className="px-4 py-5 shrink-0">
          <MobileHeader />
        </div>
      )}

      <div className="flex-1 px-4 flex flex-col overflow-y-auto pb-6">
        {shouldDirectlyShowCode ? (
          renderCodeView()
        ) : !showCodeView ? (
          showCorporateView ? (
            <div
              className={`flex flex-col h-full ${selectedId !== "aadhaar" ? "items-center text-center" : ""}`}
            >
              {/* Main Content Card Wrapper for non-Aadhaar */}
              <div
                className={`w-full ${selectedId !== "aadhaar" ? "bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 p-6 flex flex-col items-center mt-2" : ""}`}
              >
                {/* Icon Container */}
                <div className="flex justify-center mb-8 pt-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center">
                    {content.icon}
                  </div>
                </div>

                {/* Title & Description */}
                <div
                  className={`mb-8 ${selectedId === "aadhaar" ? "text-center px-4" : ""}`}
                >
                  <h1 className="text-3xl font-bold text-[#1b3631] mb-4">
                    {content.title}
                  </h1>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-[280px] mx-auto">
                    {content.description}
                  </p>
                </div>

                {/* Aadhaar Card */}
                {content.card && (
                  <div className="bg-gray-50 border border-gray-100 rounded-lg p-5 flex items-start gap-4 mb-8 text-left w-full">
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center shrink-0">
                      {content.card.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1b3631]">
                        {content.card.title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                        {content.card.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Voter Image Placeholder */}
                {content.showImage && (
                  <div className="w-full h-40 bg-gray-200/50 rounded-2xl relative mb-8 overflow-hidden border border-dashed border-gray-300 flex flex-col items-center justify-center">
                    <div className="w-32 h-20 bg-white/80 rounded-lg shadow-sm flex items-center p-2 relative opacity-60">
                      <div className="w-6 h-8 bg-gray-200 rounded-sm mr-2" />
                      <div className="flex-1 space-y-1.5">
                        <div className="w-16 h-1 bg-gray-200 rounded-full" />
                        <div className="w-12 h-1 bg-gray-200 rounded-full" />
                        <div className="w-10 h-1 bg-gray-100 rounded-full" />
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gray-400 rounded flex items-center justify-center">
                        <User size={12} className="text-white" />
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                        IDENTIFICATION REQUIRED
                      </span>
                    </div>
                  </div>
                )}

                {/* DL Status Box */}
                {content.showStatus && (
                  <div className="w-full h-24 bg-[#f8fafc] rounded-2xl mb-8 border border-dashed border-[#e2e8f0] flex flex-col items-center justify-center gap-2">
                    <div className="text-[#94a3b8] flex gap-1">
                      <div className="w-1 h-1 bg-[#94a3b8] rounded-full opacity-40" />
                      <div className="w-1 h-1 bg-[#94a3b8] rounded-full" />
                      <div className="w-1 h-1 bg-[#94a3b8] rounded-full opacity-40" />
                    </div>
                    <span className="text-[9px] font-extrabold text-[#94a3b8] uppercase tracking-[0.2em] px-4">
                      {content.statusText}
                    </span>
                  </div>
                )}

                {/* Continue Button */}
                <button
                  onClick={handleContinue}
                  className="w-full h-14 bg-[#1b3631] shrink-0 text-white rounded-[6px] font-bold shadow-lg shadow-black/10 flex items-center justify-center gap-2 hover:opacity-95 transition"
                >
                  {selectedId === "aadhaar"
                    ? "Proceed with verification >"
                    : "Continue"}
                </button>

                {/* Footer Link */}
                {content.footerLink && (
                  <button className="text-gray-400 text-xs font-semibold mt-4 hover:text-[#1b3631] transition-colors">
                    {content.footerLink}
                  </button>
                )}

                {/* DL Step Text */}
                {selectedId === "dl" && (
                  <p className="text-[10px] text-[#94a3b8] mt-3 font-bold uppercase tracking-widest">
                    {content.stepText}
                  </p>
                )}
              </div>

              <div className="flex-1" />

              {/* Bottom Decoration */}
              {selectedId === "aadhaar" ? (
                <>
                  <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-300 font-bold uppercase tracking-widest">
                    <Lock size={12} />
                    You will be redirected to a secure verification gateway
                  </div>

                  <div className="mt-5 flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-widest pb-4">
                    <span>ENCRYPTED</span>
                    <span>POWERED BY 1Pass</span>
                  </div>
                </>
              ) : selectedId === "dl" ? (
                <div className="mt-6 flex flex-col items-center gap-4">
                  <div className="flex items-center justify-center gap-2 text-[#94a3b8] text-[9px] font-extrabold uppercase tracking-[0.2em]">
                    <Lock size={12} />
                    <span>ENCRYPTED & SECURE 1PASS CHECK-IN</span>
                  </div>
                </div>
              ) : (
                <div className="mt-6 flex items-center justify-center gap-2 text-[#94a3b8] text-[10px] font-extrabold uppercase tracking-[0.2em]">
                  <ShieldCheck size={14} className="opacity-50" />
                  <span>SECURE VERIFICATION</span>
                </div>
              )}

              {/* Pagination dots for Voter screen */}
              {selectedId === "voter" && (
                <div className="mt-6 flex gap-2 justify-center pb-4">
                  <div className="w-8 h-1 bg-[#e2e8f0] rounded-full" />
                  <div className="w-8 h-1 bg-[#1b3631] rounded-full" />
                  <div className="w-8 h-1 bg-[#e2e8f0] rounded-full" />
                </div>
              )}
            </div>
          ) : (
            renderCodeView()
          )
        ) : (
          renderCodeView()
        )}
      </div>
    </div>
  );

  function renderCodeView() {
    return (
      <div className="flex flex-col h-full bg-white pt-5">
        <h1 className="text-2xl text-brand mb-2 font-bold">
          {VERIFICATION_UI.TITLE}
        </h1>

        <p className="text-sm text-gray-500 mb-10 leading-[20px]">
          {VERIFICATION_UI.DESCRIPTION}
        </p>

        <div className="flex justify-center mb-12">
          <h2 className="text-4xl font-semibold tracking-widest text-brand">
            {code}
          </h2>
        </div>

        <div className="flex-1" />

        <div className="bg-gray-100 rounded-[12px] p-4 mb-4 flex items-start gap-3">
          <ShieldCheck size={16} className="text-brand mt-1 shrink-0" />
          <p className="text-xs text-gray-500 leading-[20px]">
            {VERIFICATION_UI.FOOTER_TEXT}
          </p>
        </div>

        <button
          onClick={() => navigate("/success")}
          className="w-full h-14 bg-brand text-white rounded-[12px] font-semibold shadow-lg hover:opacity-90 transition mb-4"
        >
          {VERIFICATION_UI.DONE_BUTTON}
        </button>
      </div>
    );
  }
};

export default VerificationCode;
