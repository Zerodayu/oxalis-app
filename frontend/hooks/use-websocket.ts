import { useEffect, useRef, useCallback } from "react";
import { env } from "@/env";

type MessageHandler = (data: Record<string, unknown>) => void;

interface UseWebSocketOptions {
  onMessage?: MessageHandler;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
}

const WS_URL = env.NEXT_PUBLIC_API_URL.replace(/^http/, "ws") + "/ws";

export function useWebSocket(options: UseWebSocketOptions = {}) {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const mountedRef = useRef(true);

  const onMessageRef = useRef(options.onMessage);
  const onOpenRef = useRef(options.onOpen);
  const onCloseRef = useRef(options.onClose);
  const onErrorRef = useRef(options.onError);

  onMessageRef.current = options.onMessage;
  onOpenRef.current = options.onOpen;
  onCloseRef.current = options.onClose;
  onErrorRef.current = options.onError;

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    let reconnectInterval = 1000;

    ws.onopen = () => {
      reconnectInterval = 1000;
      onOpenRef.current?.();
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessageRef.current?.(data);
      } catch {
        // ignore
      }
    };

    ws.onclose = () => {
      if (!mountedRef.current) return;
      onCloseRef.current?.();
      reconnectTimerRef.current = setTimeout(() => {
        if (mountedRef.current) {
          reconnectInterval = Math.min(reconnectInterval * 2, 30000);
          connect();
        }
      }, reconnectInterval);
    };

    ws.onerror = (event) => {
      onErrorRef.current?.(event);
    };
  }, []);

  const disconnect = useCallback(() => {
    mountedRef.current = false;
    clearTimeout(reconnectTimerRef.current);
    wsRef.current?.close();
    wsRef.current = null;
  }, []);

  const send = useCallback((data: unknown) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return { send, disconnect };
}
