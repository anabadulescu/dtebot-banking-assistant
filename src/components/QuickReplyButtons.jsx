import React from 'react';
import { CreditCard, ArrowRightLeft, AlertTriangle, HelpCircle, TrendingUp, Shield } from 'lucide-react';

const QuickReplyButtons = ({ onQuickReply, disabled }) => {
  const quickReplies = [
    {
      id: 'balance',
      text: 'Check Balance',
      icon: <CreditCard size={16} />,
      message: 'Show me my account balances and portfolio overview',
      color: 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200',
      category: 'primary'
    },
    {
      id: 'transactions',
      text: 'Recent Activity',
      icon: <TrendingUp size={16} />,
      message: 'Show me my recent transactions across all accounts',
      color: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200',
      category: 'primary'
    },
    {
      id: 'transfer',
      text: 'Transfer Funds',
      icon: <ArrowRightLeft size={16} />,
      message: 'I want to transfer money between my accounts',
      color: 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200',
      category: 'primary'
    },
    {
      id: 'credit',
      text: 'Credit Card',
      icon: <CreditCard size={16} />,
      message: 'Show me my credit card information and available credit',
      color: 'bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200',
      category: 'secondary'
    },
    {
      id: 'investment',
      text: 'Investments',
      icon: <TrendingUp size={16} />,
      message: 'Show me my investment portfolio performance',
      color: 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200',
      category: 'secondary'
    },
    {
      id: 'security',
      text: 'Security',
      icon: <Shield size={16} />,
      message: 'Help me with account security and fraud protection',
      color: 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200',
      category: 'secondary'
    },
    {
      id: 'issue',
      text: 'Report Issue',
      icon: <AlertTriangle size={16} />,
      message: 'I need help with a banking issue or problem',
      color: 'bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200',
      category: 'support'
    },
    {
      id: 'help',
      text: 'Help & Support',
      icon: <HelpCircle size={16} />,
      message: 'What banking services and features can you help me with?',
      color: 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200',
      category: 'support'
    }
  ];

  // Group buttons by category for better organization
  const primaryButtons = quickReplies.filter(btn => btn.category === 'primary');
  const secondaryButtons = quickReplies.filter(btn => btn.category === 'secondary');
  const supportButtons = quickReplies.filter(btn => btn.category === 'support');

  return (
    <div className="px-4 py-2 space-y-3">
      {/* Primary Banking Actions */}
      <div className="flex flex-wrap gap-2">
        {primaryButtons.map((reply) => (
          <button
            key={reply.id}
            onClick={() => onQuickReply(reply.message)}
            disabled={disabled}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-full border text-sm font-medium
              transition-all duration-200 hover:shadow-md transform hover:scale-105
              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
              ${reply.color}
            `}
            title={`Quick action: ${reply.text}`}
          >
            {reply.icon}
            <span>{reply.text}</span>
          </button>
        ))}
      </div>

      {/* Secondary Banking Actions */}
      <div className="flex flex-wrap gap-2">
        {secondaryButtons.map((reply) => (
          <button
            key={reply.id}
            onClick={() => onQuickReply(reply.message)}
            disabled={disabled}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-full border text-sm font-medium
              transition-all duration-200 hover:shadow-md transform hover:scale-105
              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
              ${reply.color}
            `}
            title={`Quick action: ${reply.text}`}
          >
            {reply.icon}
            <span>{reply.text}</span>
          </button>
        ))}
      </div>

      {/* Support Actions */}
      <div className="flex flex-wrap gap-2 pt-1 border-t border-gray-100">
        {supportButtons.map((reply) => (
          <button
            key={reply.id}
            onClick={() => onQuickReply(reply.message)}
            disabled={disabled}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-full border text-sm font-medium
              transition-all duration-200 hover:shadow-md transform hover:scale-105
              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
              ${reply.color}
            `}
            title={`Quick action: ${reply.text}`}
          >
            {reply.icon}
            <span>{reply.text}</span>
          </button>
        ))}
      </div>

      {/* Quick tip for users */}
      <div className="text-center pt-2">
        <p className="text-xs text-gray-500">
          💡 Powered by IBM Watsonx • Click any button for instant assistance
        </p>
      </div>
    </div>
  );
};

export default QuickReplyButtons; 