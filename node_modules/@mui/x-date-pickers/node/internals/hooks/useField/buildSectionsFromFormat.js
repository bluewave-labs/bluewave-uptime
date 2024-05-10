"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildSectionsFromFormat = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _useField = require("./useField.utils");
const expandFormat = ({
  utils,
  format
}) => {
  // Expand the provided format
  let formatExpansionOverflow = 10;
  let prevFormat = format;
  let nextFormat = utils.expandFormat(format);
  while (nextFormat !== prevFormat) {
    prevFormat = nextFormat;
    nextFormat = utils.expandFormat(prevFormat);
    formatExpansionOverflow -= 1;
    if (formatExpansionOverflow < 0) {
      throw new Error('MUI X: The format expansion seems to be in an infinite loop. Please open an issue with the format passed to the picker component.');
    }
  }
  return nextFormat;
};
const getEscapedPartsFromFormat = ({
  utils,
  expandedFormat
}) => {
  const escapedParts = [];
  const {
    start: startChar,
    end: endChar
  } = utils.escapedCharacters;
  const regExp = new RegExp(`(\\${startChar}[^\\${endChar}]*\\${endChar})+`, 'g');
  let match = null;
  // eslint-disable-next-line no-cond-assign
  while (match = regExp.exec(expandedFormat)) {
    escapedParts.push({
      start: match.index,
      end: regExp.lastIndex - 1
    });
  }
  return escapedParts;
};
const getSectionPlaceholder = (utils, timezone, localeText, sectionConfig, sectionFormat) => {
  switch (sectionConfig.type) {
    case 'year':
      {
        return localeText.fieldYearPlaceholder({
          digitAmount: utils.formatByString(utils.date(undefined, timezone), sectionFormat).length,
          format: sectionFormat
        });
      }
    case 'month':
      {
        return localeText.fieldMonthPlaceholder({
          contentType: sectionConfig.contentType,
          format: sectionFormat
        });
      }
    case 'day':
      {
        return localeText.fieldDayPlaceholder({
          format: sectionFormat
        });
      }
    case 'weekDay':
      {
        return localeText.fieldWeekDayPlaceholder({
          contentType: sectionConfig.contentType,
          format: sectionFormat
        });
      }
    case 'hours':
      {
        return localeText.fieldHoursPlaceholder({
          format: sectionFormat
        });
      }
    case 'minutes':
      {
        return localeText.fieldMinutesPlaceholder({
          format: sectionFormat
        });
      }
    case 'seconds':
      {
        return localeText.fieldSecondsPlaceholder({
          format: sectionFormat
        });
      }
    case 'meridiem':
      {
        return localeText.fieldMeridiemPlaceholder({
          format: sectionFormat
        });
      }
    default:
      {
        return sectionFormat;
      }
  }
};
const createSection = ({
  utils,
  timezone,
  date,
  shouldRespectLeadingZeros,
  localeText,
  localizedDigits,
  now,
  token,
  startSeparator
}) => {
  if (token === '') {
    throw new Error('MUI X: Should not call `commitToken` with an empty token');
  }
  const sectionConfig = (0, _useField.getDateSectionConfigFromFormatToken)(utils, token);
  const hasLeadingZerosInFormat = (0, _useField.doesSectionFormatHaveLeadingZeros)(utils, timezone, sectionConfig.contentType, sectionConfig.type, token);
  const hasLeadingZerosInInput = shouldRespectLeadingZeros ? hasLeadingZerosInFormat : sectionConfig.contentType === 'digit';
  const isValidDate = date != null && utils.isValid(date);
  let sectionValue = isValidDate ? utils.formatByString(date, token) : '';
  let maxLength = null;
  if (hasLeadingZerosInInput) {
    if (hasLeadingZerosInFormat) {
      maxLength = sectionValue === '' ? utils.formatByString(now, token).length : sectionValue.length;
    } else {
      if (sectionConfig.maxLength == null) {
        throw new Error(`MUI X: The token ${token} should have a 'maxDigitNumber' property on it's adapter`);
      }
      maxLength = sectionConfig.maxLength;
      if (isValidDate) {
        sectionValue = (0, _useField.applyLocalizedDigits)((0, _useField.cleanLeadingZeros)((0, _useField.removeLocalizedDigits)(sectionValue, localizedDigits), maxLength), localizedDigits);
      }
    }
  }
  return (0, _extends2.default)({}, sectionConfig, {
    format: token,
    maxLength,
    value: sectionValue,
    placeholder: getSectionPlaceholder(utils, timezone, localeText, sectionConfig, token),
    hasLeadingZerosInFormat,
    hasLeadingZerosInInput,
    startSeparator,
    endSeparator: '',
    modified: false
  });
};
const buildSections = params => {
  const {
    utils,
    expandedFormat,
    escapedParts
  } = params;
  const now = utils.date(undefined);
  const sections = [];
  let startSeparator = '';

  // This RegExp tests if the beginning of a string corresponds to a supported token
  const validTokens = Object.keys(utils.formatTokenMap).sort((a, b) => b.length - a.length); // Sort to put longest word first

  const regExpFirstWordInFormat = /^([a-zA-Z]+)/;
  const regExpWordOnlyComposedOfTokens = new RegExp(`^(${validTokens.join('|')})*$`);
  const regExpFirstTokenInWord = new RegExp(`^(${validTokens.join('|')})`);
  const getEscapedPartOfCurrentChar = i => escapedParts.find(escapeIndex => escapeIndex.start <= i && escapeIndex.end >= i);
  let i = 0;
  while (i < expandedFormat.length) {
    const escapedPartOfCurrentChar = getEscapedPartOfCurrentChar(i);
    const isEscapedChar = escapedPartOfCurrentChar != null;
    const firstWordInFormat = regExpFirstWordInFormat.exec(expandedFormat.slice(i))?.[1];

    // The first word in the format is only composed of tokens.
    // We extract those tokens to create a new sections.
    if (!isEscapedChar && firstWordInFormat != null && regExpWordOnlyComposedOfTokens.test(firstWordInFormat)) {
      let word = firstWordInFormat;
      while (word.length > 0) {
        const firstWord = regExpFirstTokenInWord.exec(word)[1];
        word = word.slice(firstWord.length);
        sections.push(createSection((0, _extends2.default)({}, params, {
          now,
          token: firstWord,
          startSeparator
        })));
        startSeparator = '';
      }
      i += firstWordInFormat.length;
    }
    // The remaining format does not start with a token,
    // We take the first character and add it to the current section's end separator.
    else {
      const char = expandedFormat[i];

      // If we are on the opening or closing character of an escaped part of the format,
      // Then we ignore this character.
      const isEscapeBoundary = isEscapedChar && escapedPartOfCurrentChar?.start === i || escapedPartOfCurrentChar?.end === i;
      if (!isEscapeBoundary) {
        if (sections.length === 0) {
          startSeparator += char;
        } else {
          sections[sections.length - 1].endSeparator += char;
        }
      }
      i += 1;
    }
  }
  if (sections.length === 0 && startSeparator.length > 0) {
    sections.push({
      type: 'empty',
      contentType: 'letter',
      maxLength: null,
      format: '',
      value: '',
      placeholder: '',
      hasLeadingZerosInFormat: false,
      hasLeadingZerosInInput: false,
      startSeparator,
      endSeparator: '',
      modified: false
    });
  }
  return sections;
};
const postProcessSections = ({
  isRTL,
  formatDensity,
  sections
}) => {
  return sections.map(section => {
    const cleanSeparator = separator => {
      let cleanedSeparator = separator;
      if (isRTL && cleanedSeparator !== null && cleanedSeparator.includes(' ')) {
        cleanedSeparator = `\u2069${cleanedSeparator}\u2066`;
      }
      if (formatDensity === 'spacious' && ['/', '.', '-'].includes(cleanedSeparator)) {
        cleanedSeparator = ` ${cleanedSeparator} `;
      }
      return cleanedSeparator;
    };
    section.startSeparator = cleanSeparator(section.startSeparator);
    section.endSeparator = cleanSeparator(section.endSeparator);
    return section;
  });
};
const buildSectionsFromFormat = params => {
  let expandedFormat = expandFormat(params);
  if (params.isRTL && params.enableAccessibleFieldDOMStructure) {
    expandedFormat = expandedFormat.split(' ').reverse().join(' ');
  }
  const escapedParts = getEscapedPartsFromFormat((0, _extends2.default)({}, params, {
    expandedFormat
  }));
  const sections = buildSections((0, _extends2.default)({}, params, {
    expandedFormat,
    escapedParts
  }));
  return postProcessSections((0, _extends2.default)({}, params, {
    sections
  }));
};
exports.buildSectionsFromFormat = buildSectionsFromFormat;