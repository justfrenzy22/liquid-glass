import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import React from "react";
import { renderToString } from "react-dom/server";
import * as core from "../dist/index.js";
import * as controls from "../dist/heroui.js";

test("the built package server-renders native primitives without browser globals", () => {
  const html = renderToString(React.createElement(core.GlassButton, null, "Upload"));
  assert.match(html, /<button/);
  assert.match(html, /Upload/);
  assert.match(html, /data-glass-mode="fallback"/);
});
test("public friendly aliases and legacy names expose the same HeroUI wrappers", () => {
  assert.equal(controls.LiquidButton, controls.LiquidNextUIButton);
  assert.equal(controls.LiquidSidebar, controls.LiquidNextUISidebar);
  assert.equal(controls.SolidCard, controls.NextUICard);
  const html = renderToString(React.createElement(controls.LiquidButton, { appearance: "normal" }, "Normal"));
  assert.match(html, /Normal/);
  assert.doesNotMatch(html, /data-glass-mode/);
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
test("published bundles preserve client boundaries and have no app or CSS-module imports", async () => {
  const files = (await readdir(new URL("../dist/", import.meta.url))).filter((name) => name.endsWith(".js"));
  for (const file of files) {
    const text = await readFile(new URL(`../dist/${file}`, import.meta.url), "utf8");
    assert.match(text, /^"use client";/);
    assert.doesNotMatch(text, /(?:from\s*["']|import\s*["'])(?:@\/|next\/)/);
    assert.doesNotMatch(text, /import\s*["'][^"']+\.css["']/);
  }
  const css = await readFile(new URL("../dist/styles.css", import.meta.url), "utf8");
  assert.match(css, /backdrop-filter/);
  assert.match(css, /reflectionTop/);
  assert.doesNotMatch(css, /@apply|@tailwind/);
});
