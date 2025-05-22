1. Design Decisions & Tradeoffs

Offline-First Architecture:
All notes are stored in the browser using IndexedDB. They are synced to the backend only when network is available.

Client-Wins Sync Strategy:
In the event of a conflict between local and remote versions, the local note takes precedence and overwrites the remote.

Markdown Support:
Used @uiw/react-md-editor to allow rich text editing using markdown.

Simple Backend:
JSON Server acts as a lightweight REST API for simulating backend interactions.

2. Assumptions & Limitations
The app assumes users prefer local edits over remote ones during sync.

Notes can be created, edited, and deleted, but user authentication is not included.

Syncing only works when online — offline changes are queued until the next sync.

The backend is not persistent and should not be used in production.

3. How to Run and Test the App
Make sure the backend is running (npx json-server backend/db.json --port 4000)

Open the app in the browser (npm run dev)

Try creating notes while offline — they will sync once you're back online.

Test deletion, editing, and markdown rendering.

Check your IndexedDB (DevTools > Application > IndexedDB) to inspect local data.