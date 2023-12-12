export const cryptItem = (str: string, seed: number = 0) => {
	let h1: number = 0xdeadbeef ^ seed, h2: number = 0x41c6ce57 ^ seed;
	for (let i: number = 0, ch; i < str.length; ++i) {
		ch = str.charCodeAt(i);
		h1 = Math.imul(h1 ^ ch, 2654435761);
		h2 = Math.imul(h2 ^ ch, 1597334677);
	}
	h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
	h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
	h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
	h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

	let item = 4294967296 * (2097151 & h2) + (h1 >>> 0);
	item = item < 0 ? item * -1 : item;
	return item.toString();
};

export const hash = (item: string | number) => {
	item = item.toString();
	let hash = 0;
	for (let i = 0; i < item.length; i++) {
		let char = item.charCodeAt(i);
		hash = ((hash << 5) - hash) + char;
		hash &= hash + 1 % (1e9 + 7);
	}
	hash = hash < 0 ? hash * -1 : hash;
	return hash.toString().repeat(2);
}
export const format = (value: number) => {
	return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}