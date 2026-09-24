// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file layerLayoutReset.stylex.ts
 * @input StyleX and private ancestor layout channels
 * @output Private scoped-layout reset for layer content roots
 * @position AST-038 layout isolation, separate from its closed text baseline
 */

import * as stylex from '@stylexjs/stylex';

export const layerLayoutReset = stylex.create({
  reset: {
    // A Toolbar rail offset describes its own box, not a new layer's tabs.
    // Invalidating it restores the Tab fallback; a local Toolbar still wins.
    '--_tab-indicator-bottom': 'initial',
  },
});
