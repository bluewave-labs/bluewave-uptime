import * as React from 'react';
export default function useForkRef<Instance>(...refs: Array<React.Ref<Instance> | undefined>): React.RefCallback<Instance> | null;
