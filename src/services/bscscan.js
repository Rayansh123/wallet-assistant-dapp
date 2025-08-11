// src/services/bscscan.js

const BSC_SCAN_API_KEY = import.meta.env.VITE_BSCSCAN_API_KEY;
const BASE_URL = 'https://api.bscscan.com/api';

export async function getTransaction(txHash) {
  try {
    const url = `${BASE_URL}?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${BSC_SCAN_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.status === '1') {
      return data.result;
    }
    return null;
  } catch (error) {
    console.error('BscScan getTransaction error:', error);
    return null;
  }
}

export async function getTokenBalance(address, contractAddress) {
  try {
    const url = `${BASE_URL}?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${address}&tag=latest&apikey=${BSC_SCAN_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.status === '1') {
      // balance is returned as a string in smallest unit (e.g. wei)
      return data.result;
    }
    return null;
  } catch (error) {
    console.error('BscScan getTokenBalance error:', error);
    return null;
  }
}
