import React, { useState, useEffect } from "react";
import {
  Camera,
  Scan,
  EyeOff,
  ShieldAlert,
  ArrowRight,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileHeader from "../components/MobileHeader";

const FaceMatch = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("waiting"); // waiting, success
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus("success");
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-dvh bg-white px-4 py-5 flex flex-col overflow-y-auto">
      {/* ✅ Replaced Header */}
      <MobileHeader />

      {/* Main Content */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-[#1b3631] mb-4">
          Verify your identity
        </h1>

        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          To complete your check-in, your photo will be taken at the reception
          desk. This helps the host organization confirm that you are present in
          person and ensures secure access for everyone.
        </p>

        {/* Capture Status Box */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-12 h-12 flex items-center justify-center">
              {status === "success" ? (
                <div className="w-10 h-10 bg-[#1b3631] rounded-full flex items-center justify-center">
                  <Check className="text-white" size={20} />
                </div>
              ) : (
                <>
                  <svg className="w-12 h-12 -rotate-90">
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="transparent"
                      className="text-gray-200"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 20}
                      strokeDashoffset={2 * Math.PI * 20 * (1 - progress / 100)}
                      className="text-[#1b3631] transition-all duration-300"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center uppercase text-[10px] font-bold text-gray-400">
                    {progress}%
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Camera
                size={20}
                className={
                  status === "success" ? "text-[#1b3631]" : "text-gray-400"
                }
              />
              <span
                className={`text-sm font-bold ${
                  status === "success" ? "text-[#1b3631]" : "text-gray-600"
                }`}
              >
                {status === "success"
                  ? "Image captured successfully"
                  : "Waiting for image capture..."}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-300 bg-[#1b3631]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-6 mb-8">
          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Instructions
          </h4>

          <div className="flex gap-4">
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
              <Scan className="text-gray-400" size={22} />
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Please stand facing the reception camera. Make sure your face is
              clearly visible.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
              <EyeOff className="text-gray-400" size={22} />
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Remove masks or eyewear if possible. This will only take a moment.
            </p>
          </div>
        </div>

        {/* Privacy Box */}
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-5 flex items-start gap-4">
          <ShieldAlert size={20} className="text-gray-400 mt-0.5 shrink-0" />
          <p className="text-xs text-gray-500 leading-relaxed">
            Your image is used only to verify your identity for this visit. It
            is not used for marketing or profiling. Your data is processed
            securely in line with India's DPDP Act.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8">
        <button
          disabled={status !== "success"}
          onClick={() => navigate("/success")}
          className={`w-full h-14 rounded-xl font-bold transition flex items-center justify-center gap-2
            ${
              status === "success"
                ? "bg-[#1b3631] text-white shadow-lg shadow-black/10"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          {status === "success" ? "Continue" : "Waiting for capture..."}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default FaceMatch;
