import * as React from 'react';
import { Logger } from '../../models/logger';
import { GridPrivateApiCommon } from '../../models/api/gridApiCommon';
export declare function useGridLogger<PrivateApi extends GridPrivateApiCommon>(privateApiRef: React.MutableRefObject<PrivateApi>, name: string): Logger;
