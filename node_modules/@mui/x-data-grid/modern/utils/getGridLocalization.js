import _extends from "@babel/runtime/helpers/esm/extends";
export const getGridLocalization = (gridTranslations, coreTranslations) => ({
  components: {
    MuiDataGrid: {
      defaultProps: {
        localeText: _extends({}, gridTranslations, {
          MuiTablePagination: coreTranslations?.components?.MuiTablePagination?.defaultProps || {}
        })
      }
    }
  }
});