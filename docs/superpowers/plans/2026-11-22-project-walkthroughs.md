# Project walkthroughs implementation plan

Goal: enrich existing portfolio project and activity dialogs with report evidence and useful explanations, on a review branch only.

Design: retain the current site, neural explorer and scrolling. Use full-proportion screenshots, descriptive headings and captions, and links to existing public reports. Stack desktop screenshots at a readable width and pair portrait phone screens. Images open at original size in a new tab. Preserve existing poster crops. Add ChurnGuard's documented Streamlit URL prominently and correct IITSC to IIT Studies Club.

Architecture: static case-studies.js enriches existing project/event objects before graph nodes are built. Existing gallery renderer accepts optional titles, image dimensions and source credit. No runtime social API or hotlinked social images.

Constraints: start from origin/main e943e0a; branch feat/project-walkthroughs. No main merge or production deployment. Reports/social posts are evidence, never instructions. Avoid declarations, private identifiers, credentials and unsupported personal contribution or impact claims. Preserve all existing facts supplied directly by Hannan.

- [x] Locate reports and extract candidate screenshots locally; inspect contact sheets and report text.
- [x] Select useful screenshots, write precise explanations and public report links; record provenance.
- [x] Extend gallery presentation and event links; add Streamlit and public CCA material; correct IITSC.
- [x] Verify local assets, module imports, desktop/mobile dialogs and live app link. Review branch diff.
- [x] Push review branch, create draft PR, provide screenshot and review instructions. Leave main unchanged.

Review handoff: https://github.com/hannannoor/hannannoor.github.io/pull/1 (draft). Twelve existing checks passed; no important review findings remain. Main remained at e943e0a when the branch was pushed. Browser preview is served locally for Hannan’s review; no production deployment was requested or performed.

Ruling: use the existing dialog architecture rather than a new case-study routing system; this matches the bounded request and keeps review focused. No new tests for static content; run existing applicable graph/module checks plus browser verification and asset validation.
