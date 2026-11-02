import { useState } from "react";
import { createRoot } from "react-dom/client";
import { GlassRenderingProvider, GlassButton, GlassCard, GlassSlider, useGlassEnvironment, type GlassRenderMode } from "@justfrenzy22/liquid-glass";
import { LiquidButton, LiquidSwitch, LiquidInput, LiquidTabs, LiquidNavbar, LiquidSidebar, LiquidModal, LiquidColorPicker, FinderTable } from "@justfrenzy22/liquid-glass/heroui";
import "@justfrenzy22/liquid-glass/styles.css";
import "./playground.css";

function Demo() {
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
    <div className="scene">
      <LiquidNavbar brand="Liquid Glass" items={items.slice(0, 2)} activeKey={active} onNavigate={setActive} />
      <div className="workspace"><LiquidSidebar heading="Workspace" items={items} activeKey={active} onNavigate={setActive} isCollapsed={collapsed} onCollapsedChange={setCollapsed} footer="Your space to create." />
        <div className="examples">
          <section><h2>Button finishes</h2><div className="stack">
            <LiquidButton appearance="normal" onPress={() => setClicks(clicks + 1)}>Normal</LiquidButton>
            <LiquidButton onPress={() => setClicks(clicks + 1)}>Clear glass</LiquidButton>
            <LiquidButton appearance="colored" onPress={() => setClicks(clicks + 1)}>Blue glass</LiquidButton>
            <output aria-label="Button presses">{clicks} presses</output>
          </div></section>
          <section><h2>Native primitives</h2><div className="stack"><GlassSlider label="Glass slider" value={slider} onValueChange={setSlider} /><GlassButton onClick={() => setClicks(clicks + 1)}>Native button</GlassButton></div></section>
          <section><h2>HeroUI interactions</h2><div className="stack"><LiquidSwitch label="Automatic sync" isSelected={sync} onChange={setSync} /><LiquidInput label="Find a file" value={query} onChange={setQuery} inputProps={{ type: "search", placeholder: "Search…" }} /><output aria-label="Search result">{query || "Your files are ready."}</output></div></section>
          <section><h2>Draggable tabs</h2><LiquidTabs label="File views" selectedKey={tab} onSelectionChange={setTab} items={[
            { id: "files", label: "Files", content: "All your files in one place." }, { id: "recent", label: "Recent", content: "Continue where you left off." }, { id: "shared", label: "Shared", content: "A space for the whole team." },
          ]} /></section>
          <section><h2>Overlays</h2><div className="stack"><LiquidModal triggerLabel="Open modal" title="A little more detail"><p>This is the packaged HeroUI modal. Press Escape or Done to close it.</p></LiquidModal><LiquidColorPicker label="Choose accent" defaultValue="#0878ed" /></div></section>
          <section><h2>Glass panel</h2><GlassCard opacity={0.1} blur={0}><h3>Your next idea</h3><p>A separate decoration layer keeps text and controls sharp.</p></GlassCard></section>
          <section className="full"><h2>Quiet file lists</h2><FinderTable aria-label="Example files" columns={[{ id: "name", label: "Name", isRowHeader: true }, { id: "kind", label: "Kind" }]} rows={[
            { id: "brief", values: { name: "Project brief", kind: "Document" } }, { id: "research", values: { name: "Research", kind: "Folder" } }, { id: "notes", values: { name: "Meeting notes", kind: "Document" } },
          ]} /></section>
        </div>
      </div>
    </div>
    <footer>MIT licensed. Desktop Chromium can refract the backdrop; Safari and mobile use simulated reflections and native blur.</footer>
  </main></GlassRenderingProvider>;
}
createRoot(document.getElementById("root")!).render(<Demo />);
