# Portfolio certificates

Your certificates are already included. No visitor uploads, trial controls, or placeholder certificate buttons remain.

| Portfolio entry | Documents |
| --- | --- |
| Love in Action | Videographer department Certificate of Appreciation |
| XMUM AI Club · event leadership | Head of General Affairs recognition for organizing the dPickleball event |
| AIESEC XMUM | General Affairs, 2023–2024; Assistant of General Affairs, 2024–2025 |
| Malaysia Cultural Bazaar | Bojio? Onz Lah!!! booth support, 25 June 2025 |
| Dean’s List | September 2024; April 2025; September 2025 |

The dPickleball competition uses the YouTube recording. Its organizing-role certificate is attached to leadership, not presented as a second-place award. The scholarship has no certificate button because no scholarship document was supplied.

All eight supplied certificate images are unchanged in `dist/assets/certificates`, linked through `dist/credentials.js`. Entries with multiple documents have selectors. Visitors can view full documents and download them.

## Review first

Download `Wilbert_Portfolio_Review_Demo.html` and open it in Chrome or Edge. Its project images and certificates are embedded. The ZIP contains the normal multi-file portfolio for Vercel. This package has not changed the live site.

## Update Vercel when ready

1. Extract `Wilbert_Portfolio_Certificate_Demo.zip`.
2. In the GitHub repository linked to Vercel, replace the contents of `dist` with the contents of `wilbert-portfolio/dist` from the ZIP. Do not nest an extra `dist` folder inside it.
3. Delete obsolete files `dist/assets/project-images/defectrag-frontpage.webp` and `dist/assets/project-images/defectrag-reference.webp` if present in the old repository. Uploading changed files does not delete old files automatically.
4. Keep root `vercel.json`. Vercel output directory stays `dist`, with empty build/install commands.
5. Commit when ready to publish. A connected production branch normally deploys automatically. Use a separate branch for a Vercel preview first if desired.
6. Check six project cards, coursework without related-work links, certificate selectors/downloads, mobile navigation, chatbot and dPickleball video.

## Add another certificate later

Upload the document to `dist/assets/certificates` and add an object to the matching `attachments` array in `dist/credentials.js`:

```js
{ label: 'The exact award and period', file: 'assets/certificates/your-document.pdf' }
```

Use PDF, PNG, JPG or WebP with simple, case-sensitive filenames. Public paths begin with `assets/certificates/` because Vercel serves the contents of `dist`.
