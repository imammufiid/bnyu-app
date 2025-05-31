import {Timestamp} from "firebase/firestore";

export type DrinkReminder = {
  createdAt: Timestamp;
  isDrink: boolean;
}