import { Logger } from '../logger';
/**
 * The logger API interface that is available in the grid `apiRef`.
 */
export interface GridLoggerApi {
    /**
     * @param {string} name The name of the logger
     * @returns {Logger} Instance of the logger
     */
    getLogger: (name: string) => Logger;
}
