import React from 'react'
import './formcontainer.scss'

const FormContainer = ({ title, components }) => {
	const passwordValidationLabels = {
		hasLowerCase: 'At least 1 lowercase letter',
		hasUpperCase: 'At least 1 uppercase letter',
		hasNumber: 'At least 1 number',
		hasSpecialChar: 'At least 1 special character !@$%&*?',
		minLength: 'At least 8 characters',
	}

	const renderComponent = (component) => {
		switch (component.element) {
			case 'input':
				return (
					<>
						<label htmlFor={component.id}>{component.label}</label>
						<input
							type={component.type}
							name={component.name}
							id={component.id}
							placeholder={component.placeholder}
							onChange={component.onChange}
						/>
						{component.type === 'password' &&
							component.passwordValidations && (
								<ul className='password-feedback'>
									{Object.entries(
										component.passwordValidations,
									).map(([key, isValid]) => {
										return (
											<li
												key={key}
												className={
													isValid
														? 'valid'
														: 'invalid'
												}>
												{passwordValidationLabels[key]}
											</li>
										)
									})}
								</ul>
							)}
					</>
				)
			case 'button':
				return (
					<button
						className={component.class}
						onClick={component.onClick}
						disabled={component.disabled}>
						{component.label}
					</button>
				)
			default:
				return null
		}
	}

	return (
		<div className='formcontainer-container'>
			<h2>{title}</h2>
			{components.map((component, index) => {
				return (
					<div
						className='row'
						key={index}>
						{renderComponent(component)}
					</div>
				)
			})}
		</div>
	)
}

export default FormContainer
