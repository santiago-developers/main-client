import { QueryFunction } from "@tanstack/react-query";
import { SantiagoGet } from "lib/fetchData";
import { IMagazine } from "types/magazines";

export const getSearchResult: QueryFunction<
	IMagazine[] | unknown,
	[_1: string, _2: string, searchTerm: string],
	number
> = async ({ queryKey, pageParam }) => {
	const [_1, _2, searchTerm] = queryKey;
	const query_type = "hot";
	const startPage = pageParam * 9 + 1;
	const endPage = (pageParam + 1) * 9;
	const result = await SantiagoGet(
		`magazines?query_type=${query_type}&base=${startPage}&limit=${endPage}&search=${searchTerm}`,
	);
	return result;
};
