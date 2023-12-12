export const wait = () => {
	return new Promise(resolve => setTimeout(resolve, 1000));
}

export type PayloadError = {
	response: {
		config: object;
		data: {
			message: string;
			statusCode: number;
		}
		headers: object;
		request: object;
		status: number;
		statusText: string;
	},
	message: string;
}