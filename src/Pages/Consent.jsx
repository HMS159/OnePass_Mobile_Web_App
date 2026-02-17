import React, { useState } from "react";
import {
  ShieldCheck,
  Database,
  Clock,
  Scale,
  ArrowRight,
  ExternalLink,
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
  const navigate = useNavigate();

  return (
    <div className="w-full h-dvh bg-white px-4 py-5 flex flex-col overflow-y-auto">
      <MobileHeader />

      {/* Title */}
      <h1 className="text-2xl text-brand mb-2">{CONSENT_UI.TITLE}</h1>

      {/* Description */}
      <p className="text-sm text-gray-500 mb-4 leading-[20px]">
        {CONSENT_UI.DESCRIPTION}
      </p>

      {/* Consent Items */}
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

      <div className="flex-1" />

      {/* Checkbox Section */}
      <div className="bg-gray-100 border border-gray-200 rounded-[6px] p-4 mb-2">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mt-1 accent-brand"
          />
          <div>
            <p className="text-sm font-medium leading-[20px]">
              {CONSENT_UI.CHECKBOX_TEXT}
            </p>
            <p className="text-xs text-gray-500 mt-1  leading-[20px]">
              {CONSENT_UI.CHECKBOX_SUBTEXT}
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Link */}

      <a
        href="#"
        target="#"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 mb-4 text-sm underline hover:text-blue-700 transition"
      >
        {CONSENT_UI.PRIVACY_LINK}
        <ExternalLink size={14} />
      </a>

      {/* Continue Button */}
      <button
        disabled={!isChecked}
        onClick={() => navigate("/verification")}
        className={`w-full h-14 shrink-0 rounded-[6px] font-semibold flex items-center justify-center gap-2 transition
          ${
            isChecked
              ? "bg-brand text-white hover:opacity-90"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }
        `}
      >
        {CONSENT_UI.CONTINUE_BUTTON}
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default Consent;
