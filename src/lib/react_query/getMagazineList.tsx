import { SantiagoGet } from "lib/fetchData";

type Props = {
	pageParam: number;
};

export async function getMagazineList({ pageParam }: Props) {
	const startPage = pageParam * 9 + 1;
	const endPage = (pageParam + 1) * 9;
	const result = await SantiagoGet(
		`magazines?query_type=hot&base=${startPage}&limit=${endPage}`,
	);
	return result;
}
