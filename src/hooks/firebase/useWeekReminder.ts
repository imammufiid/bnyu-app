import {useFilteredReminders} from "./useFilteredReminder.ts";
import {DocumentData} from "firebase/firestore";

export function useWeekReminders<T = DocumentData>() {
  const now = new Date();
  const end = new Date();
  const start = new Date();
  start.setDate(now.getDate() - 6); // includes today + last 6 days

  return useFilteredReminders<T>(start, end);
}
