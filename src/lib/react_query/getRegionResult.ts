import { QueryFunction } from "@tanstack/react-query";
import { IMagazine } from "../../types/magazines";
import { SantiagoGet } from "lib/fetchData";

export const getRegionResult: QueryFunction<
	IMagazine[] | unknown,
	[_1: string, _2: string, regionIdParam: string, sorting: string],
	number
> = async ({ queryKey, pageParam }) => {
	const [_1, _2, regionIdParam, sorting] = queryKey;
	const startPage = pageParam * 9;
	const endPage = (pageParam + 1) * 9 - 1; 
	const result = await SantiagoGet(
		`magazines?${
			regionIdParam ? `region_id=${regionIdParam}&` : ""
		}query_type=${sorting}t&base=${startPage}&limit=${endPage}`,
	);
	return result;
};
