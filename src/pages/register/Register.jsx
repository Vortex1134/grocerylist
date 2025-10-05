import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './register.scss'

// Commponents
import FormContainer from '../../components/formcontainer'

const Register = () => {
	// Navigation
	const navigate = useNavigate()

	// States
	const initialState = {
		name: '',
		email: '',
		password: '',
	}

	const initialPasswordValidationState = {
		hasLowerCase: false,
		hasUpperCase: false,
		hasNumber: false,
		hasSpecialChar: false,
		minLength: false,
	}

	const [formData, setFormData] = useState(initialState)
	const [passwordValidations, setPasswordValidations] = useState(
		initialPasswordValidationState,
	)
	const [message, setMessage] = useState({ text: '', type: '' })
	const [isSubmitting, setIsSubmitting] = useState(false)

	// Form functions
	const nameChange = (event) =>
		setFormData({ ...formData, name: event.target.value })

	const emailChange = (event) =>
		setFormData({ ...formData, email: event.target.value })

	const passwordChange = (event) => {
		const value = event.target.value

		setFormData({ ...formData, password: value })
		setPasswordValidations({
			hasLowerCase: /[a-z]/.test(value),
			hasUpperCase: /[A-Z]/.test(value),
			hasNumber: /\d/.test(value),
			hasSpecialChar: /[@$!%*?&]/.test(value),
			minLength: value.length >= 8,
		})
	}

	const onRegister = async () => {
		const { name, email, password } = formData

		if (!name || !email || !password) {
			setMessage({ text: 'Please fill out all fields.', type: 'error' })
			return
		}

		if (name.length < 2) {
			setMessage({ text: 'Please enter a valid name.', type: 'error' })
			return
		}

		const emailRegex = /^\S+@\S+\.\S+$/
		if (!emailRegex.test(email)) {
			setMessage({ text: 'Please enter a valid email.', type: 'error' })
			return
		}

		if (
			!passwordValidations.hasLowerCase ||
			!passwordValidations.hasUpperCase ||
			!passwordValidations.hasNumber ||
			!passwordValidations.hasSpecialChar ||
			!passwordValidations.minLength
		) {
			setMessage({
				text: 'Password does not meet requirements.',
				type: 'error',
			})
			return
		}

		setIsSubmitting(true)
		setMessage({
			text: 'Registration in progress, please wait...',
			type: 'info',
		})

		try {
			const res = await fetch('http://localhost:3000/api/register', {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
					password: formData.password,
				}),
			})

			const user = await res.json()

			if (user.id) {
				navigate('/signin', {
					state: { message: 'Successfully registered.' },
				})
			} else {
				setMessage({
					text: user.error,
					type: 'error',
				})
			}
		} catch (err) {
			setMessage({
				text: 'Network error, try again later.',
				type: 'error',
			})
			console.error(err)
		} finally {
			setIsSubmitting(false)
		}
	}

	const onSignIn = () => {
		navigate('/signin')
	}

	// Components
	const components = [
		{
			element: 'input',
			type: 'text',
			name: 'name',
			placeholder: 'Enter your name',
			label: 'Name',
			id: 'name',
			onChange: nameChange,
		},
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
			placeholder: 'Enter your password',
			label: 'Password',
			id: 'password',
			onChange: passwordChange,
			passwordValidations: passwordValidations,
		},
		{
			element: 'button',
			label: 'Register',
			class: 'btn-primary',
			onClick: onRegister,
			disabled: isSubmitting,
		},
		{
			element: 'button',
			label: 'Sign In',
			class: 'btn-secondary',
			onClick: onSignIn,
			disabled: isSubmitting,
		},
	]

	return (
		<div className='register-container'>
			{message.text && (
				<p className={`message ${message.type}`}>{message.text}</p>
			)}
			<FormContainer
				title={'Register'}
				components={components}
			/>
		</div>
	)
}

export default Register
