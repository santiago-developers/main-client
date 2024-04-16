import { StrictPropsWithChildren } from "types/global";
import SantiagoHeader from "./header/SantiagoHeader";
import SantiagoFooter from "./footer/SantiagoFooter";
import { Suspense } from "react";
import Loading from "@pages/loading";

const SantiagoLayout: React.FunctionComponent<StrictPropsWithChildren> = ({
	children,
}) => {
	return (
		<>
			<SantiagoHeader />
			<div className="wrap">
				<Suspense fallback={<Loading />}>{children}</Suspense>
			</div>
			<SantiagoFooter />
		</>
	);
};
export default SantiagoLayout;
