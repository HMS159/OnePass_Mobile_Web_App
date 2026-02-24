import { get } from "./api";
import ENDPOINTS from "../constants/config";

export const getTenantById = (propertyId, config = {}) => {
  const cfg = { ...config, params: { ...(config.params || {}), propertyId } };
  return get(ENDPOINTS.TENANT_BY_ID, cfg);
};

export default {
  getTenantById,
};
