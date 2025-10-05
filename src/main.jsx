import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Basic React App Setup
createRoot(document.getElementById('root')).render(
	<StrictMode>
		<App />
	</StrictMode>,
)
