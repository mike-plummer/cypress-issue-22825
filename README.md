## Reproduction for [Cypress issue #22825](https://github.com/cypress-io/cypress/issues/22825)

### Prod as-is

1. Run `npx cypress open --port 4001 --component --browser electron`
2. Execute `MyComponent.spec.js`, observe `fetch` failure is reported in command log (expected) but no meaningful error is logged to terminal
3. Open devtools console, click failed `fetch` entry in command log. Observe error that is printed: `TypeError: Cannot read properties of null (reading 'token')` - this is an internal Cypress error that should not have occurred

### This branch (all fixes)

1. From PR branch run `yarn dev --project {PROJECT_DIRECTORY} --port 4001 --component --browser electron`
2. Execute `MyComponent.spec.js`, observe `fetch` failure is reported in command log (expected) and **no** stacktrace is logged to terminal
3. Open devtools console, click failed `fetch` entry in command log. Observe error that is printed reflects "real" error that occurred on this request: `ECONNREFUSED 127.0.0.1:80`

### This branch (demonstrate new error logging)

1. From PR branch, edit `server-base.ts`. Modify this block:

    ```
    const getFileServerToken = () => {
      return this._fileServer?.token
    }
    ```

    to this (add unsafe access of `token`)

    ```
    const getFileServerToken = () => {
      return this._fileServer!.token
    }
    ```

    This re-introduces an internal error that can occur in v12.5.1 that is fixed by this PR

2. Run `yarn dev --project {PROJECT_DIRECTORY} --port 4001 --component --browser electron`
3. Execute `MyComponent.spec.js`, observe `fetch` failure is reported in command log (expected), observe stack trace is output to terminal
