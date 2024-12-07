require('dotenv').config();
const express = require('express');
const schedule = require('node-schedule');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 9011;

// Telegram bot configuration
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Function to send Telegram message
async function sendTelegramMessage(chatId) {
  try {
    const message = "Hi! This is Noa's bot. Coming soon, stay tuned.";
    const response = await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: message
    });
    console.log('Message sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending message:', error.response?.data || error.message);
  }
}

// Function to poll for updates
async function pollUpdates(offset = 0) {
  try {
    const response = await axios.get(`${TELEGRAM_API}/getUpdates`, {
      params: {
        offset,
        timeout: 30
      }
    });

    const updates = response.data.result;
    if (updates.length > 0) {
      for (const update of updates) {
        if (update.message) {
          await sendTelegramMessage(update.message.chat.id);
        }
        // Update offset to acknowledge the message
        offset = update.update_id + 1;
      }
    }

    // Continue polling
    pollUpdates(offset);
  } catch (error) {
    console.error('Polling error:', error.message);
    // Retry after a short delay
    setTimeout(() => pollUpdates(offset), 5000);
  }
}

// Start polling for messages
pollUpdates();

// Schedule daily message
schedule.scheduleJob('0 12 * * *', () => sendTelegramMessage(TELEGRAM_CHAT_ID));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Telegram bot is active and will send messages daily at 12:00 PM');
}); 