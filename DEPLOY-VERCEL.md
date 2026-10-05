# Publish Wilbert's portfolio on Vercel

This is a static portfolio. No build, backend, API key, or paid domain is required.

## Using the Vercel CLI

1. Extract the package and open PowerShell in the extracted `wilbert-portfolio` folder (the folder containing `vercel.json` and `dist`).
2. Run `npx vercel login` and finish the account sign-in in your browser.
3. Run `npx vercel link`. Select your personal Hobby account. Create a new project called `wilbert-yonathan` unless that name is already used in your account. Use `./` as the code directory and keep the supplied settings.
4. Run `npx vercel --prod`.
5. Copy the production address returned by Vercel. A preferred address is `wilbert-yonathan.vercel.app`; the exact address depends on availability. The earlier ChatGPT-hosted address is not needed for this deployment.
6. Open the production link in an incognito window to check that visitors can reach it without signing in. If Vercel shows an authentication wall, inspect the project's Settings > Deployment Protection and ensure the production deployment is publicly accessible; preview protection can stay enabled.

Keep the project on the free Hobby plan. A personal domain purchase is optional.

## Using GitHub and the Vercel dashboard

1. Create a repository under your GitHub account. You can keep it private. Upload `dist`, `vercel.json`, `.vercelignore`, and this guide. Do not upload the ZIP itself.
2. In Vercel, choose Add New > Project and import that repository.
3. Use project name `wilbert-yonathan` (subject to availability), Framework Preset `Other`, Root Directory `./`, and Output Directory `dist`. Leave Build Command and Install Command blank.
4. Deploy, then open the production URL. Future GitHub updates can deploy automatically.

## Test the published site

- Main navigation reaches the correct sections on desktop and mobile.
- Vision-desk controls switch between underwater, agriculture, and inspection.
- Search `YOLO`, `PyTorch`, or `MRI`; combine searches with Research / Applications.
- Save projects, enable Shortlist, refresh, and verify the saved selection stays on that device.
- Discuss selected opens a draft addressed to `30587wilbertandrewtyonathan@gmail.com`. It does not send anything automatically.
- Press Ctrl+K (Windows) or Command+K (Mac) to search sections and projects.
- Open the 30-second introduction and its project links.
- Change marine benchmark metrics and open the case study to see trade-offs and credits.
- Copy email, download the resume, and test GitHub, LinkedIn, and the marine demo link.
- Turn motion off and verify keyboard navigation and Escape dismissal for dialogs.

## Editing

Profile and availability: `dist/index.html`. Project details and reported metrics: `dist/projects.js`. Core style: `dist/styles.css`. Distinct vision-desk style: `dist/identity.css`. New interactive features: `dist/features.js`. Core navigation and dialogs: `dist/app.js`. Downloadable resume: `dist/Wilbert_Yonathan_Resume.pdf`.

Project visuals are conceptual illustrations, not real inference output. Research in progress is labeled. The group project and upstream work retain attribution.
