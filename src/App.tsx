import {RouterProvider} from '@tanstack/react-router';
import {portfoliosRouter} from './routes';
import './App.css'

function App() {
  return (
      <div className={`min-h-screen bg-secondary-100 text-primary-500`}>
        <RouterProvider router={portfoliosRouter}/>
      </div>
  )
}

export default App
