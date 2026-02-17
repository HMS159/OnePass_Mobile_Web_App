import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/1pass_logo.png";

const MobileHeader = ({ showBack = true }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      {/* Back Button */}
      {showBack ? (
        <button onClick={() => navigate(-1)} className="text-gray-500">
          <ArrowLeft size={20} />
        </button>
      ) : (
        <div className="w-5" />
      )}

      {/* Logo */}
      <img src={Logo} alt="1Pass Logo" className="h-15 object-contain" />

      {/* Spacer */}
      <div className="w-5" />
    </div>
  );
};

export default MobileHeader;

// --

// import React from "react";
// import { ArrowLeft } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import Logo from "../assets/images/1pass_logo.png";

// const MobileHeader = ({ showBack = true }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="relative flex items-center justify-center h-14">
//       {/* Back Button (Absolute) */}
//       {showBack && (
//         <button
//           onClick={() => navigate(-1)}
//           className="absolute left-0 text-gray-500 p-2"
//         >
//           <ArrowLeft size={20} />
//         </button>
//       )}

//       {/* Logo (Centered) */}
//       <img src={Logo} alt="1Pass Logo" className="h-15 object-contain" />
//     </div>
//   );
// };

// export default MobileHeader;
