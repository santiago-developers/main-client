export type Regions = {
	data: RegionProps[];
};

export type RegionProps = {
    regionId: string;
    name_en: string;
    name_kr: string;
    name_hk: string;
    name_jp: string;
    name_ch: string;
    name_fr: string;
    name_ge: string;
    name_it: string;
    name_es: string;
    continent: string;
};

export type MainCountriesProps={
    name:string;
    regionId: string;
}
