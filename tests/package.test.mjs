import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import React from "react";
import { renderToString } from "react-dom/server";
import * as core from "../dist/index.js";
import * as controls from "../dist/heroui.js";
import * as native from "../dist/native.js";

test("the unified package server-renders without browser globals", () => {
  const html = renderToString(React.createElement(core.GlassButton, null, "Upload"));
  assert.match(html, /<button/);
  assert.match(html, /Upload/);
  assert.match(html, /data-glass-mode="fallback"/);
});
test("root and heroui imports share unified designs while native remains explicit", () => {
  for (const [alias, canonical] of Object.entries({ GlassButton: "LiquidButton", GlassSwitch: "LiquidSwitch", GlassSlider: "LiquidSlider", GlassInput: "LiquidInput", GlassCard: "LiquidCard", GlassToolbar: "LiquidToolbar", GlassSearch: "LiquidSearchField", GlassNavbar: "LiquidNavbar", GlassSidebar: "LiquidSidebar" })) {
    assert.equal(core[alias], core[canonical], alias);
    assert.equal(core[canonical], controls[canonical], canonical);
  }
  assert.notEqual(core.GlassSwitch, native.GlassSwitch);
  assert.notEqual(core.GlassNavbar, native.GlassNavbar);
  assert.match(renderToString(React.createElement(native.GlassSwitch, { label: "Native", defaultChecked: true })), /checked/);
});

test("public friendly aliases and legacy names expose the same HeroUI wrappers", () => {
  assert.equal(controls.LiquidButton, controls.LiquidNextUIButton);
  assert.equal(controls.LiquidSidebar, controls.LiquidNextUISidebar);
  assert.equal(controls.SolidCard, controls.NextUICard);
  const html = renderToString(React.createElement(controls.LiquidButton, { appearance: "normal" }, "Normal"));
  assert.match(html, /Normal/);
  assert.doesNotMatch(html, /data-glass-mode/);
});
test("navbar brands accept styled content and an optional decorative icon and link", () => {
  const html = renderToString(React.createElement(core.LiquidNavbar, {
    brand: React.createElement("span", null, React.createElement("strong", null, "Code"), "Drive"),
    brandIcon: React.createElement("svg", { viewBox: "0 0 24 24" }),
    brandHref: "/",
    items: [],
  }));
  assert.match(html, /<a[^>]+href="\/"[^>]+data-slot="navbar-brand"/);
  assert.match(html, /data-slot="navbar-brand-icon" aria-hidden="true"/);
  assert.match(html, /<strong>Code<\/strong>Drive/);
  const plain = renderToString(React.createElement(core.GlassNavbar, { brand: "CodeDrive", items: [] }));
  assert.doesNotMatch(plain, /navbar-brand-icon/);
  assert.match(plain, /<div[^>]+data-slot="navbar-brand"/);
});

test("sidebars omit headings and empty title rows unless requested", () => {
  const items = [{ id: "files", label: "Files", href: "/files" }];
  for (const heading of [undefined, "", "   "]) {
    const html = renderToString(React.createElement(core.LiquidSidebar, { items, heading }));
    assert.doesNotMatch(html, /data-slot="sidebar-header"|data-slot="sidebar-heading"/);
    assert.match(html, /aria-label="Sidebar navigation"/);
  }
  const titled = renderToString(React.createElement(core.LiquidSidebar, { items, heading: "My workspace" }));
  assert.match(titled, /data-slot="sidebar-heading">My workspace/);
  const collapsible = renderToString(React.createElement(core.GlassSidebar, { items, onCollapsedChange: () => {} }));
  assert.match(collapsible, /aria-label="Collapse sidebar"/);
  assert.doesNotMatch(collapsible, /data-slot="sidebar-heading"/);
});

test("browser selection handles iPad desktop UAs and capability fallbacks", () => {
  const ipad = core.detectGlassEnvironment({ userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) Version/18.0 Safari/605.1.15", maxTouchPoints: 5, backdropBlur: true, svgBackdrop: true });
  assert.equal(ipad.device, "tablet");
  assert.equal(core.selectGlassRenderer("auto", ipad), "compatible");
  assert.equal(core.selectGlassRenderer("auto", { ...ipad, backdropBlur: false }), "fallback");
});

test("empty states associate their heading and description without hiding actions", () => {
  const html = renderToString(React.createElement(core.GlassEmptyState, {
    title: "No files yet",
    description: "Upload a file to get started.",
    actions: React.createElement("button", null, "Upload a file"),
  }));
  const headingId = html.match(/<h2[^>]*id="([^"]+)"/)?.[1];
  const descriptionId = html.match(/<div[^>]*id="([^"]+-description)"/)?.[1];
  assert.ok(headingId);
  assert.ok(descriptionId);
  assert.ok(html.includes(`aria-labelledby="${headingId}"`));
  assert.ok(html.includes(`aria-describedby="${descriptionId}"`));
  assert.match(html, /<button>Upload a file<\/button>/);
  const minimal = renderToString(React.createElement(core.GlassEmptyState, { title: "No results" }));
  assert.doesNotMatch(minimal, /aria-describedby=/);
  assert.equal(controls.LiquidEmptyState, core.GlassEmptyState);
});
test("browser entries load CSS while Node entries preserve CSS-free SSR", async () => {
  const files = (await readdir(new URL("../dist/", import.meta.url))).filter((name) => name.endsWith(".js"));
  for (const file of files) {
    const text = await readFile(new URL(`../dist/${file}`, import.meta.url), "utf8");
    assert.match(text, /^"use client";/);
    assert.doesNotMatch(text, /(?:from\s*["']|import\s*["'])(?:@\/|next\/)/);
    if (file.endsWith(".browser.js")) {
      assert.match(text, /import "\.\/styles\.css"/);
    } else {
      assert.doesNotMatch(text, /import\s*["'][^"']+\.css["']/);
    }
  }
  const css = await readFile(new URL("../dist/styles.css", import.meta.url), "utf8");
  assert.match(css, /backdrop-filter/);
  assert.match(css, /reflectionTop/);
  assert.doesNotMatch(css, /@apply|@tailwind/);
});
