import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { MuiPickersAdapterContext } from '../../LocalizationProvider/LocalizationProvider';
import { DEFAULT_LOCALE } from '../../locales/enUS';
export const useLocalizationContext = () => {
  const localization = React.useContext(MuiPickersAdapterContext);
  if (localization === null) {
    throw new Error(['MUI X: Can not find the date and time pickers localization context.', 'It looks like you forgot to wrap your component in LocalizationProvider.', 'This can also happen if you are bundling multiple versions of the `@mui/x-date-pickers` package'].join('\n'));
  }
  if (localization.utils === null) {
    throw new Error(['MUI X: Can not find the date and time pickers adapter from its localization context.', 'It looks like you forgot to pass a `dateAdapter` to your LocalizationProvider.'].join('\n'));
  }
  const localeText = React.useMemo(() => _extends({}, DEFAULT_LOCALE, localization.localeText), [localization.localeText]);
  return React.useMemo(() => _extends({}, localization, {
    localeText
  }), [localization, localeText]);
};
export const useUtils = () => useLocalizationContext().utils;
export const useDefaultDates = () => useLocalizationContext().defaultDates;
export const useLocaleText = () => useLocalizationContext().localeText;
export const useNow = timezone => {
  const utils = useUtils();
  const now = React.useRef();
  if (now.current === undefined) {
    now.current = utils.date(undefined, timezone);
  }
  return now.current;
};