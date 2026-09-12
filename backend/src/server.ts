import app from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";

async function startServer(): Promise<void> {
  await connectDB();

  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port} in ${env.nodeEnv} mode`);
  });
}

startServer();
