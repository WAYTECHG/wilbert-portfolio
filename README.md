# Wilbert Yonathan — AI & Computer Vision portfolio

A public, responsive internship portfolio built with HTML, CSS and JavaScript. No build step, visitor account, API key, or paid chatbot service is required.

## Content and appearance

- `dist/index.html`: profile, education, leadership, scholarship, availability and contact.
- `dist/projects.js`: six verified case studies, reported metrics, contributions, credits and demo links.
- `styles.css`, `identity.css`, `motion.css`: foundational layout, typography, project orbit and transitions.
- `studio.css`: soft white reading surfaces, blue/orange accents, solid outlines, gallery and chatbot.
- `palette.css`: the exact user-defined navy, royal blue, warm orange and soft white palette across every surface, label, control, search field and chatbot. Orange is reserved for small accents; body text retains readable contrast.
- `space.css`: dark reference-inspired starfield backdrop and readable text over it. The canvas has depth-based drift, independent gentle twinkling, short streaks and cursor parallax, capped at 650 stars and approximately 30 fps. Reduced motion and hidden tabs stop the animation.
- `media.js`: real project imagery, captions, source links and image viewer. Marine/PaddyLiteX use recorded metrics because real output photographs are not published in their public repositories.
- `experience.js`: slow vision-desk cycling.
- `detection.css`, `detection.js`: continuous word-by-word name detection outlines and a brief circular navigation reticle that follows the destination heading. These are decorative computer-vision references, not real detection or confidence scores. Native navigation is unchanged; the effects respect reduced motion and pause outside the visible page.
- `opening.css`, `opening.js`: a roughly 2.5-second blue laser draws the WAY wordmark, then two panels split to reveal the portfolio. Skip intro and Escape dismiss it immediately; reduced motion, deep links and hidden tabs bypass it. No image assets or external dependencies are needed.
- `assistant.js`: a browser-local curated portfolio assistant. Recognizes topics and project names, handles project follow-ups, compares results and links to evidence. It is not a generative language model. Unknown questions receive a transparent fallback. Chat text is not sent to a server or retained after reloading.
- `app.js`, `features.js`, `motion.js`: navigation, dialogs, filters, shortlist, clipboard, search, benchmarks and motion lifecycle.
- `assets/project-images/`: genuine repository assets. `sources.json` records provenance and distinguishes predictions, reference inputs and evaluation charts.
- `Wilbert_Yonathan_Resume.pdf`: supplied résumé, with the requested contact email, LinkedIn link and updated CGPA.

All website files above are inside `dist`. Contact email: `30587wilbertandrewtyonathan@gmail.com` (exact latest user-provided address).

## Provenance

Profile and leadership details are based on the supplied résumé and latest user statements. Public WAYTECHG repositories were reviewed on 5 October 2026. PaddyLiteX results come from `config/models.json`: 803 test images, 2,466 objects, nine classes and one run per model. FER CNN accuracy is 65.62% from `json_files/test_results_CNN.json`. Marine trade-offs and upstream DU-MobileYOLO attribution are preserved. Res UCN is credited as group coursework. The educational Alzheimer application is not presented as clinically validated.

Seven genuine visual assets come from the user's repositories. The DefectRAG photograph is a normal reference input, not an inference result. FER Grad-CAM/confusion matrices, Res UCN training curves and the educational Random Forest confusion matrix are recorded outputs. YOLO validation photos include real published predicted boxes. Eigenfaces are analysis components.

The WAY opening is a decorative wordmark animation, not live inference. The public marine Space currently includes a simulated illustrated scene; that scene is not represented as a real detection result here.

## Accessibility and motion

Semantic landmarks, skip link, visible focus, keyboard tabs/carousel, native image/case-study dialogs with focus restoration, searchable projects and screen-reader status messages. Animation runs by default; there is no motion switch. The short WAY opening is skippable and respects reduced motion. Operating-system reduced-motion preferences remain supported. Canvas density/pixel ratio are bounded; timers and animation frames pause when the tab is hidden. Gallery images have alt text, source captions and a keyboard image viewer.

## Hosting and verification

Static output: `dist`. Config: `vercel.json`. See `DEPLOY-VERCEL.md` to update the existing Vercel project. Packages exclude hosting identity, Git metadata and credentials.

Validated syntax, assets, IDs, anchors and configuration; existing search/filter/shortlist/modal flows; carousel keyboard/swipe synchronization; chatbot answers, follow-ups, safe text rendering and links; image viewer navigation/focus; default-on animation and reduced-motion/visibility lifecycle. Interaction checks use a DOM and mocked canvas. Actual browser layout and real-device touch were not verified in this session.
