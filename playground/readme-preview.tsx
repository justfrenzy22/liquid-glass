import { useState } from "react";
import { GlassRenderingProvider, GlassSlider, type GlassRenderMode } from "@justfrenzy/liquid-glass";
import { LiquidButton, LiquidSwitch, LiquidInput, LiquidTabs } from "@justfrenzy/liquid-glass/heroui";
import "./readme-preview.css";

/** Documentation compositions use the same public exports and styles as consumers. */
export function ReadmePreview() {
  const params = new URLSearchParams(location.search);
  const mode: GlassRenderMode = params.get("mode") === "compatible" ? "compatible" : "auto";
  const motion = params.has("motion");
  const [value, setValue] = useState(40);
  const [sync, setSync] = useState(true);
  const [tab, setTab] = useState<string | number>("files");
  if (motion) return <GlassRenderingProvider mode={mode}>
    <main className="motion-preview" aria-label="Slider animation capture">
      <div className="preview-eyebrow">LIQUID GLASS · REAL COMPONENT CAPTURE</div>
      <h1>Move a little. See a little more.</h1>
      <div className="motion-control"><GlassSlider label="Drag the glass" value={value} onValueChange={setValue} /></div>
      <div className="motion-caption">Desktop Chromium · expanding, refractive thumb</div>
    </main>
  </GlassRenderingProvider>;
  return <GlassRenderingProvider mode={mode}>
    <main className="readme-preview" aria-label="Library preview capture">
      <header className="preview-heading">
        <div className="preview-eyebrow">REACT COMPONENTS · A REFLECTIVE FINISH</div>
        <h1>Liquid Glass<span className="preview-dot">.</span></h1>
        <p>Small details. A little more depth.</p>
        <div className="preview-badges"><span>React 19</span><span>TypeScript</span><span>HeroUI</span><span>{mode === "compatible" ? "Safari / mobile finish" : "Adaptive glass rendering"}</span></div>
      </header>
      <div className="preview-grid">
        <section className="preview-card"><div className="preview-caption">01 / THREE BUTTON FINISHES</div>
          <div className="preview-buttons"><LiquidButton appearance="normal">Normal</LiquidButton><LiquidButton>Clear glass</LiquidButton><LiquidButton appearance="colored">Blue glass</LiquidButton></div>
        </section>
        <section className="preview-card"><div className="preview-caption">02 / ROOM TO MOVE</div>
          <div className="preview-movement"><GlassSlider label="Find your balance" value={value} onValueChange={setValue} forceActive /><LiquidSwitch label="Automatic sync" isSelected={sync} onChange={setSync} /></div>
        </section>
        <section className="preview-card"><div className="preview-caption">03 / A CLEAR PLACE TO START</div>
          <div className="preview-search"><LiquidInput label="Find a file" inputProps={{ placeholder: "Your next great idea…", type: "search" }} /><span>Sharp text. Soft reflections.</span></div>
        </section>
        <section className="preview-card"><div className="preview-caption">04 / SLIDE INTO YOUR NEXT VIEW</div>
          <div className="preview-tabs"><LiquidTabs label="Preview views" selectedKey={tab} onSelectionChange={setTab} items={[
            { id: "files", label: "Files", content: "Everything in its place." },
            { id: "recent", label: "Recent", content: "Pick up where you left off." },
            { id: "shared", label: "Shared", content: "A little space for teamwork." },
          ]} /></div>
        </section>
      </div>
      <footer className="preview-footer"><span>Actual library components · no rendered mockups</span><span>MIT licensed · github.com/justfrenzy22/liquid-glass</span></footer>
    </main>
  </GlassRenderingProvider>;
}
