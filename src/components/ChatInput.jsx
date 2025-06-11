import React, { useState } from 'react';
import { Send, Mic } from 'lucide-react';

const ChatInput = ({ onSendMessage, disabled, placeholder = "Type your message..." }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Function to set message from quick replies
  const setInputMessage = (msg) => {
    setMessage(msg);
  };

  // Expose setInputMessage for parent components
  React.useImperativeHandle(React.forwardRef(() => {}), () => ({
    setMessage: setInputMessage
  }));

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="
              w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl resize-none
              focus:outline-none focus:ring-2 focus:ring-dte-blue focus:border-transparent
              disabled:bg-gray-100 disabled:cursor-not-allowed
              placeholder-gray-500 text-gray-900
              max-h-32 min-h-[48px]
            "
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#cbd5e1 #f1f5f9'
            }}
          />
          
          {/* Voice input button (placeholder for future feature) */}
          <button
            type="button"
            className="
              absolute right-3 top-1/2 transform -translate-y-1/2
              p-1.5 text-gray-400 hover:text-gray-600 transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            disabled={disabled}
            title="Voice input (coming soon)"
          >
            <Mic size={18} />
          </button>
        </div>
        
        <button
          type="submit"
          disabled={disabled || !message.trim()}
          className="
            p-3 bg-dte-blue text-white rounded-full hover:bg-dte-light-blue
            disabled:bg-gray-300 disabled:cursor-not-allowed
            transition-all duration-200 transform hover:scale-105 active:scale-95
            flex items-center justify-center min-w-[48px] h-[48px]
          "
          title="Send message"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput; 