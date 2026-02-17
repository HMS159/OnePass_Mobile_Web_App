import React, { useEffect, useState } from "react";
import { ShieldCheck, Briefcase, ChevronRight, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileHeader from "../Components/MobileHeader";
import { VERIFICATION_UI } from "../constants/ui";

const VerificationCode = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [businessType, setBusinessType] = useState("Hospitality");

  useEffect(() => {
    const type = localStorage.getItem("businessType") || "Hospitality";
    setBusinessType(type);

    // Generate random 6 digit number
    const randomNumber = Math.floor(100000 + Math.random() * 900000);

    // Format as "123 456"
    const formatted = `${randomNumber.toString().slice(0, 3)} ${randomNumber
      .toString()
      .slice(3)}`;

    setCode(formatted);
  }, []);

  const isCorporate = businessType === "Corporate";

  return (
    <div className="w-full h-dvh bg-white px-4 py-5 flex flex-col overflow-y-auto">
      <MobileHeader />

      {isCorporate ? (
        <div className="flex flex-col h-full">
          {/* Progress Bar */}
          <div className="mt-4 mb-8">
            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">
              Step 4 of 5
            </span>
            <div className="w-full h-1 bg-gray-100 mt-2">
              <div className="w-[80%] h-full bg-[#1b3631]"></div>
            </div>
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-8 pt-4">
            <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center">
              <ShieldCheck size={40} className="text-[#1b3631]" />
            </div>
          </div>

          {/* Title & Description */}
          <div className="text-center px-4 mb-8">
            <h1 className="text-3xl font-bold text-[#1b3631] mb-4">Verify your ID</h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              Verify your Aadhaar securely to continue. The verification process is encrypted and direct.
            </p>
          </div>

          {/* Aadhaar Card */}
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-5 flex items-start gap-4 mb-8">
            <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center shrink-0">
              <Briefcase size={24} className="text-[#1b3631]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1b3631]">Aadhaar Verification</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Have your Aadhaar number and registered mobile phone ready for OTP.
              </p>
            </div>
          </div>

          <div className="flex-1" />

          {/* Proceed Button */}
          <button
            onClick={() => navigate("/face-match")}
            className="w-full h-14 bg-[#1b3631] text-white rounded-[8px] font-bold shadow-lg shadow-black/10 flex items-center justify-center gap-2 hover:opacity-95 transition"
          >
            Proceed with verification <ChevronRight size={18} />
          </button>

          <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-300 font-bold uppercase tracking-widest">
            <Lock size={12} />
            You will be redirected to a secure verification gateway
          </div>

          {/* Footer */}
          <div className="mt-12 flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-widest pb-4">
            <span>ENCRYPTED</span>
            <span>POWERED BY 1Pass</span>
          </div>
        </div>
      ) : (
        /* Hospitality View (Original) */
        <div className="flex flex-col h-full">
          {/* Title */}
          <h1 className="text-2xl text-brand mb-2">{VERIFICATION_UI.TITLE}</h1>

          {/* Description */}
          <p className="text-sm text-gray-500 mb-10 leading-[20px]">
            {VERIFICATION_UI.DESCRIPTION}
          </p>

          {/* Code Display */}
          <div className="flex justify-center mb-12">
            <h2 className="text-4xl font-semibold tracking-widest text-brand">
              {code}
            </h2>
          </div>

          <div className="flex-1" />

          {/* Security Info Box */}
          <div className="bg-gray-100 rounded-[6px] p-4 mb-4 flex items-start gap-3">
            <ShieldCheck size={16} className="text-brand mt-1 shrink-0" />
            <p className="text-xs text-gray-500 leading-[20px]">
              {VERIFICATION_UI.FOOTER_TEXT}
            </p>
          </div>

          {/* Done Button */}
          <button
            onClick={() => navigate("/success")}
            className="w-full h-14 bg-brand text-white rounded-[6px] font-semibold shadow-lg hover:opacity-90 transition"
          >
            {VERIFICATION_UI.DONE_BUTTON}
          </button>
        </div>
      )}
    </div>
  );
};

export default VerificationCode;
