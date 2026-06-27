import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiLock, FiShield } from "react-icons/fi";

export default function ResetPasswordPage() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  // Auto-focus first OTP input on mount
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
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
    const nextIndex = Math.min(pastedData.length, 5);
    inputsRef.current[nextIndex]?.focus();
  };

  const isOtpComplete = otp.every((digit) => digit !== "");
  const passwordsMatch = newPassword && newPassword === confirmPassword;
  const isFormValid = isOtpComplete && passwordsMatch;

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    // TODO: Backend API call
    console.log("Password Reset:", {
      otp: otp.join(""),
      newPassword,
    });
    navigate("/login");
  };

  return (
    <div className="fixed inset-0 bg-[#0F1115] flex flex-col overflow-hidden">
      {/* Background Glow Effects */}
      <div
        className="absolute top-[-20%] left-[-20%] w-[80vmin] h-[80vmin] rounded-full blur-[100px] pointer-events-none"
        style={{ backgroundColor: "rgba(0, 229, 255, 0.08)" }}
      />
      <div
        className="absolute bottom-[-20%] right-[-20%] w-[80vmin] h-[80vmin] rounded-full blur-[100px] pointer-events-none"
        style={{ backgroundColor: "rgba(255, 0, 127, 0.08)" }}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center w-full px-6 relative z-10 overflow-y-auto">
        <div className="max-w-sm w-full py-8">
          {/* Header Icon */}
          <div className="flex justify-center mb-6">
            <div
              className="p-4 rounded-xl border"
              style={{
                backgroundColor: "rgba(0, 229, 255, 0.1)",
                borderColor: "rgba(0, 229, 255, 0.3)",
                boxShadow: "0 0 20px rgba(0, 229, 255, 0.2)",
              }}
            >
              <FiShield size={32} style={{ color: "#00E5FF" }} />
            </div>
          </div>

          {/* Header Text */}
          <h1 className="text-3xl font-bold text-white mb-2 text-center">
            Reset Password
          </h1>
          <p className="text-gray-400 mb-8 text-center text-sm">
            Enter the OTP sent to your email and set a new password
          </p>

          <form onSubmit={handleResetPassword} className="space-y-4">
            {/* OTP Section */}
            <div>
              <label className="block text-sm text-gray-400 mb-3 ml-1">
                Verification Code
              </label>
              <div
                className="flex justify-center mb-1"
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
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="text-center text-2xl font-bold bg-[#1A1D24] rounded-xl outline-none transition-all duration-300 flex-1"
                    style={{
                      width: "clamp(40px, 12vw, 52px)",
                      height: "clamp(48px, 14vw, 56px)",
                      minWidth: "40px",
                      maxWidth: "52px",
                      border: digit ? "2px solid #00E5FF" : "2px solid #374151",
                      color: digit ? "white" : "#9CA3AF",
                      boxShadow: digit
                        ? "0 0 15px rgba(0, 229, 255, 0.3)"
                        : "none",
                    }}
                    onFocus={(e) => {
                      if (!digit) {
                        e.currentTarget.style.borderColor = "#00E5FF";
                        e.currentTarget.style.boxShadow =
                          "0 0 15px rgba(0, 229, 255, 0.2)";
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
            </div>

            {/* New Password */}
            <div className="relative group">
              <label className="block text-sm text-gray-400 mb-1 ml-1">
                New Password
              </label>
              <div className="relative">
                <FiLock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00E5FF] transition-colors"
                  size={20}
                />
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full bg-[#1A1D24] border border-gray-700 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 outline-none transition-all duration-300"
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#00E5FF";
                    e.currentTarget.style.boxShadow =
                      "0 0 15px rgba(0, 229, 255, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#374151";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative group">
              <label className="block text-sm text-gray-400 mb-1 ml-1">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#FF007F] transition-colors"
                  size={20}
                />
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full bg-[#1A1D24] border border-gray-700 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 outline-none transition-all duration-300"
                  style={{
                    borderColor: confirmPassword
                      ? passwordsMatch
                        ? "#22C55E"
                        : "#EF4444"
                      : "#374151",
                    boxShadow: confirmPassword
                      ? passwordsMatch
                        ? "0 0 15px rgba(34, 197, 94, 0.2)"
                        : "0 0 15px rgba(239, 68, 68, 0.2)"
                      : "none",
                  }}
                  onFocus={(e) => {
                    if (!confirmPassword) {
                      e.currentTarget.style.borderColor = "#FF007F";
                      e.currentTarget.style.boxShadow =
                        "0 0 15px rgba(255, 0, 127, 0.2)";
                    }
                  }}
                  onBlur={(e) => {
                    if (!confirmPassword) {
                      e.currentTarget.style.borderColor = "#374151";
                      e.currentTarget.style.boxShadow = "none";
                    }
                  }}
                />
              </div>
            </div>

            {/* Reset Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className="w-full py-4 rounded-xl font-semibold text-lg active:scale-95 transition-all duration-200 mt-4"
              style={{
                background: isFormValid
                  ? "linear-gradient(to right, #00E5FF, #0077B6)"
                  : "#1F2937",
                color: isFormValid ? "white" : "#6B7280",
                border: isFormValid
                  ? "1px solid rgba(0, 229, 255, 0.3)"
                  : "1px solid #374151",
                boxShadow: isFormValid
                  ? "0 0 20px rgba(0, 229, 255, 0.4)"
                  : "none",
                cursor: isFormValid ? "pointer" : "not-allowed",
              }}
            >
              Reset Password
            </button>
          </form>

          {/* Back to Login */}
          <p className="text-center text-gray-500 mt-6 text-sm">
            Remember your password?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-medium transition-colors hover:underline"
              style={{ color: "#00E5FF" }}
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
