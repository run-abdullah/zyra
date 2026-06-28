import { transporter } from "../config/mail.config.js";
import { getTemplateHtml, TemplateType } from "../templates/index.js";

interface SendEmailPayload {
  to: string;
  template: TemplateType;
  context: Record<string, any>;
}

export const sendEmailService = async ({
  to,
  template,
  context,
}: SendEmailPayload): Promise<boolean> => {
  try {
    const { subject, html } = getTemplateHtml(template, context);

    const mailOptions = {
      from: `"Zyra Support" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(
      `✨ [Email Sent Successfully]: ID: ${info.messageId} | Template: ${template} -> To: ${to}`,
    );
    return true;
  } catch (error) {
    console.error(
      `❌ [Email Service Error] Failed to send email to ${to}:`,
      error,
    );
    throw error;
  }
};
