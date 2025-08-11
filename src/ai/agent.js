// src/ai/agent.js
import { handleGetBalance, handleGetTokenPrice, handleSendTransaction, handleMultiSend } from './actions';
import { parseUserCommand } from '../utils/parseCommand';

// Main agent function to process user input and decide actions
export async function processUserInput(input) {
  // Parse user command into intent + parameters
  const parsed = parseUserCommand(input);

  if (!parsed) {
    return { success: false, message: "Sorry, I didn't understand that." };
  }

  const { intent, params } = parsed;

  switch (intent) {
    case 'get_balance':
      return await handleGetBalance();

    case 'get_price':
      return await handleGetTokenPrice(params.token);

    case 'send_transaction':
      return await handleSendTransaction(params);

    case 'multi_send':
      return await handleMultiSend(params);

    default:
      return { success: false, message: 'Sorry, I cannot handle that command yet.' };
  }
}



