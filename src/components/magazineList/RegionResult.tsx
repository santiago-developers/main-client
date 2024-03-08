import { useInfiniteQuery } from "@tanstack/react-query";
import { getMagazineList } from "lib/react_query/getMagazineList";
import { useRouter } from "next/router";
import writeStore from "store/writeStore";

const RegionResult = () => {
	const { regionId } = writeStore();
	const router = useRouter();
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
		queryKey: ["magazineList", "regionId", regionIdParam],
		queryFn: getMagazineList,
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
