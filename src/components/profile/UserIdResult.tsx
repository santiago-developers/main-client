import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserIdResult } from "lib/react_query/getUserIdResult";
import { useRouter } from "next/router";
import magazineStore from "store/magazineStore";

const UserIdResult = () => {
	const router = useRouter();
	const { userSearchTerm } = magazineStore();

	const user_id = router.query.user_id as string;


	const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
		queryKey: ["profile", user_id, userSearchTerm],
		queryFn: getUserIdResult,
		initialPageParam: 0,
		getNextPageParam: (lastPage, pages) => {
			return lastPage.data.length === 0 ? undefined : pages.length;
		},
		staleTime: 60 * 1000,
		gcTime: 300 * 1000,
	});

	return { data, fetchNextPage, hasNextPage, isFetching };
};

export default UserIdResult;
