import { error } from "console";

export async function SantiagoPost(url: string) {
	const res = await fetch(`http://3.34.114.67:11009/${url}`);
	if (!res.ok) {
		throw new Error(`Failed to fetch posts, received status ${res.status}`);
	}
	const data = await res.json();
	return data;
}

export async function SantiagoGet(url: string) {
	try {
		const res = await fetch(`http://3.34.114.67:11009/${url}`);
		const data = await res.json();
		return data;
	} catch (err) {
		console.log({ url }, err);
	}
	// if (!res.ok) {
	// 	throw new Error(`Failed to fetch posts, received status ${res.status}`);
	// }
}
