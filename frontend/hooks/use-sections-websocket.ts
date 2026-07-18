import { useSectionsStore } from "@/stores/sections";
import { useWebSocket } from "@/hooks/use-websocket";

export function useSectionsWebSocket() {
  const updateStudentAttendance = useSectionsStore((s) => s.updateStudentAttendance);

  useWebSocket({
    onMessage: (data) => {
      if (data.type === "attendance:updated") {
        updateStudentAttendance(data as {
          studentId: number;
          timeIn: string | null;
          timeOut: string | null;
          date: string;
        });
      }
    },
  });
}
