import React, { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import Logo from "../assets/images/1pass_logo.png";
import { useNavigate, useParams } from "react-router-dom";
import propertyService from "../services/propertyService";
import tenantService from "../services/tenantService";
import { HOME_UI } from "../constants/ui";
import GoogleLogo from "../assets/images/Google.png";
import MicrosoftLogo from "../assets/images/Microsoft.png";
import AppleLogo from "../assets/images/Apple.png";
import AmazonLogo from "../assets/images/Amazon.png";

const Home = () => {
  const { guestNumber, restaurantId, businessTypeCode, planCode } = useParams();
  const navigate = useNavigate();

  const VERIFIED_NUMBER = "8401159610";

  const restaurants = {
    1: "Google HQ",
    2: "Microsoft Office",
    3: "Apple Park",
    4: "Amazon Spheres",
  };

  const propertyLogos = {
    1: GoogleLogo,
    2: MicrosoftLogo,
    3: AppleLogo,
    4: AmazonLogo,
  };

  const propertyLogo = propertyLogos[restaurantId];

  const propertyName = restaurants[restaurantId] || "Sunrise Diner";

  const [businessType, setBusinessType] = useState("");
  const [businessPlan, setBusinessPlan] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [verifiedUser, setVerifiedUser] = useState(null);
  const [propertyData, setPropertyData] = useState(null);
  const [tenantData, setTenantData] = useState(null);

  // 🔹 Map Plan Code
  useEffect(() => {
    if (!businessTypeCode || !planCode) return;

    const typeMap = {
      1: "Corporate",
      2: "Hospitality",
    };

    const planMap = {
      1: "Starter",
      2: "SMB",
      3: "Enterprise",
    };

    const selectedType = typeMap[businessTypeCode];
    let selectedPlan = planMap[planCode];

    // 🚫 Prevent Starter for Hospitality
    if (selectedType === "Hospitality" && planCode === "1") {
      selectedPlan = "SMB"; // Auto fallback
    }

    setBusinessType(selectedType);
    setBusinessPlan(selectedPlan);
  }, [businessTypeCode, planCode]);

  // 🔹 Verification Logic
  useEffect(() => {
    if (!guestNumber) return;

    const last10Digits = guestNumber.slice(-10);

    if (last10Digits === VERIFIED_NUMBER) {
      setIsVerified(true);

      setVerifiedUser({
        name: "Hafiz Shaikh",
        email: "hafiz@email.com",
        phone: `+91 ••••••${last10Digits.slice(-4)}`,
      });
    } else {
      setIsVerified(false);
      setVerifiedUser(null);
    }
  }, [guestNumber]);

  // Fetch property details (hardcoded id = 6 for now)
  useEffect(() => {
    const propId = restaurantId ? Number(restaurantId) : 6;

    propertyService
      .getPropertyById(propId)
      .then((data) => {
        console.log("Property response:", data);
        setPropertyData(data);
      })
      .catch((err) => console.error("Failed to fetch property:", err));

    tenantService
      .getTenantById(propId)
      .then((t) => {
        console.log("Tenant response:", t);
        setTenantData(t);
      })
      .catch((err) => console.error("Failed to fetch tenant:", err));
  }, [restaurantId]);

  const handleContinue = () => {
    localStorage.setItem("businessType", businessType);
    localStorage.setItem("businessPlan", businessPlan);
    localStorage.setItem("isVerifiedUser", isVerified);

    if (isVerified) {
      navigate("/consent");
    } else {
      navigate("/email");
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

  const displayPropertyName = propertyData?.name || propertyName;

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
        {propertyLogo && (
          <div className="w-15 h-15 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
            <img
              src={propertyLogo}
              alt={propertyName}
              className="w-8 h-8 object-contain"
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
            : HOME_UI.getTitle(propertyName).line1}
          <br />
          <span>{propertyName}</span>
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
            {HOME_UI.getDescription(propertyName, maskedNumber)}
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
