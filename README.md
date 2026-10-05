# Wilbert Yonathan — AI & Computer Vision portfolio

Public, responsive portfolio. Buildless HTML, CSS and JavaScript with no runtime dependencies or third-party analytics.

## Update content

- `dist/index.html`: personal introduction, education, achievements, internship availability and contact links.
- `dist/projects.js`: project descriptions, metrics, contributions, credits and demo URLs. Project diagrams are illustrative SVG schematics, not screenshots or inference results.
- `dist/styles.css`: theme, responsive layouts and animations.
- `dist/app.js`: featured tabs, project filtering, accessible project dialogs, mobile navigation, clipboard, scroll navigation and motion controls.
- `dist/Wilbert_Yonathan_Resume.pdf`: supplied resume with the portfolio contact email, LinkedIn link, and CGPA updated to 3.77. The original body is preserved.

## Content provenance

Profile and leadership content: supplied resume, `Wilbert_Yonathan_Resume.pdf`. Current year, CGPA, internship start date and duration: user's more recent statements. Marine metrics and upstream attribution: supplied marine-project README. Paddy research and DefectRAG: user-provided project history; ongoing work is labeled and finalized results are not invented. Res UCN is identified as a group project. Clinical use is outside the educational MRI prototype's scope.

Project repositories, current methods, and recorded metrics were reviewed from the public WAYTECHG GitHub account on 5 October 2026. Every main project links to its specific repository. PaddyLiteX results come from `config/models.json`: test data recorded 30 September 2026, 803 images, 2,466 objects, nine classes, and one run per model. FER2013 CNN accuracy comes from `json_files/test_results_CNN.json` (65.62%). Res UCN group authors are credited. The Streamlit Alzheimer prototype is labeled as needing further implementation validation. Demo links are taken from the user’s current GitHub profile README; live inference availability is not guaranteed by this portfolio.

## Accessibility

Semantic landmarks, skip link, visible keyboard focus, roving keyboard focus for featured tabs, native modal focus containment and Escape dismissal, focus restoration, screen-reader filter announcements, reduced-motion support and a persistent motion toggle. Copy-email gracefully falls back to text selection when clipboard access is unavailable.

## Hosting

Static output is in `dist`. No build step or API keys required. Sites source synchronization and publication preserve the project ID in `.openai/hosting.json`.

## Vision-desk redesign

Contact: `30587wilbertandrewtyonathan@gmail.com` (exact address requested by the user). LinkedIn: the user's updated profile link. The asymmetric hero, rectangular navigation, conceptual vision desk and research comparison have an independent composition. Project search supports category and saved-only filters. Shortlists are stored locally, and their email action opens a draft without sending it. Ctrl/Command+K opens portfolio search. A recruiter dialog presents a concise introduction. Skill tags search the collection. Benchmark figures are derived from the supplied marine results table. No simulated inference scores or invented results are displayed.

Vercel deployment settings are in `vercel.json`; see `DEPLOY-VERCEL.md`. Deployment packages exclude Sites identity and Git metadata.


## Blue observatory motion update

`dist/motion.css` and `dist/motion.js` add a cursor-responsive, layered blue star field, smoothly rotating hero phrases, a three-project perspective carousel, hover scaling and project transitions. The project orbit uses explicit controls, left/right/Home/End keyboard navigation, and horizontal pointer swipes; it does not auto-advance. Hero text pauses with the motion toggle, reduced-motion preferences and tab visibility. The star field caps density and pixel ratio and stops animation in background tabs. Main text remains static and readable. Five additional verified GitHub projects appear in an expandable repository shelf.

Validation: JavaScript syntax, local assets/anchor/ID/config checks, DOM interaction tests for carousel/filter/search/modal/shortlist flows, animation lifecycle and cursor parallax with mocked rendering. Actual browser visual layout and real touch hardware could not be tested in this session.
