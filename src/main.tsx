import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    // turned off strict while there's problem with canvas
    // <StrictMode>
    <App/>
    // </StrictMode>
)
