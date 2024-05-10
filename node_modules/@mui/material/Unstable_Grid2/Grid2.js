'use client';

import PropTypes from 'prop-types';
import { createGrid as createGrid2 } from '@mui/system/Unstable_Grid';
import { styled, useThemeProps } from '../styles';
const Grid2 = createGrid2({
  createStyledComponent: styled('div', {
    name: 'MuiGrid2',
    slot: 'Root',
    overridesResolver: (props, styles) => styles.root
  }),
  componentName: 'MuiGrid2',
  useThemeProps: inProps => useThemeProps({
    props: inProps,
    name: 'MuiGrid2'
  })
});
process.env.NODE_ENV !== "production" ? Grid2.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
export default Grid2;