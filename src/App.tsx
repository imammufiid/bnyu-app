import './App.css'
import {Layout} from './components/Layout';
import {useEffect} from "react";
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom'
import LoginPage from "./pages/auth/LoginPage.tsx";
import {useUserSession} from "./hooks/useUserSession.ts";


function App() {
  const {user} = useUserSession()

  const handleNotify = () => {
    if (Notification.permission === 'granted') {
      console.log('Notification permission granted')
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Permission Granted', {
            body: 'You will now receive notifications.',
          });
        }
      });
    }
  };

  useEffect(() => {
    handleNotify()
  }, [])

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/home" replace/>
            ) : (
              <Navigate to="/login" replace/>
            )
          }
        />
        <Route path="/login" element={<LoginPage/>}/>
        <Route
          path="/home"
          element={
            <Layout>
            </Layout>
          }
        />
      </Routes>
    </HashRouter>
  )
}

export default App
