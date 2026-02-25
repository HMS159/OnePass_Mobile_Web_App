import React, { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileHeader from "../Components/MobileHeader";
import { VERIFICATION_UI } from "../constants/ui";

const VerificationCodePage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  useEffect(() => {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const formatted = `${randomNumber.toString().slice(0, 3)} ${randomNumber
      .toString()
      .slice(3)}`;
    setCode(formatted);
  }, []);

  return (
    <div className="w-full h-dvh bg-white flex flex-col px-4 py-5">
      <MobileHeader />

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

      <div className="bg-gray-100 rounded-md p-4 mb-4 flex items-start gap-3">
        <ShieldCheck size={16} className="text-brand mt-1" />
        <p className="text-xs text-gray-500 leading-[20px]">
          {VERIFICATION_UI.FOOTER_TEXT}
        </p>
      </div>

      <button
        onClick={() => navigate("/success")}
        className="w-full h-14 bg-brand text-white rounded-md font-semibold shadow-lg hover:opacity-90 transition"
      >
        {VERIFICATION_UI.DONE_BUTTON}
      </button>
    </div>
  );
};

export default VerificationCodePage;
