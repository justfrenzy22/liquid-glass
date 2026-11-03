import { expect, test } from "@playwright/test";
test("the standalone package keeps styles, state, overlays and navigation working", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByLabel("Environment")).not.toHaveText("Detecting…");
  const brand = page.getByRole("link", { name: "Liquid Glass", exact: true });
  await expect(brand).toHaveAttribute("href", "#brand-home");
  await expect(brand.locator('[data-slot="navbar-brand-icon"]')).toHaveAttribute("aria-hidden", "true");
  await expect(brand.locator("svg")).toHaveCSS("width", "24px");
  const weights = await brand.evaluate(element => ({
    brand: Number(getComputedStyle(element).fontWeight),
    strong: Number(getComputedStyle(element.querySelector("strong")!).fontWeight),
  }));
  expect(weights.strong).toBeGreaterThan(weights.brand);
  await brand.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#brand-home$/);
  await page.getByRole("button", { name: "Blue glass", exact: true }).click();
  await expect(page.getByLabel("Button presses")).toHaveText("1 presses");
  const emptyState = page.getByRole("region", { name: "No files yet" });
  await expect(emptyState).toHaveAccessibleDescription("Upload a file to get started.");
  await emptyState.getByRole("button", { name: "Upload first file" }).click();
  await expect(page.getByLabel("Button presses")).toHaveText("2 presses");
  const sidebar = page.getByRole("complementary", { name: "Sidebar navigation", exact: true });
  const top = sidebar.locator('[data-slot="sidebar-top"]');
  const actions = sidebar.locator('[data-slot="sidebar-actions"]');
  const body = sidebar.locator('[data-slot="sidebar-body"]');
  const footer = sidebar.locator('[data-slot="sidebar-footer"]');
  await expect(top).toHaveCSS("gap", "20px");
  await expect(actions).toHaveCSS("padding", "8px");
  if ((page.viewportSize()?.width ?? 0) >= 640) await expect(sidebar).toHaveCSS("width", "232px");
  const customized = page.getByRole("button", { name: "Blue glass", exact: true });
  await expect(customized).toHaveCSS("font-weight", "700");
  await expect(customized.locator(".px-8")).toHaveCSS("padding-left", "32px");
  expect((await top.boundingBox())!.y).toBeLessThan((await actions.boundingBox())!.y);
  expect((await actions.boundingBox())!.y).toBeLessThan((await body.boundingBox())!.y);
  const sideBounds = (await sidebar.boundingBox())!;
  const footerBounds = (await footer.boundingBox())!;
  expect(sideBounds.y + sideBounds.height - footerBounds.y - footerBounds.height).toBeLessThanOrEqual(16);
  expect(await body.evaluate(element => element.scrollHeight > element.clientHeight)).toBe(true);
  await actions.getByRole("button", { name: "Sidebar action" }).click();
  await expect(page.getByLabel("Button presses")).toHaveText("3 presses");
  await page.getByRole("searchbox", { name: "Find a file" }).fill("design");
  await expect(page.getByLabel("Search result")).toHaveText("design");
  const slider = page.getByRole("slider", { name: "Glass slider" });
  await slider.focus();
  await slider.press("ArrowRight");
  await expect(slider).toHaveValue("41");
  await page.getByRole("tab", { name: "Recent", exact: true }).click();
  await expect(page.getByRole("tabpanel")).toHaveText("Continue where you left off.");
  const tabStrip = page.getByRole("tablist", { name: "File views" }).locator("..");
  await expect(tabStrip.locator(":scope > [data-glass-mode]")).toHaveCSS("position", "absolute");
  expect((await tabStrip.boundingBox())!.height).toBeLessThan(70);
  await page.getByRole("button", { name: "Open modal" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await page.getByRole("button", { name: "Collapse sidebar" }).click();
  await expect(page.getByRole("button", { name: "Expand sidebar" })).toBeVisible();
  await expect(top).toHaveCount(0);
  await expect(actions).toHaveCount(0);
  await expect(sidebar.locator('[data-slot="sidebar-content"]')).toHaveCount(0);
  await expect(footer).toHaveCount(0);
  await page.getByLabel("Rendering").selectOption("compatible");
  const button = page.getByRole("button", { name: "Clear glass", exact: true });
  await expect(button.locator("[data-glass-mode]")).toHaveAttribute("data-glass-mode", "compatible");
  await expect(button).toHaveCSS("border-top-width", "0px");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: `test-results/package-${testInfo.project.name}.png`, fullPage: true });
  expect(errors).toEqual([]);
});

test("automatic styles inherit host text and respect system and explicit themes", async ({ page }) => {
  await page.goto("/");
  const clear = page.getByRole("button", { name: "Clear glass", exact: true });
  const normal = page.getByRole("button", { name: "Normal", exact: true });
  const input = page.getByRole("searchbox", { name: "Find a file" });
  await expect(clear).toHaveCSS("border-radius", "28px");
  for (const scenario of [
    { scheme: "dark", theme: null, text: "rgb(230, 237, 247)", background: "rgb(28, 36, 50)" },
    { scheme: "dark", theme: "light", text: "rgb(23, 32, 51)", background: "rgb(255, 255, 255)" },
    { scheme: "light", theme: "dark", text: "rgb(230, 237, 247)", background: "rgb(28, 36, 50)" },
  ] as const) {
    await page.emulateMedia({ colorScheme: scenario.scheme });
    await page.evaluate(({ theme, text }) => {
      if (theme) document.documentElement.dataset.theme = theme;
      else delete document.documentElement.dataset.theme;
      document.body.style.color = text;
      document.body.style.background = theme === "light" ? "white" : "#0b1220";
      (document.querySelector(".scene") as HTMLElement).style.background = "transparent";
    }, scenario);
    await expect(clear).toHaveCSS("color", scenario.text);
    await expect(clear.locator("[data-glass-mode]")).toHaveCSS("color", scenario.text);
    await expect(input).toHaveCSS("color", scenario.text);
    await expect(normal).toHaveCSS("color", scenario.text);
    await expect(normal).toHaveCSS("background-color", scenario.background);
    await expect(page.locator("[data-tailwind-example]")).toHaveCSS("background-color", scenario.background);
    await expect(page.getByRole("button", { name: "Native button" })).toHaveCSS("color", scenario.text);
    const blue = page.getByRole("button", { name: "Blue glass", exact: true });
    await expect(blue.locator("[data-colored]")).toHaveCSS("color", "rgb(255, 255, 255)");
  }
  await page.screenshot({ path: `test-results/theme-${test.info().project.name}.png`, fullPage: true });
});


test("modal actions are optional and caller-controlled", async ({ page }) => {
  await page.goto("/");
  const open = page.getByRole("button", { name: "Open modal", exact: true });
  const dialog = page.getByRole("dialog");
  await open.click();
  await expect(dialog.getByRole("button", { name: "Done", exact: true })).toHaveCount(0);
  await dialog.getByRole("button", { name: "Cancel", exact: true }).click();
  await expect(dialog).toBeHidden();
  await expect(page.getByLabel("Modal closes")).toHaveText("1");
  await expect(open).toBeFocused();
  await open.click();
  await dialog.getByRole("button", { name: "Save", exact: true }).click();
  await expect(dialog).toBeHidden();
  await expect(page.getByLabel("Button presses")).toHaveText("1 presses");
  await expect(page.getByLabel("Modal closes")).toHaveText("2");
  await open.click();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(page.getByLabel("Modal closes")).toHaveText("3");
  await open.click();
  await dialog.getByRole("button", { name: "Close dialog", exact: true }).click();
  await expect(dialog).toBeHidden();
  await expect(page.getByLabel("Modal closes")).toHaveText("4");
  await page.getByRole("button", { name: "No footer modal", exact: true }).click();
  await expect(dialog.locator('[data-slot="modal-footer"]')).toHaveCount(0);
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await page.getByRole("button", { name: "Body actions modal", exact: true }).click();
  await expect(dialog.getByRole("button", { name: "Close dialog", exact: true })).toHaveCount(0);
  await dialog.getByRole("button", { name: "Close from body", exact: true }).click();
  await expect(dialog).toBeHidden();
});
