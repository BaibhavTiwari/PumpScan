# PumpScan 🚀

**PumpScan** is a real-time cryptocurrency market monitoring tool designed to detect potential pump-and-dump activities. It uses free APIs like CoinGecko to track price and volume changes, alerting you to unusual market behavior. Built with **Node.js**, it’s lightweight, easy to use, and customizable.

---

## Features ✨

- **Real-Time Monitoring:** Tracks price and volume changes for any cryptocurrency.
- **Pump Detection:** Alerts you when a currency shows signs of pump-and-dump activity.
- **Vertical Table Output:** Displays data in a clean, easy-to-read vertical table format.
- **Highlighted Changes:** Shows changes in price, volume, and market cap with color-coded highlights.
- **Customizable Thresholds:** Set your own thresholds for price and volume spikes.
- **Auto-Refresh:** Updates data every minute for real-time insights.

---

## Installation 🛠️

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/PumpScan.git
   cd PumpScan
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application:**
   ```bash
   node index.js
   ```

---

## Usage 🚦

1. **Configure the Script:**
   - Open `index.js` and modify the following variables:
     ```javascript
     const SYMBOL = 'bitcoin'; // Currency to monitor (e.g., 'ethereum', 'dogecoin')
     const THRESHOLD = 20; // Percentage change threshold for price spike
     const VOLUME_MULTIPLIER = 3; // Volume multiplier threshold for volume spike
     ```

2. **Run the Script:**
   - Start the script:
     ```bash
     node index.js
     ```

3. **View Output:**
   - The script will display real-time market data in a vertical table format:
     ```
     📊 Real-Time Market Monitor for BTC/USD
     Refreshing every 60 seconds...

     � Time:          8:15:31 pm
     � Price (USD):  84,605.721$
     � 1h Change:    -0.659%
     � Volume (24h): 48,021.533M
     � Volume Ratio: 0.918x
     � Market Cap:   1,675.743B
     � Status:       ✅ Normal
     ──────────────────────────────────────────
     ```

4. **Alerts:**
   - If a pump is detected, the status will change to:
     ```
     🚦 Status:       🚨 PUMP DETECTED!
     ```

---

## Configuration ⚙️

You can customize the following variables in `index.js`:

| Variable            | Description                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| `SYMBOL`            | The cryptocurrency to monitor (e.g., `'bitcoin'`, `'ethereum'`).           |
| `THRESHOLD`         | The percentage change in price to trigger an alert (default: `20`).        |
| `VOLUME_MULTIPLIER` | The volume multiplier to trigger an alert (default: `3`).                  |
| `REFRESH_INTERVAL`  | The interval (in milliseconds) for refreshing data (default: `60000`).     |

---

## Dependencies 📦

- **axios:** For making HTTP requests to the CoinGecko API.
- **chalk:** For color-coding and styling the console output.
- **cli-table:** For displaying data in a tabular format.

Install all dependencies using:
```bash
npm install
```

---

## Contributing 🤝

Contributions are welcome! If you’d like to improve PumpScan, follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## Acknowledgments 🙏

- **CoinGecko API** for providing free cryptocurrency data.
- **Node.js** for making this project possible.
