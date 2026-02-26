import React, { useEffect, useState } from "react";
import { Check, X, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CHECKIN_SUCCESS_UI } from "../constants/ui";
import aadhaarService from "../services/aadhaarService";

const CheckinSuccess = () => {
  const navigate = useNavigate();

  const [businessType, setBusinessType] = useState("");
  const [businessPlan, setBusinessPlan] = useState("");
  const [isUserVerified, setIsUserVerified] = useState(false);

  // useEffect(() => {
  //   // Get values from localStorage (adjust if coming from context)
  //   const type = localStorage.getItem("businessType");
  //   const plan = localStorage.getItem("businessPlan");
  //   const verified = localStorage.getItem("isVerifiedUser");

  //   setBusinessType(type);
  //   setBusinessPlan(plan);
  //   setIsUserVerified(verified === "true");
  // }, []);

  // useEffect(() => {
  //   const type = localStorage.getItem("businessType");
  //   const plan = localStorage.getItem("businessPlan");
  //   const verified = localStorage.getItem("isVerifiedUser");

  //   setBusinessType(type);
  //   setBusinessPlan(plan);
  //   setIsUserVerified(verified === "true");

  //   if (localStorage.getItem("aadhaarPersisted") === "true") return;

  //   const digilockerRaw = localStorage.getItem("digilockerResponse");

  //   let verificationId = null;
  //   let referenceId = null;

  //   if (digilockerRaw) {
  //     try {
  //       const parsed = JSON.parse(digilockerRaw);

  //       verificationId =
  //         parsed?.verification_id || parsed?.verificationId || null;

  //       referenceId =
  //         parsed?.reference_id || parsed?.referenceId || verificationId;
  //     } catch (err) {
  //       console.error("Invalid digilockerResponse:", err);
  //       return;
  //     }
  //   }

  //   const phoneCode = localStorage.getItem("phoneCountryCode") || "+91";

  //   const phoneNumber = localStorage.getItem("phoneNumber");

  //   const fetchAndPersist = async () => {
  //     try {
  //       if (!verificationId) {
  //         console.warn("Verification ID missing");
  //         return;
  //       }

  //       // ✅ STEP 1: Fetch Aadhaar
  //       const aadhaarData = await aadhaarService.getAadhaarData(
  //         String(verificationId),
  //         String(referenceId),
  //         phoneCode,
  //         phoneNumber,
  //       );

  //       if (!aadhaarData) {
  //         console.warn("No Aadhaar data found");
  //         return;
  //       }

  //       console.log("🎉 Aadhaar Data:", aadhaarData);

  //       const country =
  //         aadhaarData?.split_address?.country ||
  //         aadhaarData?.splitAddress?.country;

  //       // ✅ STEP 2: Build EXACT payload like you want
  //       const aadhaarUpdatePayload = {
  //         Uid: aadhaarData?.uid || "",
  //         PhoneCountryCode: phoneCode,
  //         PhoneNumber: phoneNumber,
  //         Name: aadhaarData?.name || "",
  //         Gender: aadhaarData?.gender || "",
  //         DateOfBirth: aadhaarData?.dob || aadhaarData?.dateOfBirth || "",
  //         Nationality: country === "India" ? "Indian" : country || "",
  //         VerificationId: String(verificationId),
  //         ReferenceId: String(referenceId),

  //         SplitAddress: {
  //           Country: aadhaarData?.split_address?.country || null,
  //           State: aadhaarData?.split_address?.state || null,
  //           Dist: aadhaarData?.split_address?.dist || null,
  //           Subdist: aadhaarData?.split_address?.subdist || null,
  //           Vtc: aadhaarData?.split_address?.vtc || null,
  //           Po: aadhaarData?.split_address?.po || null,
  //           Street: aadhaarData?.split_address?.street || null,
  //           House: aadhaarData?.split_address?.house || null,
  //           Landmark: aadhaarData?.split_address?.landmark || null,
  //           Pincode: aadhaarData?.split_address?.pincode || null,
  //         },
  //       };

  //       console.log("📤 Final Persist Payload:", aadhaarUpdatePayload);

  //       // ✅ STEP 3: Call API directly
  //       await aadhaarService.persistAadhaarUpdate(aadhaarUpdatePayload);

  //       console.log("✅ Aadhaar Persisted Successfully");

  //       localStorage.setItem("aadhaarData", JSON.stringify(aadhaarData));

  //       localStorage.setItem("aadhaarPersisted", "true");
  //     } catch (error) {
  //       console.error(
  //         "❌ Aadhaar flow error:",
  //         error.response?.data || error.message,
  //       );
  //     }
  //   };

  //   fetchAndPersist();
  // }, []);

  // -- 2nd UseEffect Updates --

  // useEffect(() => {
  //   const type = localStorage.getItem("businessType");
  //   const plan = localStorage.getItem("businessPlan");
  //   const verified = localStorage.getItem("isVerifiedUser");

  //   setBusinessType(type);
  //   setBusinessPlan(plan);
  //   setIsUserVerified(verified === "true");

  //   if (localStorage.getItem("aadhaarPersisted") === "true") return;

  //   const digilockerRaw = localStorage.getItem("digilockerResponse");

  //   let verificationId = null;
  //   let referenceId = null;

  //   if (digilockerRaw) {
  //     try {
  //       const parsed = JSON.parse(digilockerRaw);

  //       verificationId =
  //         parsed?.verification_id || parsed?.verificationId || null;

  //       referenceId =
  //         parsed?.reference_id || parsed?.referenceId || verificationId;
  //     } catch (err) {
  //       console.error("Invalid digilockerResponse:", err);
  //       return;
  //     }
  //   }

  //   const phoneCode = localStorage.getItem("phoneCountryCode") || "+91";
  //   const phoneNumber = localStorage.getItem("phoneNumber");

  //   const base64ToFile = (base64String, fileName) => {
  //     try {
  //       if (!base64String) return null;

  //       const arr = base64String.split(",");
  //       const mimeMatch = arr[0].match(/:(.*?);/);
  //       const mime = mimeMatch ? mimeMatch[1] : "image/jpeg";

  //       const bstr = atob(arr[arr.length - 1]);
  //       let n = bstr.length;
  //       const u8arr = new Uint8Array(n);

  //       while (n--) {
  //         u8arr[n] = bstr.charCodeAt(n);
  //       }

  //       return new File([u8arr], fileName, { type: mime });
  //     } catch (err) {
  //       console.error("Base64 conversion failed:", err);
  //       return null;
  //     }
  //   };

  //   const fetchAndPersist = async () => {
  //     try {
  //       if (!verificationId) {
  //         console.warn("Verification ID missing");
  //         return;
  //       }

  //       // 🔹 STEP 1: Fetch Aadhaar
  //       const aadhaarData = await aadhaarService.getAadhaarData(
  //         String(verificationId),
  //         String(referenceId),
  //         phoneCode,
  //         phoneNumber,
  //       );

  //       if (!aadhaarData) {
  //         console.warn("No Aadhaar data found");
  //         return;
  //       }

  //       console.log("🎉 Aadhaar Data:", aadhaarData);

  //       const country =
  //         aadhaarData?.split_address?.country ||
  //         aadhaarData?.splitAddress?.country;

  //       // 🔹 STEP 2: Persist Aadhaar Data
  //       const aadhaarUpdatePayload = {
  //         Uid: aadhaarData?.uid || "",
  //         PhoneCountryCode: phoneCode,
  //         PhoneNumber: phoneNumber,
  //         Name: aadhaarData?.name || "",
  //         Gender: aadhaarData?.gender || "",
  //         DateOfBirth: aadhaarData?.dob || aadhaarData?.dateOfBirth || "",
  //         Nationality: country === "India" ? "Indian" : country || "",
  //         VerificationId: String(verificationId),
  //         ReferenceId: String(referenceId),

  //         SplitAddress: {
  //           Country: aadhaarData?.split_address?.country || null,
  //           State: aadhaarData?.split_address?.state || null,
  //           Dist: aadhaarData?.split_address?.dist || null,
  //           Subdist: aadhaarData?.split_address?.subdist || null,
  //           Vtc: aadhaarData?.split_address?.vtc || null,
  //           Po: aadhaarData?.split_address?.po || null,
  //           Street: aadhaarData?.split_address?.street || null,
  //           House: aadhaarData?.split_address?.house || null,
  //           Landmark: aadhaarData?.split_address?.landmark || null,
  //           Pincode: aadhaarData?.split_address?.pincode || null,
  //         },
  //       };

  //       console.log("📤 Final Persist Payload:", aadhaarUpdatePayload);

  //       await aadhaarService.persistAadhaarUpdate(aadhaarUpdatePayload);

  //       console.log("✅ Aadhaar Data Persisted");

  //       // 🔹 STEP 3: Persist Aadhaar Image
  //       try {
  //         const aadhaarBase64 =
  //           aadhaarData?.photo_link ||
  //           aadhaarData?.image ||
  //           aadhaarData?.profile_image;

  //         if (aadhaarBase64) {
  //           const imageFile = base64ToFile(aadhaarBase64, "aadhaar.jpg");

  //           if (imageFile) {
  //             await aadhaarService.persistAadhaarImage(
  //               phoneCode,
  //               phoneNumber,
  //               imageFile,
  //             );

  //             console.log("✅ Aadhaar Image Persisted");
  //           }
  //         } else {
  //           console.warn("No Aadhaar image found in response");
  //         }
  //       } catch (e) {
  //         console.warn("Image persist skipped:", e);
  //       }

  //       localStorage.setItem("aadhaarData", JSON.stringify(aadhaarData));
  //       localStorage.setItem("aadhaarPersisted", "true");
  //     } catch (error) {
  //       console.error(
  //         "❌ Aadhaar flow error:",
  //         error.response?.data || error.message,
  //       );
  //     }
  //   };

  //   fetchAndPersist();
  // }, []);

  // -- 3rd UseEffect Updates --

  useEffect(() => {
    const type = localStorage.getItem("businessType");
    const plan = localStorage.getItem("businessPlan");
    const verified = localStorage.getItem("isVerifiedUser");

    setBusinessType(type);
    setBusinessPlan(plan);
    setIsUserVerified(verified === "true");

    // ✅ 🔥 ELIGIBILITY CHECK (ADD THIS BLOCK)
    const isEligibleType = type === "Corporate" || type === "Hospitality";

    const isEligiblePlan = plan === "SMB" || plan === "Enterprise";

    if (!isEligibleType || !isEligiblePlan) {
      console.log("🚫 Aadhaar + Image API skipped (Not eligible)");
      return; // ⛔ Stop everything here
    }

    if (localStorage.getItem("aadhaarPersisted") === "true") return;

    const digilockerRaw = localStorage.getItem("digilockerResponse");

    let verificationId = null;
    let referenceId = null;

    if (digilockerRaw) {
      try {
        const parsed = JSON.parse(digilockerRaw);

        verificationId =
          parsed?.verification_id || parsed?.verificationId || null;

        referenceId =
          parsed?.reference_id || parsed?.referenceId || verificationId;
      } catch (err) {
        console.error("Invalid digilockerResponse:", err);
        return;
      }
    }

    const phoneCode = localStorage.getItem("phoneCountryCode") || "+91";
    const phoneNumber = localStorage.getItem("phoneNumber");

    const base64ToFile = (base64String, fileName) => {
      try {
        if (!base64String) return null;

        const arr = base64String.split(",");
        const mimeMatch = arr[0].match(/:(.*?);/);
        const mime = mimeMatch ? mimeMatch[1] : "image/jpeg";

        const bstr = atob(arr[arr.length - 1]);
        const u8arr = new Uint8Array(bstr.length);

        for (let i = 0; i < bstr.length; i++) {
          u8arr[i] = bstr.charCodeAt(i);
        }

        return new File([u8arr], fileName, { type: mime });
      } catch (err) {
        console.error("Base64 conversion failed:", err);
        return null;
      }
    };

    const fetchAndPersist = async () => {
      try {
        if (!verificationId) {
          console.warn("Verification ID missing");
          return;
        }

        const aadhaarData = await aadhaarService.getAadhaarData(
          String(verificationId),
          String(referenceId),
          phoneCode,
          phoneNumber,
        );

        if (!aadhaarData) return;

        const country =
          aadhaarData?.split_address?.country ||
          aadhaarData?.splitAddress?.country;

        const aadhaarUpdatePayload = {
          Uid: aadhaarData?.uid || "",
          PhoneCountryCode: phoneCode,
          PhoneNumber: phoneNumber,
          Name: aadhaarData?.name || "",
          Gender: aadhaarData?.gender || "",
          DateOfBirth: aadhaarData?.dob || "",
          Nationality: country === "India" ? "Indian" : country || "",
          VerificationId: String(verificationId),
          ReferenceId: String(referenceId),
        };

        await aadhaarService.persistAadhaarUpdate(aadhaarUpdatePayload);

        console.log("✅ Aadhaar Data Persisted");

        // 🔹 Image Persist
        const aadhaarBase64 =
          aadhaarData?.photo_link ||
          aadhaarData?.image ||
          aadhaarData?.profile_image;

        if (aadhaarBase64?.startsWith("data:image")) {
          const imageFile = base64ToFile(aadhaarBase64, "aadhaar.jpg");

          if (imageFile) {
            await aadhaarService.persistAadhaarImage(
              phoneCode,
              phoneNumber,
              imageFile,
            );

            console.log("✅ Aadhaar Image Persisted");
          }
        }

        localStorage.setItem("aadhaarPersisted", "true");
        localStorage.setItem("aadhaarData", JSON.stringify(aadhaarData));
      } catch (error) {
        console.error(
          "❌ Aadhaar flow error:",
          error.response?.data || error.message,
        );
      }
    };

    fetchAndPersist();
  }, []);

  const handleDoneNavigation = () => {
    const isCorporateOrHospitality =
      businessType === "Corporate" || businessType === "Hospitality";

    const isSmbOrEnterprise =
      businessPlan === "Starter" ||
      businessPlan === "SMB" ||
      businessPlan === "Enterprise";

    if (isCorporateOrHospitality && isSmbOrEnterprise && isUserVerified) {
      navigate("/history");
    } else {
      navigate("/profile");
    }
  };

  return (
    <div className="w-full h-dvh bg-gray-100 flex flex-col items-center justify-center px-4 py-5">
      {/* Card */}
      <div className="w-full bg-white rounded-[6px] p-6 shadow-sm border border-gray-200 relative text-center">
        {/* Close Button */}
        <button
          onClick={() => navigate("/history")}
          className="absolute top-4 right-4 text-gray-400"
        >
          <X size={18} />
        </button>

        {/* 🔥 Animated Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative flex items-center justify-center">
            <span className="absolute w-15 h-15 rounded-full bg-brand/20 animate-ping"></span>

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

        {/* ✅ Done Button with Conditional Navigation */}
        <button
          onClick={handleDoneNavigation}
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
