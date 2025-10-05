import React, { useState, useEffect } from 'react'
import { useUser } from '../../contexts/useUser'
import './home.scss'

// Api
import { postRequest } from '../../utils/api'

const Home = () => {
	// states
	const [itemToAdd, setItemToAdd] = useState('')
	const [groceryItems, setGroceryItems] = useState([])

	const { user } = useUser()

	useEffect(() => {
		if (!user?.email) return

		const loadItems = async () => {
			try {
				const items = await postRequest('items', user.email)
				setGroceryItems(items)
			} catch (err) {
				console.error('Failed to fetch items: ', err)
			}
		}

		loadItems()
	}, [user])

	// Functions
	const changeItemToAdd = (e) => {
		setItemToAdd(e.target.value)
	}

	const listenForEnter = async (e) => {
		if (e.key !== 'Enter' || itemToAdd.trim() === '') return

		try {
			const result = await postRequest('additem', user.email, {
				name: itemToAdd,
			})
			if (result.name) {
				setGroceryItems((prev) => [...prev, result])
				setItemToAdd('')
			}
		} catch (err) {
			console.error('Failed to add item: ', err)
		}
	}

	const moveItemToCart = async (name) => {
		try {
			const list = await postRequest('moveitemtocart', user.email, {
				name,
			})
			setGroceryItems(list)
		} catch (err) {
			console.error('Failed to move item to cart: ', err)
		}
	}

	const moveItemToList = async (name) => {
		try {
			const list = await postRequest('moveitemtolist', user.email, {
				name,
			})
			setGroceryItems(list)
		} catch (err) {
			console.error('Failed to move item back to list: ', err)
		}
	}

	const removeAllCrossedOffItems = async () => {
		if (!confirm('Are you sure you want to remove all crossed off items?'))
			return

		try {
			const items = await postRequest(
				'removeallcrossedoffitems',
				user.email,
			)
			setGroceryItems(items)
		} catch (err) {
			console.error('Failed to remove crossed off items: ', err)
		}
	}

	return (
		<div className='home-container'>
			<input
				className='add-item'
				type='text'
				placeholder='Click here to add an item...'
				onChange={changeItemToAdd}
				onKeyDown={listenForEnter}
				value={itemToAdd}
			/>
			<ul className='grocery-list'>
				{groceryItems
					.filter((item) => !item.inCart)
					.map((item, index) => (
						<li
							className='grocery-list-item'
							key={index}
							onClick={() => moveItemToCart(item.name)}>
							{item.name}
						</li>
					))}
			</ul>
			{groceryItems.some((item) => item.inCart) && (
				<>
					<h2 className='cart-title'>Crossed Off</h2>
					<ul className='grocery-list'>
						{groceryItems
							.filter((item) => item.inCart)
							.map((item, index) => (
								<li
									className='grocery-list-item deleted'
									key={index}
									onClick={() => moveItemToList(item.name)}>
									<span>{item.name}</span>
								</li>
							))}
					</ul>
					<button
						className='button-text-only'
						onClick={removeAllCrossedOffItems}>
						Delete All Crossed Off Items
					</button>
				</>
			)}
		</div>
	)
}

export default Home
