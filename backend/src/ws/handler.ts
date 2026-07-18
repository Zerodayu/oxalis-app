import { Elysia } from "elysia";
import { auth } from "../auth/service";
import { subscribe, unsubscribe } from "./pubsub";

export const wsRoutes = new Elysia()
  .ws("/ws", {
    async open(ws) {
      const session = await auth.api.getSession({
        headers: ws.data.headers as Record<string, string>,
      });

      if (!session) {
        ws.close();
        return;
      }

      const wsData = ws.data as { userId?: number };
      wsData.userId = Number(session.user.id);
      subscribe(wsData.userId, ws);
    },
    message(ws, message) {
      if (typeof message === "object" && message !== null) {
        const msg = message as Record<string, unknown>;
        if (msg.type === "ping") {
          ws.send({ type: "pong" });
        }
      }
    },
    close(ws) {
      const wsData = ws.data as { userId?: number };
      if (wsData.userId) {
        unsubscribe(wsData.userId, ws);
      }
    },
  });
