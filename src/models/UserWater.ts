import {Timestamp} from "firebase/firestore";

export type UserWater = {
    createdAt: Timestamp;
    uid: string,
    email: string,
    displayName: string,
    photoURL: string,
}