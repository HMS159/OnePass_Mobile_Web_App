import api from "./api";
import ENDPOINTS from "../constants/config";

// Fetch guest by phone number
export const getGuestByPhone = async (phoneCountryCode, phoneNumber) => {
  try {
    const response = await api.get(ENDPOINTS.HOTEL_GUEST_BY_PHONE, {
      params: {
        phoneCountryCode,
        phoneno: phoneNumber,
      },
    });

    return response.data; // because api.get returns full axios response
  } catch (error) {
    if (error.response?.status === 404) {
      console.log("Guest not found, likely a new user");
      return null;
    }

    console.error("Error fetching guest:", error);
    return null;
  }
};

/**
 * Update guest email
 */
export const updateGuestEmail = async (
  phoneCountryCode,
  phoneNumber,
  email,
) => {
  try {
    const response = await api.post(ENDPOINTS.UPDATE_EMAIL, {
      phoneCountryCode,
      phoneNumber,
      email,
    });

    return response.data; // ✅ always return data
  } catch (error) {
    console.error(
      "❌ Failed to update email:",
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.message || "Failed to update email");
  }
};

export default {
  getGuestByPhone,
  updateGuestEmail,
};
