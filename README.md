# Academic Advisor AI

A Next.js 14 app I started in August 2024. A student describes what they want in a professor, and the app finds the closest matches in a Pinecone index and asks Gemini to recommend one.

![Academic Advisor AI home screen](./image/image3.png)

## How professor search works

`load.py` writes a short paragraph for each of the 15 professors in `data.json`, embeds it with Google's `models/embedding-001` (768 dimensions) and stores it in a Pinecone index named `rag-index`.

When a question comes in, `app/api/chat/route.js` embeds it with the same model, takes the 3 nearest professors and puts their records into a prompt for `gemini-pro`. The prompt asks Gemini to recommend the best fit and explain why.

## The other two screens

The major advisor sends the student's answers from its form to `gemini-pro` through `app/api/majorAdvisor/route.js`. It does not use the professor index.

The course planner (`components/coursePlanner.jsx`) has no backend. It keeps the course list in React state and shows the credit total. Nothing is saved, so a reload clears the list.

| Professor search | Major advisor |
| --- | --- |
| ![Professor search](./image/image4.png) | ![Major advisor](./image/image5.png) |

![Course planner](./image/image6.png)

## Running it

The web app needs Node.js. Filling the index also needs Python 3.

```bash
git clone https://github.com/gelftheshot/academic-advisor-ai.git
cd academic-advisor-ai
npm ci
```

Both the Next.js routes and `load.py` read their keys from `.env.local`:

```dotenv
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key
PINECONE_API_KEY=your_pinecone_api_key
```

`load.py` deletes any existing index called `rag-index` before it builds a new one, so run it against a Pinecone project that holds nothing you want to keep.

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install python-dotenv pinecone langchain-community langchain-google-genai
python load.py
```

`requirements.txt` lists the package versions from when the loader was written in August 2024. The install line above pulls current releases instead.

Start the app with `npm run dev` and go to http://localhost:3000. Use `npm run build` and then `npm start` for a production run.

Both Gemini routes ask for `gemini-pro` by name. If your key has no access to that model, change the name in `app/api/chat/route.js` and `app/api/majorAdvisor/route.js`.

More context and screenshots: [Academic Advisor AI write-up](https://www.lihongebre.com/projects/academic-advisor-ai)
