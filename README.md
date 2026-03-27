# SciVizLab

Academic palette library and chart preview platform for research data.

## What changed

This project is no longer a landing-page style homepage.
It is now organized as a small multi-page library:

- **Home**: lightweight entry page
- **Palettes**: real palette browser with theme previews and token export
- **Charts**: real chart gallery with filtering and detail preview
- **Playground**: upload CSV/JSON, switch fields, and test charts live

## Built-in themes

- **Classic Paper** — paper-style blue-gray palette
- **Nature Minimal** — restrained academic palette with more whitespace
- **Lab Dark** — dark presentation palette for talks and demos

## Built-in chart previews

- Line Chart
- Bar Chart
- Heatmap
- Scatter Plot
- Boxplot
- Radar Chart

## Data workflow

The app opens with default demo data.
Users can also:

- drag and drop **CSV / JSON**
- switch **X / Y** fields
- switch the **global theme**
- download sample **CSV / JSON**
- reset back to the built-in dataset

## Project structure

```text
src/
├─ app/                 # hash-route helpers
├─ components/
│  ├─ charts/           # chart preview cards and chart detail panel
│  ├─ common/           # page intro, stat pills, empty state
│  ├─ dataset/          # upload panel, field mapping, dataset summary
│  └─ palettes/         # palette cards and theme detail panel
├─ context/             # shared app state
├─ data/                # default dataset and chart catalog
├─ layout/              # app shell and top navigation
├─ pages/               # Home / Palettes / Charts / Playground
├─ themes/              # research theme definitions
├─ types/               # dataset types
└─ utils/               # dataset parsing, formatting, colors
```

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages

This project is configured for GitHub Pages deployment with GitHub Actions.
Keep these files in the repository root:

- `.github/workflows/deploy.yml`
- `public/.nojekyll`
- `package-lock.json`

Then set:

- `Settings -> Pages -> Source -> GitHub Actions`

## License

MIT
