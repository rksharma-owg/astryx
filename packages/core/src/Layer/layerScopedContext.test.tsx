// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file layerScopedContext.test.tsx
 * @input Scoped context boundaries and representative grouped controls
 * @output Isolation, explicit content ownership, and state preservation regressions
 * @position Focused unit coverage for AST-038 provider boundaries
 */

import {createContext, use, useState, type ReactNode} from 'react';
import {afterEach, describe, expect, it, vi} from 'vitest';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import {
  createLayerScopedContext,
  LayerContentBoundary,
} from './layerScopedContext';
import {Dialog} from '../Dialog';
import {useLayer} from './useLayer';
import {Button} from '../Button';
import {ButtonGroup} from '../ButtonGroup';
import {InputGroup} from '../InputGroup';
import {TextInput} from '../TextInput';
import {Avatar} from '../Avatar';
import {AvatarGroup} from '../AvatarGroup';
import {ToggleButton, ToggleButtonGroup} from '../ToggleButton';
import {SizeProvider, useSize} from '../SizeContext';
import {FormLayoutContext} from '../FormLayout';
import {LayoutDividerContext} from '../Layout';
import {LayoutAreaContext} from '../Layout/LayoutAreaContext';
import {TabListContext} from '../TabList/TabListContext';
import {SegmentedControlContext} from '../SegmentedControl/SegmentedControlContext';
import {CheckboxListContext} from '../CheckboxList/CheckboxListContext';
import {
  DropdownMenuContext,
  DropdownMenuRadioGroupContext,
} from '../DropdownMenu/DropdownMenuContext';
import {LayerDepthContext} from './LayerDepthContext';

const noop = () => {};
const Scoped = createLayerScopedContext('default');
const ServiceContext = createContext('service');
ServiceContext.displayName = 'ServiceContext';
function ReadScope({id}: {id: string}) {
  return (
    <output data-testid={id}>
      {use(Scoped)}:{use(ServiceContext)}
    </output>
  );
}
function Fixed({children}: {children: ReactNode}) {
  const layer = useLayer({mode: 'fixed'});
  // jsdom does not paint :popover-open; these tests exercise context, not native visibility.
  return <>{layer.render(children, {x: 0, y: 0, style: {display: 'block'}})}</>;
}
const boundaries = [
  ['fixed Layer', (content: ReactNode) => <Fixed>{content}</Fixed>],
  [
    'inline Dialog',
    (content: ReactNode) => (
      <Dialog isOpen isInline onOpenChange={noop}>
        {content}
      </Dialog>
    ),
  ],
] as const;

afterEach(cleanup);

describe('layer-scoped context', () => {
  it('projects visual fields while keeping semantic references and updates live', () => {
    const callback = vi.fn();
    const selected = new Set(['one']);
    const Mixed = createLayerScopedContext(
      {size: 'md', disabled: false, selected, callback},
      value => ({...value, size: 'md'}),
    );
    function Probe() {
      const value = use(Mixed);
      expect(value.selected).toBe(selected);
      expect(value.callback).toBe(callback);
      return (
        <output>
          {value.size}:{String(value.disabled)}
        </output>
      );
    }
    const tree = (disabled: boolean) => (
      <Mixed value={{size: 'lg', disabled, selected, callback}}>
        <LayerContentBoundary>
          <Probe />
        </LayerContentBoundary>
      </Mixed>
    );
    const {rerender} = render(tree(true));
    expect(screen.getByText('md:true')).toBeInTheDocument();
    rerender(tree(false));
    expect(screen.getByText('md:false')).toBeInTheDocument();
  });

  it('isolates future scoped providers, not unrelated application services', () => {
    render(
      <ServiceContext value="live service">
        <Scoped value="outer">
          <ReadScope id="outside" />
          <LayerContentBoundary>
            <ReadScope id="isolated" />
            <Scoped value="content">
              <ReadScope id="local" />
              <LayerContentBoundary>
                <ReadScope id="nested" />
              </LayerContentBoundary>
            </Scoped>
          </LayerContentBoundary>
        </Scoped>
      </ServiceContext>,
    );
    expect(screen.getByTestId('outside')).toHaveTextContent(
      'outer:live service',
    );
    expect(screen.getByTestId('isolated')).toHaveTextContent(
      'default:live service',
    );
    expect(screen.getByTestId('local')).toHaveTextContent(
      'content:live service',
    );
    expect(screen.getByTestId('nested')).toHaveTextContent(
      'default:live service',
    );
  });

  it('preserves content state and focus when another module registers a context', () => {
    function Content() {
      const [value, setValue] = useState('');
      return (
        <input
          aria-label="Draft"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      );
    }
    const {rerender} = render(
      <LayerContentBoundary>
        <Content />
      </LayerContentBoundary>,
    );
    const input = screen.getByRole('textbox');
    fireEvent.change(input, {target: {value: 'keep me'}});
    input.focus();
    const Late = createLayerScopedContext('late default');
    rerender(
      <LayerContentBoundary>
        <Content />
      </LayerContentBoundary>,
    );
    expect(screen.getByRole('textbox')).toBe(input);
    expect(input).toHaveValue('keep me');
    expect(input).toHaveFocus();
    function ReadLate() {
      return <output>{use(Late)}</output>;
    }
    render(
      <Late value="outer late">
        <LayerContentBoundary>
          <ReadLate />
        </LayerContentBoundary>
      </Late>,
    );
    expect(screen.getByText('late default')).toBeInTheDocument();
  });

  it('keeps explicit content-provider updates live', () => {
    const content = (value: string) => (
      <LayerContentBoundary>
        <Scoped value={value}>
          <ReadScope id="content" />
        </Scoped>
      </LayerContentBoundary>
    );
    const {rerender} = render(content('first'));
    rerender(content('second'));
    expect(screen.getByTestId('content')).toHaveTextContent('second:service');
  });
});

describe.each(boundaries)('%s provider boundary', (_name, boundary) => {
  it('preserves menu/collection state, read-only, callbacks and semantic layout reads', () => {
    const callback = vi.fn();
    const checkboxes = {
      value: ['one'],
      onChange: callback,
      isDisabled: true,
      isReadOnly: true,
    };
    const radio = {value: 'one', onChange: callback, hasCloseOnSelect: false};
    function Probe() {
      const tabs = use(TabListContext)!;
      const segments = use(SegmentedControlContext)!;
      const menu = use(DropdownMenuContext)!;
      expect(tabs).toEqual({
        value: 'one',
        onChange: callback,
        size: 'md',
        layout: 'hug',
        pattern: 'tabs',
      });
      expect(segments).toEqual({
        value: 'one',
        onChange: callback,
        size: 'md',
        layout: 'hug',
        isDisabled: true,
        hasDisabledMessage: true,
      });
      expect(menu.closeMenu).toBe(callback);
      expect(menu.menuSize).toBe('md');
      expect(use(DropdownMenuRadioGroupContext)).toBe(radio);
      expect(use(CheckboxListContext)).toBe(checkboxes);
      expect(use(LayoutAreaContext)).toBe('header');
      expect(use(FormLayoutContext)).toEqual({
        direction: 'vertical',
        defaultOptionality: 'required',
      });
      return <output data-testid="preserved">preserved</output>;
    }
    render(
      <TabListContext
        value={{
          value: 'one',
          onChange: callback,
          size: 'lg',
          layout: 'fill',
          pattern: 'tabs',
        }}>
        <SegmentedControlContext
          value={{
            value: 'one',
            onChange: callback,
            size: 'lg',
            layout: 'fill',
            isDisabled: true,
            hasDisabledMessage: true,
          }}>
          <DropdownMenuContext value={{closeMenu: callback, menuSize: 'lg'}}>
            <DropdownMenuRadioGroupContext value={radio}>
              <CheckboxListContext value={checkboxes}>
                <LayoutAreaContext value="header">
                  <FormLayoutContext
                    value={{
                      direction: 'horizontal-labels',
                      defaultOptionality: 'required',
                    }}>
                    {boundary(<Probe />)}
                  </FormLayoutContext>
                </LayoutAreaContext>
              </CheckboxListContext>
            </DropdownMenuRadioGroupContext>
          </DropdownMenuContext>
        </SegmentedControlContext>
      </TabListContext>,
    );
    expect(screen.getByTestId('preserved')).toBeInTheDocument();
  });

  it('keeps existing layer-depth semantics', () => {
    function Depth() {
      return <output>{use(LayerDepthContext)}</output>;
    }
    render(
      <LayerDepthContext value={4}>{boundary(<Depth />)}</LayerDepthContext>,
    );
    expect(
      screen.getByText(_name === 'fixed Layer' ? '4' : '5'),
    ).toBeInTheDocument();
  });

  it('stops ButtonGroup visual size while preserving disabled state and membership', () => {
    const press = vi.fn();
    render(
      <ButtonGroup label="Outer" size="lg" isDisabled>
        <Button label="Outer member" />
        {boundary(
          <>
            <Button label="Independent" onClick={press} />
            <ButtonGroup label="Inner" size="sm">
              <Button label="Inner member" />
            </ButtonGroup>
          </>,
        )}
      </ButtonGroup>,
    );
    expect(screen.getByRole('button', {name: 'Outer member'})).toBeDisabled();
    const independent = screen.getByRole('button', {name: 'Independent'});
    expect(independent).toBeDisabled();
    expect(independent).toHaveAttribute('data-size', 'md');
    fireEvent.click(independent);
    expect(press).not.toHaveBeenCalled();
    expect(screen.getByRole('button', {name: 'Inner member'})).toHaveAttribute(
      'data-size',
      'sm',
    );
  });

  it('stops InputGroup sizing without changing its label association', () => {
    render(
      <InputGroup label="Outer label" size="lg">
        {boundary(<TextInput label="Inner label" value="" onChange={noop} />)}
      </InputGroup>,
    );
    const input = screen.getByRole('textbox', {
      name: 'Outer label Inner label',
    });
    expect(input.closest('.astryx-text-input')).toHaveAttribute(
      'data-size',
      'md',
    );
    expect(input).toHaveAccessibleName('Outer label Inner label');
  });

  it('preserves ancestor toggle selection and callbacks while resetting only size', () => {
    const outerChange = vi.fn();
    const localChange = vi.fn();
    render(
      <ToggleButtonGroup
        label="Outer"
        value="x"
        size="lg"
        onChange={outerChange}>
        {boundary(
          <ToggleButton
            value="x"
            label="Independent"
            isPressed={false}
            onPressedChange={localChange}
          />,
        )}
      </ToggleButtonGroup>,
    );
    const toggle = screen.getByRole('button', {name: 'Independent'});
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect(toggle).toHaveAttribute('data-size', 'md');
    fireEvent.click(toggle);
    expect(localChange).not.toHaveBeenCalled();
    expect(outerChange).toHaveBeenCalledWith(null);
  });

  it('stops AvatarGroup geometry while preserving a separately provided group', () => {
    render(
      <AvatarGroup size="lg" shape="square">
        {boundary(
          <>
            <Avatar alt="Independent" data-testid="avatar" />
            <AvatarGroup size="sm" shape="square">
              <Avatar alt="Inner" data-testid="inner-avatar" />
            </AvatarGroup>
          </>,
        )}
      </AvatarGroup>,
    );
    expect(screen.getByTestId('avatar')).not.toHaveAttribute('tabindex');
    expect(screen.getByTestId('avatar')).toHaveAttribute('data-size', 'md');
    expect(screen.getByTestId('avatar')).toHaveAttribute(
      'data-shape',
      'circle',
    );
    expect(screen.getByTestId('inner-avatar')).toHaveAttribute(
      'data-size',
      'sm',
    );
    expect(screen.getByTestId('inner-avatar')).toHaveAttribute(
      'data-shape',
      'square',
    );
  });

  it('stops general layout/size defaults but honors explicit content providers', () => {
    function ReadLayout({id}: {id: string}) {
      const size = useSize();
      const form = use(FormLayoutContext);
      const divider = use(LayoutDividerContext);
      return (
        <output data-testid={id}>
          {size}:{form.direction}:{String(divider?.defaultHasDividers ?? false)}
        </output>
      );
    }
    render(
      <SizeProvider value="lg">
        <FormLayoutContext value={{direction: 'horizontal-labels'}}>
          <LayoutDividerContext value={{defaultHasDividers: true}}>
            {boundary(
              <>
                <ReadLayout id="default" />
                <SizeProvider value="sm">
                  <ReadLayout id="inner" />
                </SizeProvider>
              </>,
            )}
          </LayoutDividerContext>
        </FormLayoutContext>
      </SizeProvider>,
    );
    expect(screen.getByTestId('default')).toHaveTextContent(
      'md:vertical:false',
    );
    expect(screen.getByTestId('inner')).toHaveTextContent('sm:vertical:false');
  });
});
