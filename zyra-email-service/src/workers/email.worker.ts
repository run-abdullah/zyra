import { sendEmailService } from "../services/email.service.js";
import { connectRabbitMQ } from "../config/queue.config.js";

export const startEmailWorker = async (): Promise<void> => {
  try {
    console.log("🔄 [Worker]: Initializing RabbitMQ Channel...");

    const channel = await connectRabbitMQ();

    const queueName = "zyra_email_queue";

    await channel.assertQueue(queueName, { durable: true });

    await channel.prefetch(1);

    console.log(
      `🤖 [Worker]: Waiting for email messages in queue: "${queueName}"...`,
    );

    channel.consume(
      queueName,
      async (message) => {
        if (!message) return;

        try {
          const payload = JSON.parse(message.content.toString());
          console.log(
            `📩 [Worker]: Job received for: ${payload.to} [Template: ${payload.template}]`,
          );

          await sendEmailService({
            to: payload.to,
            template: payload.template,
            context: payload.context,
          });

          channel.ack(message);
          console.log(`✅ [Worker]: Email sent and Job Acknowledged (Ack)!`);
        } catch (error) {
          console.error(
            "❌ [Worker Error]: Error processing email job:",
            error,
          );

          channel.nack(message, false, true);
        }
      },
      {
        noAck: false,
      },
    );
  } catch (error) {
    console.error(
      "❌ [Worker Critical Error]: Failed to start Email Worker:",
      error,
    );
    process.exit(1);
  }
};
