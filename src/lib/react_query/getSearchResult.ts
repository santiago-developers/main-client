import { QueryFunction } from "@tanstack/react-query";
import { SantiagoGet } from "lib/fetchData";
import { IMagazine } from "types/magazines";

export const getSearchResult: QueryFunction<
	IMagazine[] | unknown,
	[_1: string, _2: string, searchTerm: string, sorting: string],
	number
> = async ({ queryKey, pageParam }) => {
	const [_1, _2, searchTerm, sorting] = queryKey;
	const startPage = pageParam * 9;
	const endPage = (pageParam + 1) * 9 - 1;
	const result = await SantiagoGet(
		`magazines?query_type=${sorting}&base=${startPage}&limit=${endPage}&search=${searchTerm}`,
	);
	return result;
};
