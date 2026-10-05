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

A dark animated starfield with blue/orange accents and soft white reading cards, solid contours, a skippable detection opening dissolving into blocks, a portfolio chatbot and a real project-image gallery with sources. The chatbot uses verified local content and needs no paid AI API. No visitor login or webcam permission is needed.

New files: `refinements.css`, `palette.css`, `space.css`, `studio.css`, `media.js`, `assistant.js`, `experience.js`, and `assets/project-images/`. Existing files also changed: update the complete `dist` folder.

## Check after deployment

- Watch or skip the opening, then replay from the hero. Turn motion off to stop animations. Reduced-motion preferences skip the opening.
- Open Ask about Wilbert. Try Summarize Wilbert, Compare marine and paddy, What did he contribute to DefectRAG?, What are its tools?, and Awards. Check links, Escape and Clear chat.
- Swipe/scroll the gallery, enlarge an image, use left/right arrows and inspect the original source.
- Explore the vision desk, project orbit and case-study dialogs. Captions distinguish reference inputs from recorded outputs.
- Search/filter projects, save a shortlist and open an email draft. Recipient: `30587wilbertandrewtyonathan@gmail.com`.
- Test Ctrl/Command+K, mobile navigation, email copy, résumé, GitHub and LinkedIn links.

Marine, PaddyLiteX, and DefectRAG highlights now use front-page screenshots supplied by Wilbert. The ten-frame gallery preserves the original seven repository outputs and adds those three interface screenshots. Captions distinguish interfaces from model results. The opening remains a stylized animation, not live inference.

The toolkit strip loops smoothly, decorative metric rings rotate while the numbers stay upright, and motion can be paused. The research comparison switches between Marine and PaddyLiteX; PaddyLiteX supports default YOLOv8n and DenseNet121 baselines, showing both accuracy gains and increased cost when applicable.
