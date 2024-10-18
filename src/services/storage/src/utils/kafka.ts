import { Kafka } from "kafkajs";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.A_USERNAME);
export const storageProducer = async ({ imgurl }: { imgurl: string }) => {
  const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"],
    // ssl: {
    //   ca: [fs.readFileSync(path.resolve("./ca.pem"), "utf-8")],
    // },
    // sasl: {
    //   username: process.env.A_USERNAME || "",
    //   password: process.env.A_PASSWORD || "",
    //   mechanism: "plain",
    // },
  });

  const producer = kafka.producer();
  await producer.connect();
  await producer.send({
    topic: "storage",
    messages: [
      { key: "key1", value: imgurl },
      { key: "key2", value: "hey hey!" },
    ],
  });

  console.log("produceing..");
};
