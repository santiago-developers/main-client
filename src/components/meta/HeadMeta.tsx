import Head from "next/head";

type HeadMetaProps = {
	title: string;
	description: string;
    url: string;
    imageUrl: string | null;
};

const HeadMeta = ({ title, description, url, imageUrl }: HeadMetaProps) => {
	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} key="desc" />
			<meta
				name="viewport"
				content="initial-scale=1.0, width=device-width"
			/>
			<meta property="og:title" content={title} />
			<meta property="og:type" content="website" />
			<meta
				property="og:url"
				content={url}
			/>
			<meta property="og:image" content={imageUrl || "/images/post.svg"} />
			<meta property="og:article:author" content="Santiago" />
		</Head>
	);
};

export default HeadMeta;