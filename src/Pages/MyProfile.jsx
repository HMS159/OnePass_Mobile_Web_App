import React, { useState, useMemo } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Edit2, CheckCircle, Mail, Phone } from "lucide-react";
import MobileHeader from "../Components/MobileHeader";
import { getAadhaarImageByPhone } from "../services/aadhaarService"; // ✅ import service
import { getGuestByPhone } from "../services/guestService";
import UserIcon from "../assets/images/UserIcon.png";

const MyProfile = () => {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(UserIcon);

  const [form, setForm] = useState({
    phone: "",
    email: "",
    firstName: "",
    surname: "",
    organization: "",
    laptopSerial: "",
    mobileIMEI: "",
  });

  useEffect(() => {
    const phoneCountryCodeRaw = sessionStorage.getItem("phoneCountryCode");
    const phoneNumberRaw = sessionStorage.getItem("phoneNumber");
    const sessionEmail = sessionStorage.getItem("userEmail");
    const businessType = sessionStorage.getItem("businessType");
    const businessPlan = sessionStorage.getItem("businessPlan");

    if (!phoneCountryCodeRaw || !phoneNumberRaw) return;

    let countryCode = phoneCountryCodeRaw;
    let phoneNumber = phoneNumberRaw;

    // Handle format like: 91-9586023883
    if (phoneNumberRaw.includes("-")) {
      const parts = phoneNumberRaw.split("-");
      countryCode = parts[0];
      phoneNumber = parts[1];
    }

    const normalizedType = businessType?.toLowerCase();
    const normalizedPlan = businessPlan?.toLowerCase();

    const isEligibleType = ["corporate", "hospitality"].includes(
      normalizedType,
    );
    const isEligiblePlan = ["smb", "enterprise"].includes(normalizedPlan);

    /* 🔹 ALWAYS set phone + email from session first */
    setForm((prev) => ({
      ...prev,
      phone: `+${countryCode} ${phoneNumber}`,
      email: sessionEmail || prev.email,
    }));

    /* ❌ If not eligible → STOP here */
    if (!isEligibleType || !isEligiblePlan) {
      console.log("Skipping profile APIs (Not eligible plan/type)");
      return;
    }

    /* ✅ Eligible → Call APIs */
    const fetchProfileData = async () => {
      try {
        /* 1️⃣ Fetch Guest */
        const guestData = await getGuestByPhone(countryCode, phoneNumber);

        if (guestData) {
          let firstName = "";
          let surname = "";

          if (guestData?.fullName) {
            const nameParts = guestData.fullName.trim().split(/\s+/);

            firstName = nameParts[0] || "";
            surname = nameParts.slice(1).join(" ") || "";
          }

          setForm((prev) => ({
            ...prev,
            email: guestData?.email || prev.email,
            firstName: firstName || prev.firstName,
            surname: surname || prev.surname,
            organization: guestData?.organization || "",
          }));
        }

        /* 2️⃣ Fetch Aadhaar Image */
        const imageResponse = await getAadhaarImageByPhone(
          countryCode,
          phoneNumber,
        );

        const base64Image =
          imageResponse?.photo_link ||
          imageResponse?.image ||
          imageResponse?.profile_image;

        if (base64Image) {
          setProfileImage(`data:image/jpeg;base64,${base64Image}`);
        }
      } catch (error) {
        console.error("Profile fetch error:", error.message);
      }
    };

    fetchProfileData();
  }, []);

  const totalFields = 7;

  const completedFields = useMemo(() => {
    return Object.values(form).filter((value) => value && value.trim() !== "")
      .length;
  }, [form]);

  const progress = Math.round((completedFields / totalFields) * 100);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const businessType = sessionStorage.getItem("businessType")?.toLowerCase();
  const businessPlan = sessionStorage.getItem("businessPlan")?.toLowerCase();

  /* 🔹 Corporate + Starter → Only phone & email required */
  const isCorporateStarter =
    businessType === "corporate" && businessPlan === "starter";

  /* 🔹 Define required fields dynamically */
  const requiredFields = isCorporateStarter
    ? [form.phone, form.email]
    : [form.phone, form.email, form.firstName, form.surname];

  const isContinueEnabled = requiredFields.every(
    (field) => field && field.trim() !== "",
  );

  return (
    <div className="w-full h-dvh bg-white flex justify-center items-center">
      <div className="w-full max-w-sm h-full bg-white flex flex-col overflow-hidden px-4 py-5">
        {/* HEADER */}
        <MobileHeader title="My Profile" />

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto py-5 space-y-6">
          {/* PROFILE IMAGE */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={profileImage}
                alt="profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
            <h3 className="mt-4 font-semibold text-gray-800 tracking-wide">
              ALEX HARRISON
            </h3>
          </div>

          {/* PROGRESS CARD */}
          <div className="bg-gray-100 rounded-md p-4 space-y-3">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-gray-700">{progress}% Complete</span>
              <span className="text-gray-400">
                {completedFields} of {totalFields} fields
              </span>
            </div>

            <div className="w-full h-2 bg-gray-300 rounded-md">
              <div
                className="h-2 bg-[#1b3631] rounded-md transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-xs text-gray-500">
              Complete your profile for a{" "}
              <span className="font-semibold text-gray-700">
                faster check-in experience at corporate sites.
              </span>
            </p>
          </div>

          {/* VERIFIED CONTACT INFO */}
          <SectionTitle title="VERIFIED CONTACT INFO" />

          <InputField icon={<Phone size={16} />} value={form.phone} verified />
          <InputField icon={<Mail size={16} />} value={form.email} verified />

          {/* PERSONAL IDENTITY */}
          <SectionTitle title="PERSONAL IDENTITY" />

          <div className="flex gap-3">
            <div className="flex-1">
              <TextInput
                label="First Name"
                value={form.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
            </div>
            <div className="flex-1">
              <TextInput
                label="Surname"
                value={form.surname}
                onChange={(e) => handleChange("surname", e.target.value)}
              />
            </div>
          </div>

          <TextInput
            label="Organization / Company"
            value={form.organization}
            onChange={(e) => handleChange("organization", e.target.value)}
          />

          {/* DEVICE INFO */}
          <SectionTitle title="DEVICE INFORMATION" optional />

          <TextInput
            label="Laptop Serial Number"
            value={form.laptopSerial}
            placeholder="e.g. SN-98234-XYZ"
            onChange={(e) => handleChange("laptopSerial", e.target.value)}
          />

          <TextInput
            label="Mobile IMEI Number"
            value={form.mobileIMEI}
            placeholder="15-digit IMEI code"
            onChange={(e) => handleChange("mobileIMEI", e.target.value)}
          />
        </div>

        {/* CONTINUE BUTTON */}
        <div className="sticky bottom-0 bg-white">
          <button
            disabled={!isContinueEnabled}
            onClick={() => navigate("/history")}
            className={`w-full h-14 rounded-md font-semibold text-white transition-all
              ${
                isContinueEnabled
                  ? "bg-[#1b3631] hover:opacity-95"
                  : "bg-[#1b3631] opacity-40 cursor-not-allowed"
              }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

/* COMPONENTS */

const SectionTitle = ({ title, optional }) => (
  <div className="flex items-center justify-between mt-4">
    <h4 className="text-xs font-bold text-gray-400 tracking-widest">{title}</h4>
    {optional && (
      <span className="text-[10px] bg-gray-200 px-2 py-1 rounded-md text-gray-500">
        OPTIONAL
      </span>
    )}
  </div>
);

const InputField = ({ icon, value, verified }) => (
  <div className="flex items-center bg-gray-100 px-4 py-3 rounded-md justify-between">
    <div className="flex items-center gap-3 text-gray-500 text-sm">
      {icon}
      {value}
    </div>
    {verified && <CheckCircle size={16} className="text-green-500" />}
  </div>
);

const TextInput = ({ label, value, placeholder, onChange }) => (
  <div className="w-full">
    <label className="block text-xs text-gray-400 mb-1">{label}</label>
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full h-12 bg-gray-100 px-4 rounded-md text-sm
                 focus:outline-none focus:ring-2 focus:ring-[#1b3631]/40"
    />
  </div>
);

export default MyProfile;
