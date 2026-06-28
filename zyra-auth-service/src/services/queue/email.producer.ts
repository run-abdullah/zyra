import { connectRabbitMQ } from "../../config/queue.config.js";

export type EmailTemplateType =
  "EMAIL_OTP" | "EMAIL_PASSWORD_CHANGE" | "EMAIL_SIGNUP";

interface SendEmailPayload {
  to: string;
  template: EmailTemplateType;
  context: Record<string, any>;
}

export const publishEmailJob = async ({
  to,
  template,
  context,
}: SendEmailPayload): Promise<boolean> => {
  try {
    const channel = await connectRabbitMQ();
    const queueName = "zyra_email_queue";

    const emailData = { to, template, context };

    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(emailData)), {
      persistent: true,
    });

    console.log(
      `📥 [Producer]: Job successfully published for: ${to} [Template: ${template}]`,
    );
    return true;
  } catch (error) {
    console.error(
      "❌ [Producer Error]: Failed to publish email job to queue:",
      error,
    );
    return false;
  }
};
