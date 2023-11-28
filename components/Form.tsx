'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function Form() {
	const [msg, setMsg] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const onSubmit = async (e: any) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const prompt = formData.get('prompt');
		setLoading(true);

		await fetch('api/createChat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				prompt,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				setMsg(data);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				error && setError(true);
			});
	};

	return (
		<>
			<form className='flex gap-2' onSubmit={onSubmit}>
				<Input name='prompt' placeholder='Enter Prompt Here' type='text' />
				<Button type='submit' disabled={loading}>
					Generate
				</Button>
			</form>

			<div className='py-12'>
				{msg && !error && !loading && (
					<>
						<h5>AI:</h5>
						<h3>{msg}</h3>
					</>
				)}
				{loading && <h3>Loading...</h3>}
				{error && <h3>There is an error</h3>}
			</div>
		</>
	);
}
