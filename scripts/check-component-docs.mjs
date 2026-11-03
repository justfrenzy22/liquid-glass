import ts from "typescript";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const directory = ".artifacts/docs-check";
mkdirSync(directory, { recursive: true });
const files = [];
const guides = [...readdirSync("docs/components").filter(name => name.endsWith(".md")).map(name => `docs/components/${name}`), "docs/getting-started.md"];
for (const guide of guides) {
  const name = path.basename(guide);
  const text = readFileSync(guide, "utf8");
  let index = 0;
  for (const match of text.matchAll(/```tsx\n([\s\S]*?)```/g)) {
    if (!match[1].includes("export function")) continue;
    const file = path.join(directory, `${name.replace(/\.md$/, "")}-${index++}.tsx`);
    writeFileSync(file, match[1], "utf8");
    files.push(file);
  }
}
const program = ts.createProgram(files, {
  noEmit: true, strict: true, skipLibCheck: true,
  jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  target: ts.ScriptTarget.ES2020, esModuleInterop: true,
});
const diagnostics = ts.getPreEmitDiagnostics(program);
if (diagnostics.length) {
  console.error(ts.formatDiagnosticsWithColorAndContext(diagnostics, {
    getCurrentDirectory: () => process.cwd(),
    getCanonicalFileName: name => name,
    getNewLine: () => "\n",
  }));
  process.exitCode = 1;
} else console.log(`Type-checked ${files.length} complete component documentation examples.`);
