// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';

/**
 * @file AvatarGroupContext.ts
 * @input Semantic membership and separately scoped visual defaults
 * @output Existing AvatarGroup context/hook plus private visual context/read
 * @position Shared context; consumed by children for group-aware styling
 */

import {createContext, use} from 'react';
import {createLayerScopedContext} from '../Layer/layerScopedContext';
import type {AvatarShape, AvatarSize} from '../Avatar';

export interface AvatarGroupContextValue {
  size: AvatarSize;
  shape: AvatarShape;
  overlap: number;
  numericSize: number;
}

export const AvatarGroupContext = createContext<AvatarGroupContextValue | null>(
  null,
);
AvatarGroupContext.displayName = 'AvatarGroupContext';

// Keep membership for tooltip focusability separate from ring/size/overlap.
export const AvatarGroupVisualContext =
  createLayerScopedContext<AvatarGroupContextValue | null>(null);
export function useAvatarGroupVisual(): AvatarGroupContextValue | null {
  return use(AvatarGroupVisualContext);
}

export function useAvatarGroup(): AvatarGroupContextValue | null {
  return use(AvatarGroupContext);
}
