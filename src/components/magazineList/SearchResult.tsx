import { useInfiniteQuery } from "@tanstack/react-query";
import { getSearchResult } from "lib/react_query/getSearchResult";
import magazineStore from "store/\bmagazineStore";

const SearchResult = () => {
	const { searchTerm } = magazineStore();
	const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
		queryKey: ["magazineList", "search", searchTerm],
		queryFn: getSearchResult,
		initialPageParam: 0,
		getNextPageParam: (lastPage, pages) => {
			return lastPage.data.length === 0 ? undefined : pages.length;
		},
		staleTime: 60 * 1000,
		gcTime: 300 * 1000,
	});
	return { data, fetchNextPage, hasNextPage, isFetching };
};

export default SearchResult;
