export type CategoryState = {
	list: {
		data: Category[];
		loading: boolean;
	},
	detail: {
		data: Partial<Category>;
		loading: boolean;
	},
	add: {
		error: string | null;
		pending: boolean;
	},
	edit: {
		error: string | null;
		pending: boolean;
	},
	delete: {
		error: string | null;
		pending: boolean;
	}
}

export type Category = {
	id: number;
	name: string;
	image: string;
	creationAt: string;
	updatedAt: string;
}

export type CategoryAddPayload = {
	data: Omit<Category, 'id'>;
	callback: () => void;
}

export type CategoryAdd = {
	payload: CategoryAddPayload;
	type: string;
}

export type DetailCategory = {
	payload: string | number;
	type: string;
}

export type CategoryEditPayload = {
	id: string | number;
	data: Omit<Category, 'id'>;
	callback: () => void;
}

export type CategoryEdit = {
	payload: CategoryEditPayload;
	type: string;
}

export type CategoryDeletePayload = {
	id: string | number;
	callback: () => void;
}

export type CategoryDelete = {
	payload: CategoryDeletePayload;
	type: string;
}