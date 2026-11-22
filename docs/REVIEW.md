# Portfolio walkthrough review

Branch: `feat/project-walkthroughs`, based on `e943e0a`.

The production site is unchanged. This branch is for Hannan to review before any merge or deployment.

## What to try

1. Open ChurnGuard. The live Streamlit link appears on the card and near the top of the project window. Scroll through the three annotated screenshots.
2. Open Findr Cloud, Findr Mobile, Animal Adoption, Supplyr and the archived projects. The new galleries explain interfaces, workflows and report evidence. Select a screenshot to open its full-size image.
3. Open the Men’s Kaki Club event. Review the four-part story, original team slides, existing event photographs and video.
4. Open Tabletop Wizards. Its original bottom crop is retained. Three additional public event photos include links to their Instagram posts.
5. Check IITSC, now expanded as IIT Studies Club.

## Local preview

From this repository folder run `python -m http.server 4174 --bind 127.0.0.1`, then open `http://127.0.0.1:4174/`.

## Evidence and scope

- 41 extracted report screenshots, two rendered team-presentation slides and three public Tabletop photographs: 46 new assets.
- 48 explained gallery items across 15 projects; projects with a single useful diagram/output retain that evidence. Listing Hub has no matching report gallery and retains its existing working-app cover.
- 65 total project/activity gallery items, including existing photographs.
- `walkthrough-sources.json` records report filenames and embedded-image identifiers; `social-sources.json` records public Instagram post links.
- Report links point to existing public GitHub documents; their raw files returned HTTP 200.
- The documented ChurnGuard URL was opened, woken from inactivity and verified to load the scoring interface.
- Broader hackathon concepts are distinguished from the fitness session Hannan helped organise. Club photos describe club events without inventing personal duties.
- Reviewed new assets for private identifiers. An Event Viewer screenshot with a student identifier was excluded entirely.
- Existing scrolling, designed project thumbnails, neural explorer and Tabletop poster crop were preserved.

## Validation

Twelve existing content, repository coverage, graph, camera and animation checks passed against this checkout. JavaScript syntax, all gallery paths, raster dimensions and diff whitespace checks passed. Desktop and 390px phone layouts were checked in the browser; galleries and dialogs have no horizontal overflow. Report screenshots retain full frames, phone screens pair on desktop and stack on phones. A second review found no remaining important issues.
