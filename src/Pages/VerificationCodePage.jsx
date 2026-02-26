import React, { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileHeader from "../Components/MobileHeader";
import { VERIFICATION_UI } from "../constants/ui";
import aadhaarService from "../services/aadhaarService"; // ✅ IMPORT SERVICE

const VerificationCodePage = () => {
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [businessPlan, setBusinessPlan] = useState("");
  const [isUserVerified, setIsUserVerified] = useState(false);

  // useEffect(() => {
  //   // 🔹 Generate Random Code
  //   const randomNumber = Math.floor(100000 + Math.random() * 900000);
  //   const formatted = `${randomNumber.toString().slice(0, 3)} ${randomNumber
  //     .toString()
  //     .slice(3)}`;
  //   setCode(formatted);

  //   // 🔹 Load Business Data
  //   const type = localStorage.getItem("businessType");
  //   const plan = localStorage.getItem("businessPlan");
  //   const verified = localStorage.getItem("isVerifiedUser");

  //   setBusinessType(type);
  //   setBusinessPlan(plan);
  //   setIsUserVerified(verified === "true");

  //   // 🔹 Prevent Duplicate Persist
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

  //       console.log("📤 Persist Payload:", aadhaarUpdatePayload);

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

  // -- This UseEffect API Only Hit When Type SMB Available --

  useEffect(() => {
    // 🔹 Generate Random Code
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const formatted = `${randomNumber.toString().slice(0, 3)} ${randomNumber
      .toString()
      .slice(3)}`;
    setCode(formatted);

    // 🔹 Load Business Data
    const type = localStorage.getItem("businessType");
    const plan = localStorage.getItem("businessPlan");
    const verified = localStorage.getItem("isVerifiedUser");

    setBusinessType(type);
    setBusinessPlan(plan);
    setIsUserVerified(verified === "true");

    const isEligibleType =
      type?.toLowerCase() === "hospitality" ||
      type?.toLowerCase() === "corporate";

    const isEligiblePlan = ["smb", "enterprise"].includes(plan?.toLowerCase());

    // 🚨 ONLY RUN FOR Hospitality/Corporate + SMB & Enterprise
    if (!isEligibleType || !isEligiblePlan) {
      console.log(
        "⛔ Aadhaar flow skipped (Not SMB plan or invalid business type)",
      );
      return;
    }

    // 🔹 Prevent Duplicate Persist
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
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
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

        if (!aadhaarData) {
          console.warn("No Aadhaar data found");
          return;
        }

        const country =
          aadhaarData?.split_address?.country ||
          aadhaarData?.splitAddress?.country;

        const aadhaarUpdatePayload = {
          Uid: aadhaarData?.uid || "",
          PhoneCountryCode: phoneCode,
          PhoneNumber: phoneNumber,
          Name: aadhaarData?.name || "",
          Gender: aadhaarData?.gender || "",
          DateOfBirth: aadhaarData?.dob || aadhaarData?.dateOfBirth || "",
          Nationality: country === "India" ? "Indian" : country || "",
          VerificationId: String(verificationId),
          ReferenceId: String(referenceId),

          SplitAddress: {
            Country: aadhaarData?.split_address?.country || null,
            State: aadhaarData?.split_address?.state || null,
            Dist: aadhaarData?.split_address?.dist || null,
            Subdist: aadhaarData?.split_address?.subdist || null,
            Vtc: aadhaarData?.split_address?.vtc || null,
            Po: aadhaarData?.split_address?.po || null,
            Street: aadhaarData?.split_address?.street || null,
            House: aadhaarData?.split_address?.house || null,
            Landmark: aadhaarData?.split_address?.landmark || null,
            Pincode: aadhaarData?.split_address?.pincode || null,
          },
        };

        await aadhaarService.persistAadhaarUpdate(aadhaarUpdatePayload);

        try {
          const aadhaarBase64 =
            aadhaarData?.photo_link ||
            aadhaarData?.image ||
            aadhaarData?.profile_image;

          if (aadhaarBase64) {
            const imageFile = base64ToFile(aadhaarBase64, "aadhaar.jpg");

            if (imageFile) {
              await aadhaarService.persistAadhaarImage(
                phoneCode,
                phoneNumber,
                imageFile,
              );
            }
          }
        } catch (e) {
          console.warn("Image persist skipped:", e);
        }

        localStorage.setItem("aadhaarData", JSON.stringify(aadhaarData));
        localStorage.setItem("aadhaarPersisted", "true");

        console.log("✅ Aadhaar Flow Completed (SMB only)");
      } catch (error) {
        console.error(
          "❌ Aadhaar flow error:",
          error.response?.data || error.message,
        );
      }
    };

    fetchAndPersist();
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
