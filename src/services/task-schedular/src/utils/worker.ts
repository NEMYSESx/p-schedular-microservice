// src/worker.ts
import { Worker } from "bullmq";
import { redis } from "./queue"; // Reuse Redis connection

// Initialize worker to process jobs from the queue
const worker = new Worker(
  "taskQueue",
  async (job) => {
    console.log(`Processing job ${job.id} with data:`, job.data);
    // Add custom processing logic here
  },
  { connection: redis }
);

// Handle worker failures
worker.on("failed", (job, err) => {
  if (job) {
    console.error(`Job ${job.id} failed:`, err);
  }
});

// Export worker to ensure it runs
export { worker };
