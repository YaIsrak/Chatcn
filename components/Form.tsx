'use client';
import { Massage, gptMessage } from '@/type.typings';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { toast } from './ui/use-toast';

export default function ChatGPT() {
	const [massage, setMassage] = useState<Massage>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		toast({
			title: 'Loading...',
		});
		setLoading(true);

		await fetch('api/createChat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				values,
			}),
		})
			.then((response) => response.json())
			.then((data: gptMessage) => {
				setMassage(data.choices[0]);
				toast({
					title: 'Generated!',
				});
				setLoading(false);
			})
			.catch((error) => {
				setError(error);
				setLoading(false);
				toast({
					title: 'There is an error',
					variant: 'destructive',
				});
			});
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
					<FormField
						control={form.control}
						name='prompt'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input placeholder='Enter Prompt Here...' {...field} className='' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit'>Submit</Button>
				</form>
			</Form>

			{/* Response */}
			<div className='py-12'>
				{loading && <h3>Loading...</h3>}

				{massage && !error && !loading && (
					<div>
						<h3>
							AI
							<span className='text-foreground/50 text-sm italic'>
								({massage.message.role})
							</span>
							:{' '}
						</h3>
						<div className='space-y-2 mt-4 bg-foreground/10 p-5 rounded-xl'>
							{massage.message.content.split('\n').map((item, i) => (
								<p key={i}>{item}</p>
							))}
						</div>
					</div>
				)}

				{/* Error Bounding */}
				{error && (
					<div className='text-red-500'>
						<h3>There is an error</h3>
						<p>Check console</p>
						<p>
							Right click {'->'} Inspect {'->'} Console
						</p>
					</div>
				)}
			</div>
		</>
	);
}

const formSchema = z.object({
	prompt: z.string().min(2, {
		message: 'Prompt must be at least 2 characters.',
	}),
});
