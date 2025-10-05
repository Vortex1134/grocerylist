// Core
import React from 'react'
import { Link } from 'react-router-dom'

// Context
import { useUser } from '../../contexts/useUser'

// Images
import logo from '../../assets/logo.png'

// Styles
import './header.scss'

const Header = () => {
	const { isSignedIn, signOut } = useUser()

	return (
		<header>
			<div className='header-container'>
				<img
					src={logo}
					alt='Logo'
				/>
				<h1>Grocery List</h1>
				<ul className='main-navigation'>
					{isSignedIn ? (
						<>
							<li>
								<button onClick={signOut}>Sign Out</button>
							</li>
						</>
					) : (
						<>
							<li>
								<Link to='/register'>Register</Link>
							</li>
							<li>
								<Link to='/signin'>Sign In</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</header>
	)
}

export default Header
