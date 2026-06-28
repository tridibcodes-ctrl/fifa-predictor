# FIFA World Cup 2026 Prediction Engine 🏆

A sleek, editorial-style World Cup 2026 Knockout Bracket and Prediction Engine. It automatically tracks live tournament data, calculates Elo ratings, and runs Monte Carlo simulations to predict tournament outcomes in real-time.

## Features ✨

- **Live Data Integration:** Automatically fetches real-time match scores and statuses from `football-data.org`.
- **Editorial UI:** A premium, fully responsive, and interactive dark-mode bracket designed like top-tier sports journalism outlets.
- **Elo Prediction Engine:** Calculates dynamic win probabilities using a mathematical Elo rating system.
- **Monte Carlo Simulations:** Runs 5,000 simulations per bracket update to determine the "Model's Predicted Bracket".
- **Form & Insight Panel:** Hover over any match to see an interactive editorial card showing team form, historical data, and goals-per-game metrics.
- **Secure Serverless Proxy:** Utilizes a Vercel serverless backend to securely proxy API calls, completely protecting private API keys from exposure.

## Tech Stack 🛠️

- **Frontend:** HTML5, Vanilla CSS3, Vanilla JavaScript (ES6+). Zero heavy frameworks.
- **Backend:** Node.js (Vercel Serverless Functions).
- **Data Source:** [football-data.org API](https://www.football-data.org/)

## Local Development 💻

Because this app utilizes a Vercel Serverless Function (`/api/matches.js`) to securely handle API keys, it is best run using the Vercel CLI locally.

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Link the project & set up environment variables:**
   ```bash
   vercel link
   vercel env pull
   ```
   *Make sure you add `FOOTBALL_DATA_KEYS` to your Vercel project environment variables in the dashboard.*

3. **Run the local dev server:**
   ```bash
   vercel dev
   ```

## Deployment 🚀

This project is configured to be deployed effortlessly on **Vercel**.

1. Import this repository into your Vercel account.
2. In the Vercel project settings, navigate to **Environment Variables**.
3. Add a new variable:
   - **Key:** `FOOTBALL_DATA_KEYS`
   - **Value:** Your API keys (e.g., `key1,key2,key3`).
4. Deploy! The Vercel serverless function will automatically and securely proxy all data requests.
