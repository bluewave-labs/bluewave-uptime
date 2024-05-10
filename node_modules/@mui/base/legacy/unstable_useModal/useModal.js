'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { unstable_ownerDocument as ownerDocument, unstable_useForkRef as useForkRef, unstable_useEventCallback as useEventCallback, unstable_createChainedFunction as createChainedFunction } from '@mui/utils';
import { extractEventHandlers } from '../utils';
import { ModalManager, ariaHidden } from './ModalManager';
function getContainer(container) {
  return typeof container === 'function' ? container() : container;
}
function getHasTransition(children) {
  return children ? children.props.hasOwnProperty('in') : false;
}

// A modal manager used to track and manage the state of open Modals.
// Modals don't open on the server so this won't conflict with concurrent requests.
var defaultManager = new ModalManager();
/**
 *
 * Demos:
 *
 * - [Modal](https://mui.com/base-ui/react-modal/#hook)
 *
 * API:
 *
 * - [useModal API](https://mui.com/base-ui/react-modal/hooks-api/#use-modal)
 */
export function useModal(parameters) {
  var container = parameters.container,
    _parameters$disableEs = parameters.disableEscapeKeyDown,
    disableEscapeKeyDown = _parameters$disableEs === void 0 ? false : _parameters$disableEs,
    _parameters$disableSc = parameters.disableScrollLock,
    disableScrollLock = _parameters$disableSc === void 0 ? false : _parameters$disableSc,
    _parameters$manager = parameters.manager,
    manager = _parameters$manager === void 0 ? defaultManager : _parameters$manager,
    _parameters$closeAfte = parameters.closeAfterTransition,
    closeAfterTransition = _parameters$closeAfte === void 0 ? false : _parameters$closeAfte,
    onTransitionEnter = parameters.onTransitionEnter,
    onTransitionExited = parameters.onTransitionExited,
    children = parameters.children,
    onClose = parameters.onClose,
    open = parameters.open,
    rootRef = parameters.rootRef; // @ts-ignore internal logic
  var modal = React.useRef({});
  var mountNodeRef = React.useRef(null);
  var modalRef = React.useRef(null);
  var handleRef = useForkRef(modalRef, rootRef);
  var _React$useState = React.useState(!open),
    exited = _React$useState[0],
    setExited = _React$useState[1];
  var hasTransition = getHasTransition(children);
  var ariaHiddenProp = true;
  if (parameters['aria-hidden'] === 'false' || parameters['aria-hidden'] === false) {
    ariaHiddenProp = false;
  }
  var getDoc = function getDoc() {
    return ownerDocument(mountNodeRef.current);
  };
  var getModal = function getModal() {
    modal.current.modalRef = modalRef.current;
    modal.current.mount = mountNodeRef.current;
    return modal.current;
  };
  var handleMounted = function handleMounted() {
    manager.mount(getModal(), {
      disableScrollLock: disableScrollLock
    });

    // Fix a bug on Chrome where the scroll isn't initially 0.
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  };
  var handleOpen = useEventCallback(function () {
    var resolvedContainer = getContainer(container) || getDoc().body;
    manager.add(getModal(), resolvedContainer);

    // The element was already mounted.
    if (modalRef.current) {
      handleMounted();
    }
  });
  var isTopModal = React.useCallback(function () {
    return manager.isTopModal(getModal());
  }, [manager]);
  var handlePortalRef = useEventCallback(function (node) {
    mountNodeRef.current = node;
    if (!node) {
      return;
    }
    if (open && isTopModal()) {
      handleMounted();
    } else if (modalRef.current) {
      ariaHidden(modalRef.current, ariaHiddenProp);
    }
  });
  var handleClose = React.useCallback(function () {
    manager.remove(getModal(), ariaHiddenProp);
  }, [ariaHiddenProp, manager]);
  React.useEffect(function () {
    return function () {
      handleClose();
    };
  }, [handleClose]);
  React.useEffect(function () {
    if (open) {
      handleOpen();
    } else if (!hasTransition || !closeAfterTransition) {
      handleClose();
    }
  }, [open, handleClose, hasTransition, closeAfterTransition, handleOpen]);
  var createHandleKeyDown = function createHandleKeyDown(otherHandlers) {
    return function (event) {
      var _otherHandlers$onKeyD;
      (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null || _otherHandlers$onKeyD.call(otherHandlers, event);

      // The handler doesn't take event.defaultPrevented into account:
      //
      // event.preventDefault() is meant to stop default behaviors like
      // clicking a checkbox to check it, hitting a button to submit a form,
      // and hitting left arrow to move the cursor in a text input etc.
      // Only special HTML elements have these default behaviors.
      if (event.key !== 'Escape' || event.which === 229 ||
      // Wait until IME is settled.
      !isTopModal()) {
        return;
      }
      if (!disableEscapeKeyDown) {
        // Swallow the event, in case someone is listening for the escape key on the body.
        event.stopPropagation();
        if (onClose) {
          onClose(event, 'escapeKeyDown');
        }
      }
    };
  };
  var createHandleBackdropClick = function createHandleBackdropClick(otherHandlers) {
    return function (event) {
      var _otherHandlers$onClic;
      (_otherHandlers$onClic = otherHandlers.onClick) == null || _otherHandlers$onClic.call(otherHandlers, event);
      if (event.target !== event.currentTarget) {
        return;
      }
      if (onClose) {
        onClose(event, 'backdropClick');
      }
    };
  };
  var getRootProps = function getRootProps() {
    var otherHandlers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var propsEventHandlers = extractEventHandlers(parameters);

    // The custom event handlers shouldn't be spread on the root element
    delete propsEventHandlers.onTransitionEnter;
    delete propsEventHandlers.onTransitionExited;
    var externalEventHandlers = _extends({}, propsEventHandlers, otherHandlers);
    return _extends({
      role: 'presentation'
    }, externalEventHandlers, {
      onKeyDown: createHandleKeyDown(externalEventHandlers),
      ref: handleRef
    });
  };
  var getBackdropProps = function getBackdropProps() {
    var otherHandlers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var externalEventHandlers = otherHandlers;
    return _extends({
      'aria-hidden': true
    }, externalEventHandlers, {
      onClick: createHandleBackdropClick(externalEventHandlers),
      open: open
    });
  };
  var getTransitionProps = function getTransitionProps() {
    var handleEnter = function handleEnter() {
      setExited(false);
      if (onTransitionEnter) {
        onTransitionEnter();
      }
    };
    var handleExited = function handleExited() {
      setExited(true);
      if (onTransitionExited) {
        onTransitionExited();
      }
      if (closeAfterTransition) {
        handleClose();
      }
    };
    return {
      onEnter: createChainedFunction(handleEnter, children == null ? void 0 : children.props.onEnter),
      onExited: createChainedFunction(handleExited, children == null ? void 0 : children.props.onExited)
    };
  };
  return {
    getRootProps: getRootProps,
    getBackdropProps: getBackdropProps,
    getTransitionProps: getTransitionProps,
    rootRef: handleRef,
    portalRef: handlePortalRef,
    isTopModal: isTopModal,
    exited: exited,
    hasTransition: hasTransition
  };
}