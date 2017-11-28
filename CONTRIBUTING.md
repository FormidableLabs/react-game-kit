Thanks for contributing!

## Development

### Installing dependencies

```bash
npm install
```

### Demo

You can run the demo locally by simply doing `npm start`; this will start the demo at `http://localhost:3000`.

### Linting

Before commiting any changes, be sure to do `npm run lint`; this will lint all relevant files using [ESLint](http://eslint.org/) and report on any changes that you need to make. You can also run `npm run lint-fix` to fix most common lint errors automatically.

## Releasing a new version to NPM (only for project administrators):

1. Run `npm version patch` (or `minor`, `major` as appropriate) to lint and build the `lib` and `umd` directories.
2. Run `npm publish` and publish to NPM if all is well.
3. Run `git push && git push --tags`
