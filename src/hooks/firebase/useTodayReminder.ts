import {DocumentData} from "firebase/firestore";
import {useFilteredReminders} from "./useFilteredReminder.ts";

export function useTodayReminders<T = DocumentData>() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

  return useFilteredReminders<T>(start, end);
}
