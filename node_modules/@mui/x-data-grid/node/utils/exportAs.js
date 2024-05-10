"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportAs = exportAs;
/**
 * I have hesitated to use https://github.com/eligrey/FileSaver.js.
 * If we get bug reports that this project solves, we should consider using it.
 *
 * Related resources.
 * https://blog.logrocket.com/programmatic-file-downloads-in-the-browser-9a5186298d5c/
 * https://github.com/mbrn/filefy/blob/ec4ed0b7415d93be7158c23029f2ea1fa0b8e2d9/src/core/BaseBuilder.ts
 * https://unpkg.com/browse/@progress/kendo-file-saver@1.0.7/dist/es/save-as.js
 * https://github.com/ag-grid/ag-grid/blob/9565c219b6210aa85fa833c929d0728f9d163a91/community-modules/csv-export/src/csvExport/downloader.ts
 */

function exportAs(blob, extension = 'csv', filename = document.title || 'untitled') {
  const fullName = `${filename}.${extension}`;

  // Test download attribute first
  // https://github.com/eligrey/FileSaver.js/issues/193
  if ('download' in HTMLAnchorElement.prototype) {
    // Create an object URL for the blob object
    const url = URL.createObjectURL(blob);

    // Create a new anchor element
    const a = document.createElement('a');
    a.href = url;
    a.download = fullName;

    // Programmatically trigger a click on the anchor element
    // Useful if you want the download to happen automatically
    // Without attaching the anchor element to the DOM
    a.click();

    // https://github.com/eligrey/FileSaver.js/issues/205
    setTimeout(() => {
      URL.revokeObjectURL(url);
    });
    return;
  }
  throw new Error('MUI X: exportAs not supported.');
}