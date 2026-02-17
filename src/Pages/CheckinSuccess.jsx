// import React from "react";
// import { Check, X, HelpCircle } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { CHECKIN_SUCCESS_UI } from "../constants/ui";

// const CheckinSuccess = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="w-full h-dvh bg-gray-100 flex flex-col items-center justify-center px-4">
//       {/* Card */}
//       <div className="w-full bg-white rounded-3xl p-6 shadow-sm border border-gray-200 relative text-center">
//         {/* Close Button */}
//         <button
//           onClick={() => navigate("/")}
//           className="absolute top-4 right-4 text-gray-400"
//         >
//           <X size={18} />
//         </button>

//         {/* Success Icon */}
//         <div className="flex justify-center mb-6">
//           <div className="w-20 h-20 rounded-full bg-brand flex items-center justify-center shadow-md">
//             <Check size={28} className="text-white" />
//           </div>
//         </div>

//         {/* Title */}
//         <h1 className="text-2xl text-brand mb-3">{CHECKIN_SUCCESS_UI.TITLE}</h1>

//         {/* Description */}
//         <p className="text-sm text-gray-600 mb-4">
//           {CHECKIN_SUCCESS_UI.DESCRIPTION}
//         </p>

//         {/* Subtext */}
//         <p className="text-xs text-gray-400 tracking-wide mb-6">
//           {CHECKIN_SUCCESS_UI.SUBTEXT}
//         </p>

//         {/* Done Button */}
//         <button
//           onClick={() => navigate("/")}
//           className="w-full h-12 bg-brand text-white rounded-xl font-semibold shadow-lg hover:opacity-90 transition"
//         >
//           {CHECKIN_SUCCESS_UI.DONE_BUTTON}
//         </button>
//       </div>

//       {/* Help Section */}
//       <div className="flex items-center gap-2 mt-6 text-gray-400 text-sm">
//         <HelpCircle size={14} />
//         {CHECKIN_SUCCESS_UI.HELP_TEXT}
//       </div>
//     </div>
//   );
// };

// export default CheckinSuccess;

// --

import React from "react";
import { Check, X, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CHECKIN_SUCCESS_UI } from "../constants/ui";

const CheckinSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-dvh bg-gray-100 flex flex-col items-center justify-center px-4 py-5">
      {/* Card */}
      <div className="w-full bg-white rounded-[6px] p-6 shadow-sm border border-gray-200 relative text-center">
        {/* Close Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-400"
        >
          <X size={18} />
        </button>

        {/* 🔥 Animated Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative flex items-center justify-center">
            {/* Pulse Ring */}
            <span className="absolute w-15 h-15 rounded-full bg-brand/20 animate-ping"></span>

            {/* Main Circle */}
            <div className="w-20 h-20 rounded-full bg-brand flex items-center justify-center shadow-lg animate-pop">
              <Check size={28} className="text-white" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl text-brand mb-3">{CHECKIN_SUCCESS_UI.TITLE}</h1>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 leading-[20px]">
          {CHECKIN_SUCCESS_UI.DESCRIPTION}
        </p>

        {/* Subtext */}
        <p className="text-xs text-gray-400 tracking-wide mb-6 leading-[20px]">
          {CHECKIN_SUCCESS_UI.SUBTEXT}
        </p>

        {/* Done Button */}
        <button
          onClick={() => navigate("/history")}
          className="w-full h-14 bg-brand text-white rounded-[6px] font-semibold hover:opacity-90 transition"
        >
          {CHECKIN_SUCCESS_UI.DONE_BUTTON}
        </button>
      </div>

      {/* Help Section */}
      <div className="flex items-center gap-2 mt-6 text-gray-400 text-sm">
        <HelpCircle size={14} />
        {CHECKIN_SUCCESS_UI.HELP_TEXT}
      </div>
    </div>
  );
};

export default CheckinSuccess;
