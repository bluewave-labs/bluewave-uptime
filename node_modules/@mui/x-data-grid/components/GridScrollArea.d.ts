import * as React from 'react';
interface ScrollAreaProps {
    scrollDirection: 'left' | 'right';
}
declare function GridScrollAreaRaw(props: ScrollAreaProps): React.JSX.Element | null;
declare namespace GridScrollAreaRaw {
    var propTypes: any;
}
declare const GridScrollArea: typeof GridScrollAreaRaw;
export { GridScrollArea };
