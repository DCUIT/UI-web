# TODO: Playground runtime first (iframe + Babel) then Monaco

- [ ] Verify existing `/playground` route and UI stubs
- [ ] Add CSS state + fix “Copy full component” button (TSX + CSS + Usage)
- [ ] Implement runtime sandbox (iframe with srcDoc)
  - [ ] Install/add `@babel/standalone` dependency in `frontend`
  - [ ] Transpile TSX to runnable JS in-browser (Babel presets)
  - [ ] Render in iframe
  - [ ] Capture console.log/error via postMessage
  - [ ] Render captured logs/errors in the Console/Error viewer panel
- [ ] Wire re-render on TSX/CSS changes (debounce)
- [ ] Update `TODO_PROGRESS.todo.md` + `frontend/TODO/TODO_Playground.todo.md`
- [ ] Create branch `blackboxai/*`, commit, push
- [ ] After runtime works: add Monaco editor (dynamic import to avoid SSR)
- [ ] Final smoke test: edit TSX -> preview updates -> console panel updates -> copy works

