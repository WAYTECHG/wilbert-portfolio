# Update your existing portfolio on Vercel

Use your existing GitHub repository and Vercel project, `wilbert-andrew-yonathan`.

1. Extract `Wilbert_Portfolio_Vercel.zip`. Open its `wilbert-portfolio` folder.
2. In the existing GitHub repository, replace files inside `dist` with the updated `dist` contents. Include every new JavaScript/CSS file and the entire `assets` folder. Upload files/folders, not the ZIP. Keep `index.html` inside `dist`.
3. Replace root `vercel.json` with the included version. Keep it beside `dist`, not inside it. Commit to the Vercel-linked production branch.
4. Open your existing Vercel project and check Deployments for the new commit. A linked production branch normally deploys automatically. Otherwise, create a deployment from the updated production branch.
5. Open the actual production URL returned by Vercel in a private/incognito window to verify public access.

Do not create a second project with the same name. Do not add the unsupported `public` field to `vercel.json`.

| Setting | Value |
| --- | --- |
| Framework | Other |
| Root directory | Repository root |
| Output directory | `dist` |
| Build command | Empty |
| Install command | Empty |
| Environment variables | None |

CLI alternative: from the extracted folder run `npx vercel login`, then `npx vercel link`. Select your existing project. Run `npx vercel --prod` and use its returned URL.

## New in this package

A dark animated starfield with blue/orange accents and soft white reading cards, solid contours, a portfolio chatbot and a real project-image gallery with sources. The chatbot uses verified local content and needs no paid AI API. No visitor login or webcam permission is needed.

New files: `detection.css`, `detection.js`, `opening.css`, `opening.js`, `glass.css`, `glass.js`, `refinements.css`, `palette.css`, `space.css`, `studio.css`, `media.js`, `assistant.js`, `experience.js`, and `assets/project-images/`. Existing files also changed: update the complete `dist` folder.

## Check after deployment

- A brief blue laser traces WAY, then split panels reveal the portfolio. Skip intro or Escape opens the page immediately; deep links and reduced-motion settings bypass it. There is no motion switch. Animation runs by default; operating-system reduced-motion settings remain supported.
- Open Ask about Wilbert. Try Summarize Wilbert, Compare marine and paddy, What did he contribute to DefectRAG?, What are its tools?, and Awards. Check links, Escape and Clear chat.
- Swipe/scroll the gallery, enlarge an image, use left/right arrows and inspect the original source.
- Expand Explore the three highlights or Inside the experiments to use the vision desk and project orbit. Open case-study dialogs from any project card. Captions distinguish reference inputs from recorded outputs.
- Search/filter projects, save a shortlist and open an email draft. Recipient: `30587wilbertandrewtyonathan@gmail.com`.
- Test Ctrl/Command+K, mobile navigation, email copy, résumé, GitHub and LinkedIn links.

Marine, PaddyLiteX, and DefectRAG highlights now use front-page screenshots supplied by Wilbert. The ten-frame gallery preserves the original seven repository outputs and adds those three interface screenshots. Captions distinguish interfaces from model results. The WAY opening is a decorative wordmark animation, not live inference.

The toolkit strip loops smoothly, decorative metric rings rotate while the numbers stay upright, and motion runs by default. The research comparison switches between Marine and PaddyLiteX; PaddyLiteX supports default YOLOv8n and DenseNet121 baselines, showing both accuracy gains and increased cost when applicable.

## Recruiter-focused glass design

The portfolio opens with Wilbert’s name, focus, availability, résumé, and a real PaddyLiteX front-page preview. All six projects appear as concise cards with recorded outcomes and contribution context. Extended project highlights, imagery, and research comparisons are expandable. The detection opening and motion switch have been removed; a brief skippable WAY laser opening now introduces the site. The design uses translucent navy panels, light project cards, subtle depth, iOS system typography, and mobile layouts. Update the complete `dist` directory, including `glass.css` and `glass.js`.

Latest refinement: centred chatbot icon, a visible three-bar mobile menu, W-only branding, XMUM Merit Scholarship for four consecutive years (2023–2026), and Hugging Face social links to https://huggingface.co/Wizzas. The résumé and chatbot reflect the scholarship update.

The hero name now cycles thin blue detection boxes across Wilbert, Andrew and Yonathan. Circular targeting briefly tracks section headings during navigation, without delaying links or blocking clicks. Both effects respect reduced motion; name tracking pauses when the hero is out of view.
