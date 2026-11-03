# Contributing

Consumers install `@justfrenzy/liquid-glass` into their own React application. This repository is the library source, not an application or development server that consumers need to run.

## Check a source change

Use Node.js 22.12 or newer:

```sh
npm ci
npm run check
npx playwright install chromium webkit
npm run test:browser
npm run pack:local
npm run verify:package
```

The library lives in `src/components/`, with the core exports in `src/index.ts` and HeroUI exports in `src/heroui.ts`. Include new public components in the appropriate entry point. Keep application-specific state, networking and sample data outside the library.

`tests/fixtures/consumer` is an internal integration-test fixture importing the built package through its public exports. `test:build` checks that a consumer bundles; Playwright starts `test:serve` on port 4175 and stops it after testing. For manual checks, run `npm run build` followed by `npm run test:serve`. Neither the fixture nor its server is shipped in the release archive.

The retained README screenshots were captured before the public demo was removed. The original capture application and Python GIF encoder are no longer maintained in this repository. Keep any new captures based on actual component rendering and document the browser/viewport used.

## Component documentation

Every public component has a Markdown guide under `docs/components/`. Update the curated examples and usage notes in `scripts/generate-component-docs.mjs`, then run:

```sh
npm run docs:generate
npm run build
npm run docs:check
```

The prop reference is derived from the TypeScript API. `docs:check` compiles complete example functions against the built public entry points, and runs as part of `npm run check`. Keep the setup guide, README and changelog consistent with the examples. Component guides ship with the consumer archive; research media and internal test fixtures do not.

## Publish a release

Update the changelog and version, then run the checks above. `pack:local` builds the library and stages a separate manifest without repository scripts or development dependencies. `verify:package` checks the archive allowlist and installs it into a clean consumer. Publish that verified archive rather than the repository directory.

For version `0.1.4`:

```sh
npm login --registry=https://registry.npmjs.org
npm whoami
npm publish .artifacts/justfrenzy-liquid-glass-0.1.4.tgz --access public --registry=https://registry.npmjs.org
```

Complete npm's security challenge in your browser. Publishing requires an account authorized for the `justfrenzy` scope. Never commit credentials. Once published, a version cannot be replaced with different contents.

Commit the source changes, push them and tag the release. Attach the same archive to the corresponding GitHub release. For future releases, update the version in the commands and archive filename.
