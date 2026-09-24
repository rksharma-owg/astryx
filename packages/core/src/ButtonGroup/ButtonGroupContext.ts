// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file ButtonGroupContext.ts
 * @input Semantic membership and separately scoped visual orientation
 * @output Existing ButtonGroup context/hook plus private visual context/read
 * @position Shared context; consumed by Button for group-aware styling
 */

import {createContext, use} from 'react';
import {createLayerScopedContext} from '../Layer/layerScopedContext';

export type ButtonGroupOrientation = 'horizontal' | 'vertical';

export interface ButtonGroupContextValue {
  orientation: ButtonGroupOrientation;
  isDisabled: boolean;
}

export const ButtonGroupContext = createContext<ButtonGroupContextValue | null>(
  null,
);
ButtonGroupContext.displayName = 'ButtonGroupContext';

// Visual membership is independent of disabled state and keyboard ownership.
export const ButtonGroupVisualContext =
  createLayerScopedContext<ButtonGroupOrientation | null>(null);
export function useButtonGroupVisual(): ButtonGroupOrientation | null {
  return use(ButtonGroupVisualContext);
}

/**
 * Hook for Button to detect when it's inside a ButtonGroup.
 * Returns null when used outside a group.
 */
export function useButtonGroup(): ButtonGroupContextValue | null {
  return use(ButtonGroupContext);
}
