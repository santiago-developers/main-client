import { QueryFunction } from "@tanstack/react-query";
import { SantiagoGet } from "lib/fetchData";
import { IMagazine } from "types/magazines";

export const getContinentResult: QueryFunction<
	IMagazine[] | unknown,
	[_1: string, _2: string, continent: string],
	number
> = async ({ queryKey, pageParam }) => {
	const [_1, _2, continent] = queryKey;
	const query_type = "hot";
	const startPage = pageParam * 9;
	const endPage = (pageParam + 1) * 9;
	let continentSearch = continent;
	if (continent === "all") {
		continentSearch = "";
	}
	const result = await SantiagoGet(
		`magazines?${
			continentSearch ? `continent=${continentSearch}&` : ""
		}query_type=${query_type}&base=${startPage}&limit=${endPage}`,
	);
	return result;
};
