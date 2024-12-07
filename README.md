# Noa's Telegram Bot

A simple Telegram bot that sends daily messages.

## Local Testing Instructions

1. First, get your Telegram Bot Token:
   - Message [@BotFather](https://t.me/botfather) on Telegram
   - Create a new bot using `/newbot` command
   - Copy the bot token provided

2. Get your Chat ID:
   - Message your bot
   - Visit: `https://api.telegram.org/bot<YourBOTToken>/getUpdates`
   - Look for the "chat" -> "id" field in the response

3. Setup the project:
   ```bash
   npm install
   ```

4. Configure environment variables:
   - Copy .env.example to .env
   - Update TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID with your values

5. Test the bot:
   ```bash
   # Test message sending
   npm run test
   
   # Test health endpoint
   curl http://localhost:3000/health
   ```

6. Run the bot:
   ```bash
   npm run dev
   ```

## Deployment Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/telegram-bot.git
   cd telegram-bot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment:
   ```bash
   cp .env.example .env
   nano .env  # Add your bot token and chat ID
   ```

4. Start the bot:
   ```bash
   # Using PM2 (recommended for production)
   npm install -g pm2
   pm2 start src/app.js --name telegram-bot

   # Or using regular Node
   npm start
   ```

## Troubleshooting

- If messages aren't sending, check:
  - Bot token is correct
  - Chat ID is correct
  - You've started a conversation with the bot
  - Check console for error messages 