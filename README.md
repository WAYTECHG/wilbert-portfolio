# Wilbert Andrew Yonathan — Personal Portfolio

**Final-year AI Engineering student · Computer vision · Efficient deep learning · RAG**

A responsive portfolio presenting my AI engineering projects, skills and academic record. Built with HTML, CSS and vanilla JavaScript, with screenshot-led project case studies.

[View Portfolio](https://wilbert-andrew-yonathan.vercel.app/) · [GitHub](https://github.com/WAYTECHG) · [LinkedIn](https://www.linkedin.com/in/wilbert-andrew-yonathan/) · [Contact](mailto:wilbertyonathan@gmail.com)

## About

I am a final-year Artificial Intelligence Engineering student at **Xiamen University Malaysia**, with a **CGPA of 3.77/4.00**. My work focuses on computer vision, lightweight detection models, visual anomaly inspection and applications that connect model outputs with useful explanations and interfaces.

I am seeking an **AI/ML internship (computer vision, deep learning, generative AI) from 29 March 2027**, for **3–5 months**, with Malaysia as my preferred location.

## Features

- **Rotating featured projects:** a screenshot-led hero showcase with smooth slide transitions and manual navigation.
- **Horizontal project collection:** cards drift slowly to the left, with phone swiping, mouse dragging, navigation arrows and keyboard controls. Movement pauses during interaction.
- **Project discovery:** search, research/application filters, topic shortcuts and a shortlist saved on the visitor’s device.
- **Detailed case studies:** project context, contributions, results, evidence, lessons and links to source repositories and available demos.
- **Screenshot galleries:** automatic slides and a full-size viewer let visitors understand the applications without opening every demo.
- **Interactive journey:** selectable years connect academic progress, projects, leadership and certificates.
- **Skills:** a plain list grouped like my résumé, plus a one-line coursework list and spoken languages.
- **Quick answers:** a small chat panel with pre-written, rule-based answers about projects, skills, achievements, internship availability and DefectRAG’s n8n workflow. It does not call an AI model.
- **Recruiter shortcuts:** a 30-second introduction, downloadable résumé, contact links and a searchable command menu.
- **Responsive interaction:** mobile navigation, visible keyboard focus, dialog controls and support for reduced-motion preferences.

The page order is hero, projects, about, coursework, skills, achievements and contact, so the project evidence comes first.

## Projects

| Project | Focus | Links |
| --- | --- | --- |
| **DefectRAG** | Visual anomaly inspection, cited RAG explanations, shared review and n8n case-event workflows. | [Source](https://github.com/WAYTECHG/DefectRAG) · [Demo](https://huggingface.co/spaces/Wizzas/DefectRAG) |
| **PaddyLiteX** | Lightweight YOLOv8n backbone research using DenseLiteX, SPPF and C2PSA for paddy disease detection. | [Source](https://github.com/WAYTECHG/paddylitex-disease-detection) · [Demo](https://paddylitex.onrender.com/) |
| **Marine Organism Detection** | Adaptation of DU-MobileYOLO using GhostConv and SimSPPF for underwater detection. | [Source](https://github.com/WAYTECHG/marinelite-organism-detection) · [Demo](https://marine-object-detection.onrender.com) |
| **dPickleball** | PPO agent training with curriculum learning, reward shaping and league self-play. | [Source](https://github.com/WAYTECHG/dpickleball-rl-agent) · Competition recording available in the portfolio |
| **Res UCN** | Group research on residual image classification and convolutional architecture components. | [Source](https://github.com/WAYTECHG/Res_UCN-Resnet-Unified-Convolution-Network) · [Demo](https://res-ucn.onrender.com/) |
| **FER2013** | Facial expression classification, model comparisons and Grad-CAM visualizations. | [Source](https://github.com/WAYTECHG/FER2013-Project) · [Demo](https://fer2013-project.onrender.com/) |
| **NeuroInsight** | Educational Alzheimer’s MRI and clinical-data classification with a Streamlit interface. | [Source](https://github.com/WAYTECHG/alzheimer-classification) · [Demo](https://alzheimer-classification-l7s2.onrender.com/#home) |

Each case study records the relevant contributions and evaluation context. Screenshots and reported results are project evidence; model inference runs in the linked applications rather than inside this static portfolio.

## Technology

| Area | Implementation |
| --- | --- |
| Structure and content | HTML5 and JavaScript data files |
| Styling | CSS3, responsive layouts, gradients and glass surfaces |
| Motion | CSS animations, Web Animations API and `requestAnimationFrame` |
| Graphics | SVG and Canvas |
| Browser interaction | Native dialogs, DOM events, Intersection Observer and Resize Observer |
| Local persistence | Browser `localStorage` for the project shortlist |
| Hosting | Static deployment on Vercel |

The portfolio has no package installation or compilation step. Its project demos have their own technology stacks and deployment requirements.

## Run Locally

Download or clone this repository, open a terminal in its root directory and serve the `dist/` folder:

```bash
python -m http.server 8000 --directory dist
```

Then open [http://localhost:8000](http://localhost:8000).

On Windows, `py -m http.server 8000 --directory dist` can be used if the Python launcher is available. Stop the server with `Ctrl+C`.

## Main Files

All paths below are relative to the repository root.

| File or folder | Purpose |
| --- | --- |
| `dist/index.html` | Page sections, metadata, skills, profile, résumé and contact links |
| `dist/projects.js` | Project descriptions, metrics, contributions and repository/demo URLs |
| `dist/app.js` | Core page rendering, project filtering and navigation |
| `dist/features.js` | Shortlist, command menu and recruiter introduction |
| `dist/media.js` | Project image metadata and media selection |
| `dist/demo-gallery-data.js` | Screenshot gallery entries |
| `dist/demo-galleries.js` / `.css` | Gallery slides, captions and presentation |
| `dist/portfolio-life.js` / `.css` | Featured-project rotation and project highlights |
| `dist/project-rail.js` / `.css` | Horizontal collection movement, dragging and chatbot styling |
| `dist/interactive-story.js` / `.css` | Interactive journey, topic shortcuts, DefectRAG workflow and screenshot lightbox |
| `dist/assistant.js` | Curated chatbot answers and conversation behavior |
| `dist/credentials.js` | Certificate metadata and attachment references |
| `dist/details.js` / `.css` | Case-study readers and evidence viewers |
| `dist/plain.css` | Skills list, compact coursework and tap-target overrides |
| `dist/styles.css` and supporting stylesheets | Base layout, palette, responsive rules and visual effects |
| `dist/assets/` | Profile photo, project images, demo screenshots and certificates |
| `dist/Wilbert_Yonathan_Resume.pdf` | Downloadable résumé |
| `vercel.json` | Static hosting configuration |

## Customization

### Profile, résumé and skills

- Replace `dist/assets/profile/profile.jpg` to update the portrait. Keep the filename or update its reference in `index.html`.
- Replace `dist/Wilbert_Yonathan_Resume.pdf` to update the downloadable résumé.
- Edit the skills and personal information in `dist/index.html`.
- Update the corresponding profile, skills and availability answers in `dist/assistant.js` to keep the chatbot consistent.
- Update `dist/interactive-story.js` when the journey or planned internship dates change.

### Project content and screenshots

Edit project records in `dist/projects.js`, then update the related image references in `dist/media.js` and `dist/demo-gallery-data.js` when needed. Place new screenshots in `dist/assets/demo-screenshots/` and retain meaningful alternative text and captions.

When adding a project, also update the featured-project configuration in `dist/portfolio-life.js` and the project aliases in `dist/assistant.js`.

### Motion and slide timing

| Behavior | File | Current setting |
| --- | --- | --- |
| Project collection drift | `dist/project-rail.js` | `const SPEED=14;` — pixels per second; lower is slower |
| Screenshot gallery interval | `dist/demo-galleries.js` | `const INTERVAL=5000;` — milliseconds |
| Featured-project interval | `dist/portfolio-life.js` | `setTimeout(() => show(index+1),5000)` in `schedule()` |

For example, change `5000` to `6000` for a six-second slide interval. The collection drift uses continuous movement rather than a timed slide interval; setting `SPEED` to `0` makes it manual-only.

### Portfolio guide

The quick-answers panel uses curated, rule-based answers from `dist/assistant.js` and the project records. It runs in the browser without a paid AI API or server-side language model. Messages are handled locally, and the conversation is not saved across page reloads.

Edit starter-question buttons in `dist/index.html`. The refreshed welcome message and panel styling are in `dist/project-rail.js` and `dist/project-rail.css`.

## Deploy on Vercel

The repository’s static configuration publishes `dist/` without an install or build step:

```json
{
  "framework": null,
  "buildCommand": "",
  "installCommand": "",
  "outputDirectory": "dist"
}
```

Keep the existing `vercel.json`, including its response headers. Import the GitHub repository into Vercel with the repository root as the project root and retain these static settings. Push subsequent updates to the connected deployment branch.

Upload the complete `dist/` folder when setting up the site. For an incremental update, merge the supplied files into the existing folder and retain the other scripts, styles and assets. Stylesheet and script paths in `index.html` must match the deployed filenames, including letter case.

## Contact

**Wilbert Andrew Yonathan**  
AI Engineering · Xiamen University Malaysia

- Email: [wilbertyonathan@gmail.com](mailto:wilbertyonathan@gmail.com)
- Portfolio: [wilbert-andrew-yonathan.vercel.app](https://wilbert-andrew-yonathan.vercel.app/)
- GitHub: [WAYTECHG](https://github.com/WAYTECHG)
- Hugging Face: [Wizzas](https://huggingface.co/Wizzas)
