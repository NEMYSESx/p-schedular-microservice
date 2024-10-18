// src/queue.ts
import { Queue } from "bullmq";
import IORedis from "ioredis";

// Initialize Redis connection
export const redis = new IORedis();

// Initialize BullMQ queue
export const taskQueue = new Queue("taskQueue", { connection: redis });
