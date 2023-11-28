export interface gptMessage {
	id: string;
	model: string;
	object: string;
	created: number;
	usage: {
		completion_token: number;
		prompt_tokens: number;
		total_tokens: number;
	};
	choices: Massage[];
}

export interface Massage {
	finish_reason: string;
	index: number;
	message: {
		content: string;
		role: string;
	};
}
