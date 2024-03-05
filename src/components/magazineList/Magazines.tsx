import React, { Fragment, useEffect, useState } from "react";
import tw from "twin.macro";
import { MagazineProps } from "types/magazines";
import writeStore from "store/writeStore";
import Magazine from "./Magazine";
import {
	InfiniteData,
	QueryClient,
	dehydrate,
	useInfiniteQuery,
	useQuery,
} from "@tanstack/react-query";
import { getMagazineList } from "lib/react_query/getMagazineList";
import { useInView } from "react-intersection-observer";

type MagazinesProps = {
	selectedType: string;
	regionId?: string;
	searchTerm?: string;
	user_id?: string;
	continent?: string;
	regionIdFromMain?: string | string[];
	setSearchTerm(searchTerm: string): void;
	setContinent(continent: string): void;
};

const Magazines = ({
	selectedType,
	regionIdFromMain,
	searchTerm,
	setSearchTerm,
	user_id,
	continent,
	setContinent,
}: MagazinesProps) => {
	const { regionId, setRegionId } = writeStore();
	const [magazines, setMagazines] = useState<MagazineProps[]>([]);

	const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
		queryKey: ["magazineList", "magazines"],
		queryFn: getMagazineList,
		initialPageParam: 0, // [[1,2,3,4,5],[6,7,8,9,10]] 2차원배열로 들어옴
		//  백엔드에 마지막 글인경우, nextCursor가 -1로 나오도록 하기
		getNextPageParam: (lastPage, pages) => {
			return lastPage.data.length === 0 ? undefined : pages.length;
		},
		staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
		gcTime: 300 * 1000,
	});
	const { ref, inView } = useInView({
		threshold: 0.9,
		delay: 0,
	});

	useEffect(() => {
		// 화면에 밑에 ref부분이 보이면
		if (inView) {
			!isFetching && hasNextPage && fetchNextPage();
		}
	}, [inView, isFetching, hasNextPage, fetchNextPage]);

	return (
		<>
			<div tw="self-start w-full grid grid-cols-3 gap-10 pr-8">
				{data?.pages.map((group, i) => (
					<Fragment key={i}>
						{group.data.map((item: MagazineProps) => (
							<Magazine key={item.id} item={item} />
						))}
					</Fragment>
				))}
				<div ref={ref} style={{ height: 50 }} />
			</div>
		</>
	);
};

export default Magazines;

// export async function getServerSideProps() {
// 	const queryClient = new QueryClient();
// 	await queryClient.prefetchQuery({
// 		queryKey: ["magazineList", "magazines"],
// 		queryFn: getMagazineList,
// 	});

// 	return {
// 		props: {
// 			dehydratedState: dehydrate(queryClient),
// 		},
// 	};
// }
