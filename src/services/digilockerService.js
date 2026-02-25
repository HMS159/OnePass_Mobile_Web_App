import api from "./api.js"; // adjust if needed
import API_ENDPOINTS from "../constants/config";

/**
 * Verify DigiLocker account using verification ID and mobile number
 */
export const verifyDigilockerAccount = async (verificationId, mobileNumber) => {
  try {
    console.log("🔍 Verifying DigiLocker account...");

    const response = await api.post(API_ENDPOINTS.DIGILOCKER_VERIFY_ACCOUNT, {
      verification_id: verificationId,
      mobile_number: mobileNumber,
    });

    console.log("✅ DigiLocker verification successful");
    return response.data; // ✅ Always return data
  } catch (error) {
    console.error(
      "❌ DigiLocker verification error:",
      error.response?.data || error.message,
    );

    if (error.response?.status === 400) {
      throw new Error("Invalid verification details provided");
    }

    if (error.response?.status === 404) {
      throw new Error("DigiLocker account not found");
    }

    if (error.response?.status === 422) {
      throw new Error("Invalid mobile number format");
    }

    throw new Error(
      error.response?.data?.message || "DigiLocker verification failed",
    );
  }
};

export default {
  verifyDigilockerAccount,
};
