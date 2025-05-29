export const HistoryPage = () => {
  const dummyHistory = [
    { id: 1, date: '2024-03-20', time: '10:00 AM', duration: '5 minutes' },
    { id: 2, date: '2024-03-20', time: '11:30 AM', duration: '5 minutes' },
    { id: 3, date: '2024-03-20', time: '01:00 PM', duration: '5 minutes' },
    { id: 4, date: '2024-03-19', time: '09:00 AM', duration: '5 minutes' },
    { id: 5, date: '2024-03-19', time: '02:30 PM', duration: '5 minutes' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-start w-full">History</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dummyHistory.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.time}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 