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
        // Format: "91-9586023883"
        const [country, phone] = guestNumber.split("-");

        const countryCode = `${country}`;
        const phoneNumber = phone;

        const data = await guestService.getGuestByPhone(
          countryCode,
          phoneNumber,
        );

        if (data.verificationStatus === "verified") {
          console.log("👤 Guest found:", data);

          setIsVerified(true);
          setVerifiedUser({
            name: data.fullName,
            email: data.email,
            phone: `${countryCode} ••••••${phoneNumber.slice(-4)}`,
          });
        } else {
          console.log("Guest not found");
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

  // Fetch property details (hardcoded id = 6 for now)
  useEffect(() => {
    const propertyId = restaurantId; // ✅ Always send 6

    propertyService
      .getPropertyById(propertyId)
      .then((data) => {
        console.log("🏨 Property response:", data);

        setPropertyData(data);

        // ✅ Set business type from API
        if (data?.propertyType) {
          setBusinessType(data.propertyType);
        }

        // ✅ Set business plan from API
        if (data?.tier) {
          let plan = data.tier;

          // 🚫 Prevent Starter for Hospitality (if required)
          if (data.propertyType === "Hospitality" && plan === "Starter") {
            plan = "SMB";
          }

          setBusinessPlan(plan);
        }
      })
      .catch((err) => console.error("Failed to fetch property:", err));

    tenantService
      .getTenantById(6)
      .then((data) => {
        console.log("Tenant response:", data);

        setTenantData(data);

        // ✅ Convert Base64 logo to usable image src
        if (data?.logo && data?.logoContentType) {
          const imageSrc = `data:${data.logoContentType};base64,${data.logo}`;
          setTenantLogo(imageSrc);
        }
      })
      .catch(console.error);
  }, []);

  const handleContinue = () => {
    localStorage.setItem("businessType", businessType);
    localStorage.setItem("businessPlan", businessPlan);
    localStorage.setItem("isVerifiedUser", isVerified);

    // 🔹 Convert 91-9586023883 → +919586023883
    let fullPhoneNumber = "";

    if (guestNumber) {
      const [country, phone] = guestNumber.split("-");
      fullPhoneNumber = `+${country}${phone}`;
      console.log("Guest Full Number", fullPhoneNumber);
    }

    if (isVerified) {
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

  // 🔹 Generate initials
  const getInitials = (name) => {
    if (!name) return "G";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const displayPropertyName = propertyData?.name;
  console.log(displayPropertyName);

  return (
    <div className="h-dvh w-full bg-white flex flex-col px-4 py-5">
      {/* Logo */}
      <div className="flex flex-col items-center mb-5 gap-4">
        {/* Main App Logo */}
        <img
          src={Logo}
          alt={HOME_UI.APP_NAME}
          className="h-14 object-contain"
        />

        {/* Property Badge */}
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
        {/* Label */}
        <p className="text-xs tracking-[3px] font-semibold text-gray-400 uppercase mb-4">
          {HOME_UI.VERIFICATION_LABEL}
        </p>

        {/* Title */}
        <h1 className="text-3xl font-bold text-[#1b3631] leading-snug mb-8">
          {isVerified
            ? "Welcome back at"
            : HOME_UI.getTitle(displayPropertyName).line1}
          <br />
          <span>{displayPropertyName}</span>
        </h1>

        {/* Content */}
        {isVerified && verifiedUser ? (
          <>
            {/* Description */}
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

            {/* Verified Guest Card */}
            <div className="bg-[#F8F8F8] w-full border border-gray-200 rounded-[6px] px-5 py-4 max-w-sm mx-auto flex items-start justify-between">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-[#F4B183] flex items-center justify-center text-white text-sm font-semibold shrink-0">
                  {getInitials(verifiedUser.name)}
                </div>

                {/* User Info */}
                <div className="text-left">
                  <p className="font-semibold text-[#1b3631]">
                    {verifiedUser.name}
                  </p>

                  <p className="text-xs text-gray-500">Status: verified</p>
                </div>
              </div>

              {/* Check Icon */}
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

      {/* Button */}
      <button
        onClick={handleContinue}
        className="w-full h-14 bg-[#1b3631] text-white rounded-md font-semibold text-md flex items-center justify-center gap-2 active:scale-95 transition-all"
      >
        {HOME_UI.CONTINUE_BUTTON}
        <ArrowRight size={18} />
      </button>

      {/* Privacy */}
      <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
        {HOME_UI.PRIVACY_TEXT}{" "}
        <span className="underline cursor-pointer">{HOME_UI.PRIVACY_LINK}</span>
      </p>
    </div>
  );
};

export default Home;
