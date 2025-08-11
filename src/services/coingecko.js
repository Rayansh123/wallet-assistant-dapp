// src/services/coingecko.js

const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

export async function fetchTokenPrice(tokenSymbol) {
  try {
    // Map common symbols to CoinGecko IDs
    const symbolToId = {
      BNB: 'binancecoin',
      ETH: 'ethereum',
      USDT: 'tether',
      // add more tokens here as needed
    };

    const id = symbolToId[tokenSymbol.toUpperCase()];
    if (!id) {
      throw new Error(`Token ${tokenSymbol} not supported`);
    }

    const response = await fetch(
      `${COINGECKO_API_BASE}/simple/price?ids=${id}&vs_currencies=usd`
    );
    const data = await response.json();
    return data[id]?.usd ?? null;
  } catch (error) {
    console.error('Error fetching token price:', error);
    return null;
  }
}
