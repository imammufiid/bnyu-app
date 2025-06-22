import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {useState} from "react";
import {useDrinkRankings} from "../hooks/firebase/useDrinkRankings.ts";

export const RankPage = () => {
  const {rankings, loading, error} = useDrinkRankings();
  const [activeTab, setActiveTab] = useState("today");

  const tabsData = [
    {
      label: "Today",
      value: "today",
      data: rankings.today,
    },
    {
      label: "This Week",
      value: "weekly",
      data: rankings.weekly,
    },
    {
      label: "This Month",
      value: "monthly",
      data: rankings.monthly,
    },
    {
      label: "All Time",
      value: "all",
      data: rankings.all,
    },
  ];

  return (
    <div className="mt-6">
      <Tabs value={activeTab}>
        <TabsHeader className={'bg-gray-800'} placeholder={undefined} onResize={undefined} onResizeCapture={undefined}
                    onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          {tabsData.map(({label, value}) => (
            <Tab
              key={value}
              value={value}
              onClick={() => setActiveTab(value)}
              className={`px-4 py-2 rounded-md transition-colors ${activeTab === value ? "bg-white text-black font-bold" : ""}`}
              placeholder={undefined} onResize={undefined} onResizeCapture={undefined}
              onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        {loading && (<div>Loading...</div>)}
        {error && (<div>Failed to load data...</div>)}
        {!loading && !error && (
          <TabsBody placeholder={undefined} onResize={undefined} onResizeCapture={undefined}
                    onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            {tabsData.map(({value, data}) => (
              <TabPanel key={value} value={value}>
                {data.length == 0 && (
                  <div className="text-white">No Data...</div>
                )}
                {data.length > 0 && data.map((u, index) => (
                  <div
                    className={`bg-[#1a1a1a] ${index == 0 && data.length == 1 ? 'rounded-lg' : index == 0 ? 'rounded-t-lg rounded-b-0' : (index == data.length - 1) ? 'rounded-b-lg rounded-t-0' : ''} p-4`}>
                    <div className={'flex gap-4 items-center'}>
                      <div className={'font-semibold'}>{index + 1}.</div>
                      <div className={'font-semibold flex-1 text-start text-white flex items-center gap-4'}>
                        <img
                          src={u.user?.photoURL ?? ''}
                          alt={u.user?.displayName || 'User'}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          {u.user?.displayName}
                          <div className="text-xs font-normal text-gray-400">{u.points} Pts</div>
                        </div>
                      </div>
                      <div
                        className="w-8 h-8 flex items-center justify-center font-bold bg-gray-800 text-white rounded-full">
                        {u.count}
                      </div>
                    </div>
                  </div>
                ))}
              </TabPanel>
            ))}
          </TabsBody>
        )}
      </Tabs>
    </div>
  );
};
