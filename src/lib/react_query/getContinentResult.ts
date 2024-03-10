import { QueryFunction } from "@tanstack/react-query";
import { SantiagoGet } from "lib/fetchData";
import { IMagazine } from "types/magazines";

export const getContinentResult: QueryFunction<
	IMagazine[] | unknown,
	[_1: string, _2: string, continent: string, sorting: string],
	number
> = async ({ queryKey, pageParam }) => {
	const [_1, _2, continent, sorting] = queryKey;
	const startPage = pageParam * 9;
	const endPage = (pageParam + 1) * 9 - 1; 
	let continentSearch = continent;
	if (continent === "all") {
		continentSearch = "";
	}
	const result = await SantiagoGet(
		`magazines?${
			continentSearch ? `continent=${continentSearch}&` : ""
		}query_type=${sorting}&base=${startPage}&limit=${endPage}`,
	);
	return result;
};
