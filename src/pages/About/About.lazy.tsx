import {lazy} from "react";
import {inflate} from "zlib";

export const AboutLazy = lazy(() => import('./About'))