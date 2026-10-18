import express from "express";
import helmet from "helmet";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = Number(process.env.PORT) || 5000;
const clientDistPath = fileURLToPath(new URL("../../client/dist", import.meta.url));

app.disable("x-powered-by");
app.use(helmet());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

if (existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get(/^(?!\/api\/).*/, (request, response, next) => {
    response.sendFile(path.join(clientDistPath, "index.html"), (error) => {
      if (error) next(error);
    });
  });
}

app.use((request, response) => {
  response.status(404).json({ error: "The requested endpoint was not found." });
});

app.use((error, _request, response, _next) => {
  console.error("Request failed:", error);
  response.status(error.status || 500).json({
    error:
      process.env.NODE_ENV === "production"
        ? "The request could not be completed. Please try again."
        : error.message,
  });
});

const server = app.listen(port, () => {
  console.info(`Sunrich API listening on port ${port}.`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    server.close(() => {
      process.exit(0);
    });
  });
}
