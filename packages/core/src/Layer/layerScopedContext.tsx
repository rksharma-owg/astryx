// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

/**
 * @file layerScopedContext.tsx
 * @input React contexts and content
 * @output Private visual-context factory and content boundary
 * @position AST-038 visual isolation; semantic context and behavior stay unchanged
 */

import {
  createContext,
  use,
  useMemo,
  useState,
  type Context,
  type ReactNode,
} from 'react';

type Reset = (children: ReactNode) => ReactNode;
const resets: Reset[] = [];

/**
 * Register presentation-only defaults, or a visual projection for mixed values.
 * Projections must preserve semantic fields and callbacks. Contexts whose
 * presence controls behavior need a separate visual context, not a null reset.
 */
export function createLayerScopedContext<T>(
  defaultValue: T,
  projectVisual?: (value: T) => T,
): Context<T> {
  const Context = createContext(defaultValue);
  Context.displayName = 'LayerScopedContext';
  function VisualBoundary({children}: {children: ReactNode}): ReactNode {
    const inherited = use(Context);
    const value = useMemo(
      () => (projectVisual ? projectVisual(inherited) : defaultValue),
      [inherited],
    );
    return <Context value={value}>{children}</Context>;
  }
  resets.push(children => <VisualBoundary>{children}</VisualBoundary>);
  return Context;
}

export function LayerContentBoundary({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  // Freeze the provider chain per mount so later lazy imports cannot remount
  // existing content and discard its state or focus.
  const [resetChain] = useState(() => resets.slice());
  return resetChain.reduceRight(
    (content, reset): ReactNode => reset(content),
    children,
  );
}
