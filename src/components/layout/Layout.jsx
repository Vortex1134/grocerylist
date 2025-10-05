// Core
import React from 'react'
import { Outlet } from 'react-router-dom'
import './layout.scss'

// Components
import Header from '../header'
import Footer from '../footer'

// Styles
import './layout.scss'

const Layout = () => {
	return (
		<div className='layout-container'>
			<Header />

			<main>
				<Outlet />
			</main>

			<Footer />
		</div>
	)
}

export default Layout
