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

Public profile links use the supplied resume URLs. Marine demo URL uses the supplied project README. Exact public project repository URLs were not available, so code buttons go to the confirmed GitHub profile rather than invented repositories.

## Accessibility

Semantic landmarks, skip link, visible keyboard focus, roving keyboard focus for featured tabs, native modal focus containment and Escape dismissal, focus restoration, screen-reader filter announcements, reduced-motion support and a persistent motion toggle. Copy-email gracefully falls back to text selection when clipboard access is unavailable.

## Hosting

Static output is in `dist`. No build step or API keys required. Sites source synchronization and publication preserve the project ID in `.openai/hosting.json`.

## Vision-desk redesign

Contact: `30587wilbertandrewtyonathan@gmail.com` (exact address requested by the user). LinkedIn: the user's updated profile link. The asymmetric hero, rectangular navigation, conceptual vision desk and research comparison have an independent composition. Project search supports category and saved-only filters. Shortlists are stored locally, and their email action opens a draft without sending it. Ctrl/Command+K opens portfolio search. A recruiter dialog presents a concise introduction. Skill tags search the collection. Benchmark figures are derived from the supplied marine results table. No simulated inference scores or invented results are displayed.

Vercel deployment settings are in `vercel.json`; see `DEPLOY-VERCEL.md`. Deployment packages exclude Sites identity and Git metadata.
