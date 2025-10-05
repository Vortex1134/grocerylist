import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUser } from '../../contexts/useUser'
import FormContainer from '../../components/formcontainer'
import './signin.scss'

const Signin = () => {
	// Navigation
	const navigate = useNavigate()
	const location = useLocation()

	// States
	const initialState = {
		email: '',
		password: '',
	}
	const messageFromState = location.state?.message

	const [formData, setFormData] = useState(initialState)
	const [message, setMessage] = useState({
		text: messageFromState || '',
		type: messageFromState ? 'success' : '',
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const { signIn } = useUser()

	// Form functions
	const emailChange = (event) => {
		setFormData({ ...formData, email: event.target.value })
	}

	const passwordChange = (event) => {
		setFormData({ ...formData, password: event.target.value })
	}

	const onRegister = () => {
		navigate('/register')
	}

	const onSignin = async () => {
		setIsSubmitting(true)
		setMessage({ text: 'Signing in. Please wait...', type: 'info' })

		try {
			const res = await fetch('http://localhost:3000/api/signin', {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: formData.email,
					password: formData.password,
				}),
			})

			const user = await res.json()

			if (user.id) {
				signIn(user)
				navigate('/')
			} else {
				setMessage({ text: user.error, type: 'error' })
			}
		} catch (err) {
			setMessage({
				text: 'Network error. Try again later.',
				type: 'error',
			})
			console.error(err)
		} finally {
			setIsSubmitting(false)
		}
	}

	// Form Components
	const components = [
		{
			element: 'input',
			type: 'email',
			name: 'email',
			placeholder: 'Enter your email',
			label: 'Email',
			id: 'email',
			onChange: emailChange,
		},
		{
			element: 'input',
			type: 'password',
			name: 'password',
			id: 'password',
			placeholder: 'Enter your password',
			label: 'Password',
			onChange: passwordChange,
		},
		{
			element: 'button',
			label: 'Sign In',
			class: 'btn-primary',
			onClick: onSignin,
			disabled: isSubmitting,
		},
		{
			element: 'button',
			label: 'Register',
			class: 'btn-secondary',
			onClick: onRegister,
			disabled: isSubmitting,
		},
	]

	return (
		<div className='signin-container'>
			{message.text && (
				<p className={`message ${message.type}`}>{message.text}</p>
			)}
			<FormContainer
				title={'Sign In'}
				components={components}
			/>
		</div>
	)
}

export default Signin
