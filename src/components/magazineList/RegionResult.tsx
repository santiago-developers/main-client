import { useInfiniteQuery } from "@tanstack/react-query";
import { getRegionResult } from "lib/react_query/getRegionResult";
import { useRouter } from "next/router";
import magazineStore from "store/magazineStore";
import writeStore from "store/writeStore";

const RegionResult = () => {
	const router = useRouter();
	const { regionId } = writeStore();
	const { sorting } = magazineStore() || { sorting: "hot" };
	const regionIdFromMain = router.query.region_id as string;
	let regionIdParam = "";
	if (regionId) {
		regionIdParam = regionId;
	} else {
		if (regionIdFromMain) {
			regionIdParam = regionIdFromMain;
		} else {
			regionIdParam = "";
		}
	}

	const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
		queryKey: ["magazineList", "regionId", regionIdParam, sorting],
		queryFn: getRegionResult,
		initialPageParam: 0,
		getNextPageParam: (lastPage, pages) => {
			return lastPage.data.length === 0 ? undefined : pages.length;
		},
		staleTime: 60 * 1000,
		gcTime: 300 * 1000,
	});
	return { data, fetchNextPage, hasNextPage, isFetching };
};
export default RegionResult;
