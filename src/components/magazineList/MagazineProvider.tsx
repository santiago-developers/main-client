import InfiniteScroll from "./InfiniteScroll";
import RegionResult from "./RegionResult";
import SearchResult from "./SearchResult";
import magazineStore from "store/magazineStore";
import ContinentResult from "./ContinentResult";
import UserIdResult from "@components/profile/UserIdResult";
import LoadingModal from "@components/profile/LoadingModal";

const MagazineProvider = () => {
	const { submitType } = magazineStore();
	let result = {};
	if (submitType === "region") {
		result = RegionResult();
	} else if (submitType === "searchTerm") {
		result = SearchResult();
	} else if (submitType === "continent") {
		result = ContinentResult();
	} else if (submitType === "user_id") {
		result = UserIdResult();
	}
	const { data, fetchNextPage, hasNextPage, isFetching } = result;
	// console.log("ttle:", data?.pages[0]?.data[2]?.title);

	return (
		<>
			{/* {!data?.pages[0]?.data[2]?.title && (
				<LoadingModal setLoadingModal={() => true} />
			)} */}
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
