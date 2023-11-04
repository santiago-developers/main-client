import { useEffect, useState } from "react";

import tw from "twin.macro";
import { SantiagoGet } from "lib/fetchData";
import RegionBox from "./regionBox";

type RegionDropBoxProps = {
	onSubmit(regionId: string, regionName: string): void;
    regionName: string | null;
};

type RegionsProps = {
	regionId: string;
	name_en: string;
	[key: string]: string;
};

interface RegionInterface {
    id: string;
    regionName: string;
}

const RegionDropBox = (props: RegionDropBoxProps) => {
	const [regionsList, setRegionsList] = useState<RegionInterface[]>([]);
	const [open, setOpen] = useState<boolean>(false);

	const fetchData = async () => {
		const regions = await SantiagoGet("regions");
		return regions.data.map(
			(item: RegionsProps) => {return {id: item.regionId, regionName: item.name_en}},
		);
	};

	useEffect(() => {
		fetchData()
        .then((data)=>{
            setRegionsList(data);
        });
	}, []);

	return (
		<> 
			<div tw="text-[#737373] hover:cursor-pointer" onClick={()=> open ? setOpen(false) : setOpen(true)}>
                {props.regionName ? props.regionName : "Select your nationality"}
            </div>
			{open && (
				<RegionBox
					regionsList={regionsList}
					onSubmit={props.onSubmit}
                    setOpen={setOpen}
				/>
			)}
		</>
	);
};
export default RegionDropBox;
