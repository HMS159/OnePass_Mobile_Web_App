import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Check } from "lucide-react";
import { useLocation } from "react-router-dom";

const ProgressBar = () => {
  const location = useLocation();
  const [businessType, setBusinessType] = useState("");
  const [businessPlan, setBusinessPlan] = useState("");

  useEffect(() => {
    const type = sessionStorage.getItem("businessType") || "";
    const plan = sessionStorage.getItem("businessPlan") || "";
    setBusinessType(type);
    setBusinessPlan(plan);
  }, []);

  // ✅ Check if progress bar should be shown
  const isEligible = useMemo(
    () => businessType === "Corporate" || businessType === "Hospitality",
    [businessType],
  );

  if (!isEligible) {
    return null;
  }

  // ✅ Determine 4th step label based on business plan
  const getStep4Label = useCallback(() => {
    return businessPlan === "Enterprise" ? "Face Match" : "OTP Code";
  }, [businessPlan]);

  // ✅ Define progress steps based on business plan
  const steps = useMemo(() => {
    // For Starter plan - 3 steps
    if (businessPlan === "Starter") {
      return [
        {
          id: 1,
          label: "Verify Email",
          path: ["/email", "/email-verification"],
        },
        { id: 2, label: "Consent", path: ["/consent"] },
        {
          id: 3,
          label: "OTP Code",
          path: ["/verification-code", "/verification"],
        },
      ];
    }

    // For SMB and Enterprise - 4 steps
    return [
      { id: 1, label: "Verify Email", path: ["/email", "/email-verification"] },
      { id: 2, label: "Consent", path: ["/consent", "/id-verification"] },
      { id: 3, label: "Verify ID", path: [] },
      {
        id: 4,
        label: getStep4Label(),
        path: ["/verification-code", "/verification", "/face-match"],
      },
    ];
  }, [businessPlan, getStep4Label]);

  // ✅ Get current step index with memoization
  const currentStepIndex = useMemo(() => {
    const currentPath = location.pathname;
    for (let i = 0; i < steps.length; i++) {
      if (steps[i].path.includes(currentPath)) {
        return i;
      }
    }
    return -1;
  }, [location.pathname, steps]);

  // ✅ Get color for each step with memoization
  const getStepColor = useCallback(
    (index) => {
      if (index < currentStepIndex) {
        return "bg-green-500"; // ✅ Completed steps are green
      } else if (index === currentStepIndex) {
        return "bg-yellow-400"; // ✅ Current step is yellow
      } else {
        return "bg-gray-300"; // ✅ Upcoming steps are gray
      }
    },
    [currentStepIndex],
  );

  const getTextColor = useCallback(
    (index) => {
      if (index < currentStepIndex || index === currentStepIndex) {
        return "text-gray-800";
      } else {
        return "text-gray-500";
      }
    },
    [currentStepIndex],
  );

  return (
    <div className="w-full bg-white">
      {/* ✅ Progress Steps with Dashed Connectors */}
      <div className="flex items-start justify-between mb-3">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex flex-col items-center flex-1 relative"
          >
            {/* ✅ Step Circle */}
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold transition-all duration-300 z-10 ${getStepColor(
                index,
              )} ${index < currentStepIndex ? "text-white" : "text-gray-800"}`}
            >
              {index < currentStepIndex ? (
                <Check size={18} />
              ) : // <span className="text-sm">{step.id}</span>
              null}
            </div>

            {/* ✅ Dashed Connector (Between circles) */}
            {index < steps.length - 1 && (
              <div
                className={`absolute top-4.5 left-1/2 w-full h-1 border-t-2 border-dashed transition-all duration-300 ${
                  index < currentStepIndex
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
                style={{
                  width: "calc(100% - 18px)",
                  left: "calc(50% + 4.5px)",
                }}
              />
            )}

            {/* ✅ Step Label */}
            <p
              className={`text-xs mt-2 font-medium text-center leading-tight max-w-[80px] ${getTextColor(
                index,
              )}`}
            >
              {step.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
