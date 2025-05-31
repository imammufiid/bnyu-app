import {useFirestoreGetCollection} from "../hooks/firebase/useFirestoreGetCollection.ts";
import {useEffect} from "react";
import {DrinkReminder} from "../models/DrinkReminder.ts";

export const HistoryPage = () => {


  const {data, fetchData} = useFirestoreGetCollection<DrinkReminder>("reminders")

  useEffect(() => {
    fetchData().then()
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-start w-full">History</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Drink</th>
          </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.createdAt.toDate().toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.isDrink ? "You Drank" : "FUCK"}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 