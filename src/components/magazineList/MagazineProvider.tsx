import React, { useEffect } from "react";
import InfiniteScroll from "./InfiniteScroll";
import RegionResult from "./RegionResult";
import SearchResult from "./SearchResult";
import magazineStore from "store/\bmagazineStore";
import ContinentResult from "./ContinentResult";

const MagazineProvider = () => {
	const { submitType } = magazineStore();
	let result = {};
	if (submitType === "region") {
		result = RegionResult();
	} else if (submitType === "searchTerm") {
		result = SearchResult();
	} else if (submitType === "continent") {
		result = ContinentResult();
	}
	const { data, fetchNextPage, hasNextPage, isFetching } = result;

	return (
		<>
			<InfiniteScroll
				data={data}
				fetchNextPage={fetchNextPage}
				hasNextPage={hasNextPage}
				isFetching={isFetching}
			/>
		</>
	);
};

export default MagazineProvider;
