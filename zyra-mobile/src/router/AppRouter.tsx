import { useEffect, useRef } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { App } from "@capacitor/app";

import WelcomePage from "../pages/WelcomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import OtpVerificationPage from "../pages/OtpVerificationPage";
import RecoveryPage from "../pages/RecoveryPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";

const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const pageTransition = {
  duration: 0.2,
 ease: "easeInOut" as const,
};

const AnimatedPage = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    transition={pageTransition}
    className="w-full h-full"
  >
    {children}
  </motion.div>
);

export default function AppRouter() {
  const location = useLocation();
  const navigate = useNavigate();

  // Is ref ki wajah se listener ko hamesha current path ka pata hoga
  const currentPathRef = useRef(location.pathname);

  useEffect(() => {
    currentPathRef.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    let hasListener = true;
    let removeListener: (() => void) | null = null;

    const setupBackButton = async () => {
      try {
        const listener = await App.addListener("backButton", () => {
          if (!hasListener) return;

          // Ref se hamesha latest path milega bina useEffect re-run kiye
          if (currentPathRef.current === "/") {
            App.exitApp();
          } else {
            navigate(-1);
          }
        });

        if (hasListener) {
          removeListener = () => listener.remove();
        } else {
          listener.remove();
        }
      } catch (error) {
        console.error("Back button error:", error);
      }
    };

    setupBackButton();

    return () => {
      hasListener = false;
      if (removeListener) removeListener();
    };
  }, [navigate]); // No more location.pathname dependency!

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <AnimatedPage>
              <WelcomePage />
            </AnimatedPage>
          }
        />
        <Route
          path="/login"
          element={
            <AnimatedPage>
              <LoginPage />
            </AnimatedPage>
          }
        />
        <Route
          path="/signup"
          element={
            <AnimatedPage>
              <SignupPage />
            </AnimatedPage>
          }
        />
        <Route
          path="/otp"
          element={
            <AnimatedPage>
              <OtpVerificationPage />
            </AnimatedPage>
          }
        />
        <Route
          path="/recovery"
          element={
            <AnimatedPage>
              <RecoveryPage />
            </AnimatedPage>
          }
        />
        <Route
          path="/reset-password"
          element={
            <AnimatedPage>
              <ResetPasswordPage />
            </AnimatedPage>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}
