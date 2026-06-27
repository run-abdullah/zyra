import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiShield } from "react-icons/fi";

export default function OtpVerificationPage() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  // Auto-focus first input on mount
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only digits allowed

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); // Take last char only
    setOtp(newOtp);

    // Move to next input if value entered
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits filled
    if (newOtp.every((digit) => digit !== "")) {
      setTimeout(() => {
        console.log("OTP Verified:", newOtp.join(""));
        navigate("/"); // Redirect to home/chat after verification
      }, 300);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    const newOtp = [...otp];

    pastedData.forEach((digit, i) => {
      if (/^\d$/.test(digit)) newOtp[i] = digit;
    });

    setOtp(newOtp);

    // Focus last filled input or next empty one
    const nextIndex = Math.min(pastedData.length, 5);
    inputsRef.current[nextIndex]?.focus();
  };

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <div className="fixed inset-0 bg-[#0F1115] flex flex-col overflow-hidden">
      {/* Background Glow Effects */}
      <div
        className="absolute top-[-20%] right-[-20%] w-[80vmin] h-[80vmin] rounded-full blur-[100px] pointer-events-none"
        style={{ backgroundColor: "rgba(255, 0, 127, 0.08)" }}
      />
      <div
        className="absolute bottom-[-20%] left-[-20%] w-[80vmin] h-[80vmin] rounded-full blur-[100px] pointer-events-none"
        style={{ backgroundColor: "rgba(0, 229, 255, 0.08)" }}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center w-full px-6 relative z-10">
        {/* Icon & Header */}
        <div
          className="mb-8 p-4 rounded-xl border"
          style={{
            backgroundColor: "rgba(255, 0, 127, 0.1)",
            borderColor: "rgba(255, 0, 127, 0.3)",
            boxShadow: "0 0 20px rgba(255, 0, 127, 0.2)",
          }}
        >
          <FiShield size={32} style={{ color: "#FF007F" }} />
        </div>

        <h1 className="text-3xl font-bold text-white mb-2 text-center">
          Verify Your Account
        </h1>
        <p className="text-gray-400 mb-10 text-center text-sm px-4">
          Enter the 6-digit code sent to your email
        </p>

        {/* OTP Inputs - Fixed for mobile screens */}
        <div
          className="flex justify-center mb-8 w-full max-w-xs mx-auto"
          style={{ gap: "clamp(6px, 2vw, 12px)" }}
          onPaste={handlePaste}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="text-center text-2xl font-bold bg-[#1A1D24] rounded-xl outline-none transition-all duration-300 flex-1"
              style={{
                width: "clamp(40px, 12vw, 52px)",
                height: "clamp(48px, 14vw, 56px)",
                minWidth: "40px",
                maxWidth: "52px",
                border: digit ? "2px solid #FF007F" : "2px solid #374151",
                color: digit ? "white" : "#9CA3AF",
                boxShadow: digit ? "0 0 15px rgba(255, 0, 127, 0.3)" : "none",
              }}
              onFocus={(e) => {
                if (!digit) {
                  e.currentTarget.style.borderColor = "#FF007F";
                  e.currentTarget.style.boxShadow =
                    "0 0 15px rgba(255, 0, 127, 0.2)";
                }
              }}
              onBlur={(e) => {
                if (!digit) {
                  e.currentTarget.style.borderColor = "#374151";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          disabled={!isComplete}
          onClick={() => navigate("/")}
          className="w-full py-4 rounded-xl font-semibold text-lg active:scale-95 transition-all duration-200 max-w-sm"
          style={{
            background: isComplete
              ? "linear-gradient(to right, #FF007F, #C026D3)"
              : "#1F2937",
            color: isComplete ? "white" : "#6B7280",
            border: isComplete
              ? "1px solid rgba(255, 0, 127, 0.3)"
              : "1px solid #374151",
            boxShadow: isComplete ? "0 0 20px rgba(255, 0, 127, 0.4)" : "none",
            cursor: isComplete ? "pointer" : "not-allowed",
          }}
        >
          Verify & Continue
        </button>
      </div>
    </div>
  );
}
