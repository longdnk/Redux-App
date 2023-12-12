export type CategoryState = {
	list: {
		data: Category[];
		loading: boolean;
	}
}

export type Category = {
	id: number;
	name: string;
	image: string;
	creationAt: string;
	updatedAt: string;
}