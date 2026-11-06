# HealthTravo | Dushyant Singh Chauhan

Official website of **Dushyant Singh Chauhan**, Founder & CEO of **HealthTravo** (pre-incubated under GIMS).

## 🚀 Overview
HealthTravo bridges global healthcare gaps through ethical medical tourism, comprehensive patient continuum care, and health media education.

- **Stack**: React 19, Vite, Tailwind CSS v4, Lucide React
- **Backend / Form Integration**: Google Apps Script & Google Sheets
- **Deployment Ready**: Vercel / Netlify

## 🛠️ Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/amanrathore88/healthtravo.git
   cd healthtravo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your `VITE_GOOGLE_SHEET_URL` endpoint.

4. **Start the local dev server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

## 🌐 Deploy to Vercel

1. Import this repository in [Vercel](https://vercel.com/new).
2. Framework Preset will auto-detect as **Vite**.
3. Under **Environment Variables**, add:
   - `VITE_GOOGLE_SHEET_URL`: Your Google Apps Script deployment URL.
4. Click **Deploy**.
