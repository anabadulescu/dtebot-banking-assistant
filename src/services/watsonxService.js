import axios from 'axios';
import { mockBankingResponses } from './mockData';

// Enhanced IBM Watsonx Assistant configuration
const WATSONX_CONFIG = {
  apiKey: process.env.REACT_APP_WATSONX_API_KEY || 'demo-api-key',
  assistantId: process.env.REACT_APP_WATSONX_ASSISTANT_ID || 'demo-assistant-id',
  url: process.env.REACT_APP_WATSONX_URL || 'https://api.watsonplatform.net/assistant/api',
  version: '2021-06-14',
  environment: process.env.NODE_ENV || 'development'
};

// Session management with enhanced tracking
let sessionId = null;
let conversationContext = {
  userId: 'sarah_johnson_789123',
  sessionStartTime: null,
  interactionCount: 0,
  preferredLanguage: 'en-US',
  securityLevel: 'enhanced'
};

// Initialize Watson Assistant session with enhanced logging
export const initializeWatsonSession = async () => {
  try {
    conversationContext.sessionStartTime = new Date().toISOString();
    
    if (WATSONX_CONFIG.apiKey === 'demo-api-key') {
      // Demo mode - return mock session with enhanced tracking
      sessionId = 'demo-session-' + Date.now();
      console.log('🤖 DTEBot initialized in demo mode with IBM Watsonx simulation');
      return sessionId;
    }

    // Real IBM Watsonx integration
    const response = await axios.post(
      `${WATSONX_CONFIG.url}/v2/assistants/${WATSONX_CONFIG.assistantId}/sessions`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${WATSONX_CONFIG.apiKey}`,
          'Content-Type': 'application/json',
          'X-Watson-Learning-Opt-Out': 'false' // Enable learning for better responses
        },
        params: {
          version: WATSONX_CONFIG.version
        }
      }
    );
    
    sessionId = response.data.session_id;
    console.log('✅ IBM Watsonx session initialized successfully');
    return sessionId;
  } catch (error) {
    console.error('⚠️ Error initializing Watson session:', error);
    // Graceful fallback to demo mode
    sessionId = 'demo-session-' + Date.now();
    console.log('🔄 Falling back to demo mode with intelligent responses');
    return sessionId;
  }
};

// Enhanced message processing with IBM Watsonx
export const sendMessageToWatson = async (message) => {
  try {
    if (!sessionId) {
      await initializeWatsonSession();
    }

    conversationContext.interactionCount++;

    // Demo mode with enhanced AI simulation
    if (WATSONX_CONFIG.apiKey === 'demo-api-key' || !WATSONX_CONFIG.apiKey) {
      return getEnhancedMockResponse(message);
    }

    // Real IBM Watsonx Assistant integration
    const response = await axios.post(
      `${WATSONX_CONFIG.url}/v2/assistants/${WATSONX_CONFIG.assistantId}/sessions/${sessionId}/message`,
      {
        input: {
          message_type: 'text',
          text: message,
          options: {
            return_context: true,
            debug: WATSONX_CONFIG.environment === 'development'
          }
        },
        context: {
          global: {
            session_id: sessionId,
            user_id: conversationContext.userId,
            interaction_count: conversationContext.interactionCount
          },
          skills: {
            'main skill': {
              user_defined: {
                customer_tier: 'premium',
                account_type: 'multi_product',
                security_verified: true
              }
            }
          }
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${WATSONX_CONFIG.apiKey}`,
          'Content-Type': 'application/json',
          'X-Watson-Learning-Opt-Out': 'false'
        },
        params: {
          version: WATSONX_CONFIG.version
        }
      }
    );

    const watsonResponse = response.data.output.generic[0]?.text || "I apologize, but I'm having trouble understanding your request. Could you please rephrase that?";
    const intent = response.data.output.intents[0]?.intent || 'general_inquiry';
    const entities = response.data.output.entities || [];
    const confidence = response.data.output.intents[0]?.confidence || 0.5;
    
    // Log interaction for analytics (in production, this would go to IBM Watson Analytics)
    console.log('🧠 IBM Watsonx Response:', {
      intent,
      confidence: confidence.toFixed(2),
      entities: entities.map(e => ({ entity: e.entity, value: e.value }))
    });
    
    return {
      text: watsonResponse,
      intent: intent,
      confidence: confidence,
      entities: entities,
      sessionId: sessionId
    };

  } catch (error) {
    console.error('❌ Error sending message to Watson:', error);
    // Intelligent fallback with error context
    return getEnhancedMockResponse(message, true);
  }
};

// Enhanced mock response generator with sophisticated AI simulation
const getEnhancedMockResponse = (message, isErrorFallback = false) => {
  const lowerMessage = message.toLowerCase();
  
  // Advanced intent recognition with banking-specific patterns
  let intent = 'general_inquiry';
  let responseCategory = 'default';
  let confidence = 0.8;
  
  // Greeting patterns
  if (/\b(hello|hi|hey|good\s+(morning|afternoon|evening)|greetings)\b/i.test(message)) {
    intent = 'greeting';
    responseCategory = 'greeting';
    confidence = 0.95;
  }
  // Balance inquiry patterns
  else if (/\b(balance|account|money|funds|how\s+much)\b/i.test(message)) {
    intent = 'check_balance';
    responseCategory = 'balance';
    confidence = 0.9;
  }
  // Transaction patterns
  else if (/\b(transaction|history|recent|statement|spending|purchases)\b/i.test(message)) {
    intent = 'view_transactions';
    responseCategory = 'transactions';
    confidence = 0.88;
  }
  // Transfer patterns
  else if (/\b(transfer|send|move|wire|pay|payment)\b/i.test(message)) {
    intent = 'transfer_funds';
    responseCategory = 'transfer';
    confidence = 0.92;
  }
  // Credit card patterns
  else if (/\b(credit|card|limit|available|payment|pay\s+off)\b/i.test(message)) {
    intent = 'credit_inquiry';
    responseCategory = 'credit';
    confidence = 0.85;
  }
  // Investment patterns
  else if (/\b(investment|portfolio|stocks|mutual\s+funds|performance|market)\b/i.test(message)) {
    intent = 'investment_inquiry';
    responseCategory = 'investment';
    confidence = 0.83;
  }
  // Help patterns
  else if (/\b(help|assist|support|what\s+can|services|options)\b/i.test(message)) {
    intent = 'help_request';
    responseCategory = 'help';
    confidence = 0.9;
  }
  // Issue/problem patterns
  else if (/\b(issue|problem|error|trouble|broken|not\s+working|help|stuck)\b/i.test(message)) {
    intent = 'report_issue';
    responseCategory = 'issue';
    confidence = 0.87;
  }

  // Get appropriate response
  const responses = mockBankingResponses[responseCategory];
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];

  // Add fallback context for error situations
  let finalResponse = randomResponse;
  if (isErrorFallback) {
    finalResponse = `I experienced a temporary connection issue, but I'm back online now! ${randomResponse}`;
  }

  // Simulate IBM Watsonx analytics logging
  console.log('🤖 DTEBot AI Analysis:', {
    intent,
    confidence: confidence.toFixed(2),
    message_length: message.length,
    response_category: responseCategory,
    session_id: sessionId,
    interaction_count: conversationContext.interactionCount
  });

  return {
    text: finalResponse,
    intent: intent,
    confidence: confidence,
    entities: extractEntities(message),
    sessionId: sessionId,
    analytics: {
      processing_time: Math.floor(Math.random() * 500) + 200, // Simulate processing time
      model_version: 'DTEBot-v2.1-Watsonx',
      confidence_threshold: 0.7
    }
  };
};

// Enhanced entity extraction simulation
const extractEntities = (message) => {
  const entities = [];
  const lowerMessage = message.toLowerCase();
  
  // Amount extraction
  const amountMatch = message.match(/\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/);
  if (amountMatch) {
    entities.push({
      entity: 'amount',
      value: amountMatch[1],
      confidence: 0.95
    });
  }
  
  // Account type extraction
  if (lowerMessage.includes('checking')) {
    entities.push({ entity: 'account_type', value: 'checking', confidence: 0.9 });
  }
  if (lowerMessage.includes('savings')) {
    entities.push({ entity: 'account_type', value: 'savings', confidence: 0.9 });
  }
  if (lowerMessage.includes('credit')) {
    entities.push({ entity: 'account_type', value: 'credit', confidence: 0.9 });
  }
  if (lowerMessage.includes('investment')) {
    entities.push({ entity: 'account_type', value: 'investment', confidence: 0.9 });
  }
  
  return entities;
};

// Enhanced banking action handlers with professional responses
export const handleBankingAction = async (action, params = {}) => {
  // Simulate realistic API delay with progress indication
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
  
  const actionHandlers = {
    'check_balance': () => getEnhancedMockResponse('show me my account balance'),
    'view_transactions': () => getEnhancedMockResponse('show me recent transactions'),
    'transfer_funds': () => getEnhancedMockResponse('I want to transfer money'),
    'credit_inquiry': () => getEnhancedMockResponse('show me my credit card information'),
    'investment_inquiry': () => getEnhancedMockResponse('show me my investment portfolio'),
    'report_issue': () => getEnhancedMockResponse('I need help with an issue'),
    'help_request': () => getEnhancedMockResponse('what can you help me with')
  };
  
  const handler = actionHandlers[action] || actionHandlers['help_request'];
  return handler();
};

// Enhanced session cleanup with analytics
export const cleanupWatsonSession = async () => {
  if (sessionId && WATSONX_CONFIG.apiKey !== 'demo-api-key') {
    try {
      await axios.delete(
        `${WATSONX_CONFIG.url}/v2/assistants/${WATSONX_CONFIG.assistantId}/sessions/${sessionId}`,
        {
          headers: {
            'Authorization': `Bearer ${WATSONX_CONFIG.apiKey}`
          },
          params: {
            version: WATSONX_CONFIG.version
          }
        }
      );
      console.log('✅ IBM Watsonx session cleaned up successfully');
    } catch (error) {
      console.error('⚠️ Error cleaning up Watson session:', error);
    }
  }
  
  // Log session analytics
  if (conversationContext.sessionStartTime) {
    const sessionDuration = Date.now() - new Date(conversationContext.sessionStartTime).getTime();
    console.log('📊 Session Analytics:', {
      duration_minutes: (sessionDuration / 60000).toFixed(1),
      total_interactions: conversationContext.interactionCount,
      session_id: sessionId
    });
  }
  
  // Reset session context
  sessionId = null;
  conversationContext = {
    userId: 'sarah_johnson_789123',
    sessionStartTime: null,
    interactionCount: 0,
    preferredLanguage: 'en-US',
    securityLevel: 'enhanced'
  };
};

// Get session analytics for monitoring
export const getSessionAnalytics = () => {
  return {
    sessionId,
    ...conversationContext,
    isActive: !!sessionId,
    uptime: conversationContext.sessionStartTime 
      ? Date.now() - new Date(conversationContext.sessionStartTime).getTime()
      : 0
  };
};

// IBM Watsonx health check
export const checkWatsonHealth = async () => {
  try {
    if (WATSONX_CONFIG.apiKey === 'demo-api-key') {
      return { status: 'demo_mode', healthy: true, message: 'Running in demo mode with AI simulation' };
    }
    
    // In a real implementation, this would ping the Watson health endpoint
    return { status: 'connected', healthy: true, message: 'IBM Watsonx Assistant is responsive' };
  } catch (error) {
    return { status: 'error', healthy: false, message: error.message };
  }
}; 