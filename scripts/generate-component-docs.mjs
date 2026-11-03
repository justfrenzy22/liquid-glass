import ts from 'typescript';
import {writeFileSync, mkdirSync} from 'node:fs';
const program=ts.createProgram(['src/index.ts','src/heroui.ts'],{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.ESNext,moduleResolution:ts.ModuleResolutionKind.Bundler,target:ts.ScriptTarget.ES2020,skipLibCheck:true,esModuleInterop:true});
const checker=program.getTypeChecker();const rows=[];
for(const file of ['src/index.ts','src/heroui.ts']){
 const mod=checker.getSymbolAtLocation(program.getSourceFile(file));
 for(const sym of checker.getExportsOfModule(mod)){
  const name=sym.getName();if(!/^(Glass[A-Z]|Liquid(?!NextUI)[A-Z]|SolidCard$|FinderTable$)/.test(name)||rows.some(row=>row.name===name))continue;
  const type=checker.getTypeOfSymbolAtLocation(sym,sym.valueDeclaration??program.getSourceFile(file));const sig=type.getCallSignatures()[0];if(!sig)continue;
  const param=sig.parameters[0];if(!param)continue;const props=checker.getTypeOfSymbolAtLocation(param,param.valueDeclaration??program.getSourceFile(file));
  const fields=checker.getPropertiesOfType(props).map(p=>({name:p.getName(),required:!(p.flags&ts.SymbolFlags.Optional),type:checker.typeToString(checker.getTypeOfSymbolAtLocation(p,p.valueDeclaration??program.getSourceFile(file)),undefined,ts.TypeFormatFlags.NoTruncation),local:(p.declarations??[]).some(d=>d.getSourceFile().fileName.replaceAll('\\','/').startsWith(process.cwd().replaceAll('\\','/')+'/src/')),description:ts.displayPartsToString(p.getDocumentationComment(checker))}));
  rows.push({name,entry:file.includes('heroui')?'/heroui':'',fields});
 }
}
mkdirSync('docs/components', {recursive:true});
const options = '[{ id: "files", label: "Files" }, { id: "recent", label: "Recent" }]';
const navigation = '[{ id: "files", label: "Files", href: "/files" }, { id: "recent", label: "Recent", href: "/recent" }]';
const table = 'aria-label="Files" columns={[{ id: "name", label: "Name", isRowHeader: true }]} rows={[{ id: "brief", values: { name: "Project brief" } }]}';
const examples = {
  GlassSurface: '<GlassSurface><p>Your content</p></GlassSurface>',
  GlassEmptyState: '<GlassEmptyState title="No files yet" description="Upload a file to get started." />',
  GlassRenderingProvider: '<GlassRenderingProvider mode="compatible"><p>Your application controls go here.</p></GlassRenderingProvider>',
  GlassButton: '<GlassButton onClick={() => console.log("Save")}>Save</GlassButton>',
  GlassIconButton: '<GlassIconButton aria-label="Add file">+</GlassIconButton>',
  GlassInput: '<GlassInput aria-label="Project name" placeholder="Project name" />',
  GlassSearch: '<GlassSearch aria-label="Search files" placeholder="Search files" />',
  GlassSwitch: '<GlassSwitch label="Automatic sync" defaultChecked />',
  GlassSlider: '<GlassSlider label="Volume" defaultValue={40} onValueChange={(value) => console.log(value)} />',
  GlassCard: '<GlassCard><h2>Project</h2><p>Project details.</p></GlassCard>',
  GlassPanel: '<GlassPanel><h2>Workspace</h2><p>Panel content.</p></GlassPanel>',
  GlassToolbar: '<GlassToolbar aria-label="File actions"><button type="button">Refresh</button></GlassToolbar>',
  GlassNavbar: '<GlassNavbar aria-label="Main navigation"><a href="/files">Files</a></GlassNavbar>',
  GlassFileCard: '<GlassFileCard name="Project brief.pdf" details="PDF document" />',
  GlassFolderCard: '<GlassFolderCard name="Research" details="12 files" />',
  GlassUploadButton: '<GlassUploadButton onClick={() => console.log("Open your file picker")}>Upload file</GlassUploadButton>',
  GlassSearchBar: '<GlassSearchBar aria-label="Search files" />',
  LiquidEmptyState: '<LiquidEmptyState title="No results" description="Try another search." />',
  SolidCard: '<SolidCard title="Project" description="A calm, solid card."><p>Your content</p></SolidCard>',
  FinderTable: `<FinderTable ${table} selectionMode="multiple" selectionAppearance="subtle" />`,
  LiquidForm: '<LiquidForm onSubmit={(event) => { event.preventDefault(); console.log(new FormData(event.currentTarget)); }}><label>Name <input name="name" required /></label><button type="submit">Save</button></LiquidForm>',
  LiquidButton: '<LiquidButton appearance="colored" glassColor="#0878ed" onPress={() => console.log("Save")}>Save changes</LiquidButton>',
  LiquidSlider: '<LiquidSlider label="Volume" defaultValue={40} onChange={(value) => console.log(value)} />',
  LiquidSwitch: '<LiquidSwitch label="Automatic sync" defaultSelected />',
  LiquidInput: '<LiquidInput label="Project name" inputProps={{ placeholder: "Name your project" }} />',
  LiquidCheckbox: '<LiquidCheckbox label="Keep a local copy" defaultSelected />',
  LiquidTabs: '<LiquidTabs label="File views" items={[{ id: "files", label: "Files", content: <p>Your files</p> }, { id: "recent", label: "Recent", content: <p>Recent files</p> }]} />',
  LiquidSelect: `<LiquidSelect label="Folder" options={${options}} />`,
  LiquidCard: '<LiquidCard title="Project" description="Project details."><p>Your content</p></LiquidCard>',
  LiquidModal: '<LiquidModal triggerLabel="Open details" title="Project details"><p>Dialog content.</p></LiquidModal>',
  LiquidDropdown: '<LiquidDropdown label="File actions" actions={[{ id: "rename", label: "Rename" }, { id: "delete", label: "Delete" }]} onAction={(id) => console.log(id)} />',
  LiquidTooltip: '<LiquidTooltip content="Refresh files"><button type="button">Refresh</button></LiquidTooltip>',
  LiquidPopover: '<LiquidPopover triggerLabel="More information" title="About this folder"><p>Folder details.</p></LiquidPopover>',
  LiquidAccordion: '<LiquidAccordion items={[{ id: "sharing", title: "Sharing", content: <p>Only you can access this folder.</p> }]} />',
  LiquidAlert: '<LiquidAlert title="Changes saved"><p>Your files are up to date.</p></LiquidAlert>',
  LiquidToastProvider: '<LiquidToastProvider />',
  LiquidProgressBar: '<LiquidProgressBar label="Upload progress" value={40} />',
  LiquidProgressCircle: '<LiquidProgressCircle aria-label="Upload progress" value={40} />',
  LiquidAvatar: '<LiquidAvatar person={{ id: "alex", name: "Alex Morgan", initials: "AM" }} />',
  LiquidAvatarGroup: '<LiquidAvatarGroup people={[{ id: "alex", name: "Alex Morgan", initials: "AM" }, { id: "sam", name: "Sam Lee", initials: "SL" }]} />',
  LiquidBadge: '<LiquidBadge label="3 new files"><span>Inbox</span></LiquidBadge>',
  LiquidChip: '<LiquidChip>Shared</LiquidChip>',
  LiquidToggleButton: '<LiquidToggleButton onChange={(selected) => console.log(selected)}>Favorite</LiquidToggleButton>',
  LiquidAlertDialog: '<LiquidAlertDialog triggerLabel="Delete file" title="Delete this file?"><p>Review this action before confirming.</p></LiquidAlertDialog>',
  LiquidDrawer: '<LiquidDrawer triggerLabel="Open settings" title="Settings"><p>Your settings controls.</p></LiquidDrawer>',
  LiquidDisclosure: '<LiquidDisclosure title="Advanced settings"><p>Additional controls.</p></LiquidDisclosure>',
  LiquidDisclosureGroup: '<LiquidDisclosureGroup items={[{ id: "permissions", title: "Permissions", content: <p>Private folder</p> }]} />',
  LiquidAutocomplete: `<LiquidAutocomplete label="Find a folder" options={${options}} />`,
  LiquidDateRangePicker: '<LiquidDateRangePicker label="Project dates" />',
  LiquidFieldset: '<LiquidFieldset legend="Folder settings"><p>Place related form controls here.</p></LiquidFieldset>',
  LiquidInputGroup: '<LiquidInputGroup label="Website" prefix="https://" placeholder="example.com" />',
  LiquidInputOTP: '<LiquidInputOTP label="Verification code" />',
  LiquidErrorMessage: '<LiquidErrorMessage>Enter a valid folder name.</LiquidErrorMessage>',
  LiquidColorArea: '<LiquidColorArea label="Choose a color" />',
  LiquidColorField: '<LiquidColorField label="Accent color" />',
  LiquidColorPicker: '<LiquidColorPicker label="Accent color" />',
  LiquidColorSlider: '<LiquidColorSlider label="Hue" channel="hue" />',
  LiquidColorSwatch: '<LiquidColorSwatch color="#0878ed" aria-label="Blue" />',
  LiquidColorSwatchPicker: '<LiquidColorSwatchPicker label="Accent color" colors={[{ color: "#0878ed", label: "Blue" }, { color: "#24805b", label: "Green" }]} />',
  LiquidButtonGroup: '<LiquidButtonGroup actions={[{ id: "upload", label: "Upload" }, { id: "new-folder", label: "New folder" }]} onAction={(id) => console.log(id)} />',
  LiquidCloseButton: '<LiquidCloseButton aria-label="Close panel" onPress={() => console.log("Close")} />',
  LiquidToolbar: '<LiquidToolbar aria-label="File actions"><button type="button">Refresh</button></LiquidToolbar>',
  LiquidMeter: '<LiquidMeter label="Storage used" value={60} />',
  LiquidSkeleton: '<LiquidSkeleton style={{ width: 240, height: 24 }} />',
  LiquidSpinner: '<LiquidSpinner aria-label="Loading files" />',
  LiquidSurface: '<LiquidSurface><p>Your content</p></LiquidSurface>',
  LiquidScrollShadow: '<LiquidScrollShadow style={{ maxHeight: 160 }}><p>Place scrollable content here.</p></LiquidScrollShadow>',
  LiquidSeparator: '<LiquidSeparator />',
  LiquidKbd: '<LiquidKbd>Ctrl + K</LiquidKbd>',
  LiquidLink: '<LiquidLink href="/files">View files</LiquidLink>',
  LiquidTypography: '<LiquidTypography>Project overview</LiquidTypography>',
  LiquidTagGroup: '<LiquidTagGroup label="Tags" items={[{ id: "research", label: "Research" }]} />',
  LiquidNavbar: `<LiquidNavbar brand="My app" items={${navigation}} activeKey="files" onNavigate={(id) => console.log(id)} />`,
  LiquidSidebar: `<LiquidSidebar items={${navigation}} activeKey="files" onNavigate={(id) => console.log(id)} />`,
  LiquidComboBox: `<LiquidComboBox label="Find a folder" options={${options}} />`,
  LiquidListBox: `<LiquidListBox label="Folders" options={${options}} />`,
  LiquidBreadcrumbs: `<LiquidBreadcrumbs items={${options}} onNavigate={(id) => console.log(id)} />`,
  LiquidTable: `<LiquidTable ${table} selectionMode="multiple" selectionAppearance="subtle" />`,
  LiquidPagination: '<LiquidPagination page={1} totalPages={5} onChange={(page) => console.log(page)} />',
  LiquidCalendar: '<LiquidCalendar label="Select a date" />',
  LiquidRangeCalendar: '<LiquidRangeCalendar label="Select a date range" />',
  LiquidDateField: '<LiquidDateField label="Project date" />',
  LiquidTimeField: '<LiquidTimeField label="Meeting time" />',
  LiquidDatePicker: '<LiquidDatePicker label="Due date" />',
  LiquidSearchField: '<LiquidSearchField label="Find a file" placeholder="Search files" />',
  LiquidTextArea: '<LiquidTextArea label="Project description" />',
  LiquidNumberField: '<LiquidNumberField label="Copies" defaultValue={1} minValue={1} />',
  LiquidRadioGroup: '<LiquidRadioGroup label="Folder visibility" options={[{ value: "private", label: "Only me" }, { value: "team", label: "My team" }]} defaultValue="private" />',
  LiquidCheckboxGroup: '<LiquidCheckboxGroup label="Sync options" options={[{ value: "wifi", label: "Wi-Fi only" }, { value: "offline", label: "Keep offline" }]} />',
  LiquidActionButton: '<LiquidActionButton type="submit">Create folder</LiquidActionButton>',
};
const common = new Set(['children','value','defaultValue','onChange','onPress','onClick','onValueChange','checked','defaultChecked','disabled','isDisabled','isSelected','defaultSelected','selectedKey','defaultSelectedKey','onSelectionChange','selectedKeys','selectionMode','onSubmit','onReset','isRequired','isInvalid','name','min','max','step','minValue','maxValue','isOpen','defaultOpen','onOpenChange','isIndeterminate','href','aria-label','className','style','type']);
const descriptions = {
 LiquidButton:'A button with normal, clear-glass and colored-glass finishes. Uses HeroUI onPress for activation.',
 GlassButton:'A native button with a glass surface. Uses the native onClick event.',
 LiquidNavbar:'A navigation header with a brand, real links, active-item styling and an optional actions slot.',
 GlassNavbar:'A low-level glass navigation container. Supply your own links as children.',
 LiquidSidebar:'A vertical navigation area with optional controlled collapse, counts and footer content.',
 LiquidInput:'A labeled, single-line text field. Use inputProps for native input options such as placeholder.',
 LiquidForm:'A form container with HeroUI validation support. You supply fields and submission behavior.',
 GlassUploadButton:'An upload action button. It does not open a file picker or upload files by itself.',
 LiquidEmptyState:'An empty-content panel. Alias of GlassEmptyState with exactly the same props.',
 GlassEmptyState:'An empty-content panel for no files, no results or first-use screens, with optional icon and actions.',
 FinderTable:'A table with solid, alternating-row styling. Uses the same data shape as LiquidTable.',
 LiquidTable:'A data table with glass or Finder-style appearance, row selection and custom cell contents.',
 LiquidToastProvider:'Mount once near the application root to display notifications created with the toast helper.',
};
const extras = {
 LiquidButton: '\n## Choose an appearance\n\n```tsx\n<LiquidButton appearance="normal">Normal</LiquidButton>\n<LiquidButton appearance="glass">Clear glass</LiquidButton>\n<LiquidButton appearance="colored" glassColor="#0878ed">Blue glass</LiquidButton>\n```\n\nUse `isDisabled` to disable the button. Use `onPress` for mouse, touch and keyboard activation. A button defaults to an ordinary action; set `type="submit"` inside a form when it should submit. Only the optional `/native` entry retains `onClick` and `disabled` as its native button API. A button does not perform navigation, save data or submit an API request unless you provide that behavior.\n',
 LiquidNavbar: '\n## Navigation behavior\n\nEach item needs a stable `id`, visible `label` and real `href`. `activeKey` should match the current page, usually derived from your router. `onNavigate` receives the clicked item ID; it does not prevent the anchor from following `href`. You do not need local state merely to follow links. For Next.js, derive `activeKey` from `usePathname()` in a client component.\n\n`brand` and `actions` accept React content. `appearance` accepts `"normal"`, `"glass"` (default), or `"colored"`. `glass={{ mode: "compatible" }}` forces the compatible material. Icons are optional React nodes on items; `count` is an optional number. The navbar does not implement your routes or a mobile navigation menu.\n\n```tsx\n"use client";\n\nimport { LiquidNavbar, LiquidButton } from "@justfrenzy/liquid-glass/heroui";\n\nexport function Navigation() {\n  return (\n    <LiquidNavbar\n      brand={<a href="/">My app</a>}\n      items={[\n        { id: "files", label: "Files", href: "/files" },\n        { id: "shared", label: "Shared", href: "/shared", count: 3 },\n      ]}\n      activeKey="files"\n      appearance="glass"\n      actions={<LiquidButton onPress={() => console.log("Upload")}>Upload</LiquidButton>}\n    />\n  );\n}\n```\n',
 LiquidSidebar: '\n## Collapse and routing\n\nFor an interactive collapse control, keep `isCollapsed` in `useState` and pass its setter as `onCollapsedChange`. Items use ordinary links: `onNavigate` reports an ID but does not cancel navigation. Match `activeKey` to the current route. `appearance` accepts `"normal"`, `"glass"`, or `"colored"`.\n',
 LiquidInput: '\n## Controlled text\n\nUse `value` and `onChange` together; the callback receives the text string, not an input event. Native input options belong in `inputProps`, for example `inputProps={{ placeholder: "Name", type: "email" }}`. Use `isRequired`, `isInvalid` and `isDisabled` for form states.\n',
 LiquidPagination: '\n## Controlled page\n\nThe example demonstrates the callback shape. In a working pagination control, store `page` in React state and update it in `onChange`; passing a fixed `page={1}` keeps selection on page 1. Load or filter your actual data separately.\n',
 LiquidToastProvider: '\n## Trigger a notification\n\nImport `toast` from `/heroui` and call `toast.success("Saved")` from an event handler. Mount one provider near your app root; it is not a wrapper for children.\n',
 LiquidForm: '\n## Submission\n\nUse `event.preventDefault()` for client-side submission and read `new FormData(event.currentTarget)`. Replace the logging with your own validation and API call. Fields need `name` values to appear in FormData. A library form does not create folders or persist data.\n',
 GlassRenderingProvider: '\n## Rendering modes\n\nThe provider is optional. `auto` is the default, `compatible` forces the reflective CSS finish, and `fallback` selects basic blur. This controls rendering, not application light/dark theme. Context also reaches portal overlays.\n',
};
extras.LiquidNavbar += '\n## Icon, SVG and styled brand text\n\n`brand` accepts any React content, not just a string. For an icon next to text, use `brandIcon`; the navbar handles spacing and alignment. `brandHref` turns the entire brand into one link. The icon is decorative because the visible brand supplies its accessible name.\n\n```tsx\n"use client";\n\nimport { LiquidNavbar } from "@justfrenzy/liquid-glass";\n\nexport function BrandedNavbar() {\n  return (\n    <LiquidNavbar\n      brand={<span><strong>Code</strong><span style={{ fontWeight: 400 }}>Drive</span></span>}\n      brandIcon={\n        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>\n          <path d="M3 7h7l2 3h9v10H3z" />\n        </svg>\n      }\n      brandHref="/"\n      items={[{ id: "files", label: "Files", href: "/files" }]}\n      activeKey="files"\n    />\n  );\n}\n```\n\nThe icon defaults to 24px. Override `--lg-brand-icon-size` in your app CSS for a different size. Imported React icon components or an image with empty `alt` can also be supplied to `brandIcon`. Text and `currentColor` icons inherit your application theme.\n\n## Image logo or icon-only brand\n\nPass the whole logo as `brand` when you do not want accompanying text. Give it an accessible name; do not put a meaningful icon-only logo in the decorative `brandIcon` slot.\n\n```tsx\n"use client";\n\nimport { LiquidNavbar } from "@justfrenzy/liquid-glass";\n\nexport function IconOnlyNavbar() {\n  return (\n    <LiquidNavbar\n      brand={\n        <svg role="img" aria-label="CodeDrive home" width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>\n          <path d="M3 7h7l2 3h9v10H3z" />\n        </svg>\n      }\n      brandHref="/"\n      items={[{ id: "files", label: "Files", href: "/files" }]}\n    />\n  );\n}\n```\n\nFor an image wordmark, use `brand={<img src="/wordmark.svg" alt="CodeDrive" style={{ height: 28, width: "auto", maxWidth: "100%" }} />}` and supply your own asset. A Next.js Image component can be passed as JSX too.\n\n## Custom links\n\nFor your own router Link component or anchor, put the complete link in `brand` and omit `brandHref` to avoid nested links. Existing `brand={<a href="/">My app</a>}` usage remains supported. Use the brand slots `data-slot="navbar-brand"`, `navbar-brand-icon` and `navbar-brand-content` for targeted application CSS.\n';
const sharedAliases = { GlassButton: "LiquidButton", GlassSwitch: "LiquidSwitch", GlassSlider: "LiquidSlider", GlassInput: "LiquidInput", GlassCard: "LiquidCard", GlassToolbar: "LiquidToolbar", GlassSearch: "LiquidSearchField", GlassNavbar: "LiquidNavbar", GlassSidebar: "LiquidSidebar" };
extras.LiquidSidebar += '\n## Controlled collapse example\n\n```tsx\n"use client";\n\nimport { useState } from "react";\nimport { LiquidSidebar } from "@justfrenzy/liquid-glass";\n\nexport function CollapsibleSidebar() {\n  const [collapsed, setCollapsed] = useState(false);\n  return (\n    <LiquidSidebar\n      items={[{ id: "files", label: "Files", href: "/files" }]}\n      activeKey="files"\n      isCollapsed={collapsed}\n      onCollapsedChange={setCollapsed}\n      footer={<span>Your workspace</span>}\n    />\n  );\n}\n```\n';
extras.LiquidSidebar += '\n## Put components inside the sidebar\n\nThe `footer` prop accepts React content, including buttons, skeletons and a modal with a form. The `items` array is navigation data, not arbitrary component children. The footer is hidden when collapsed. See the complete [sidebar New Folder modal recipe](https://github.com/justfrenzy22/liquid-glass/blob/main/docs/recipes/sidebar-new-folder.md) for an example with a working form and local folder state. `LiquidModal` renders its own trigger button, so place the modal itself in the footer.\n';
extras.LiquidSidebar += '\n## Optional heading\n\nThe sidebar has no visible heading by default in version 0.2.1 and newer. Omit `heading` to start directly with navigation links. Set `heading="Workspace"` (or any text) only when you want a title. Empty or whitespace-only strings are treated as no heading. Without a heading or collapse control, no empty title row is rendered. A collapse button remains available when `onCollapsedChange` is supplied.\n\nUse `label="Project navigation"` for a screen-reader name without adding visible text. The default accessible label is "Sidebar navigation".\n';
for (const [alias, canonical] of Object.entries(sharedAliases)) {
  examples[alias] = examples[canonical].replaceAll(canonical, alias);
  descriptions[alias] = `The same component as ${canonical}, with identical props and liquid design. This name is an alias, not a simpler visual variant.`;
  extras[alias] = `\n## Shared design\n\nSee [${canonical}](${canonical}.md) for the main usage guide. Import either name from the package root; they render exactly the same component. Choose normal, glass or colored appearance through props where supported, not by switching prefixes. For the previous native API, explicitly import from \`@justfrenzy/liquid-glass/native\`.\n` + (extras[canonical] ?? "").replaceAll(canonical, alias);
}
function escapeCell(value) { return String(value).replaceAll('|','\\|').replaceAll('\n',' '); }
const index=['# Component guides','','Install with `npm install @justfrenzy/liquid-glass`. Browser component imports load styles automatically. See [getting started](../getting-started.md) for React/Next.js setup, themes and common mistakes.','','For version 0.2.0 or newer, import all main components directly from `@justfrenzy/liquid-glass`. Start with [LiquidButton](LiquidButton.md), [LiquidNavbar](LiquidNavbar.md), [LiquidInput](LiquidInput.md) and [LiquidSidebar](LiquidSidebar.md).','','| Component | Import entry |','| --- | --- |'];
for(const row of rows) {
 const example=examples[row.name]; if(!example)throw new Error(`Missing example: ${row.name}`);
 const fields=row.fields.filter(f=>f.local||f.required||common.has(f.name)).filter(f=>!f.name.startsWith('onMouse')&&!f.name.endsWith('Capture'));
 const propRows=fields.map(f=>`| \`${escapeCell(f.name)}\` | ${f.required?'Yes':'No'} | \`${escapeCell(f.type)}\` | ${escapeCell(f.description||'')} |`);
 const code=`"use client";\n\nimport { ${row.name} } from "@justfrenzy/liquid-glass${row.entry}";\n\nexport function ${row.name}Example() {\n  return (\n    ${example}\n  );\n}`;
 const page=[`# ${row.name}`,'',descriptions[row.name]??`Use ${row.name} in a React client component. The example below uses the exported library API.`,'','## Example','','```tsx',code,'```','','Browser imports load styling automatically. For Next.js, keep interactive state and handlers inside a client component. See [getting started](../getting-started.md).','','## Props','','The table includes the component-specific props and common control props. Required means the TypeScript prop must be supplied; accessibility may also require a visible label or `aria-label`. Additional inherited DOM/HeroUI props are available through the shipped declarations.','','| Prop | Required | Type | Notes |','| --- | --- | --- | --- |',...propRows,'',extras[row.name]??'','## TypeScript','','```tsx',`import type { ComponentProps } from "react";`,`import { ${row.name} } from "@justfrenzy/liquid-glass${row.entry}";`,`type Props = ComponentProps<typeof ${row.name}>;`,'```','','Text follows the host application color. Theme markers and foreground overrides are documented in [getting started](../getting-started.md#themes). Glass controls accept either a `glass` configuration or direct surface props as listed above; these are not interchangeable.','','[All component guides](README.md)',''].join('\n');
 writeFileSync(`docs/components/${row.name}.md`,page,'utf8');
 index.push(`| [${row.name}](${row.name}.md) | \`@justfrenzy/liquid-glass${row.entry}\` |`);
}
index.push('','## Compatibility names','','Use the package root for the main Liquid collection. Matching Glass names (including GlassNavbar and GlassSidebar) are aliases of the same liquid designs. The previous simpler native controls live only under `/native`; see [migration](../migration-0.2.md). Legacy `LiquidNextUI*` exports remain aliases of their corresponding `Liquid*` components. The short names above are recommended for new code. `SolidCard`, `FinderTable`, `LiquidForm` and `LiquidActionButton` are documented separately. Helpers such as `toast` and `parseColor` are functions, not visual components.','','The guides are generated from the current public TypeScript signatures with curated examples. Regenerate with `npm run docs:generate` and validate examples with `npm run docs:check`.','');
writeFileSync('docs/components/README.md',index.join('\n'),'utf8');
console.log(`Generated ${rows.length} component guides.`);
