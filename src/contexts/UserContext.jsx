import { createContext, useEffect, useState } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true)
	const [isSignedIn, setIsSignedIn] = useState(false)
	const [user, setUser] = useState(null)

	useEffect(() => {
		try {
			const storedUser = localStorage.getItem('user')
			if (storedUser) {
				setIsSignedIn(true)
				setUser(JSON.parse(storedUser))
			}
		} catch (err) {
			console.error('Failed to parse stored user: ', err)
		}

		setIsLoading(false)
	}, [])

	const signIn = (userData) => {
		setUser(userData)
		setIsSignedIn(true)
		localStorage.setItem('user', JSON.stringify(userData))
	}

	const signOut = () => {
		setIsSignedIn(false)
		setUser(null)
		localStorage.removeItem('user')
	}

	return (
		<UserContext.Provider
			value={{
				isLoading,
				isSignedIn,
				user,
				signIn,
				signOut,
			}}>
			{children}
		</UserContext.Provider>
	)
}

export default UserContext
