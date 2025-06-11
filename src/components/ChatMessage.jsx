import React from 'react';
import { User, Bot, AlertCircle, CheckCircle, Brain } from 'lucide-react';

const ChatMessage = ({ 
  message, 
  isUser, 
  timestamp, 
  confidence, 
  intent, 
  isWelcome = false, 
  isError = false,
  entities = []
}) => {
  const getConfidenceColor = (conf) => {
    if (conf >= 0.8) return 'text-green-600';
    if (conf >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatIntent = (intentString) => {
    if (!intentString) return '';
    return intentString
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}>
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start max-w-4xl`}>
        {/* Enhanced Avatar */}
        <div className={`flex-shrink-0 ${isUser ? 'ml-3' : 'mr-3'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
            isUser 
              ? 'bg-gradient-to-r from-dte-blue to-dte-light-blue text-white' 
              : isError
              ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
              : isWelcome
              ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
          }`}>
            {isUser ? (
              <User size={16} />
            ) : isError ? (
              <AlertCircle size={16} />
            ) : isWelcome ? (
              <CheckCircle size={16} />
            ) : (
              <Bot size={16} />
            )}
          </div>
        </div>
        
        {/* Enhanced Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`px-4 py-3 shadow-md ${
            isUser 
              ? 'chat-message-user' 
              : isError
              ? 'bg-red-50 text-red-800 rounded-t-2xl rounded-br-2xl max-w-md border border-red-200'
              : isWelcome
              ? 'bg-gradient-to-r from-blue-50 to-green-50 text-gray-800 rounded-t-2xl rounded-br-2xl max-w-md border border-blue-200 shadow-lg'
              : 'chat-message-bot'
          }`}>
            {/* Message Text */}
            <div className="whitespace-pre-wrap break-words">
              {message}
            </div>
            
            {/* Professional badges for special messages */}
            {isWelcome && (
              <div className="mt-3 pt-3 border-t border-blue-200">
                <div className="flex items-center gap-2 text-xs text-blue-700">
                  <Brain size={12} />
                  <span className="font-medium">IBM Watsonx Assistant Active</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            )}
            
            {/* Error recovery options */}
            {isError && (
              <div className="mt-3 pt-3 border-t border-red-200">
                <div className="flex items-center gap-2 text-xs text-red-700">
                  <AlertCircle size={12} />
                  <span className="font-medium">Auto-Recovery Activated</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Enhanced Timestamp and AI Analytics */}
          <div className="flex items-center gap-3 mt-1 px-2">
            {timestamp && (
              <div className="text-xs text-gray-500">
                {new Date(timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            )}
            
            {/* AI Confidence and Intent Indicators (for bot messages only) */}
            {!isUser && confidence && (
              <div className="flex items-center gap-2 text-xs">
                <div className={`flex items-center gap-1 ${getConfidenceColor(confidence)}`}>
                  <Brain size={10} />
                  <span className="font-medium">{Math.round(confidence * 100)}%</span>
                </div>
                
                {intent && (
                  <div className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                    {formatIntent(intent)}
                  </div>
                )}
              </div>
            )}
            
            {/* Entity indicators */}
            {!isUser && entities && entities.length > 0 && (
              <div className="flex gap-1">
                {entities.slice(0, 2).map((entity, index) => (
                  <div 
                    key={index}
                    className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded text-xs"
                    title={`Entity: ${entity.entity} = ${entity.value}`}
                  >
                    {entity.entity}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Professional message type indicators */}
          {!isUser && !isWelcome && !isError && (
            <div className="text-xs text-gray-400 mt-1 px-2 flex items-center gap-1">
              <span>🤖</span>
              <span>Powered by IBM Watsonx</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage; 