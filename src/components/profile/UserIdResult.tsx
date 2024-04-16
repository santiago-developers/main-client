import {
	FetchNextPageOptions,
	InfiniteData,
	useInfiniteQuery,
} from "@tanstack/react-query";
import { getUserIdResult } from "lib/react_query/getUserIdResult";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import magazineStore from "store/magazineStore";

const UserIdResult = () => {
	const router = useRouter();
	const { userSearchTerm } = magazineStore();
	let user_id;
	if (router.isReady) {
		user_id = router.query.user_id as string;
	}

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

	// // interval을 담을 useRef 생성
	// const intervalRef = useRef<number | null>(null);

	// useEffect(() => {
	// 	// interval 시작
	// 	intervalRef.current = setInterval(() => {
	// 		// 가장 최근의 페이지를 다시 가져오기
	// 		if (data.pages.length > 0) {
	// 			if (!data?.pages[0]?.data[2]?.title) {
	// 				console.log("get");
	// 				fetchNextPage({
	// 					pageParam: data.pages[data.pages.length - 1].pageParam,
	// 				} as FetchNextPageOptions);
	// 				// data.pages[0].data[2].title = "대체";
	// 			} else {
	// 				// data.pages[0].data[2].title가 있는 경우 interval 멈춤
	// 				clearInterval(intervalRef.current!);
	// 			}
	// 		}
	// 	}, 5000);

	// 	// 컴포넌트가 언마운트될 때 clearInterval 호출하여 메모리 누수 방지
	// 	return () => clearInterval(intervalRef.current!);
	// }, [data, fetchNextPage]);

	return { data, fetchNextPage, hasNextPage, isFetching };
};

export default UserIdResult;
