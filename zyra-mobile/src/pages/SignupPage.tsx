import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiLock,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const doPasswordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;
  const isPasswordMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doPasswordsMatch) return;

    // TODO: Backend API call here
    console.log("Signup:", { name, email, password });
    navigate("/otp");
  };

  return (
    <div className="fixed inset-0 bg-[#0F1115] flex flex-col overflow-hidden">
      {/* Background Glow Effects */}
      <div
        className="absolute top-[-20%] left-[-20%] w-[80vmin] h-[80vmin] rounded-full blur-[100px] pointer-events-none"
        style={{ backgroundColor: "rgba(255, 0, 127, 0.08)" }}
      />
      <div
        className="absolute bottom-[-20%] right-[-20%] w-[80vmin] h-[80vmin] rounded-full blur-[100px] pointer-events-none"
        style={{ backgroundColor: "rgba(0, 229, 255, 0.08)" }}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full px-6 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Join Zyra and start connecting.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Name Input */}
          <div className="relative group">
            <FiUser
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#FF007F] transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-[#1A1D24] border border-gray-700 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 outline-none transition-all duration-300"
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#FF007F";
                e.currentTarget.style.boxShadow =
                  "0 0 15px rgba(255, 0, 127, 0.2)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#374151";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Email Input */}
          <div className="relative group">
            <FiMail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#FF007F] transition-colors"
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
                e.currentTarget.style.borderColor = "#FF007F";
                e.currentTarget.style.boxShadow =
                  "0 0 15px rgba(255, 0, 127, 0.2)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#374151";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <FiLock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#FF007F] transition-colors"
              size={20}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#1A1D24] border border-gray-700 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 outline-none transition-all duration-300"
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#FF007F";
                e.currentTarget.style.boxShadow =
                  "0 0 15px rgba(255, 0, 127, 0.2)";
              }}
              onBlur={(e) => {
                if (!confirmPassword) {
                  e.currentTarget.style.borderColor = "#374151";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            />
          </div>

          {/* Confirm Password Input with Validation Icon */}
          <div className="relative group">
            <FiLock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#FF007F] transition-colors"
              size={20}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full bg-[#1A1D24] border rounded-xl py-4 pl-12 pr-12 text-white placeholder-gray-500 outline-none transition-all duration-300"
              style={{
                borderColor: doPasswordsMatch
                  ? "#22C55E"
                  : isPasswordMismatch
                    ? "#EF4444"
                    : "#374151",
                boxShadow: doPasswordsMatch
                  ? "0 0 15px rgba(34, 197, 94, 0.2)"
                  : isPasswordMismatch
                    ? "0 0 15px rgba(239, 68, 68, 0.2)"
                    : "none",
              }}
              onFocus={(e) => {
                if (!doPasswordsMatch && !isPasswordMismatch) {
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
            {/* Validation Status Icon */}
            {doPasswordsMatch && (
              <FiCheckCircle
                className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500"
                size={20}
              />
            )}
            {isPasswordMismatch && (
              <FiXCircle
                className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500"
                size={20}
              />
            )}
          </div>

          {/* Mismatch Warning Text */}
          {isPasswordMismatch && (
            <p className="text-red-400 text-xs -mt-2 ml-1">
              Passwords do not match
            </p>
          )}

          {/* Signup Button */}
          <button
            type="submit"
            disabled={!doPasswordsMatch}
            className="w-full py-4 rounded-xl font-semibold text-lg active:scale-95 transition-all duration-200 mt-2"
            style={{
              background: doPasswordsMatch
                ? "linear-gradient(to right, #FF007F, #C026D3)"
                : "#1F2937",
              color: doPasswordsMatch ? "white" : "#6B7280",
              border: doPasswordsMatch
                ? "1px solid rgba(255, 0, 127, 0.3)"
                : "1px solid #374151",
              boxShadow: doPasswordsMatch
                ? "0 0 20px rgba(255, 0, 127, 0.4)"
                : "none",
              cursor: doPasswordsMatch ? "pointer" : "not-allowed",
            }}
          >
            Create Account
          </button>
        </form>

        {/* Login Redirect */}
        <p className="text-center text-gray-500 mt-8 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium transition-colors hover:underline"
            style={{ color: "#00E5FF" }}
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
