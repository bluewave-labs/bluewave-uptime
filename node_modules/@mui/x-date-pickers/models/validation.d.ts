/**
 * Validation error types applicable to both date and time validation
 */
type CommonDateTimeValidationError = 'invalidDate' | 'disableFuture' | 'disablePast' | null;
export type DateValidationError = CommonDateTimeValidationError | 'shouldDisableDate' | 'shouldDisableMonth' | 'shouldDisableYear' | 'minDate' | 'maxDate';
export type TimeValidationError = CommonDateTimeValidationError | 'minutesStep' | 'minTime' | 'maxTime' | 'shouldDisableTime-hours' | 'shouldDisableTime-minutes' | 'shouldDisableTime-seconds';
export type DateTimeValidationError = DateValidationError | TimeValidationError;
export {};
