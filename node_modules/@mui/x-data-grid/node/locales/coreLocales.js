"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urPKCore = exports.beBYCore = void 0;
// This file contains copies of the core locales for `MuiTablePagination` released
// after the `@mui/material` package `v5.4.1` (peer dependency of `@mui/x-data-grid`).
// This allows not to bump the minimal version of `@mui/material` in peerDependencies which results
// in broader compatibility between the packages.
// See https://github.com/mui/mui-x/pull/7646#issuecomment-1404605556 for additional context.

const beBYCore = exports.beBYCore = {
  components: {
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: type => {
          if (type === 'first') {
            return 'Перайсці на першую старонку';
          }
          if (type === 'last') {
            return 'Перайсці на апошнюю старонку';
          }
          if (type === 'next') {
            return 'Перайсці на наступную старонку';
          }
          // if (type === 'previous') {
          return 'Перайсці на папярэднюю старонку';
        },
        labelRowsPerPage: 'Радкоў на старонцы:',
        labelDisplayedRows: ({
          from,
          to,
          count
        }) => `${from}–${to} з ${count !== -1 ? count : `больш чым ${to}`}`
      }
    }
  }
};
const urPKCore = exports.urPKCore = {
  components: {
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: type => {
          if (type === 'first') {
            return 'پہلے صفحے پر جائیں';
          }
          if (type === 'last') {
            return 'آخری صفحے پر جائیں';
          }
          if (type === 'next') {
            return 'اگلے صفحے پر جائیں';
          }
          // if (type === 'previous') {
          return 'پچھلے صفحے پر جائیں';
        },
        labelRowsPerPage: 'ایک صفحے پر قطاریں:',
        labelDisplayedRows: ({
          from,
          to,
          count
        }) => `${count !== -1 ? `${count} میں سے` : `${to} سے ذیادہ میں سے`} ${from} سے ${to} قطاریں`
      }
    }
  }
};