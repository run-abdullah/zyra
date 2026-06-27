import { Link } from "react-router-dom";
import LogoSvg from "../assets/logo.svg";

export default function WelcomePage() {
  return (
    <div className="fixed inset-0 bg-[#0F1115] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Glow Effects */}
      <div
        className="absolute top-[-30%] left-[-20%] w-[80vmin] h-[80vmin] rounded-full blur-[100px] pointer-events-none"
        style={{ backgroundColor: "rgba(0, 229, 255, 0.1)" }}
      />
      <div
        className="absolute bottom-[-30%] right-[-20%] w-[80vmin] h-[80vmin] rounded-full blur-[100px] pointer-events-none"
        style={{ backgroundColor: "rgba(255, 0, 127, 0.1)" }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-sm px-6">
        {/* Logo Section */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 mb-6 relative">
          {/* Glow effects */}
          <div
            className="absolute inset-0 rounded-full blur-xl scale-110"
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 229, 255, 0.3), rgba(255, 0, 127, 0.3))",
            }}
          />
          <div
            className="absolute inset-0 rounded-full blur-md"
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 229, 255, 0.2), rgba(255, 0, 127, 0.2))",
            }}
          />

          {/* SVG Logo */}
          <img
            src={LogoSvg}
            alt="Zyra Logo"
            className="w-full h-full object-contain relative z-10 bg-transparent"
            style={{
              background: "transparent",
              filter: `drop-shadow(0 0 15px rgba(0, 229, 255, 0.5)) drop-shadow(0 0 30px rgba(255, 0, 127, 0.3))`,
            }}
          />
        </div>

        {/* Brand Text */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2 text-center">
          Zyra
        </h1>
        <p className="text-gray-400 text-center leading-relaxed text-sm sm:text-base mb-10">
          Connect instantly. Share freely.
          <br />
          The next-gen chat experience.
        </p>

        {/* Action Buttons */}
        <div className="w-full space-y-3">
          <Link
            to="/login"
            className="block w-full py-3.5 text-white font-semibold text-base sm:text-lg text-center rounded-xl active:scale-95 transition-transform duration-200"
            style={{
              background: "linear-gradient(to right, #00E5FF, #0077B6)",
              boxShadow: "0 0 20px rgba(0, 229, 255, 0.4)",
              border: "1px solid rgba(0, 229, 255, 0.3)",
            }}
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="block w-full py-3.5 bg-transparent font-semibold text-base sm:text-lg text-center rounded-xl hover:bg-opacity-10 active:scale-95 transition-all duration-200"
            style={{
              border: "2px solid #FF007F",
              color: "#FF007F",
              boxShadow: "0 0 15px rgba(255, 0, 127, 0.2)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "rgba(255, 0, 127, 0.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            Create Account
          </Link>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-600 text-center mt-8">
          © 2026 Zyra Chat. All rights reserved.
        </p>
      </div>
    </div>
  );
}
