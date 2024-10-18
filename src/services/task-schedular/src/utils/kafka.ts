import { Kafka } from "kafkajs";
import dotenv from "dotenv";

dotenv.config();

export const storageConsumer = async () => {
  const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"],
  });

  const topic = "storage";
  const consumer = kafka.consumer({ groupId: "test-group" });

  const run = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
        console.log(`- ${prefix} ${message.key}#${message.value}`);
      },
    });
  };

  run().catch((e) => console.error(`[example/consumer] ${e.message}`, e));
};
