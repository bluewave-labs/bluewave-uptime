/// <reference types="react" />
export interface GridInfiniteLoaderPrivateApi {
    getInfiniteLoadingTriggerElement?: ({ lastRowId, }: {
        lastRowId: string | number;
    }) => React.ReactNode;
}
