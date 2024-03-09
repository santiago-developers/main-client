import { QueryFunction } from "@tanstack/react-query";
import { SantiagoGet } from "lib/fetchData";
import { IMagazine } from "types/magazines";

export const getUserIdResult: QueryFunction<
	IMagazine[] | unknown,
	[_1: string, user_id: string, userSearchTerm: string],
	number
> = async ({ queryKey, pageParam }) => {
	const [_1, user_id, userSearchTerm] = queryKey;
	const sorting = "recent";
	const startPage = pageParam * 9;
	const endPage = (pageParam + 1) * 9 - 1;
	const result = await SantiagoGet(
		`magazines?query_type=${sorting}&base=${startPage}&limit=${endPage}${
			userSearchTerm ? `&search=${userSearchTerm}` : ""
		}&user_id=${user_id}`,
	);
	return result;
};
