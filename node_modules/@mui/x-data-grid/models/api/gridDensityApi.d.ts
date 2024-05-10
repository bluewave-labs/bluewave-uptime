import * as React from 'react';
import { GridDensity } from '../gridDensity';
export interface GridDensityOption {
    icon: React.ReactElement;
    label: string;
    value: GridDensity;
}
/**
 * The density API interface that is available in the grid `apiRef`.
 */
export interface GridDensityApi {
    /**
     * Sets the density of the grid.
     * @param {string} density Can be: `"compact"`, `"standard"`, `"comfortable"`.
     */
    setDensity: (density: GridDensity) => void;
}
