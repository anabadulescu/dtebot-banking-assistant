import React, { useState, useEffect, useRef } from 'react';
import { Bot, Minimize2, Maximize2, X, Wifi, Activity, Shield } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import QuickReplyButtons from './QuickReplyButtons';
import TypingIndicator from './TypingIndicator';
import { sendMessageToWatson, initializeWatsonSession, cleanupWatsonSession, getSessionAnalytics, checkWatsonHealth } from '../services/watsonxService';
import { mockUserData } from '../services/mockData';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [watsonHealth, setWatsonHealth] = useState({ status: 'checking', healthy: true });
  const [sessionStats, setSessionStats] = useState({ interactionCount: 0 });
  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);

  // Initialize chat on component mount
  useEffect(() => {
    const initializeChat = async () => {
      try {
        // Check Watson health
        const health = await checkWatsonHealth();
        setWatsonHealth(health);
        
        // Initialize Watson session
        await initializeWatsonSession();
        
        // Add personalized welcome message
        const welcomeMessage = {
          id: 'welcome',
          text: `Good ${getTimeOfDay()}, ${mockUserData.preferredName}! 👋 

Welcome back to **DTE Banking**. I'm **DTEBot**, your dedicated AI banking assistant powered by IBM Watsonx Assistant. 

As a valued ${getCustomerTier()} customer since ${new Date(mockUserData.memberSince).getFullYear()}, I'm here to provide you with:

🏦 **Comprehensive Account Management**
💸 **Secure Transfer & Payment Services** 
📈 **Investment Portfolio Insights**
🔒 **24/7 Security & Fraud Protection**

I'm continuously learning through IBM's advanced AI to provide you with more personalized and intelligent assistance. 

How may I help you with your banking needs today?`,
          isUser: false,
          timestamp: new Date().toISOString(),
          isWelcome: true
        };
        
        setMessages([welcomeMessage]);
        
        // Update session stats
        const stats = getSessionAnalytics();
        setSessionStats(stats);
        
      } catch (error) {
        console.error('Error initializing chat:', error);
        // Fallback welcome message
        const fallbackMessage = {
          id: 'welcome-fallback',
          text: `Hello ${mockUserData.preferredName}! I'm DTEBot, and I'm here to help with your banking needs. I'm currently running in demo mode and ready to assist you!`,
          isUser: false,
          timestamp: new Date().toISOString()
        };
        setMessages([fallbackMessage]);
      }
    };

    initializeChat();

    // Periodic health checks
    const healthCheckInterval = setInterval(async () => {
      const health = await checkWatsonHealth();
      setWatsonHealth(health);
      
      const stats = getSessionAnalytics();
      setSessionStats(stats);
    }, 30000); // Check every 30 seconds

    // Cleanup on component unmount
    return () => {
      clearInterval(healthCheckInterval);
      cleanupWatsonSession();
    };
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (messageText) => {
    // Add user message to chat
    const userMessage = {
      id: `user-${Date.now()}`,
      text: messageText,
      isUser: true,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Send message to Watson and get response
      const response = await sendMessageToWatson(messageText);
      
      // Add bot response to chat
      const botMessage = {
        id: `bot-${Date.now()}`,
        text: response.text,
        isUser: false,
        timestamp: new Date().toISOString(),
        intent: response.intent,
        confidence: response.confidence,
        entities: response.entities || [],
        analytics: response.analytics
      };

      // Simulate realistic response time with better UX
      const responseDelay = 800 + Math.random() * 800;
      setTimeout(() => {
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
        
        // Update session stats
        const stats = getSessionAnalytics();
        setSessionStats(stats);
      }, responseDelay);

    } catch (error) {
      console.error('Error sending message:', error);
      
      // Professional error message
      const errorMessage = {
        id: `error-${Date.now()}`,
        text: `I apologize, ${mockUserData.preferredName}, but I'm experiencing some technical difficulties. This might be due to a temporary connection issue.

🔄 **I'm back online now and ready to help!**

If you continue to experience issues, please:
• Try refreshing the page
• Contact our customer service at **1-800-DTE-BANK**
• Visit your nearest branch for immediate assistance

Your account security and data remain fully protected. How can I assist you now?`,
        isUser: false,
        timestamp: new Date().toISOString(),
        isError: true
      };

      setTimeout(() => {
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleQuickReply = (message) => {
    handleSendMessage(message);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Helper functions
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  };

  const getCustomerTier = () => {
    // Based on account portfolio value
    const totalAssets = mockUserData.accounts.reduce((sum, account) => 
      sum + Math.abs(account.balance), 0
    );
    if (totalAssets > 50000) return 'Premier';
    if (totalAssets > 25000) return 'Preferred';
    return 'Valued';
  };

  const getStatusColor = () => {
    if (!watsonHealth.healthy) return 'bg-red-500';
    if (watsonHealth.status === 'demo_mode') return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusText = () => {
    if (!watsonHealth.healthy) return 'Connection Issue';
    if (watsonHealth.status === 'demo_mode') return 'Demo Mode';
    return 'Online';
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="
            bg-gradient-to-r from-dte-blue to-dte-light-blue text-white p-4 rounded-full 
            shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110
            flex items-center justify-center group relative
          "
          title="Open DTEBot - Your AI Banking Assistant"
        >
          <Bot size={24} />
          {/* Notification indicator */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          
          {/* Hover tooltip */}
          <div className="absolute bottom-full mb-2 right-0 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            DTEBot • IBM Watsonx AI
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className={`
      fixed bottom-4 right-4 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200
      transition-all duration-300 ease-in-out
      ${isMinimized ? 'w-80 h-16' : 'w-96 h-[650px]'}
    `}>
      {/* Enhanced Header */}
      <div className="
        flex items-center justify-between p-4 border-b border-gray-200 
        bg-gradient-to-r from-dte-blue to-dte-light-blue text-white rounded-t-2xl
      ">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot size={18} />
          </div>
          <div>
            <h3 className="font-semibold text-sm">DTEBot</h3>
            <div className="flex items-center gap-2 text-xs text-blue-100">
              <span>IBM Watsonx AI</span>
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 ${getStatusColor()} rounded-full`}></div>
                <span>{getStatusText()}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Health indicators */}
          <div className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded">
            <Activity size={12} />
            <span>{sessionStats.interactionCount || 0}</span>
          </div>
          
          <button
            onClick={handleMinimize}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            title={isMinimized ? "Expand chat" : "Minimize chat"}
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button
            onClick={handleClose}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            title="Close chat"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Chat Content */}
      {!isMinimized && (
        <>
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 h-[450px] bg-gray-50 scrollbar-thin">
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.text}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                  confidence={message.confidence}
                  intent={message.intent}
                  isWelcome={message.isWelcome}
                  isError={message.isError}
                />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Reply Buttons */}
          <QuickReplyButtons 
            onQuickReply={handleQuickReply} 
            disabled={isTyping}
          />

          {/* Chat Input */}
          <ChatInput
            ref={chatInputRef}
            onSendMessage={handleSendMessage}
            disabled={isTyping}
            placeholder={
              isTyping 
                ? "DTEBot is analyzing your request..." 
                : "Ask about accounts, transfers, investments, or type 'help'"
            }
          />
        </>
      )}

      {/* Enhanced Status Indicator */}
      <div className={`
        absolute -top-2 -left-2 w-4 h-4 ${getStatusColor()} rounded-full border-2 border-white
        ${isMinimized ? 'hidden' : 'block'}
      `} title={`DTEBot Status: ${getStatusText()}`} />
      
      {/* Security Badge */}
      <div className="absolute -top-1 -right-1 bg-green-500 text-white p-1 rounded-full" title="Bank-grade security">
        <Shield size={10} />
      </div>
    </div>
  );
};

export default ChatBot; 