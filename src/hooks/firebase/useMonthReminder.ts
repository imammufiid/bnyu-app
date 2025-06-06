import {useFilteredReminders} from "./useFilteredReminder.ts";
import {DocumentData} from "firebase/firestore";

export function useMonthReminders<T = DocumentData>() {
  const now = new Date();
  const end = new Date();
  const start = new Date();
  start.setMonth(now.getMonth() - 1); // last 1 month from today

  return useFilteredReminders<T>(start, end);
}
