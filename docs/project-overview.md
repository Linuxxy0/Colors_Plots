# Project Overview

## Positioning

SciVizLab is a research-oriented visualization resource library, not a marketing landing page.

The interface is split into dedicated pages so users can:

1. browse scientific color systems,
2. browse chart previews by purpose,
3. test their own data with the built-in playground.

## Main pages

### Home
A lightweight entry page with links into the palette library, chart library, and dataset playground.

### Palettes
A real theme browser:
- category filtering
- color strip preview
- mini chart previews
- set global theme
- export JSON / copy CSS tokens

### Charts
A real chart library:
- category filter
- search
- chart cards
- detail preview panel
- global dataset + theme synchronization

### Playground
An operation-first page:
- drag-and-drop upload
- reset to defaults
- sample dataset download
- field mapping
- live preview

## Shared state

The app uses a shared state provider so all pages stay in sync:

- `currentTheme`
- `currentDataset`
- `xKey`
- `yKey`

## Deployment

Hash-based routing is used so the app works cleanly on GitHub Pages without server-side rewrites.
