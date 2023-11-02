import { error } from "console";

export async function SantiagoPost<T, R>(url: string, dto: T): Promise<R> {
	const res = await fetch(`http://localhost:11009/${url}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(dto),
	});
	console.log(res.status);
	if (!res.ok) {
		throw new Error(`Failed to fetch posts, received status ${res.status}`);
	}
	const data = await res.json();
	return data;
}

export async function SantiagoGet<T>(url: string): Promise<T> {
	try {
		const res = await fetch(`http://3.34.114.67:11009/${url}`);
		const data = await res.json();
		return data;
	} catch (err) {
		console.log({ url }, err);
		throw new Error();
	}
	// if (!res.ok) {
	// 	throw new Error(`Failed to fetch posts, received status ${res.status}`);
	// }
}
