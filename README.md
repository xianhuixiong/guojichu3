# Antitrust International Cooperation Database (Prototype)

## How to run

This is a **static** website (no backend). Recommended ways:

1. **Local web server (recommended)**
   - Python: `python -m http.server 8000`
   - Open: `http://localhost:8000/`

2. **Open directly**
   - You can open `index.html` by double-clicking, but some browsers may restrict certain features under `file://`.

## Structure

- `index.html` : Home
- `pages/` : Second & third-level pages
- `assets/css/gov.css` : Gov style UI
- `assets/js/data.js` : Seed dataset (real public sources)
- `assets/js/app.js` : UI logic

## Notes

- Data entries include a `source` link to official/public references.
- The dataset is a curated seed list and can be extended.
