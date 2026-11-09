import { useState } from "react";
import { createRoot } from "react-dom/client";
import { cn, GlassRenderingProvider, GlassEmptyState, GlassNavbar, GlassSidebar, GlassSwitch, useGlassEnvironment, type GlassRenderMode } from "@justfrenzy/liquid-glass";
import { LiquidButton, LiquidSwitch, LiquidInput, LiquidTabs, LiquidNavbar, LiquidSidebar, LiquidModal, LiquidColorPicker, LiquidSkeleton, FinderTable } from "@justfrenzy/liquid-glass/heroui";
import { GlassButton, GlassSlider, GlassCard } from "@justfrenzy/liquid-glass/native";
import "./consumer.css";

function ConsumerFixture() {
  const [modalOpen, setModalOpen] = useState(false);
  const [closeCount, setCloseCount] = useState(0);
  const [mode, setMode] = useState<GlassRenderMode>("auto");
  const [slider, setSlider] = useState(40);
  const [sync, setSync] = useState(true);
  const [query, setQuery] = useState("");
  const [clicks, setClicks] = useState(0);
  const [tab, setTab] = useState<string | number>("files");
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("files");
  const environment = useGlassEnvironment();
  const items = [{ id: "files", href: "#files", label: "Files", icon: "▱" }, { id: "recent", href: "#recent", label: "Recent", icon: "◷" }, { id: "shared", href: "#shared", label: "Shared", icon: "↗" }];
  return <GlassRenderingProvider mode={mode}><main>
    <header className="intro"><p>REACT · TYPESCRIPT · HEROUI</p><h1>Liquid Glass</h1><p>Reflective controls. A reusable library.</p><a href="https://github.com/justfrenzy22/liquid-glass">Source & documentation ↗</a></header>
    <div className="settings"><label>Rendering <select aria-label="Rendering" value={mode} onChange={(event) => setMode(event.target.value as GlassRenderMode)}><option value="auto">Automatic</option><option value="compatible">Safari / mobile glass</option><option value="fallback">Basic blur</option></select></label>
      <output aria-label="Environment">{environment ? `${environment.browser} · ${environment.device}` : "Detecting…"}</output>
    </div>
    <div data-tailwind-example className="bg-glass-panel rounded-glass p-4">Custom Tailwind panel</div>
    <div className="scene">
      <GlassNavbar brand={<span><strong>Liquid</strong> Glass</span>} brandHref="#brand-home" brandIcon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 7h7l2 3h9v10H3z" /></svg>} items={items.slice(0, 2)} activeKey={active} onNavigate={setActive} />
      <div className="workspace"><GlassSidebar className="w-[232px] max-sm:w-full" classNames={{ header: "gap-5", actions: "p-2" }} header={<LiquidSkeleton style={{ width: 120, height: 24 }} />} actions={<LiquidButton appearance="normal" onPress={() => setClicks(value => value + 1)}>Sidebar action</LiquidButton>} style={{ height: 440 }} items={items} activeKey={active} onNavigate={setActive} isCollapsed={collapsed} onCollapsedChange={setCollapsed} footer="Your space to create."><div style={{ minHeight: 480 }}>Sidebar custom content</div></GlassSidebar>
        <div className="examples">
          <section><h2>Button finishes</h2><div className="stack">
            <LiquidButton appearance="normal" onPress={() => setClicks(clicks + 1)}>Normal</LiquidButton>
            <LiquidButton onPress={() => setClicks(clicks + 1)}>Clear glass</LiquidButton>
            <LiquidButton className={cn("font-medium", "font-bold")} classNames={{ content: "px-8" }} appearance="colored" onPress={() => setClicks(clicks + 1)}>Blue glass</LiquidButton>
            {(["normal", "glass", "colored"] as const).map(appearance => <div key={appearance} data-button-sizes={appearance} className="flex gap-3">
              <LiquidButton appearance={appearance}>A</LiquidButton>
              <LiquidButton appearance={appearance}>Cancel</LiquidButton>
              <LiquidButton appearance={appearance} type="icon" aria-label={`Add ${appearance}`} onPress={() => setClicks(value => value + 1)}><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 4v16M4 12h16" fill="none" stroke="currentColor" strokeWidth="2" /></svg></LiquidButton>
              <LiquidButton appearance={appearance} isIconOnly type="submit" aria-label={`Save ${appearance}`}><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 4h16v16H4z" fill="none" stroke="currentColor" /></svg></LiquidButton>
            </div>)}
            <output aria-label="Button presses">{clicks} presses</output>
          </div></section>
          <section><GlassEmptyState title="No files yet" description="Upload a file to get started." actions={<GlassButton onClick={() => setClicks(clicks + 1)}>Upload first file</GlassButton>} /></section>
          <section><h2>Native primitives</h2><div className="stack"><GlassSlider label="Glass slider" value={slider} onValueChange={setSlider} /><GlassButton onClick={() => setClicks(clicks + 1)}>Native button</GlassButton></div></section>
          <section><h2>HeroUI interactions</h2><div className="stack"><GlassSwitch label="Automatic sync" isSelected={sync} onChange={setSync} /><LiquidInput label="Find a file" value={query} onChange={setQuery} inputProps={{ type: "search", placeholder: "Search…" }} /><output aria-label="Search result">{query || "Your files are ready."}</output></div></section>
          <section><h2>Draggable tabs</h2><LiquidTabs label="File views" selectedKey={tab} onSelectionChange={setTab} items={[
            { id: "files", label: "Files", content: "All your files in one place." }, { id: "recent", label: "Recent", content: "Continue where you left off." }, { id: "shared", label: "Shared", content: "A space for the whole team." },
          ]} /></section>
          <section><h2>Overlays</h2><div className="stack"><LiquidModal triggerLabel="Open modal" title="A little more detail" isOpen={modalOpen} onOpenChange={setModalOpen} onClose={() => setCloseCount(value => value + 1)} footer={({ close }) => <><LiquidButton appearance="normal" onPress={close}>Cancel</LiquidButton><LiquidButton appearance="colored" onPress={() => { setClicks(value => value + 1); close(); }}>Save</LiquidButton></>}><p>This is the packaged HeroUI modal. Press Escape or use your own footer actions to close it.</p></LiquidModal><output aria-label="Modal closes">{closeCount}</output><LiquidModal triggerLabel="No footer modal" title="No default actions"><p>No footer supplied.</p></LiquidModal><LiquidModal triggerLabel="Body actions modal" title="Custom body actions" hideCloseButton>{({ close }) => <LiquidButton onPress={close}>Close from body</LiquidButton>}</LiquidModal><LiquidColorPicker label="Choose accent" defaultValue="#0878ed" /></div></section>
          <section><h2>Glass panel</h2><GlassCard opacity={0.1} blur={0}><h3>Your next idea</h3><p>A separate decoration layer keeps text and controls sharp.</p></GlassCard></section>
          <section className="full"><h2>Quiet file lists</h2><FinderTable aria-label="Example files" selectionMode="single" columns={[{ id: "name", label: "Name", isRowHeader: true }, { id: "kind", label: "Kind" }]} rows={[
            { id: "brief", values: { name: "Project brief", kind: "Document" } }, { id: "research", values: { name: "Research", kind: "Folder" } }, { id: "notes", values: { name: "Meeting notes", kind: "Document" } },
          ]} /></section>
        </div>
      </div>
    </div>
    <footer>MIT licensed. Desktop Chromium can refract the backdrop; Safari and mobile use simulated reflections and native blur.</footer>
  </main></GlassRenderingProvider>;
}
createRoot(document.getElementById("root")!).render(<ConsumerFixture />);
