import {MdTimer, MdSettings, MdHistory, MdPerson, MdEmojiEvents, MdLogout} from 'react-icons/md';
import {useCallback, useEffect, useRef, useState} from "react";
import { signOut } from "firebase/auth";
import {auth} from "../services/FirebaseService.ts";
import {useNavigate} from "react-router-dom";
import {USER_KEY} from "../services/StorageService.ts";
import {useUserSession} from "../hooks/useUserSession.ts";
import { useUserPoints } from '../pages/useUserPoints.ts';

type SidebarProps = {
  onSelect: (item: string) => void;
  selectedItem: string;
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar = ({onSelect, selectedItem, isCollapsed, onToggle}: SidebarProps) => {
  const menuItems = [
    {id: 'timer', label: 'Timer', icon: <MdTimer size={24}/>},
    {id: 'settings', label: 'Settings', icon: <MdSettings size={24}/>},
    {id: 'history', label: 'History', icon: <MdHistory size={24}/>},
    {id: 'rank', label: 'Rank', icon: <MdEmojiEvents size={24}/>},
  ];

  const {user} = useUserSession()
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate()
  const { points, fetchPoints } = useUserPoints();

  // When you want to fetch points for a user:
  useEffect(() => {
    fetchPoints(user?.uid ?? null);
  }, [user?.uid]);

  const buttonRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (!buttonRef.current) return;
    setShowPopup((prev) => !prev);
  };

  const handleLogout = useCallback(() => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem(USER_KEY)
        navigate('/login')
      })
  }, [])

  return (
    <div className={`h-screen bg-gray-800 text-white p-4 transition-all duration-300 flex flex-col ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      <div className="flex items-center justify-between mb-8">
        {!isCollapsed && (
          <div className="text-2xl font-bold text-center">
            BNYU
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
                  <div
                    className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
                    {item.label}
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex-1"/>
      <div ref={buttonRef}
           onClick={handleClick}
           className={`relative flex items-center cursor-pointer gap-2 ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
        <div className="rounded-full bg-gray-900 w-12 h-12 p-1 flex justify-center items-center text-xl">
          {user && user.photoURL && <img src={user.photoURL} alt="avatar" className="rounded-full "/>}
          {!user && <MdPerson size={24}/>}
        </div>
        {!isCollapsed && (
          <div className='items-start'>
            <div className={'font-semibold text-start '}>{user?.displayName}</div>
            <div className={'text-start text-xs'}>{points ?? 0} Pts</div>
          </div>
        )}
        {showPopup &&
            <div
                className="absolute bg-gray-600 border border-gray-800 rounded-xl shadow-xl p-2 z-[1000] bottom-18 left-4"
                style={{
                  position: 'fixed',
                  minWidth: 200,
                }}
            >
                <div onClick={handleLogout}
                    className={'flex gap-4 cursor-pointer hover:border-white hover:bg-red-500 hover:text-white hover:font-bold hover:border-1 border-0 p-2 rounded-lg'}>
                    <MdLogout size={24}/> Logout
                </div>
            </div>
        }
      </div>
    </div>

  );
}; 