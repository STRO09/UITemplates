'use client'

// Inspired by react-hot-toast library

import * as React from 'react'

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
}

let count = 0

/**
 * Generate unique toast IDs.
 */
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

/**
 * Global toast timeout registry.
 *
 * Prevents duplicate removal timers.
 */
const toastTimeouts = new Map()

/**
 * Add toast to delayed removal queue.
 */
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)

    dispatch({
      type: actionTypes.REMOVE_TOAST,
      toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

/**
 * Global toast reducer.
 */
export const reducer = (state, action) => {
  switch (action.type) {
    /**
     * Add new toast.
     */
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [
          action.toast,
          ...state.toasts,
        ].slice(0, TOAST_LIMIT),
      }

    /**
     * Update existing toast.
     */
    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((toast) =>
          toast.id === action.toast.id
            ? { ...toast, ...action.toast }
            : toast
        ),
      }

    /**
     * Dismiss toast visually before removal.
     */
    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action

      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((toast) =>
          toast.id === toastId ||
            toastId === undefined
            ? {
              ...toast,
              open: false,
            }
            : toast
        ),
      }
    }

    /**
     * Remove toast from state.
     */
    case actionTypes.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }

      return {
        ...state,
        toasts: state.toasts.filter(
          (toast) => toast.id !== action.toastId
        ),
      }

    default:
      return state
  }
}

/**
 * Global subscribers.
 */
const listeners = []

/**
 * Global in-memory toast state.
 */
let memoryState = {
  toasts: [],
}

/**
 * Global dispatcher.
 *
 * Updates memory state and notifies listeners.
 */
function dispatch(action) {
  memoryState = reducer(memoryState, action)

  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

/**
 * Create and show a toast.
 */
function toast(props) {
  const id = genId()

  /**
   * Update existing toast.
   */
  const update = (props) =>
    dispatch({
      type: actionTypes.UPDATE_TOAST,
      toast: {
        ...props,
        id,
      },
    })

  /**
   * Dismiss current toast.
   */
  const dismiss = () =>
    dispatch({
      type: actionTypes.DISMISS_TOAST,
      toastId: id,
    })

  dispatch({
    type: actionTypes.ADD_TOAST,

    toast: {
      ...props,
      id,
      open: true,

      onOpenChange: (open) => {
        if (!open) {
          dismiss()
        }
      },
    },
  })

  return {
    id,
    dismiss,
    update,
  }
}

/**
 * Toast hook.
 *
 * Provides:
 * - active toasts
 * - toast creator
 * - dismiss helpers
 */
function useToast() {
  const [state, setState] =
    React.useState(memoryState)

  React.useEffect(() => {
    listeners.push(setState)

    return () => {
      const index =
        listeners.indexOf(setState)

      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  return {
    ...state,

    toast,

    dismiss: (toastId) =>
      dispatch({
        type: actionTypes.DISMISS_TOAST,
        toastId,
      }),
  }
}

export {
  useToast,
  toast,
}
