export type PresenceStatus = "open" | "closing" | "closed";

export interface UsePresenceReturn {
  isPresent: boolean;
  status: PresenceStatus;
}
