import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {TimerProvider} from "./states/providers/TimerProvider.tsx";
import {TimerRunningProvider} from "./states/providers/TimerRunningProvider.tsx";
import {UserAccountProvider} from "./states/providers/UserAccountProvider.tsx";

// TODO
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserAccountProvider>
      <TimerProvider>
        <TimerRunningProvider>
          <App/>
        </TimerRunningProvider>
      </TimerProvider>
    </UserAccountProvider>
  </React.StrictMode>,
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
