## Reproduction for [Cypress issue #22825](https://github.com/cypress-io/cypress/issues/22825)

1. Run `npx cypress open --port 4001 --component --browser electron`
2. Execute `MyComponent.spec.js`, observe `fetch` failure is reported in UI but no meaningful error is logged to terminal or reported via devtools
3. From this branch run `yarn dev --project {PROJECT_DIRECTORY} --port 4001 --component --browser electron`
4. Execute `MyComponent.spec.js`, observe `fetch` failure is reported in UI *and* a meaningful error message is now output in terminal