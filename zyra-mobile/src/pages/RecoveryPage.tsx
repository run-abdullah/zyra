import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiSend } from "react-icons/fi";

export default function RecoveryPage() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const navigate = useNavigate();

  const handleRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Backend API call to send OTP
    console.log("OTP sent to:", email);
    setIsSent(true);

    // Auto redirect to OTP page after 2 seconds
    setTimeout(() => {
      navigate("/reset-password");
    }, 2000);
  };

  if (isSent) {
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

        {/* Success Message */}
        <div className="flex-1 flex flex-col justify-center items-center w-full px-6 relative z-10">
          <div
            className="mb-8 p-4 rounded-xl border"
            style={{
              backgroundColor: "rgba(0, 229, 255, 0.1)",
              borderColor: "rgba(0, 229, 255, 0.3)",
              boxShadow: "0 0 20px rgba(0, 229, 255, 0.2)",
            }}
          >
            <FiSend size={32} style={{ color: "#00E5FF" }} />
          </div>

          <h1 className="text-3xl font-bold text-white mb-4 text-center">
            Check Your Inbox
          </h1>
          <p className="text-gray-400 mb-2 text-center">
            We've sent a 6-digit OTP to
          </p>
          <p className="text-lg font-medium mb-8" style={{ color: "#00E5FF" }}>
            {email}
          </p>

          <p className="text-gray-500 text-sm text-center animate-pulse">
            Redirecting to Password Resset page...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#0F1115] flex flex-col overflow-hidden">
      {/* Background Glow Effects */}
      <div
        className="absolute top-[-20%] right-[-20%] w-[80vmin] h-[80vmin] rounded-full blur-[100px] pointer-events-none"
        style={{ backgroundColor: "rgba(0, 229, 255, 0.08)" }}
      />
      <div
        className="absolute bottom-[-20%] left-[-20%] w-[80vmin] h-[80vmin] rounded-full blur-[100px] pointer-events-none"
        style={{ backgroundColor: "rgba(255, 0, 127, 0.08)" }}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center w-full px-6 relative z-10">
        <div className="max-w-sm mx-auto w-full">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Forgot Password?
            </h1>
            <p className="text-gray-400">
              Enter your email and we'll send you an OTP.
            </p>
          </div>

          <form onSubmit={handleRecovery} className="space-y-4">
            {/* Email Input */}
            <div className="relative group">
              <FiMail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00E5FF] transition-colors"
                size={20}
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            {/* Send OTP Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl text-white font-semibold text-lg active:scale-95 transition-all duration-200 mt-2"
              style={{
                background: "linear-gradient(to right, #00E5FF, #0077B6)",
                boxShadow: "0 0 20px rgba(0, 229, 255, 0.4)",
                border: "1px solid rgba(0, 229, 255, 0.3)",
              }}
            >
              Send OTP
            </button>
          </form>

          {/* Back to Login */}
          <p className="text-center text-gray-500 mt-8 text-sm">
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
