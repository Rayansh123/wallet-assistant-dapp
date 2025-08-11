// src/utils/parseCommand.js
// Lightweight natural-language -> structured command parser.
// Covers: balance checks, single send, multi-send with conditions, gas estimation.
// This is intentionally simple; the LLM (agent.js) can be used for more complex parsing.

function extractAddresses(text) {
  const addrRegex = /0x[a-fA-F0-9]{40}/g;
  const found = text.match(addrRegex);
  return found || [];
}

export function parseCommand(text = "") {
  const raw = (text || "").trim();
  const lower = raw.toLowerCase();

  // CHECK BALANCE
  if (/\b(balance|what's my balance|show my balance|show balance)\b/.test(lower)) {
    // try to extract token symbol after "balance" e.g., "show my USDC balance"
    const tokenMatch = raw.match(/\b([A-Za-z0-9]{2,6})\s+balance\b/i);
    const token = tokenMatch ? tokenMatch[1].toUpperCase() : "BNB";
    return { action: "CHECK_BALANCE", token };
  }

  // SEND TOKENS (single)
  // Examples: "Send 0.05 BNB to 0xabc..." or "send 1 USDT to 0x..."
  if (/\bsend\b/.test(lower) && /0x[a-fA-F0-9]{40}/.test(lower)) {
    // try to extract amount, token, and recipient
    const addr = extractAddresses(raw)[0];
    // amount and token extraction: look for pattern "<number> <TOKEN>"
    const amtTokenMatch = raw.match(/([\d,.]+)\s*([A-Za-z]{2,6})/);
    let amount = null;
    let token = "BNB";
    if (amtTokenMatch) {
      amount = parseFloat(amtTokenMatch[1].replace(/,/g, ""));
      token = amtTokenMatch[2].toUpperCase();
    } else {
      // fallback: number without token
      const numMatch = raw.match(/([\d,.]+)/);
      if (numMatch) amount = parseFloat(numMatch[1].replace(/,/g, ""));
    }
    return { action: "SEND_TOKENS", to: addr, amount, token };
  }

  // MULTI_SEND with optional conditions
  // Example: "multi-send to 0xAAA, 0xBBB if balance > 1 BNB"
  if (/\b(multi-send|multi send|batch send|batch-transfer)\b/.test(lower) || (lower.includes("if") && extractAddresses(lower).length > 1)) {
    const recipients = extractAddresses(raw);
    // Extract conditions after 'if'
    const ifMatch = raw.match(/\bif\s+(.+)$/i);
    const conditions = [];
    if (ifMatch && ifMatch[1]) {
      // split multiple conditions by 'and' / ',' if provided
      const condText = ifMatch[1];
      const parts = condText.split(/\band\b|,/i).map(s => s.trim()).filter(Boolean);
      parts.forEach(p => conditions.push(p));
    }
    // Attempt to parse amounts per recipient like "send 0.1 to 0xA, 0.2 to 0xB"
    const perRecipient = [];
    const perMatches = raw.matchAll(/([\d,.]+)\s*([A-Za-z]{2,6})?\s*to\s*(0x[a-fA-F0-9]{40})/g);
    for (const m of perMatches) {
      perRecipient.push({
        to: m[3],
        amount: parseFloat(m[1].replace(/,/g, "")),
        token: m[2] ? m[2].toUpperCase() : "BNB",
      });
    }

    return { action: "MULTI_SEND", recipients, perRecipient, conditions };
  }

  // ESTIMATE GAS
  if (/\bgas\b/.test(lower) && (lower.includes("estimate") || lower.includes("fee") || lower.includes("fees"))) {
    return { action: "ESTIMATE_GAS", txData: null };
  }

  // Fallback
  return { action: "UNKNOWN", raw: text };
}
