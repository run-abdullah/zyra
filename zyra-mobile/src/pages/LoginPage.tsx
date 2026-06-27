import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Backend API call here
    console.log("Login:", { email, password });
    navigate("/otp"); // Demo ke liye OTP page par redirect
  };

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
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full px-6 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">
            Enter your credentials to access Zyra.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
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
              style={{
                borderColor: email ? "#00E5FF" : "",
                boxShadow: email ? "0 0 15px rgba(0, 229, 255, 0.2)" : "",
              }}
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
              style={{
                borderColor: password ? "#FF007F" : "",
                boxShadow: password ? "0 0 15px rgba(255, 0, 127, 0.2)" : "",
              }}
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

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link
              to="/recovery"
              className="text-sm hover:underline transition-colors"
              style={{ color: "#00E5FF" }}
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl text-white font-semibold text-lg active:scale-95 transition-transform duration-200 mt-2"
            style={{
              background: "linear-gradient(to right, #00E5FF, #0077B6)",
              boxShadow: "0 0 20px rgba(0, 229, 255, 0.4)",
              border: "1px solid rgba(0, 229, 255, 0.3)",
            }}
          >
            Sign In
          </button>
        </form>

        {/* Signup Redirect */}
        <p className="text-center text-gray-500 mt-8 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium transition-colors hover:underline"
            style={{ color: "#FF007F" }}
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
