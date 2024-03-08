import { SantiagoGet } from "lib/fetchData";
import magazineStore from "store/\bmagazineStore";
import writeStore from "store/writeStore";

type Props = {
	pageParam: number;
};

export async function getRegionMagazines({ pageParam }: Props) {
	const { regionId } = writeStore();
	// const { type } = magazineStore();
	// console.log(type);

	// const query_type = type.toLowerCase().replace(/ /g, "-");
	const startPage = pageParam * 9 + 1;
	const endPage = (pageParam + 1) * 9;
	const result = await SantiagoGet(
		`magazines?${
			regionId
				? `region_id=${regionId}&`
				: regionIdFromMain
				? `region_id=${regionIdFromMain}&`
				: ""
		}query_type=${query_type}t&base=${startPage}&getRegionMagalimit=${endPage}`,
	);
	return result;
}
