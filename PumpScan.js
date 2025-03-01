const axios = require('axios');
const chalk = require('chalk').default; 


const SYMBOL = 'bitcoin';
const THRESHOLD = 20;
const TIME_WINDOW = 60;
const VOLUME_MULTIPLIER = 3;
const REFRESH_INTERVAL = 60 * 1000; 

let previousData = null; 

async function checkPumpDump() {
  try {
    console.clear();

    console.log(chalk.bold(`📊 Real-Time Market Monitor for ${SYMBOL.toUpperCase()}/USD`));
    console.log(chalk.gray(`Refreshing every ${REFRESH_INTERVAL / 1000} seconds...\n`));

    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${SYMBOL}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: 1
      }
    }
    );

    const prices = response.data.prices;
    const volumes = response.data.total_volumes;

    const latestPrice = prices[prices.length - 1][1];
    const hourAgoPrice = prices[Math.max(0, prices.length - TIME_WINDOW)][1];
    const priceChange = ((latestPrice - hourAgoPrice) / hourAgoPrice) * 100;

    const latestVolume = volumes[volumes.length - 1][1];
    const averageVolume = volumes
      .slice(-TIME_WINDOW)
      .reduce((sum, [, v]) => sum + v, 0) / TIME_WINDOW;
    const volumeRatio = latestVolume / averageVolume;

    const marketData = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets`, {
      params: {
        vs_currency: 'usd',
        ids: SYMBOL
      }
    }
    );
    const marketCap = marketData.data[0].market_cap;


    const isPriceSpike = priceChange >= THRESHOLD;
    const isVolumeSpike = volumeRatio >= VOLUME_MULTIPLIER;
    const status = isPriceSpike && isVolumeSpike
      ? chalk.red('🚨 PUMP DETECTED!')
      : chalk.green('✅ Normal');


    const highlightChange = (current, previous, unit = '') => {
      if (!previous) return chalk.gray(`${current.toLocaleString()}${unit}`);
      const change = current - previous;
      const color = change >= 0 ? chalk.green : chalk.red;
      return `${current.toLocaleString()}${unit} ${color(`(${change >= 0 ? '+' : ''}${change.toFixed(2)}${unit})`)}`;
    };

    console.log(chalk.bold(`🕒 Time:          `) + new Date().toLocaleTimeString());
    console.log(chalk.bold(`💰 Price (USD):  `) + highlightChange(latestPrice, previousData?.latestPrice, '$'));
    console.log(chalk.bold(`📈 1h Change:    `) + highlightChange(priceChange, previousData?.priceChange, '%'));
    console.log(chalk.bold(`📊 Volume (24h): `) + highlightChange(latestVolume / 1_000_000, previousData?.latestVolume / 1_000_000, 'M'));
    console.log(chalk.bold(`🔢 Volume Ratio: `) + highlightChange(volumeRatio, previousData?.volumeRatio, 'x'));
    console.log(chalk.bold(`🌍 Market Cap:   `) + highlightChange(marketCap / 1_000_000_000, previousData?.marketCap / 1_000_000_000, 'B'));
    console.log(chalk.bold(`🚦 Status:       `) + status);
    console.log(chalk.gray('──────────────────────────────────────────'));


    previousData = {
      latestPrice,
      priceChange,
      latestVolume,
      volumeRatio,
      marketCap
    };

  } catch (error) {
    console.error(chalk.red(`[${new Date().toLocaleTimeString()}] Error fetching data:`, error.message));
  }
}


setInterval(checkPumpDump, REFRESH_INTERVAL);
checkPumpDump();