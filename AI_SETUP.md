# Connect the free Okosodo AI Study Assistant

The website's AI chat interface is in `index.html`. The secure AI backend is in this folder and uses Cloudflare Workers AI.

## Free allowance

Cloudflare currently lists 10,000 Workers AI Neurons per day on its Free plan. The allowance is shared across the Cloudflare account and resets daily at 00:00 UTC. If it is exhausted, the assistant will pause until the allowance resets. This is a limited free service, not unlimited usage.

## Deploy the backend

1. Sign in to your Cloudflare account and open **Workers & Pages**.
2. Install Node.js on your computer if it is not already installed.
3. Open a terminal in the downloaded repository folder.
4. Run `npx wrangler login` and complete Cloudflare's sign-in approval.
5. Deploy this Worker with:

   ```bash
   npx wrangler deploy --config cloudflare-worker/wrangler.toml
   ```

6. Cloudflare will display a Worker URL similar to `https://okosodo-study-ai.YOUR-SUBDOMAIN.workers.dev`.
7. Copy that URL. In the repository's `index.html`, replace `https://YOUR-WORKER-NAME.YOUR-SUBDOMAIN.workers.dev/api/chat` with your actual URL followed by `/api/chat`.
8. Commit the updated `index.html` to GitHub. Wait for GitHub Pages to publish it.

The AI binding in `wrangler.toml` connects to Workers AI without placing an API key in the public website. Do not put passwords, API tokens or private keys in `index.html` or in public GitHub files.

## Test

Open the Worker URL in a browser. It should return a small JSON status message. Then open the published Okosodo website, scroll to **AI Study Assistant**, and ask a school question.

## Notes

- Cloudflare account setup and deployment must be completed by the site owner.
- The chat conversation is held in the browser tab and sent to the Worker to generate a reply; this code does not save chat history to a database.
- AI answers can be incorrect. Students should check important information against textbooks and teachers.
- The Worker accepts requests only from the Okosodo GitHub Pages website origin.
