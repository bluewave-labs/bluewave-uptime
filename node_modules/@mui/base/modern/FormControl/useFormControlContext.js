'use client';

import * as React from 'react';
import { FormControlContext } from './FormControlContext';
/**
 *
 * Demos:
 *
 * - [Form Control](https://mui.com/base-ui/react-form-control/#hook)
 *
 * API:
 *
 * - [useFormControlContext API](https://mui.com/base-ui/react-form-control/hooks-api/#use-form-control-context)
 */
export function useFormControlContext() {
  return React.useContext(FormControlContext);
}