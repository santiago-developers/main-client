export const BaseURL = "http://3.34.114.67:11009/"

export async function SantiagoPost<T, R>(url: string, dto: T): Promise<R> {
	const res = await fetch(`${BaseURL}${url}`, {
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
	dto?: T,
): Promise<R> {
	const accessToken = localStorage.getItem("accessToken");
	if (!accessToken) {
		throw new Error("Access token is not available");
	}
	const res = await fetch(`${BaseURL}${url}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(dto),
	});
	if (!res.ok) {
		alert("Try Again");
		throw new Error(`Failed to fetch posts, received status ${res.status}`);
	}
	
	const data = await res.json();
	return data;
}

export async function SantiagoImagePost<R>(dto): Promise<R> {
	const url = "magazines/upload_image";
	const res = await fetch(`${BaseURL}${url}`, {
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
	const res = await fetch(`${BaseURL}${url}`, {
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

export async function SantiagoPutWithAutorization<T, R>(url: string, dto: T): Promise<R> {
	const accessToken = localStorage.getItem("accessToken");
	const res = await fetch(`${BaseURL}${url}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(dto),
	})
	if (!res.ok) {
		throw new Error(`Failed to fetch posts, received status ${res.status}`);
	}
	const data = await res.json();
	return data;
}

export async function SantiagoPostNoRes<T>(url: string, dto?: T) {
	const accessToken = localStorage.getItem("accessToken");
	try {
		const response = await fetch(`${BaseURL}${url}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(dto),
		});
		if (!response.ok){ 
			throw new Error(`Failed to fetch posts, received status ${response.statusText}`);
		}
	} catch (error) {
		alert("Try Again");
		throw error; 
	}
}
export async function SantiagoDeletetNoRes(url: string) {
	const accessToken = localStorage.getItem("accessToken");
	try {
		const response = await fetch(`${BaseURL}${url}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
		});
		if (!response.ok){ 
			throw new Error(`Failed to fetch posts, received status ${response.statusText}`);
		}

		const data = response.json();
		return data;
	} catch (error) {
		alert("Try Again");
		throw error; 
	}
}

export async function SantiagoGet<T>(url: string): Promise<T> {
	//const accessToken = localStorage.getItem("accessToken");
	const res = await fetch(`${BaseURL}${url}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			//Authorization: `Bearer ${accessToken}`,
		},
	});
	
	if (!res.ok) {
		throw new Error(`Failed to fetch posts, received status ${res.status}`);
	}
	const data = await res.json();
	return data;
}

export async function SantiagoGetWithAuthorization(url: string): Promise<T> {
	const accessToken = localStorage.getItem("accessToken");
	const res = await fetch(`${BaseURL}${url}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (!res.ok) {
		throw new Error(`Failed to fetch posts, received status ${res.status}`);
	}
	const data = await res.json();
	return data;
}

export async function SantiagoDelete<T>(url: string){
	const accessToken = localStorage.getItem("accessToken");

	if (!accessToken) {
		throw new Error("Access token is not available");
	}
	const res = await fetch(`${BaseURL}${url}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (!res.ok) {
		throw new Error(`Failed to fetch posts, received status ${res.status}`);
	}
}