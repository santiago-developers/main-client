import React, { Fragment, useEffect, useState } from "react";
import tw from "twin.macro";
import { MagazineProps } from "types/magazines";
import writeStore from "store/writeStore";
import Magazine from "./Magazine";
import { useInfiniteQuery } from "@tanstack/react-query";
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
		initialPageParam: 0,
		getNextPageParam: (lastPage, pages) => {
			return lastPage.data.length === 0 ? undefined : pages.length;
		},
		staleTime: 60 * 1000,
		gcTime: 300 * 1000,
	});
	const { ref, inView } = useInView({
		threshold: 0.9,
		delay: 0,
	});

	useEffect(() => {
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
