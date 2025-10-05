export const postRequest = async (endpoint, email, body = {}) => {
	const res = await fetch(`http://localhost:3000/api/${endpoint}`, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			...body,
			email,
		}),
	})
	return await res.json()
}
