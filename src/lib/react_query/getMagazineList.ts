import { QueryFunction } from "@tanstack/react-query";
import { IMagazine } from "./../../types/magazines.d";
import { SantiagoGet } from "lib/fetchData";

export const getMagazineList: QueryFunction<
	IMagazine[] | unknown,
	[_1: string, _2: string, regionIdParam: string],
	number
> = async ({ queryKey, pageParam }) => {
	const [_1, _2, regionIdParam] = queryKey;
	const query_type = "hot";
	const startPage = pageParam * 9 + 1;
	const endPage = (pageParam + 1) * 9;
	const result = await SantiagoGet(
		`magazines?${
			regionIdParam
				? `region_id=${regionIdParam}&`
				: ""
		}query_type=${query_type}t&base=${startPage}&limit=${endPage}`,
	);
	return result;
};
