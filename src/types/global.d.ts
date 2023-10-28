import type { ReactNode } from "react";

type StrictPropsWithChildren<P = unknown> = P & {
	children: ReactNode;
};