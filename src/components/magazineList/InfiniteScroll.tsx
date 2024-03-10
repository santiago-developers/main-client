import React, { Fragment, useEffect } from "react";
import tw from "twin.macro";
import { IMagazine } from "types/magazines";
import Magazine from "./Magazine";
import { useInView } from "react-intersection-observer";

const InfiniteScroll = ({ data, fetchNextPage, hasNextPage, isFetching }) => {
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
						{group.data.map((item: IMagazine) => (
							<Magazine key={item.id} item={item} />
						))}
					</Fragment>
				))}
				<div ref={ref} style={{ height: 50 }} />
			</div>
		</>
	);
};

export default InfiniteScroll;
