// Core
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Global Styles
import './App.scss'
import './styles/main.scss'

// Contexts
import { UserProvider } from './contexts/UserContext'

// Routes
import ProtectedRoute from './components/protectedroute'
import GuestRoute from './components/guestroute'

// Layout
import Layout from './components/layout'

// Pages
import Home from './pages/home'
import Register from './pages/register'
import Signin from './pages/signin'

// Routes
const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: '/',
				element: (
					<ProtectedRoute>
						<Home />
					</ProtectedRoute>
				),
			},
			{
				path: '/register',
				element: (
					<GuestRoute>
						<Register />
					</GuestRoute>
				),
			},
			{
				path: '/signin',
				element: (
					<GuestRoute>
						<Signin />
					</GuestRoute>
				),
			},
		],
	},
])

function App() {
	return (
		<UserProvider>
			<RouterProvider router={router} />
		</UserProvider>
	)
}

export default App
