import { useInfiniteQuery } from "@tanstack/react-query";
import { getContinentResult } from "lib/react_query/getContinentResult";
import { useRouter } from "next/router";
import magazineStore from "store/magazineStore";

const ContinentResult = () => {
	const router = useRouter();
	const continent = router.query.continent as string;
	const { sorting } = magazineStore();

	const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
		queryKey: ["magazineList", "continent", continent, sorting],
		queryFn: getContinentResult,
		initialPageParam: 0,
		getNextPageParam: (lastPage, pages) => {
			return lastPage.data.length === 0 ? undefined : pages.length;
		},
		staleTime: 60 * 1000,
		gcTime: 300 * 1000,
	});
	return { data, fetchNextPage, hasNextPage, isFetching };
};
export default ContinentResult;
