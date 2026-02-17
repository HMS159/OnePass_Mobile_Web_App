import React, { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileHeader from "../Components/MobileHeader";
import { VERIFICATION_UI } from "../constants/ui";

const VerificationCode = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  useEffect(() => {
    // Generate random 6 digit number
    const randomNumber = Math.floor(100000 + Math.random() * 900000);

    // Format as "123 456"
    const formatted = `${randomNumber.toString().slice(0, 3)} ${randomNumber
      .toString()
      .slice(3)}`;

    setCode(formatted);
  }, []);

  return (
    <div className="w-full h-dvh bg-white px-4 py-5 flex flex-col">
      <MobileHeader />

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
  );
};

export default VerificationCode;
