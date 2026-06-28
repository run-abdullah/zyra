import amqp from "amqplib";

let channel: amqp.Channel;
let connection: amqp.ChannelModel;

export const connectRabbitMQ = async (): Promise<amqp.Channel> => {
  if (channel) return channel;

  try {
    const user = process.env.RABBITMQ_USER || "guest";
    const pass = process.env.RABBITMQ_PASS || "guest";
    const host = process.env.RABBITMQ_HOST || "localhost";
    const port = process.env.RABBITMQ_PORT || "5672";

    // Pura secured URL
    const rabbitmqUrl = `amqp://${user}:${pass}@${host}:${port}`;

    console.log("🔄 Connecting to RabbitMQ...");
    connection = await amqp.connect(rabbitmqUrl);
    channel = await connection.createChannel();

    // Ensure queue exists
    const queueName = "zyra_email_queue";
    await channel.assertQueue(queueName, { durable: true });

    console.log(
      "⚡ [Auth Service]: Producer Channel connected to RabbitMQ successfully!",
    );
    return channel;
  } catch (error) {
    console.error("❌ RabbitMQ connection error in Auth Service:", error);
    throw error;
  }
};

export const closeRabbitMQ = async (): Promise<void> => {
  try {
    if (channel) await channel.close();
    if (connection) await connection.close();
    console.log("🔌 [Auth Service]: RabbitMQ connection closed cleanly.");
  } catch (error) {
    console.error("❌ Error while closing RabbitMQ connection:", error);
  }
};
