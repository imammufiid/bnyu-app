import './App.css'
import {Layout} from './components/Layout';
import {useEffect} from "react";
import {HashRouter, Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from "./pages/auth/LoginPage.tsx";


function App() {
  const isAuthenticated = false

  const handleNotify = () => {
    if (Notification.permission === 'granted') {
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
        {/* Redirect root path based on auth */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace/>
            ) : (
              <Navigate to="/login" replace/>
            )
          }
        />

        {/* Public routes */}
        <Route path="/login" element={<LoginPage/>}/>

        {/* Protected routes (only if authenticated) */}
        {isAuthenticated && (
          <>
            <Route
              path="/home"
              element={
                <Layout>
                </Layout>
              }
            />
          </>
        )}
      </Routes>
    </HashRouter>
    // <Layout>
    // </Layout>
  )
}

export default App
