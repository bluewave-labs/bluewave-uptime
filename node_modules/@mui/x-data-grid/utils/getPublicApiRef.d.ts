/// <reference types="react" />
import type { GridPrivateApiCommunity } from '../models/api/gridApiCommunity';
export declare function getPublicApiRef<PrivateApi extends GridPrivateApiCommunity>(apiRef: React.MutableRefObject<PrivateApi>): import("react").MutableRefObject<ReturnType<PrivateApi["getPublicApi"]>>;
