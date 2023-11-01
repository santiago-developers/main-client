import { StrictPropsWithChildren } from "types/global";
import SantiagoHeader from "./header/SantiagoHeader";
import SantiagoFooter from "./footer/SantiagoFooter";

const SantiagoLayout: React.FunctionComponent<StrictPropsWithChildren> = ({
	children,
}) => {
	return (
		<>
			<SantiagoHeader />
			<div className="wrap">{children}</div>
			<SantiagoFooter />
		</>
	);
};
export default SantiagoLayout;
