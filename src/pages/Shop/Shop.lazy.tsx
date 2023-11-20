import {lazy} from "react";
import {inflate} from "zlib";

export const ShopLazy = lazy(() => import('./Shop'))