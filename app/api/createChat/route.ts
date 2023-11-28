import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
	const openai = new OpenAI({
		apiKey: process.env.OPENAI_API_KEY,
	});
	const body = await req.json();

	const response = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'user',
				content: body.values.prompt,
			},
		],
	});

	return NextResponse.json(response);
}
