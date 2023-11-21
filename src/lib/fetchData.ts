export async function SantiagoPost<T, R>(url: string, dto: T): Promise<R> {
	const res = await fetch(`http://3.34.114.67:11009/${url}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(dto),
	});
	if (!res.ok) {
		throw new Error(`Failed to fetch posts, received status ${res.status}`);
	}
	const data = await res.json();
	return data;
}
export async function SantiagoPostWithAutorization<T, R>(
	url: string,
	dto: T,
): Promise<R> {
	const accessToken = localStorage.getItem("accessToken");
	console.log(accessToken);
	
	if (!accessToken) {
		throw new Error("Access token is not available");
	}
	const res = await fetch(`http://3.34.114.67:11009/${url}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(dto),
	});
	if (!res.ok) {
		alert("다시 작성해주세요.");
		throw new Error(`Failed to fetch posts, received status ${res.status}`);
	}
	const data = await res.json();
	return data;
}

export async function SantiagoImagePost<T, R>(dto): Promise<R> {
	const url = "magazines/upload_image";
	const res = await fetch(`http://3.34.114.67:11009/${url}`, {
		method: "POST",
		body: dto,
	});
	if (!res.ok) {
		throw new Error(`Failed to fetch posts, received status ${res.status}`);
	}
	const data = await res.json();
	return data;
}

export async function SantiagoPut<T, R>(url: string, dto: T): Promise<R> {
	const res = await fetch(`http://3.34.114.67:11009/${url}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(dto),
	});

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
}

// export async function SantiagoPost2<T>(url: string, dto): Promise<T> {
// 	try {
// 		const res = await fetch(`http://3.34.114.67:11009/${url}`,d);
// 		const data = await res.json();
// 		return data;
// 	} catch (err) {
// 		console.log({ url }, err);
// 		throw new Error();
// 	}
// }
// export async function SantiagoPost2<T, R>(url: string, dto: T): Promise<R> {
// 	const res = await fetch(`http://3.34.114.67:11009/${url}`, {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: dto,
// 	});
// 	if (!res.ok) {
// 		throw new Error(`Failed to fetch posts, received status ${res.status}`);
// 	}
// 	const data = await res.json();
// 	return data;
// }
