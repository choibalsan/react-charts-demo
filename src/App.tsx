import {useEffect, useState} from 'react'
import './App.css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
        <header className="p-4">
          <button
              onClick={() => setDarkMode(!darkMode)}
              className="mt-2 p-2 bg-gray-200 dark:bg-gray-700 rounded"
          >
            Toggle Dark theme
          </button>
        </header>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo"/>
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo"/>
          </a>
        </div>
      </div>
  )
}

export default App
