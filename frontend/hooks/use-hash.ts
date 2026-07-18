import { useSyncExternalStore } from "react";

const DEFAULT_HASH = "#board";

function getHash() {
  if (typeof window === "undefined") {
    return DEFAULT_HASH;
  }
  return window.location.hash || DEFAULT_HASH;
}

function subscribe(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

export function useHash() {
  return useSyncExternalStore(subscribe, getHash, getHash);
}
