import type { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from '@vercel/kv';

const MONTHLY_TOKEN_LIMIT = 300000; // 300,000 tokens per month

// Helper function to get current month key
function getCurrentMonthKey(): string {
  const now = new Date();
  return `token_usage_${now.getFullYear()}_${now.getMonth()}`;
}

// Helper function to check and update token usage
async function checkTokenLimit(): Promise<{ allowed: boolean; currentUsage: number; remaining: number }> {
  try {
    const monthKey = getCurrentMonthKey();
    const currentUsage = await kv.get<number>(monthKey) || 0;
    const remaining = MONTHLY_TOKEN_LIMIT - currentUsage;
    
    return {
      allowed: currentUsage < MONTHLY_TOKEN_LIMIT,
      currentUsage,
      remaining: Math.max(0, remaining),
    };
  } catch (error) {
    // If KV is not configured, allow the request but log a warning
    console.warn('Vercel KV not configured, token tracking disabled:', error);
    return { allowed: true, currentUsage: 0, remaining: MONTHLY_TOKEN_LIMIT };
  }
}

// Helper function to update token usage
async function updateTokenUsage(tokensUsed: number): Promise<void> {
  try {
    const monthKey = getCurrentMonthKey();
    const currentUsage = await kv.get<number>(monthKey) || 0;
    await kv.set(monthKey, currentUsage + tokensUsed, { ex: 2678400 }); // Expire after 31 days
  } catch (error) {
    console.warn('Failed to update token usage:', error);
  }
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { message, conversationHistory } = request.body;

  if (!message) {
    return response.status(400).json({ error: 'Message is required' });
  }

  // Check token limit before making API call
  const tokenCheck = await checkTokenLimit();
  if (!tokenCheck.allowed) {
    return response.status(429).json({ 
      error: 'Monthly token limit exceeded',
      message: `You've reached the monthly limit of ${MONTHLY_TOKEN_LIMIT.toLocaleString()} tokens. The limit will reset next month.`,
      currentUsage: tokenCheck.currentUsage,
      limit: MONTHLY_TOKEN_LIMIT,
    });
  }

  // Try multiple environment variable names for flexibility
  const apiKey = process.env.OPENAI_API_KEY 
    || process.env.VITE_OPENAI_API_KEY
    || process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  if (!apiKey) {
    console.error('OpenAI API key not found in environment variables');
    return response.status(500).json({ 
      error: 'OpenAI API key not configured. Please set OPENAI_API_KEY in your environment variables.' 
    });
  }

  try {
    const systemPrompt = `You are a coding-focused assistant bot named "Playful Bot" 🤖. Your primary purpose is to help with coding-related conversations, questions, and discussions.

You specialize in:
- Programming languages (JavaScript, TypeScript, Python, React, etc.)
- Web development (frontend, backend, full-stack)
- Software engineering concepts and best practices
- Code debugging and problem-solving
- Architecture and design patterns
- AI/ML technologies (LangChain, LangGraph, RAG, VectorDB, etc.)
- Development tools and workflows

Keep your responses focused on coding topics. If asked about non-coding topics, politely redirect to coding-related discussions. Be helpful, clear, and concise. Use emojis sparingly and only when appropriate. Keep responses informative but not too lengthy (2-4 sentences for most answers, longer only when explaining complex concepts).`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...(conversationHistory || []),
      { role: 'user', content: message },
    ];

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 200,
      }),
    });

    if (!openaiResponse.ok) {
      const error = await openaiResponse.json();
      console.error('OpenAI API error:', error);
      return response.status(openaiResponse.status).json({ error: 'Failed to get response from OpenAI' });
    }

    const data = await openaiResponse.json();
    const botMessage = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    
    // Track token usage from the response
    const usage = data.usage;
    if (usage && usage.total_tokens) {
      await updateTokenUsage(usage.total_tokens);
    }

    // Get updated token usage for response
    const updatedTokenCheck = await checkTokenLimit();

    return response.status(200).json({ 
      message: botMessage,
      tokenUsage: {
        used: usage?.total_tokens || 0,
        remaining: updatedTokenCheck.remaining,
        limit: MONTHLY_TOKEN_LIMIT,
      },
    });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
}

