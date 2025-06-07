import {useEffect, useState} from "react";
import {collection, getDocs, query, where, Timestamp} from "firebase/firestore";
import {db, FirestoreCollection} from "../../services/FirebaseService.ts";

function getStartOfDay(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getStartOfWeek(date = new Date()) {
  const day = date.getDay(); // Sunday = 0
  const diff = date.getDate() - day;
  return new Date(date.setDate(diff));
}

function getStartOfMonth(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

type RankingResult = {
  userId: string;
  count: number;
};

type Rankings = {
  today: RankingResult[];
  weekly: RankingResult[];
  monthly: RankingResult[];
  all: RankingResult[];
};

export function useDrinkRankings() {
  const [rankings, setRankings] = useState<Rankings>({
    today: [],
    weekly: [],
    monthly: [],
    all: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const now = new Date();
        const timeFrames = {
          today: getStartOfDay(now),
          weekly: getStartOfWeek(now),
          monthly: getStartOfMonth(now),
          all: null,
        };

        const tempResults: Partial<Rankings> = {};

        for (const [range, startDate] of Object.entries(timeFrames)) {
          let q = query(collection(db, FirestoreCollection.reminders), where("isDrink", "==", true));
          if (startDate) {
            q = query(q, where("createdAt", ">=", Timestamp.fromDate(startDate)));
          }

          const snapshot = await getDocs(q);
          const counts: Record<string, number> = {};

          snapshot.forEach(doc => {
            const data = doc.data();
            const userId = data.userId;
            if (userId) {
              counts[userId] = (counts[userId] || 0) + 1;
            }
          });

          const sorted = Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .map(([userId, count]) => ({userId, count}));

          tempResults[range as keyof Rankings] = sorted;
        }

        setRankings(tempResults as Rankings);
      } catch (err) {
        console.error("Error fetching drink rankings:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData().then();
  }, []);

  return {rankings, loading, error};
}
