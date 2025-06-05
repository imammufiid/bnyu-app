import './App.css'
import { Layout } from './components/Layout';
import {useEffect} from "react";

function App() {
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
    <Layout>
    </Layout>
  )
}

export default App
