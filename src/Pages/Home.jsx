// import React, { useEffect, useState } from "react";
// import { ArrowRight, Check } from "lucide-react";
// import Logo from "../assets/images/1pass_logo.png";
// import { useNavigate, useParams } from "react-router-dom";
// import propertyService from "../services/propertyService";
// import tenantService from "../services/tenantService";
// import guestService from "../services/guestService";
// import { HOME_UI } from "../constants/ui";

// const Home = () => {
//   const { guestNumber, restaurantId } = useParams();
//   const navigate = useNavigate();

//   const [businessType, setBusinessType] = useState("");
//   const [businessPlan, setBusinessPlan] = useState("");
//   const [isVerified, setIsVerified] = useState(false);
//   const [propertyData, setPropertyData] = useState(null);

//   const [tenantData, setTenantData] = useState(null);
//   const [tenantLogo, setTenantLogo] = useState(null);

//   // 🔹 Fetch Guest By Phone
//   useEffect(() => {
//     if (!guestNumber) return;

//     const fetchGuest = async () => {
//       try {
//         // Format: "91-9586023883"
//         const [country, phone] = guestNumber.split("-");

//         const countryCode = `${country}`;
//         const phoneNumber = phone;

//         const data = await guestService.getGuestByPhone(
//           countryCode,
//           phoneNumber,
//         );

//         console.log("UserData", data);

//         if (data?.verificationStatus === "verified") {
//           console.log("👤 Guest found:", data);

//           setIsVerified(true);
//         } else {
//           console.log("Guest not found");
//           setIsVerified(false);

//         }
//       } catch (err) {
//         console.error("Error fetching guest:", err);
//         setIsVerified(false);

//       }
//     };

//     fetchGuest();
//   }, [guestNumber]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const propertyId = restaurantId; // or 6 if fixed

//         // ✅ 1. Get Property
//         const propertyData = await propertyService.getPropertyById(propertyId);
//         console.log("🏨 Property response:", propertyData);

//         setPropertyData(propertyData);

//         // ✅ Set business type
//         if (propertyData?.propertyType) {
//           setBusinessType("Corporate"); // or propertyData.propertyType
//         }

//         // ✅ Set business plan
//         if (propertyData?.tier) {
//           let plan = propertyData.tier;

//           if (
//             propertyData.propertyType === "Hospitality" &&
//             plan === "Starter"
//           ) {
//             plan = "SMB";
//           }

//           setBusinessPlan(plan);
//         }

//         // ✅ 2. Get tenantId from property response
//         const tenantId = propertyData?.tenantId;

//         if (tenantId) {
//           const tenantData = await tenantService.getTenantById(tenantId);
//           console.log("🏢 Tenant response:", tenantData);

//           setTenantData(tenantData);

//           // ✅ Convert Base64 logo
//           if (tenantData?.logo && tenantData?.logoContentType) {
//             const imageSrc = `data:${tenantData.logoContentType};base64,${tenantData.logo}`;
//             setTenantLogo(imageSrc);
//           }
//         } else {
//           console.warn("No tenantId found in property response");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [restaurantId]);

//   const handleContinue = () => {
//     sessionStorage.setItem("businessType", businessType);
//     sessionStorage.setItem("businessPlan", businessPlan);
//     sessionStorage.setItem("isVerifiedUser", isVerified);

//     // 🔹 Convert 91-9586023883 → +919586023883
//     let fullPhoneNumber = "";

//     if (guestNumber) {
//       const [country, phone] = guestNumber.split("-");
//       fullPhoneNumber = `+${country}${phone}`;
//       console.log("Guest Full Number", fullPhoneNumber);
//       sessionStorage.setItem("visitorPhone", fullPhoneNumber);
//     }

//     if (isVerified) {
//       navigate("/consent", {
//         state: { phoneNumber: fullPhoneNumber },
//       });
//     } else {
//       navigate("/email", {
//         state: { phoneNumber: fullPhoneNumber },
//       });
//     }
//   };

//   const maskedNumber = guestNumber
//     ? `+${guestNumber.slice(0, 2)} ••••••${guestNumber.slice(-4)}`
//     : "";

//   // 🔹 Generate initials
//   const getInitials = (name) => {
//     if (!name) return "G";
//     return name
//       .split(" ")
//       .map((word) => word[0])
//       .join("")
//       .toUpperCase();
//   };

//   const displayPropertyName = propertyData?.name;
//   console.log(displayPropertyName);

//   return (
//     <div className="h-dvh w-full bg-white flex flex-col px-4 py-5">
//       {/* Logo */}
//       <div className="flex flex-col items-center mb-5 gap-4">
//         {/* Main App Logo */}
//         <img
//           src={Logo}
//           alt={HOME_UI.APP_NAME}
//           className="h-14 object-contain"
//         />

//         {/* Property Badge */}
//         {tenantLogo && (
//           <div className="w-15 h-15 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
//             <img
//               src={tenantLogo}
//               alt={tenantData?.name}
//               className="w-15 h-15 object-contain"
//             />
//           </div>
//         )}
//       </div>

//       <div className="flex-1 flex flex-col justify-center text-center">
//         {/* Label */}
//         <p className="text-xs tracking-[3px] font-semibold text-gray-400 uppercase mb-4">
//           {HOME_UI.VERIFICATION_LABEL}
//         </p>

//         {/* Title */}
//         <h1 className="text-3xl font-bold text-[#1b3631] leading-snug mb-8">
//           {isVerified
//             ? "Welcome back at"
//             : HOME_UI.getTitle(displayPropertyName).line1}
//           <br />
//           <span>{displayPropertyName}</span>
//         </h1>

//         {/* Content */}
//         {isVerified  (
//           <>
//             {/* Description */}
//             <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto mb-8">
//               You’ve been previously verified for this property. Verification
//               will be completed using your registered email{" "}
//               <span className="font-semibold text-[#1b3631]">
//                 {verifiedUser.email}
//               </span>{" "}
//               and phone number{" "}
//               <span className="font-semibold text-[#1b3631]">
//                 {verifiedUser.phone}
//               </span>
//               .
//             </p>

//             {/* Verified Guest Card */}
//             <div className="bg-[#F8F8F8] w-full border border-gray-200 rounded-[6px] px-5 py-4 max-w-sm mx-auto flex items-start justify-between">
//               <div className="flex items-start gap-4">
//                 {/* Avatar */}
//                 <div className="w-12 h-12 rounded-full bg-[#F4B183] flex items-center justify-center text-white text-sm font-semibold shrink-0">
//                   {getInitials(verifiedUser.name)}
//                 </div>

//                 {/* User Info */}
//                 <div className="text-left">
//                   <p className="font-semibold text-[#1b3631]">
//                     {verifiedUser.name}
//                   </p>

//                   <p className="text-xs text-gray-500">Status: verified</p>
//                 </div>
//               </div>

//               {/* Check Icon */}
//               <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
//                 <Check size={14} className="text-green-600" />
//               </div>
//             </div>
//           </>
//         ) : (
//           <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">
//             {HOME_UI.getDescription(displayPropertyName, maskedNumber)}
//           </p>
//         )}
//       </div>

//       {/* Button */}
//       <button
//         onClick={handleContinue}
//         className="w-full h-14 bg-[#1b3631] text-white rounded-md font-semibold text-md flex items-center justify-center gap-2 active:scale-95 transition-all shrink-0"
//       >
//         {HOME_UI.CONTINUE_BUTTON}
//         <ArrowRight size={18} />
//       </button>

//       {/* Privacy */}
//       <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
//         {HOME_UI.PRIVACY_TEXT}{" "}
//         <span className="underline cursor-pointer">{HOME_UI.PRIVACY_LINK}</span>
//       </p>
//     </div>
//   );
// };

// export default Home;

// -- 2nd updates --

import React, { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import Logo from "../assets/images/1pass_logo.png";
import { useNavigate, useParams } from "react-router-dom";
import propertyService from "../services/propertyService";
import tenantService from "../services/tenantService";
import guestService from "../services/guestService";
import { HOME_UI } from "../constants/ui";

const Home = () => {
  const { guestNumber, restaurantId } = useParams();
  const navigate = useNavigate();

  const [businessType, setBusinessType] = useState("");
  const [businessPlan, setBusinessPlan] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [verifiedUser, setVerifiedUser] = useState(null);
  const [propertyData, setPropertyData] = useState(null);
  const [tenantData, setTenantData] = useState(null);
  const [tenantLogo, setTenantLogo] = useState(null);

  // 🔹 Fetch Guest By Phone
  useEffect(() => {
    if (!guestNumber) return;

    const fetchGuest = async () => {
      try {
        const [country, phone] = guestNumber.split("-");

        const data = await guestService.getGuestByPhone(country, phone);

        console.log("UserData:", data);

        if (data?.verificationStatus === "verified") {
          setIsVerified(true);

          setVerifiedUser({
            name: data.fullName,
            email: data.email,
            phone: `${country} ••••••${phone.slice(-4)}`,
          });
        } else {
          setIsVerified(false);
          setVerifiedUser(null);
        }
      } catch (err) {
        console.error("Error fetching guest:", err);
        setIsVerified(false);
        setVerifiedUser(null);
      }
    };

    fetchGuest();
  }, [guestNumber]);

  // 🔹 Fetch Property + Tenant
  useEffect(() => {
    if (!restaurantId) return;

    const fetchData = async () => {
      try {
        const property = await propertyService.getPropertyById(restaurantId);
        console.log("🏨 Property response:", property);

        setPropertyData(property);

        if (property?.propertyType) {
          setBusinessType(property.propertyType);
        }

        if (property?.tier) {
          let plan = property.tier;

          if (property.propertyType === "Hospitality" && plan === "Starter") {
            plan = "SMB";
          }

          setBusinessPlan(plan);
        }

        const tenantId = property?.tenantId;

        if (tenantId) {
          const tenant = await tenantService.getTenantById(tenantId);
          console.log("🏢 Tenant response:", tenant);

          setTenantData(tenant);

          if (tenant?.logo && tenant?.logoContentType) {
            setTenantLogo(
              `data:${tenant.logoContentType};base64,${tenant.logo}`,
            );
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [restaurantId]);

  const handleContinue = () => {
    sessionStorage.setItem("businessType", businessType);
    sessionStorage.setItem("businessPlan", businessPlan);
    sessionStorage.setItem("isVerifiedUser", isVerified);

    let fullPhoneNumber = "";

    if (guestNumber) {
      const [country, phone] = guestNumber.split("-");
      fullPhoneNumber = `+${country}${phone}`;
      sessionStorage.setItem("visitorCountryCode", country);
      sessionStorage.setItem("visitorPhoneNumber", phone);
      sessionStorage.setItem("visitorPhone", fullPhoneNumber);
    }

    if (isVerified && verifiedUser) {
      navigate("/consent", {
        state: { phoneNumber: fullPhoneNumber },
      });
    } else {
      navigate("/email", {
        state: { phoneNumber: fullPhoneNumber },
      });
    }
  };

  const maskedNumber = guestNumber
    ? `+${guestNumber.slice(0, 2)} ••••••${guestNumber.slice(-4)}`
    : "";

  const getInitials = (name) => {
    if (!name) return "G";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const displayPropertyName = propertyData?.name;

  return (
    <div className="h-dvh w-full bg-white flex flex-col px-4 py-5">
      {/* Logo Section */}
      <div className="flex flex-col items-center mb-5 gap-4">
        <img
          src={Logo}
          alt={HOME_UI.APP_NAME}
          className="h-14 object-contain"
        />

        {tenantLogo && (
          <div className="w-15 h-15 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
            <img
              src={tenantLogo}
              alt={tenantData?.name}
              className="w-15 h-15 object-contain"
            />
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-center text-center">
        <p className="text-xs tracking-[3px] font-semibold text-gray-400 uppercase mb-4">
          {HOME_UI.VERIFICATION_LABEL}
        </p>

        <h1 className="text-3xl font-bold text-[#1b3631] leading-snug mb-8">
          {isVerified && verifiedUser
            ? "Welcome back at"
            : HOME_UI.getTitle(displayPropertyName).line1}
          <br />
          <span>{displayPropertyName}</span>
        </h1>

        {isVerified && verifiedUser ? (
          <>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto mb-8">
              You’ve been previously verified for this property. Verification
              will be completed using your registered email{" "}
              <span className="font-semibold text-[#1b3631]">
                {verifiedUser.email}
              </span>{" "}
              and phone number{" "}
              <span className="font-semibold text-[#1b3631]">
                {verifiedUser.phone}
              </span>
              .
            </p>

            <div className="bg-[#F8F8F8] w-full border border-gray-200 rounded-[6px] px-5 py-4 max-w-sm mx-auto flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#F4B183] flex items-center justify-center text-white text-sm font-semibold shrink-0">
                  {getInitials(verifiedUser.name)}
                </div>

                <div className="text-left">
                  <p className="font-semibold text-[#1b3631]">
                    {verifiedUser.name}
                  </p>
                  <p className="text-xs text-gray-500">Status: verified</p>
                </div>
              </div>

              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                <Check size={14} className="text-green-600" />
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">
            {HOME_UI.getDescription(displayPropertyName, maskedNumber)}
          </p>
        )}
      </div>

      <button
        onClick={handleContinue}
        className="w-full h-14 bg-[#1b3631] text-white rounded-md font-semibold text-md flex items-center justify-center gap-2 active:scale-95 transition-all shrink-0"
      >
        {HOME_UI.CONTINUE_BUTTON}
        <ArrowRight size={18} />
      </button>

      <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
        {HOME_UI.PRIVACY_TEXT}{" "}
        <span className="underline cursor-pointer">{HOME_UI.PRIVACY_LINK}</span>
      </p>
    </div>
  );
};

export default Home;
