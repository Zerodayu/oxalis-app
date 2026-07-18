interface WSHandle {
  send(data: unknown): void;
  close(): void;
  raw: { readyState: number };
}

const connections = new Map<number, Set<WSHandle>>();

export function subscribe(userId: number, ws: WSHandle) {
  let set = connections.get(userId);
  if (!set) {
    set = new Set();
    connections.set(userId, set);
  }
  set.add(ws);
}

export function unsubscribe(userId: number, ws: WSHandle) {
  const set = connections.get(userId);
  if (!set) return;
  set.delete(ws);
  if (set.size === 0) connections.delete(userId);
}

function broadcast(userId: number, message: unknown) {
  const set = connections.get(userId);
  if (!set) return;
  for (const ws of set) {
    if (ws.raw.readyState === WebSocket.OPEN) {
      ws.send(message);
    }
  }
}

export function broadcastToUsers(userIds: number[], message: unknown) {
  for (const uid of userIds) {
    broadcast(uid, message);
  }
}
