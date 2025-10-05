import { Navigate } from 'react-router-dom'
import { useUser } from '../../contexts/useUser'

const GuestRoute = ({ children }) => {
	const { isSignedIn, isLoading } = useUser()

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (isSignedIn)
		return (
			<Navigate
				to='/'
				replace
			/>
		)

	return children
}

export default GuestRoute
