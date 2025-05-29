import { MdTimer, MdSettings, MdHistory } from 'react-icons/md';

type SidebarProps = {
  onSelect: (item: string) => void;
  selectedItem: string;
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ onSelect, selectedItem, isCollapsed, onToggle }: SidebarProps) => {
  const menuItems = [
    { id: 'timer', label: 'Timer', icon: <MdTimer size={24} /> },
    { id: 'settings', label: 'Settings', icon: <MdSettings size={24} /> },
    { id: 'history', label: 'History', icon: <MdHistory size={24} /> },
  ];

  return (
    <div className={`h-screen bg-gray-800 text-white p-4 transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      <div className="flex items-center justify-between mb-8">
        {!isCollapsed && (
          <div className="text-2xl font-bold text-center">
            Water Reminder
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSelect(item.id)}
                className={`w-full flex items-center ${
                  isCollapsed ? 'justify-center' : 'space-x-3'
                } px-4 py-3 rounded-lg transition-colors relative group ${
                  selectedItem === item.id
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-700'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {!isCollapsed && <span>{item.label}</span>}
                
                {/* Tooltip */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                    {item.label}
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}; 