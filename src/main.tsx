import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {TimerProvider} from "./states/providers/TimerProvider.tsx";
import {TimerRunningProvider} from "./states/providers/TimerRunningProvider.tsx";
import { createContext } from 'react';

export const ThemeContext = createContext({
  theme: 'light',
  setTheme: (_theme: 'light' | 'dark') => {},
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <TimerProvider>
        <TimerRunningProvider>
          <App/>
        </TimerRunningProvider>
      </TimerProvider>
  </React.StrictMode>,
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
