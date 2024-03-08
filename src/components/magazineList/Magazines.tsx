import React, { Fragment, useEffect, useState } from "react";
import tw from "twin.macro";
import { MagazineProps } from "types/magazines";
import writeStore from "store/writeStore";
import Magazine from "./Magazine";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getMagazineList } from "lib/react_query/getMagazineList";
import { useInView } from "react-intersection-observer";
import RegionResult from "./RegionResult";
import SearchResult from "./SearchResult";

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
// selectedType,
// 	regionIdFromMain,
// 	searchTerm,
// 	setSearchTerm,
// 	user_id,
// 	continent,
// 	setContinent,
// type Props={
// 	data:, fetchNextPage, hasNextPage, isFetching
// }
const Magazines = ({ data, fetchNextPage, hasNextPage, isFetching }) => {
	// const submit = ["region", "searchTerm", "continent", "userId"];
	const [result, setResult] = useState();
	const submit = "region";
	// if (submit === "region") {
	// 	const data = RegionResult();
	// 	setResult(data);
	// } else if (submit === "searchTerm") SearchResult(searchTerm);

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
