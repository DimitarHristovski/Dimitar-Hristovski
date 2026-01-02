# OpenAI API Setup

## For Vercel Deployment (Production)

### 1. Set up OpenAI API Key

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add a new variable:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: `<YOUR_OPENAI_API_KEY>` (Get your API key from https://platform.openai.com/api-keys)
   - **Environment**: Production, Preview, Development (select all)

### 2. Set up Vercel KV for Token Tracking

The API includes a **300,000 tokens per month limit** to control costs. To enable token tracking:

1. Go to your Vercel project dashboard
2. Navigate to the "Storage" tab
3. Click "Create Database" → Select "KV" (Key-Value)
4. Create a new KV database (or use an existing one)
5. The KV connection will be automatically available to your serverless functions

**Note**: If Vercel KV is not configured, the API will still work but token tracking will be disabled (all requests will be allowed).

4. Redeploy your application

## For Local Development

The API endpoint (`/api/chat`) will only work when deployed to Vercel. For local development:

- The bot will fall back to default playful responses if the API is unavailable
- Quiz, Trivia, and Challenge modes will still work perfectly
- To test the OpenAI integration locally, you can use Vercel CLI:
  ```bash
  npm i -g vercel
  vercel dev
  ```

## API Endpoint

The API endpoint is available at `/api/chat` and handles POST requests with:
- `message`: The user's message
- `conversationHistory`: Array of previous messages (optional)

The bot uses OpenAI's GPT-4o-mini model for intelligent responses while maintaining quiz, trivia, and challenge functionality. If the API is unavailable, it gracefully falls back to default responses.

## Token Limit

- **Monthly Limit**: 300,000 tokens
- **Tracking**: Uses Vercel KV to track monthly usage
- **Reset**: Automatically resets at the start of each month
- **Response**: API responses include token usage information:
  ```json
  {
    "message": "Bot response...",
    "tokenUsage": {
      "used": 150,
      "remaining": 299850,
      "limit": 300000
    }
  }
  ```
- **Error**: If limit is exceeded, returns HTTP 429 with error message

