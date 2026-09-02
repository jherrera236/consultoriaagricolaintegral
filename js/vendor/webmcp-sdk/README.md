# @nekuda/webmcp-sdk (vendored)

This site has no bundler and no `package.json`, so the SDK's published ESM
build is vendored locally instead of `npm install`-ed. `index.js` in this
directory is byte-for-byte `dist/index.js` from the npm package below —
never hand-edited.

- Package: `@nekuda/webmcp-sdk`
- Version pinned: `0.5.0`
- Source: https://registry.npmjs.org/@nekuda/webmcp-sdk/-/webmcp-sdk-0.5.0.tgz
- Referenced from HTML via an import map:
  `{"imports": {"@nekuda/webmcp-sdk": "js/vendor/webmcp-sdk/index.js"}}`

To upgrade: download the new version's tarball, replace `index.js` with its
`dist/index.js`, and update the version/source above. Tool modules in
`js/webmcp-tools/` import the package by name and do not change.
