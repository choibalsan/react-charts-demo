import {useEffect, useState} from 'react'
import {RouterProvider} from '@tanstack/react-router';
import {portfoliosRouter} from './routes';
import './App.css'

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
        <RouterProvider router={portfoliosRouter}/>
        <header className="p-4">
          <button
              onClick={() => setDarkMode(!darkMode)}
              className="mt-2 p-2 bg-gray-200 dark:bg-gray-700 rounded"
          >
            Toggle Dark theme
          </button>
        </header>
      </div>
  )
}

export default App
