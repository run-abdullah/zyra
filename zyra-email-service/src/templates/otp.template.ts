// src/templates/otp.template.ts
export const getOtpTemplate = (name: string, otp: string): string => {
  return `
    <div style="font-family: 'Inter', system-ui, -apple-system, sans-serif; max-width: 440px; margin: auto; background: #0F1115; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4); border: 1px solid rgba(255, 255, 255, 0.05);">

      <!-- Logo Section -->
      <div style="padding: 40px 30px 20px; text-align: center;">
        <div style="display: inline-block; padding: 16px 28px; background: linear-gradient(135deg, rgba(0, 229, 255, 0.15), rgba(255, 0, 127, 0.15)); border-radius: 16px; border: 1px solid rgba(0, 229, 255, 0.2); margin-bottom: 20px;">
          <div style="font-size: 40px; font-weight: 900; background: linear-gradient(135deg, #00E5FF, #FF007F); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; letter-spacing: -1px;">
            Zyra
          </div>
        </div>
      </div>

      <!-- Content -->
      <div style="padding: 0 30px 30px;">
        <h2 style="color: #FFFFFF; font-size: 22px; font-weight: 700; margin: 0 0 10px 0; text-align: center;">
          Verification Code
        </h2>
        <p style="color: #9CA3AF; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0; text-align: center;">
          Hi ${name}, use this code to verify your identity on Zyra.
        </p>

        <!-- OTP Display -->
        <div style="background: #1A1D24; border-radius: 14px; padding: 20px; text-align: center; border: 1px solid rgba(0, 229, 255, 0.15);">
          <div style="display: inline-block; padding: 12px 24px; background: rgba(0, 229, 255, 0.1); border-radius: 10px; border: 1px dashed rgba(0, 229, 255, 0.3);">
            <span style="font-size: 34px; font-weight: 800; letter-spacing: 10px; color: #00E5FF; font-family: 'Courier New', monospace; text-shadow: 0 0 30px rgba(0, 229, 255, 0.4);">
              ${otp}
            </span>
          </div>
          <p style="color: #FF007F; font-size: 11px; font-weight: 600; margin: 12px 0 0 0;">
            ⏳ Expires in 5 minutes
          </p>
        </div>

        <!-- Warning -->
        <div style="margin-top: 20px; padding: 12px 16px; background: rgba(255, 0, 127, 0.05); border-radius: 10px; border: 1px solid rgba(255, 0, 127, 0.1);">
          <p style="color: #9CA3AF; font-size: 12px; line-height: 1.5; margin: 0;">
            🔒 <strong style="color: #D1D5DB;">Keep this code private.</strong> Zyra team will never ask for your verification code.
          </p>
        </div>

        <!-- Footer -->
        <div style="margin-top: 30px; text-align: center;">
          <div style="height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent); margin-bottom: 20px;"></div>
          <p style="color: #6B7280; font-size: 11px; margin: 0;">
            If you didn't request this, please ignore this email.
          </p>
          <p style="color: #4B5563; font-size: 10px; margin: 6px 0 0 0;">
            © 2026 Zyra Chat
          </p>
        </div>
      </div>
    </div>
  `;
};
