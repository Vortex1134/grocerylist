import { Navigate } from 'react-router-dom'
import { useUser } from '../../contexts/useUser'

const ProtectedRoute = ({ children }) => {
	const { isSignedIn, isLoading } = useUser()

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (!isSignedIn)
		return (
			<Navigate
				to='/signin'
				replace
			/>
		)

	return children
}

export default ProtectedRoute
