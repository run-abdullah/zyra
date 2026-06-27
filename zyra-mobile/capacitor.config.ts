import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.zyra.app",
  appName: "Zyra",
  webDir: "dist",
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#181a1e",
      showSpinner: false,
      androidSpinnerStyle: "small",
      splashFullScreen: true,
      splashImmersive: true,
      androidScaleType: "CENTER_CROP",
    },
  },
  server: {
    url: "http://192.168.1.13:5173",
    cleartext: true,
  },
};

export default config;
