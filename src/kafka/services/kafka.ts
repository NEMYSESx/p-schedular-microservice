import { Kafka } from "kafkajs";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.BROKER_ID);

const kafka = new Kafka({
  clientId: "my-app",
  brokers: [process.env.BROKER_ID || ""],
  ssl: {
    ca: [fs.readFileSync(path.resolve("./ca.pem", "utf-8"))],
  },
  sasl: {
    username: process.env.USERNAME || "",
    password: process.env.PASSWORD || "",
    mechanism: "plain",
  },
});
