# Raider Resource Hub

Unofficial, searchable directory of Texas Tech student resources. Plain HTML, CSS and JavaScript.

## Files
- index.html  page structure
- styles.css  red and black styling
- data.js     resources (R), social accounts (S), search vocabulary (CONCEPTS)
- app.js      rendering and search box behavior
- orgs-data.js  student organization list (filled by the import script)
- orgs.js  student organization section
- tools/import-orgs.mjs  pulls the org list from TechConnect

## Run locally
    python3 -m http.server 8000
Then open http://localhost:8000

## Edit
- Add a resource: new entry in the R list in data.js.
- Teach search a word: add it to a line in CONCEPTS in data.js.
- Add a social account: new entry in the S list in data.js.

## Student organizations
Run this once on your own computer (Node 18+), then refresh the site:
    node tools/import-orgs.mjs
It pulls every organization from TechConnect into orgs-data.js. Re-run it whenever you want fresh data.
Join steps, dues and opportunities are detected from each organization's description text, so some will show "Not listed".
