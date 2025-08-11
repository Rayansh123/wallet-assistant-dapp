// src/utils/conditions.js
// Evaluates simple conditions like "balance > 1 ETH" or "balance >= 0.5 BNB"
// Returns boolean. Expects walletStore to expose async checkBalance(token) that returns numeric balance.

export async function evaluateCondition(condition, walletStore) {
  if (!condition || typeof condition !== "string") return false;

  // Normalize spacing and tokens
  const parts = condition.trim().split(/\s+/);
  // Expect patterns like: balance > 1 ETH
  // parts -> ["balance", ">", "1", "ETH"]
  if (parts.length < 3) return false;

  const lhs = parts[0].toLowerCase();
  const operator = parts[1];
  const rhs = parseFloat(parts[2]);
  const token = parts[3] ? parts[3].toUpperCase() : "BNB"; // default to native token

  if (lhs === "balance") {
    // walletStore.checkBalance should return a numeric value in token units (not wei)
    try {
      const balance = await walletStore.checkBalance(token); // e.g., 1.2345
      if (Number.isNaN(rhs) || balance == null) return false;

      switch (operator) {
        case ">":
          return balance > rhs;
        case "<":
          return balance < rhs;
        case ">=":
          return balance >= rhs;
        case "<=":
          return balance <= rhs;
        case "==":
        case "=":
          return balance === rhs;
        default:
          return false;
      }
    } catch (err) {
      console.error("evaluateCondition error:", err);
      return false;
    }
  }

  // Extendable: allow other LHS types in future
  return false;
}
