// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file layerTextReset.test.tsx
 * @input Rendered layer roots in the existing StyleX-enabled DOM test environment
 * @output Root text defaults, provider isolation, and explicit-override coverage
 * @position Core layer styling tests; browser pixels remain separate PR evidence
 */

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {cleanup, render} from '@testing-library/react';
import * as stylex from '@stylexjs/stylex';
import {useLayer, type ContextRenderProps} from './useLayer';
import {Dialog} from '../Dialog';
import {BottomSheet, BottomSheetSwitcher} from '../BottomSheet';
import {MobileNav} from '../MobileNav';
import {Lightbox} from '../Lightbox';
import {Popover} from '../Popover';
import {ToastViewport} from '../Toast/ToastViewport';
import {stubMatchMedia} from '../__tests__/stubMatchMedia';
import {Button} from '../Button';
import {ButtonGroup} from '../ButtonGroup';
import {SizeProvider} from '../SizeContext';

const noop = () => {};
// Literal oracle independent of the implementation. jsdom checks declarations,
// not inherited layout or resolved CSS variables.
const baseline = {
  fontFamily: 'var(--font-family-body)',
  fontSize: 'var(--text-body-size)',
  fontWeight: 'var(--text-body-weight)',
  lineHeight: 'var(--text-body-leading)',
  fontStyle: 'normal',
  textAlign: 'start',
  textAlignLast: 'auto',
  textIndent: '0',
  textTransform: 'none',
  letterSpacing: 'normal',
  wordSpacing: 'normal',
  textShadow: 'none',
  whiteSpace: 'normal',
  wordBreak: 'normal',
  overflowWrap: 'normal',
  hyphens: 'manual',
};
const hostile = {
  textAlign: 'center',
  fontStyle: 'italic',
  whiteSpace: 'pre',
} as const;
const styles = stylex.create({
  override: {textAlign: 'end', whiteSpace: 'pre-wrap'},
});

function ContextLayer(props: ContextRenderProps) {
  const layer = useLayer({mode: 'context'});
  return <>{layer.render('Reading content', props)}</>;
}
function FixedLayer() {
  const layer = useLayer({mode: 'fixed'});
  return <>{layer.render('Reading content', {x: 40, y: 60})}</>;
}

const dialogMethods = Object.fromEntries(
  ['showModal', 'show', 'close'].map(name => [
    name,
    Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, name),
  ]),
);
beforeEach(() => {
  stubMatchMedia({matches: false, reduceMotion: true});
  for (const name of ['showModal', 'show', 'close']) {
    Object.defineProperty(HTMLDialogElement.prototype, name, {
      configurable: true,
      writable: true,
      value: vi.fn(function (this: HTMLDialogElement) {
        this.open = name !== 'close';
      }),
    });
  }
});
afterEach(() => {
  cleanup();
  for (const [name, descriptor] of Object.entries(dialogMethods)) {
    if (descriptor) {
      Object.defineProperty(HTMLDialogElement.prototype, name, descriptor);
    } else {
      Reflect.deleteProperty(HTMLDialogElement.prototype, name);
    }
  }
  vi.unstubAllGlobals();
});

describe('layer text boundary', () => {
  const open = {isOpen: true, onOpenChange: noop};
  const roots = [
    ['context Layer', () => <ContextLayer />, '[popover]'],
    ['fixed Layer', () => <FixedLayer />, '[popover]'],
    [
      'Popover',
      () => (
        <Popover isOpen label="Details" content="Reading content">
          <button type="button">Open</button>
        </Popover>
      ),
      '[popover]',
    ],
    [
      'Dialog',
      () => <Dialog {...open}>Reading content</Dialog>,
      '.astryx-dialog',
    ],
    [
      'inline Dialog',
      () => (
        <Dialog {...open} isInline>
          Reading content
        </Dialog>
      ),
      '.astryx-dialog',
    ],
    [
      'BottomSheet',
      () => (
        <BottomSheet {...open} label="Details">
          Reading content
        </BottomSheet>
      ),
      '.astryx-bottom-sheet',
    ],
    [
      'non-modal BottomSheet',
      () => (
        <BottomSheet {...open} hasScrim={false} label="Details">
          Reading content
        </BottomSheet>
      ),
      '.astryx-bottom-sheet',
    ],
    [
      'switched BottomSheet',
      () => (
        <BottomSheetSwitcher activeSheet="one" onActiveSheetChange={noop}>
          <BottomSheet sheetId="one" label="Details">
            Reading content
          </BottomSheet>
        </BottomSheetSwitcher>
      ),
      '.astryx-bottom-sheet',
    ],
    [
      'MobileNav',
      () => (
        <MobileNav {...open} label="Navigation">
          Reading content
        </MobileNav>
      ),
      '.astryx-mobile-nav',
    ],
    [
      'Lightbox',
      () => <Lightbox {...open} media={{src: 'image.png', alt: 'Image'}} />,
      '.astryx-lightbox',
    ],
    ['ToastViewport', () => <ToastViewport />, '[popover]'],
    [
      'hosted ToastViewport',
      () => <ToastViewport isTopLayer={false} />,
      ':scope > div > div',
    ],
  ] as const;

  it.each(roots)(
    '%s declares its complete text baseline',
    (_name, element, selector) => {
      const {container} = render(<div style={hostile}>{element()}</div>);
      const root = container.querySelector<HTMLElement>(selector)!;
      expect(root).not.toBeNull();
      expect(getComputedStyle(root)).toMatchObject(baseline);
      expect(root).not.toHaveAttribute('aria-disabled');
      expect(
        getComputedStyle(root).getPropertyValue('--_tab-indicator-bottom'),
      ).toBe('initial');
      expect(container.firstElementChild).toHaveStyle(hostile);
    },
  );

  it.each([
    [
      'native Dialog',
      (content: React.ReactNode) => <Dialog {...open}>{content}</Dialog>,
    ],
    [
      'BottomSheet',
      (content: React.ReactNode) => (
        <BottomSheet {...open} label="Details">
          {content}
        </BottomSheet>
      ),
    ],
    [
      'switched BottomSheet',
      (content: React.ReactNode) => (
        <BottomSheetSwitcher activeSheet="one" onActiveSheetChange={noop}>
          <BottomSheet sheetId="one" label="Details">
            {content}
          </BottomSheet>
        </BottomSheetSwitcher>
      ),
    ],
    [
      'MobileNav',
      (content: React.ReactNode) => <MobileNav {...open}>{content}</MobileNav>,
    ],
    [
      'Lightbox',
      (content: React.ReactNode) => (
        <Lightbox
          {...open}
          media={{src: 'image.png', alt: 'Image', caption: content}}
        />
      ),
    ],
    [
      'Popover',
      (content: React.ReactNode) => (
        <Popover isOpen label="Details" content={content}>
          <button type="button">Trigger</button>
        </Popover>
      ),
    ],
  ] as const)(
    '%s isolates visual size without changing inherited disabled state',
    (_name, surface) => {
      const {getByText} = render(
        <ButtonGroup label="Outer" size="lg" isDisabled>
          {surface(
            <>
              <Button label="Independent" />
              <SizeProvider value="sm">
                <Button label="Explicit small" />
              </SizeProvider>
            </>,
          )}
        </ButtonGroup>,
      );
      const independent = getByText('Independent').closest('button');
      expect(independent).toBeDisabled();
      expect(independent).toHaveAttribute('data-size', 'md');
      expect(getByText('Explicit small').closest('button')).toHaveAttribute(
        'data-size',
        'sm',
      );
    },
  );

  it('preserves Layer root overrides and positioning', () => {
    const {container} = render(
      <ContextLayer
        xstyle={styles.override}
        style={{textTransform: 'lowercase'}}
      />,
    );
    const root = container.querySelector<HTMLElement>('[popover]')!;
    expect(getComputedStyle(root)).toMatchObject({
      textAlign: 'end',
      whiteSpace: 'pre-wrap',
      textTransform: 'lowercase',
    });
    expect(root.style.positionAnchor).not.toBe('');
  });

  it('preserves native Dialog ARIA and explicit root overrides', () => {
    const {container, rerender} = render(
      <ButtonGroup isDisabled label="Outer">
        <Dialog {...open}>
          <Button label="Independent" />
        </Dialog>
      </ButtonGroup>,
    );
    const dialog = container.querySelector('dialog')!;
    expect(dialog).not.toHaveAttribute('aria-disabled');
    expect(dialog.querySelector('button')).toBeDisabled();
    rerender(
      <Dialog {...open} aria-disabled="true">
        <Button label="Independent" />
      </Dialog>,
    );
    expect(container.querySelector('dialog')).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  });

  it('keeps Popover semantics on its content rather than its structural host', () => {
    const {container} = render(
      <Popover isOpen label="Details" content={<Button label="Independent" />}>
        <button type="button">Open</button>
      </Popover>,
    );
    expect(container.querySelector('[popover]')).not.toHaveAttribute(
      'aria-disabled',
    );
    expect(container.querySelector('[role="dialog"]')).not.toHaveAttribute(
      'aria-disabled',
    );
  });

  it('preserves Dialog overrides and authored descendant formatting', () => {
    const {container, getByText} = render(
      <Dialog {...open} xstyle={styles.override} style={{letterSpacing: '2px'}}>
        <span style={hostile}>Authored content</span>
      </Dialog>,
    );
    expect(
      getComputedStyle(container.querySelector('.astryx-dialog')!),
    ).toMatchObject({
      textAlign: 'end',
      whiteSpace: 'pre-wrap',
      letterSpacing: '2px',
    });
    expect(getByText('Authored content')).toHaveStyle(hostile);
  });
});
