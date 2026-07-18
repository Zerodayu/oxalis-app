import "@dotenvx/dotenvx/config";
import { Elysia } from "elysia";
import { openapi } from "@elysiajs/openapi";
import { env } from "@env";
import { auth } from "./auth/service";
import { OpenAPI } from "./auth/controller";
import { apiRoutes } from "./routes";
import { wsRoutes } from "./ws/handler";
import { cors } from "@elysiajs/cors";

const app = new Elysia()
  .use(
    openapi({
      documentation: {
        info: {
          version: "v1",
          title: "QR Attendnz — backend service",
          description: "this is the documentation for the Qr Attendnz backend",
        },
        components: (await OpenAPI.components) as any,
        paths: (await OpenAPI.getPaths()) as any,
      },
    }),
  )
  .use(
    cors({
      origin: [env.FRONTEND_URL, "http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  )
  .get("/", () => "Hello Elysia", {
    detail: { hide: true },
  })
  .mount(auth.handler)
  .use(apiRoutes)
  .use(wsRoutes)
  .listen(8080);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
