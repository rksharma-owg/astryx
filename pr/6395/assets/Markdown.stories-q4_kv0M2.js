import{i as e,s as t}from"./preload-helper-CT_b8DTk.js";import{t as n}from"./react-B7Te67-h.js";import{t as r}from"./jsx-runtime-DqZldVDK.js";import{t as i}from"./Text-BXEuttRu.js";import{t as a}from"./Button-DGJ29F77.js";import{t as o}from"./Button-D5yMgGml.js";import{t as s}from"./Text-CRXEW_aT.js";import{i as c,t as l}from"./Link-CP7lu01Y.js";import{Br as u,Fr as d,Hr as f,Ir as p,Rr as ee,Vr as m,zr as te}from"./iframe-Jc0UaplE.js";function h(e,t){return e.length===t.length&&e.every((e,n)=>e===t[n])}function g(e,t=new Map){if(typeof e!=`object`||!e)return e;let n=t.get(e);if(n!=null)return n;if(Array.isArray(e)){let n=[];t.set(e,n);for(let r of e)n.push(g(r,t));return n}if(Object.getPrototypeOf(e)!==Object.prototype)return e;let r={};t.set(e,r);for(let[n,i]of Object.entries(e))r[n]=g(i,t);return r}function _(e,t,n){if(!n||t>=e.length)return t+1;let r=e.charCodeAt(t);if(r<55296||r>56319||t+1>=e.length)return t+1;let i=e.charCodeAt(t+1);return i>=56320&&i<=57343?t+2:t+1}function ne(e,t,n){let r=new RegExp(t.pattern.source,t.pattern.flags),i=[],a=0,o=!1,s;for(;(s=r.exec(e))!=null;){let c=s.index,l=c+s[0].length,u=t.getEndIndex?.(e,s)??l;if(u===!1){s[0].length===0&&(r.lastIndex=_(e,r.lastIndex,r.unicode||r.flags.includes(`v`)));continue}if(!Number.isInteger(u)||u<l||u<c||u>e.length)throw TypeError(`Markdown text transform returned an invalid end index`);if(c<a)continue;c>a&&i.push({type:`text`,value:e.slice(a,c)});let d=t.replace(s,{parentType:n}),f=Array.isArray(d)?d:[d];for(let e of f)i.push(g(e));a=u,r.lastIndex=u===c?_(e,r.lastIndex,r.unicode||r.flags.includes(`v`)):Math.max(r.lastIndex,u),o=!0}return o?(a<e.length&&i.push({type:`text`,value:e.slice(a)}),i):null}function v(e,t,n){let r=[];for(let i of e){if(i.type===`text`){r.push(...ne(i.value,t,n)??[i]);continue}if(i.type===`strong`||i.type===`emphasis`||i.type===`delete`){let e=v(i.children,t,i.type);r.push(h(i.children,e)?i:{...i,children:e});continue}r.push(i)}return h(e,r)?e:r}function y(e,t){let n=e.map(e=>{switch(e.type){case`heading`:case`paragraph`:{let n=v(e.children,t,e.type);return n===e.children?e:{...e,children:n}}case`blockquote`:{let n=y(e.children,t);return n===e.children?e:{...e,children:n}}case`list`:{let n=!1,r=e.children.map(e=>{let r=y(e.children,t);return r===e.children?e:(n=!0,{...e,children:r})});return n?{...e,children:r}:e}case`table`:{let n=!1,r=e.children.map(e=>{let r=!1,i=e.children.map(e=>{let n=v(e.children,t,`tableCell`);return n===e.children?e:(r=!0,{...e,children:n})});return r?(n=!0,{...e,children:i}):e});return n?{...e,children:r}:e}case`code`:case`math`:case`image`:case`thematicBreak`:case`extension`:return e}});return h(e,n)?e:n}function re(e){if(!e.pattern.global)throw TypeError(`Markdown text transform patterns must use the global flag`);if(e.requiredSubstrings!=null&&(!Array.isArray(e.requiredSubstrings)||e.requiredSubstrings.length===0||e.requiredSubstrings.some(e=>typeof e!=`string`||e===``)))throw TypeError(`Markdown text transform requiredSubstrings must be non-empty strings`);let t=e.requiredSubstrings==null?void 0:Object.freeze([...e.requiredSubstrings]),n=Object.freeze({pattern:new RegExp(e.pattern.source,e.pattern.flags),requiredSubstrings:t,getEndIndex:e.getEndIndex,replace:e.replace}),r=e=>{let t=y(e.children,n);return t===e.children?e:{...e,children:t}};return t==null||e.pattern.ignoreCase?r:f(r,e=>t.some(t=>e.includes(t)))}var b=e((()=>{m()})),x=e((()=>{m(),b(),te()}));function S(e,t){let n=!1,r=new Promise(e=>{setTimeout(()=>{n=!0,e()},t)});return{read(){if(!n)throw r;return e}}}function C({label:e}){return(0,w.jsxs)(`mark`,{children:[`@`,e.read()]})}function ie(e=3e3){let t=new Map;return u({...T,renderers:{mention:{render:({node:n})=>{let r=t.get(n.data.label);return r??(r=S(n.data.label,e),t.set(n.data.label,r)),(0,w.jsx)(C,{label:r})},toText:e=>`@${e.data.label}`}}})}var w,T,E,D,O,k,A,ae=e((()=>{x(),w=r(),T={name:`demo-mentions`,apiVersion:1,parseKey:`v1`,syntax:{inline:[{startsWith:[`@{`],maxSpan:80,tokenize({source:e,offset:t,end:n,isFinal:r}){let i=e.indexOf(`}`,t+2);return i<0||i>=n?r?{status:`no-match`}:{status:`defer`}:{status:`match`,end:i+1,node:{type:`extension`,plugin:`demo-mentions`,name:`mention`,display:`inline`,data:{label:e.slice(t+2,i)}}}}}]},renderers:{mention:{render:({node:e})=>(0,w.jsxs)(`mark`,{children:[`@`,e.data.label]}),toText:e=>`@${e.data.label}`}}},E={name:`demo-callouts`,apiVersion:1,parseKey:`v1`,syntax:{block:[{startsWith:[`:::note`],maxSpan:500,tokenize({source:e,offset:t,end:n,isFinal:r}){let i=e.indexOf(`
:::`,t+7);return i<0||i+4>n?r?{status:`no-match`}:{status:`defer`}:{status:`match`,end:i+4,node:{type:`extension`,plugin:`demo-callouts`,name:`callout`,display:`block`,data:{body:e.slice(t+7,i).trim()}}}}}]},renderers:{callout:{render:({node:e})=>(0,w.jsx)(`aside`,{"aria-label":`Note`,children:e.data.body}),toText:e=>e.data.body}}},D=u({name:`demo-todos`,apiVersion:1,transform:re({pattern:/\bTODO\b/g,requiredSubstrings:[`TODO`],replace:()=>({type:`extension`,plugin:`demo-todos`,name:`todo`,display:`inline`,data:{label:`TODO`}})}),renderers:{todo:{render:({node:e})=>(0,w.jsx)(`mark`,{children:e.data.label}),toText:e=>e.data.label}}}),O=u({name:`demo-semantic-fences`,apiVersion:1,transform:ee({languages:[`diagram`],createNode:({code:e,meta:t})=>({type:`extension`,plugin:`demo-semantic-fences`,name:`diagram`,display:`block`,data:{code:e,...t==null?{}:{label:t}}})}),renderers:{diagram:{render:({node:e})=>(0,w.jsxs)(`figure`,{"aria-label":e.data.label??`Workflow diagram`,children:[(0,w.jsx)(`figcaption`,{children:e.data.label??`Workflow diagram`}),(0,w.jsx)(`pre`,{children:e.data.code})]}),toText:e=>e.data.code}}}),k=O,A=[u(T),u(E),D]})),j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$;e((()=>{j=t(n()),d(),o(),l(),s(),ae(),M=r(),N={title:`Core/Markdown`,component:p,tags:[`autodocs`],argTypes:{density:{control:`select`,options:[`default`,`compact`]},headingLevelStart:{control:`select`,options:[1,2,3,4,5,6]},isStreaming:{control:`boolean`},display:{control:`select`,options:[`block`,`inline`]}}},P=[`# Markdown Demo`,``,`Renders **markdown** with *design-system-consistent* styling.`,``,`## Features`,``,`- Headings mapped to Astryx type scale`,`- **Bold**, *italic*, and ~~strikethrough~~ text`,`- [Links](https://example.com) with external detection`,"- Inline `code` and fenced code blocks",``,`### Code Block`,``,"```typescript",`interface User {`,`  id: string;`,`  name: string;`,`}`,``,`function greet(user: User) {`,"  return `Hello, ${user.name}!`;",`}`,"```",``,`### Blockquote`,``,`> Design systems free teams to focus on problems that matter.`,``,`### Table`,``,`| Component | Status | Tests |`,`|:----------|:------:|------:|`,`| Markdown | Active | 73 |`,`| CodeBlock | Active | 44 |`,``,`### Task List`,``,`- [x] Parser`,`- [x] Renderer`,`- [ ] Storybook stories`,``,`---`,``,`1. First ordered item`,`2. Second ordered item`].join(`
`),F=[`## Setting Up a Design System`,``,`A design system is more than a component library — it's a **shared language** between design and engineering. Here's how to build one that scales.`,``,`### 1. Start with Tokens`,``,`Design tokens are the atomic values that define your visual language:`,``,"```typescript",`const tokens = {`,`  color: {`,`    primary: '#0066FF',`,`    secondary: '#6B7280',`,`    success: '#10B981',`,`    danger: '#EF4444',`,`  },`,`  spacing: {`,`    xs: '4px',`,`    sm: '8px',`,`    md: '16px',`,`    lg: '24px',`,`    xl: '32px',`,`  },`,`  radius: {`,`    sm: '4px',`,`    md: '8px',`,`    lg: '16px',`,`    full: '9999px',`,`  },`,`};`,"```",``,`These tokens should be the *single source of truth* for every component.`,``,`### 2. Component Architecture`,``,`Good components follow these principles:`,``,`- **Composable** — small pieces that combine into complex UIs`,`- **Accessible** — keyboard navigation and screen reader support built-in`,`- **Themeable** — visual customization without forking`,`- **Documented** — usage examples, props tables, and do/don't guidelines`,``,`> The best design systems are *opinionated enough* to ensure consistency, but *flexible enough* to handle edge cases gracefully.`,``,`### 3. Adoption Strategy`,``,`Rolling out a design system requires planning:`,``,`| Phase | Duration | Goal |`,`|:------|:--------:|:-----|`,`| Alpha | 4 weeks | Core components, internal dogfooding |`,`| Beta | 8 weeks | Expanded component set, 2-3 pilot teams |`,`| GA | Ongoing | Full adoption, migration support |`,``,`Key metrics to track:`,``,`1. **Component coverage** — what percentage of UI patterns are served`,`2. **Adoption rate** — teams actively using the system`,`3. **Contribution rate** — external PRs and feature requests`,`4. **Consistency score** — visual audits across products`,``,`### 4. Maintenance`,``,`A design system is a *living product*. Plan for:`,``,`- [x] Automated visual regression testing`,`- [x] Semantic versioning with changelogs`,`- [ ] Breaking change codemods`,`- [ ] Cross-platform support (web, mobile, native)`,``,`---`,``,`The most important thing? **Ship early, iterate often.** A design system that exists and is used beats a perfect one that's still in planning.`].join(`
`),I={args:{children:P}},L={args:{children:P,density:`compact`}},R={name:`AI Response`,args:{children:F,density:`compact`,headingLevelStart:3}},z={name:`Shifted Headings (start at h3)`,args:{children:P,headingLevelStart:3}},B={name:`Inline Display`,render:()=>(0,M.jsxs)(`div`,{style:{maxWidth:680,display:`grid`,gap:16},children:[(0,M.jsx)(i,{type:`large`,display:`block`,children:(0,M.jsx)(p,{display:`inline`,children:"Use `value` with **controlled state** and [read the docs](https://example.com) without creating block wrappers."})}),(0,M.jsxs)(`div`,{style:{border:`1px solid #ddd`,borderRadius:8,padding:12,display:`grid`,gap:6},children:[(0,M.jsx)(i,{type:`body`,weight:`bold`,display:`block`,children:`Prop description`}),(0,M.jsx)(i,{type:`body`,color:`secondary`,display:`block`,children:(0,M.jsx)(p,{display:`inline`,children:'Accepts an action item `{label, onClick?, icon?}`, a divider `{type: "divider"}`, or a section `{type: "section", items: [...]}`.'})})]})]})},V={name:`Table`,args:{children:[`## Comparison Table`,``,`| Feature | React | Vue | Svelte |`,`|:--------|:-----:|:---:|-------:|`,`| Virtual DOM | Yes | Yes | No |`,`| Bundle Size | ~40KB | ~30KB | ~2KB |`,`| TypeScript | Native | Plugin | Native |`,`| Learning Curve | Medium | Easy | Easy |`].join(`
`)}},H={render:()=>{let e=F,[t,n]=(0,j.useState)(0),[r,i]=(0,j.useState)(!0),[o,s]=(0,j.useState)(0);return(0,j.useEffect)(()=>{if(!r)return;if(t>=e.length){i(!1);return}let a=Math.floor(Math.random()*8)+2,o=30+Math.random()*60,s=setTimeout(()=>{n(t=>Math.min(t+a,e.length))},o);return()=>clearTimeout(s)},[t,r,e]),(0,M.jsxs)(`div`,{children:[(0,M.jsxs)(`div`,{style:{marginBlockEnd:12,display:`flex`,gap:8,alignItems:`center`},children:[(0,M.jsx)(a,{label:`Replay`,variant:`secondary`,size:`sm`,onClick:(0,j.useCallback)(()=>{n(0),i(!0),s(e=>e+1)},[]),isDisabled:r}),(0,M.jsx)(`span`,{style:{fontSize:12,color:`var(--color-text-secondary)`},children:r?`Streaming... ${t}/${e.length}`:`Complete`})]}),(0,M.jsx)(p,{isStreaming:r,density:`compact`,headingLevelStart:3,children:e.slice(0,t)},o)]})}},U={name:`With Images`,render:()=>(0,M.jsx)(`div`,{style:{maxWidth:800},children:(0,M.jsx)(p,{children:`
Here is some text before the image.

![A landscape photo](https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=680&h=400&fit=crop&auto=format)

Text between two images.

![A tall portrait photo](https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=600&fit=crop&auto=format)

And here's a really wide one:

![Wide panoramic shot](https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&h=300&fit=crop&auto=format)

Final paragraph after all images.
`})})},W=`
# Content Alignment

This paragraph is constrained by \`contentWidth\`. Notice how it's narrower than the code block and table below. The alignment prop controls where this narrow prose sits within the wider container.

Here's a bullet list that also respects prose width:
- First item with some explanation text
- Second item that wraps to show the width constraint
- Third item for good measure

\`\`\`typescript
// Code blocks break out to full container width regardless of contentAlign
export function calculateLayout(items: Item[], containerWidth: number): Layout {
  const columns = Math.floor(containerWidth / COLUMN_MIN_WIDTH);
  return { columns, gap: GRID_GAP, items: distributeItems(items, columns) };
}
\`\`\`

Back to prose — this paragraph is aligned according to the \`contentAlign\` prop while the code block above spans the full width.

| Component | Status | Notes |
|-----------|--------|-------|
| Button | Stable | Full API |
| CodeBlock | Stable | With collapsible |
| Markdown | In progress | Adding alignment |

Final paragraph after the table.
`,G={name:`Content Align: Start`,render:()=>(0,M.jsx)(`div`,{style:{maxWidth:900,border:`1px dashed #ccc`,padding:16},children:(0,M.jsx)(p,{contentWidth:580,contentAlign:`start`,children:W})})},K={name:`Content Align: Center`,render:()=>(0,M.jsx)(`div`,{style:{maxWidth:900,border:`1px dashed #ccc`,padding:16},children:(0,M.jsx)(p,{contentWidth:580,contentAlign:`center`,children:W})})},q={name:`Inline Plugins`,render:()=>(0,M.jsx)(`div`,{style:{maxWidth:680},children:(0,M.jsx)(p,{inlinePlugins:[{pattern:/\b([A-Z][A-Z0-9]+-\d+)\b/g,render:(e,t)=>(0,M.jsx)(c,{href:`https://issues.example.com/browse/${e[1]}`,isExternalLink:!0,weight:`semibold`,children:e[0]},t)},{pattern:/#(\d+)/g,render:(e,t)=>(0,M.jsx)(c,{href:`https://github.com/org/repo/issues/${e[1]}`,isExternalLink:!0,weight:`semibold`,children:e[0]},t)}],density:`compact`,headingLevelStart:2,children:[`## Release Notes — v2.1.0`,``,`This release fixes several issues reported in PROJ-42 and introduces`,`the inline plugins feature requested in #1873.`,``,`### Bug Fixes`,``,`- Fixed crash in streaming mode (BUG-789)`,`- Resolved memory leak in chat components (PROJ-101)`,`- **Bold context**: Plugin works inside **PROJ-55 formatting**`,``,`### Code Example (not linkified)`,``,"```typescript",`// PROJ-999 and BUG-888 should NOT become links inside code blocks`,`const ticketId = "PROJ-999";`,"```",``,"Inline code is also safe: `PROJ-999` stays as plain text.",``,`### Migration Guide`,``,`See PROJ-200 for the full pattern. Also check [the docs](/docs/markdown)`,`for usage alongside regular markdown links.`].join(`
`)})})},J=({value:e,display:t})=>(0,M.jsx)(t===`block`?`div`:`span`,{role:`math`,"aria-label":`Formula: ${e}`,style:{display:t===`block`?`block`:`inline`,padding:t===`block`?`12px 16px`:`1px 4px`,marginBlock:t===`block`?12:void 0,border:`1px solid var(--color-border)`,borderRadius:6,fontFamily:`serif`,fontStyle:`italic`,textAlign:t===`block`?`center`:void 0},children:e}),Y={name:`Custom Math Renderer`,render:()=>(0,M.jsx)(`div`,{style:{maxWidth:680},children:(0,M.jsx)(p,{components:{math:J},children:`A renderer can typeset inline math such as $E = mc^2$ without preprocessing the source.

$$
\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}
$$

Code remains opaque: \`$not_math$\`.`})})},X={name:`Syntax Plugins`,render:()=>(0,M.jsx)(`div`,{style:{maxWidth:680},children:(0,M.jsx)(p,{plugins:A,children:`# Plugin composition

Hello @{Ada}. Ordinary **Markdown** keeps its behavior, while TODO becomes a transform-owned node.

:::note
This callout and mention are typed extension nodes.
:::

Protected contexts stay literal: \`TODO @{Linus}\` and [TODO @{Grace}](/people).`})})},Z={name:`Plugin renderer with Suspense`,render:()=>{let[e,t]=(0,j.useState)(0),n=(0,j.useMemo)(()=>ie(),[e]);return(0,M.jsxs)(`div`,{style:{maxWidth:680},children:[(0,M.jsx)(`div`,{style:{marginBlockEnd:12},children:(0,M.jsx)(a,{label:`Replay delayed renderer`,variant:`secondary`,size:`sm`,onClick:()=>t(e=>e+1)})}),(0,M.jsx)(p,{plugins:[n],children:`Before the async node.

Hello @{Ada}. This sibling Markdown renders immediately.

After the async node.`},e)]})}},Q={name:`Semantic Fence`,render:()=>(0,M.jsx)(`div`,{style:{maxWidth:680},children:(0,M.jsx)(p,{plugins:[k],children:"# Build flow\n\n```diagram Checkout to deploy\nCheckout --> Test --> Deploy\n```\n\nThe plugin renderer presents typed data only for declared languages. Other fences keep the ordinary copyable code fallback:\n\n```text\npnpm test\n```"})})},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    children: SAMPLE_MD
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    children: SAMPLE_MD,
    density: 'compact'
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  name: 'AI Response',
  args: {
    children: STREAMING_RESPONSE,
    density: 'compact',
    headingLevelStart: 3
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  name: 'Shifted Headings (start at h3)',
  args: {
    children: SAMPLE_MD,
    headingLevelStart: 3
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  name: 'Inline Display',
  render: () => <div style={{
    maxWidth: 680,
    display: 'grid',
    gap: 16
  }}>
      <Text type="large" display="block">
        <Markdown display="inline">
          {'Use \`value\` with **controlled state** and [read the docs](https://example.com) without creating block wrappers.'}
        </Markdown>
      </Text>

      <div style={{
      border: '1px solid #ddd',
      borderRadius: 8,
      padding: 12,
      display: 'grid',
      gap: 6
    }}>
        <Text type="body" weight="bold" display="block">
          Prop description
        </Text>
        <Text type="body" color="secondary" display="block">
          <Markdown display="inline">
            {'Accepts an action item \`{label, onClick?, icon?}\`, a divider \`{type: "divider"}\`, or a section \`{type: "section", items: [...]}\`.'}
          </Markdown>
        </Text>
      </div>
    </div>
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  name: 'Table',
  args: {
    children: ['## Comparison Table', '', '| Feature | React | Vue | Svelte |', '|:--------|:-----:|:---:|-------:|', '| Virtual DOM | Yes | Yes | No |', '| Bundle Size | ~40KB | ~30KB | ~2KB |', '| TypeScript | Native | Plugin | Native |', '| Learning Curve | Medium | Easy | Easy |'].join('\\n')
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => {
    const text = STREAMING_RESPONSE;
    const [charIndex, setCharIndex] = useState(0);
    const [isStreaming, setIsStreaming] = useState(true);
    const [key, setKey] = useState(0);
    useEffect(() => {
      if (!isStreaming) {
        return;
      }
      if (charIndex >= text.length) {
        setIsStreaming(false);
        return;
      }
      const chunkSize = Math.floor(Math.random() * 8) + 2;
      const delay = 30 + Math.random() * 60;
      const timer = setTimeout(() => {
        setCharIndex(prev => Math.min(prev + chunkSize, text.length));
      }, delay);
      return () => clearTimeout(timer);
    }, [charIndex, isStreaming, text]);
    const replay = useCallback(() => {
      setCharIndex(0);
      setIsStreaming(true);
      setKey(k => k + 1);
    }, []);
    return <div>
        <div style={{
        marginBlockEnd: 12,
        display: 'flex',
        gap: 8,
        alignItems: 'center'
      }}>
          <Button label="Replay" variant="secondary" size="sm" onClick={replay} isDisabled={isStreaming} />
          <span style={{
          fontSize: 12,
          color: 'var(--color-text-secondary)'
        }}>
            {isStreaming ? \`Streaming... \${charIndex}/\${text.length}\` : 'Complete'}
          </span>
        </div>
        <Markdown key={key} isStreaming={isStreaming} density="compact" headingLevelStart={3}>
          {text.slice(0, charIndex)}
        </Markdown>
      </div>;
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  name: 'With Images',
  render: () => <div style={{
    maxWidth: 800
  }}>
      <Markdown>{\`
Here is some text before the image.

![A landscape photo](https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=680&h=400&fit=crop&auto=format)

Text between two images.

![A tall portrait photo](https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=600&fit=crop&auto=format)

And here's a really wide one:

![Wide panoramic shot](https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&h=300&fit=crop&auto=format)

Final paragraph after all images.
\`}</Markdown>
    </div>
}`,...U.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  name: 'Content Align: Start',
  render: () => <div style={{
    maxWidth: 900,
    border: '1px dashed #ccc',
    padding: 16
  }}>
      <Markdown contentWidth={580} contentAlign="start">
        {CONTENT_ALIGN_TEXT}
      </Markdown>
    </div>
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  name: 'Content Align: Center',
  render: () => <div style={{
    maxWidth: 900,
    border: '1px dashed #ccc',
    padding: 16
  }}>
      <Markdown contentWidth={580} contentAlign="center">
        {CONTENT_ALIGN_TEXT}
      </Markdown>
    </div>
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  name: 'Inline Plugins',
  render: () => {
    const inlinePlugins = [{
      // JIRA-style ticket references: PROJ-123, BUG-456, etc.
      pattern: /\\b([A-Z][A-Z0-9]+-\\d+)\\b/g,
      render: (match: RegExpMatchArray, key: string) => <Link key={key} href={\`https://issues.example.com/browse/\${match[1]}\`} isExternalLink weight="semibold">
            {match[0]}
          </Link>
    }, {
      // GitHub-style issue references: #123, #456, etc.
      pattern: /#(\\d+)/g,
      render: (match: RegExpMatchArray, key: string) => <Link key={key} href={\`https://github.com/org/repo/issues/\${match[1]}\`} isExternalLink weight="semibold">
            {match[0]}
          </Link>
    }];
    const markdown = ['## Release Notes — v2.1.0', '', 'This release fixes several issues reported in PROJ-42 and introduces', 'the inline plugins feature requested in #1873.', '', '### Bug Fixes', '', '- Fixed crash in streaming mode (BUG-789)', '- Resolved memory leak in chat components (PROJ-101)', '- **Bold context**: Plugin works inside **PROJ-55 formatting**', '', '### Code Example (not linkified)', '', '\`\`\`typescript', '// PROJ-999 and BUG-888 should NOT become links inside code blocks', 'const ticketId = "PROJ-999";', '\`\`\`', '', 'Inline code is also safe: \`PROJ-999\` stays as plain text.', '', '### Migration Guide', '', 'See PROJ-200 for the full pattern. Also check [the docs](/docs/markdown)', 'for usage alongside regular markdown links.'].join('\\n');
    return <div style={{
      maxWidth: 680
    }}>
        <Markdown inlinePlugins={inlinePlugins} density="compact" headingLevelStart={2}>
          {markdown}
        </Markdown>
      </div>;
  }
}`,...q.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  name: 'Custom Math Renderer',
  render: () => <div style={{
    maxWidth: 680
  }}>
      <Markdown components={{
      math: StoryMath
    }}>
        {'A renderer can typeset inline math such as $E = mc^2$ without preprocessing the source.\\n\\n$$\\n\\\\sum_{i=1}^{n} i = \\\\frac{n(n+1)}{2}\\n$$\\n\\nCode remains opaque: \`$not_math$\`.'}
      </Markdown>
    </div>
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  name: 'Syntax Plugins',
  render: () => <div style={{
    maxWidth: 680
  }}>
      <Markdown plugins={markdownDemoPlugins}>
        {'# Plugin composition\\n\\nHello @{Ada}. Ordinary **Markdown** keeps its behavior, while TODO becomes a transform-owned node.\\n\\n:::note\\nThis callout and mention are typed extension nodes.\\n:::\\n\\nProtected contexts stay literal: \`TODO @{Linus}\` and [TODO @{Grace}](/people).'}
      </Markdown>
    </div>
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  name: 'Plugin renderer with Suspense',
  render: () => {
    const [run, setRun] = useState(0);
    const delayedPlugin = useMemo(() => createDelayedMarkdownDemoPlugin(), [run]);
    return <div style={{
      maxWidth: 680
    }}>
        <div style={{
        marginBlockEnd: 12
      }}>
          <Button label="Replay delayed renderer" variant="secondary" size="sm" onClick={() => setRun(value => value + 1)} />
        </div>
        <Markdown key={run} plugins={[delayedPlugin]}>
          {'Before the async node.\\n\\nHello @{Ada}. This sibling Markdown renders immediately.\\n\\nAfter the async node.'}
        </Markdown>
      </div>;
  }
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:"{\n  name: 'Semantic Fence',\n  render: () => <div style={{\n    maxWidth: 680\n  }}>\n      <Markdown plugins={[markdownSemanticFenceDemoPlugin]}>\n        {'# Build flow\\n\\n```diagram Checkout to deploy\\nCheckout --> Test --> Deploy\\n```\\n\\nThe plugin renderer presents typed data only for declared languages. Other fences keep the ordinary copyable code fallback:\\n\\n```text\\npnpm test\\n```'}\n      </Markdown>\n    </div>\n}",...Q.parameters?.docs?.source}}},$=[`Default`,`Compact`,`AIResponse`,`ShiftedHeadings`,`InlineDisplay`,`TableFocused`,`Streaming`,`WithImages`,`ContentAlignStart`,`ContentAlignCenter`,`InlinePlugins`,`CustomMath`,`SyntaxPlugins`,`SuspenseRenderer`,`SemanticFence`]}))();export{R as AIResponse,L as Compact,K as ContentAlignCenter,G as ContentAlignStart,Y as CustomMath,I as Default,B as InlineDisplay,q as InlinePlugins,Q as SemanticFence,z as ShiftedHeadings,H as Streaming,Z as SuspenseRenderer,X as SyntaxPlugins,V as TableFocused,U as WithImages,$ as __namedExportsOrder,N as default};