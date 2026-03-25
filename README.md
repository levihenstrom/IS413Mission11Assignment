# Mission 11 - Bookstore App

## Setup

1. Install backend packages:

```bash
cd backend
dotnet restore
```

2. Start the backend API:

```bash
cd backend
dotnet run
```

3. Install frontend packages:

```bash
cd frontend
npm install
```

4. Start the frontend:

```bash
cd frontend
npm run dev
```

Frontend runs on `http://localhost:3000` and calls the API at `http://localhost:5043` (override with `VITE_API_URL` in `frontend/.env` if needed).

Mission 12 adds category filtering, shopping cart (React Context), cart page, and Bootstrap Offcanvas + Toast — see `Claude.md` for the rubric checklist and the Learning Suite comment template for TAs.
