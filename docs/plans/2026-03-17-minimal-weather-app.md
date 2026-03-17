# Minimal Weather App Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a separate minimal React weather app that reuses the current weather service and leaves the existing dashboard unchanged.

**Architecture:** The new app will use a dedicated Vite HTML entry and a single React component for the UI. Data fetching, fallback behavior, and caching stay in the existing service so the added code only handles input, rendering, and theme state.

**Tech Stack:** React, Vite, Vitest, Testing Library, CSS

---

### Task 1: Plan and test the new entry

**Files:**
- Create: `src/test/minimal-app.test.jsx`

**Step 1: Write the failing test**

Add tests that expect the minimal app to:
- show a title and search form
- validate empty search
- render weather and forecast data
- toggle theme text/state

**Step 2: Run test to verify it fails**

Run: `npm test -- src/test/minimal-app.test.jsx`
Expected: FAIL because `src/minimal/MinimalApp.jsx` does not exist yet

**Step 3: Write minimal implementation**

Create the new entry files and component with only the state and rendering needed to pass the tests.

**Step 4: Run test to verify it passes**

Run: `npm test -- src/test/minimal-app.test.jsx`
Expected: PASS

**Step 5: Commit**

```bash
git add docs/plans/2026-03-17-minimal-weather-app-design.md docs/plans/2026-03-17-minimal-weather-app.md src/test/minimal-app.test.jsx minimal.html src/minimal/main.jsx src/minimal/MinimalApp.jsx src/minimal/minimal.css
git commit -m "feat: add minimal weather app entry"
```

### Task 2: Verify repository health

**Files:**
- Verify: `package.json`

**Step 1: Run the full checks**

Run:
- `npm test`
- `npm run lint`
- `npm run build`

Expected: all commands exit successfully

**Step 2: Run manual browser check**

Run: `npm run dev`
Open: `/minimal.html`
Check:
- empty validation
- successful search
- theme toggle
- responsive layout

**Step 3: Commit if follow-up fixes were needed**

```bash
git add <adjusted files>
git commit -m "fix: polish minimal weather app"
```
