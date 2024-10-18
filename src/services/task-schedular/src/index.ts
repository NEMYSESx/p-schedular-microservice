// src/index.ts
import { storageConsumer } from "./utils/kafka";
// import "./worker";

const startApp = async () => {
  console.log("Starting Kafka consumer...");
  await storageConsumer();
};

startApp().catch((e) => console.error(`[App] ${e.message}`, e));
