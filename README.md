# Zeronotes

A minimalist notes app with custom drag-and-drop masonry layout built from scratch. Clean UI, smooth interactions, zero dependencies.

> **Live demo with persistent storage coming soon.** This version runs entirely in your browser.

<br>

<p align="center">
  <a href="https://zeronotes-demo.netlify.app">
    <img src="public/screenshots/screenshot.png" width="750px" alt="screenshot">
  </a>
</p>

<h3 align="center">
  <a href="https://zeronotes-demo.netlify.app">👉 Try it now</a>
</h3>

## What's Here

- **Fully custom UI**: All animations, interactions, and drag-and-drop mechanics are implemented from scratch using TypeScript & CSS transforms. No external UI libraries, no DnD frameworks
- **Fluid interactions**: Notes gracefully reflow on resize, archive, delete, or pin; animations emerge naturally from the layout engine
- **Selector-driven architecture**: Memoized selectors power most logic, keeping components thin and updates predictable
- **Surprisingly scalable**: Features like pinning were added by updating selectors, with almost no component changes
- **Performance-oriented**: Leverages the transform-based movement combined with minimal re-renders for a snappy feel
- **Lightweight**: ~3,000 lines of code, zero UI libraries

## Tech Stack

- React 19
- TypeScript
- Zustand
- Reselect
- Tailwind CSS

## What's Next

Adding backend with authentication and end-to-end encryption. See the [fullstack repo](https://github.com/amadeuio/zeronotes) (coming soon).
