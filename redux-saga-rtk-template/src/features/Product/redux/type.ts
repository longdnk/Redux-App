export type ProductState = {
	list: {
		data: Product[];
		loading: boolean;
	},
	add: {
		error: string | null;
		pending: boolean;
	},
	detail: {
		data: Partial<Product>;
		loading: boolean;
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

export type Product = {
	id: number;
	title: string;
	price: number;
	description: string;
	images: string[];
	creationAt: string;
	updatedAt: string;
	category: {
		id: string;
		name: string;
		images: string;
		creationAt: string;
		updatedAt: string;
	}
}

export type ProductFetchPayload = {
	price_min?: number;
	price_max?: number;
	categoryId?: number;
}

export type ProductFetch = {
	payload: ProductFetchPayload;
	type: string;
}

export type ProductAddPayload = {
	data: Omit<Product, 'id'>;
	callback: () => void;
}

export type ProductAdd = {
	payload: ProductAddPayload;
	type: string;
}

export type DetailProduct = {
	payload: string | number;
	type: string;
}

export type ProductEditPayload = {
	id: string | number;
	data: Omit<Product, 'id'>;
	callback: () => void;
}

export type ProductEdit = {
	payload: ProductEditPayload;
	type: string;
}

export type ProductDeletePayload = {
	id: string | number;
	callback: () => void;
}

export type ProductDelete = {
	payload: ProductDeletePayload;
	type: string;
}