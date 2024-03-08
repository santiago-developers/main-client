import HotSvg from "@public/images/magazines/hot.svg";
import RecentSvg from "@public/images/magazines/recent.svg";
import BPicturesSvg from "@public/images/magazines/bPictures.svg";
import BWritingsSvg from "@public/images/magazines/bWritings.svg";

type Props = {
	type: string;
	isActive: boolean;
};

const SvgIcon = ({ type, isActive }: Props) => {
	const iconProps = {
		className: isActive ? "svgActive" : "svgBasic",
	};

	switch (type) {
		case "Hot":
			return <HotSvg {...iconProps} />;
		case "Recent":
			return <RecentSvg {...iconProps} />;
		case "Best Pictures":
			return <BPicturesSvg {...iconProps} />;
		case "Best Writing":
			return <BWritingsSvg {...iconProps} />;
		default:
			return null;
	}
};

export default SvgIcon;
