// Enhanced mock user data for professional banking experience
export const mockUserData = {
  name: "Sarah Johnson",
  title: "Ms.",
  accountNumber: "****7234",
  customerId: "DTECust789123",
  memberSince: "2019-03-15",
  preferredName: "Sarah",
  accounts: [
    {
      id: "checking",
      type: "Premium Checking Account",
      number: "****7234",
      balance: 4567.89,
      currency: "USD",
      interestRate: 0.25,
      accountType: "checking",
      status: "active"
    },
    {
      id: "savings",
      type: "High-Yield Savings Account", 
      number: "****8901",
      balance: 12340.50,
      currency: "USD",
      interestRate: 3.25,
      accountType: "savings",
      status: "active"
    },
    {
      id: "credit",
      type: "DTE Platinum Credit Card",
      number: "****5678",
      balance: -1245.67,
      creditLimit: 15000.00,
      availableCredit: 13754.33,
      currency: "USD",
      interestRate: 16.99,
      accountType: "credit",
      status: "active"
    },
    {
      id: "investment",
      type: "Investment Portfolio",
      number: "****3456",
      balance: 45678.90,
      currency: "USD",
      accountType: "investment",
      status: "active",
      portfolioValue: 45678.90,
      dayChange: 234.56,
      dayChangePercent: 0.52
    }
  ],
  profile: {
    phone: "***-***-7890",
    email: "s****@email.com",
    address: "123 Main St, Detroit, MI",
    securityLevel: "enhanced"
  }
};

// Enhanced transaction data with more realistic banking scenarios
export const mockTransactions = [
  {
    id: "tx1",
    date: "2024-01-15",
    description: "Coffee Bean Downtown",
    amount: -4.95,
    type: "debit",
    category: "Food & Dining",
    merchant: "Coffee Bean & Tea Leaf",
    accountType: "checking",
    status: "posted",
    location: "Detroit, MI"
  },
  {
    id: "tx2", 
    date: "2024-01-14",
    description: "Salary Direct Deposit",
    amount: 3245.67,
    type: "credit",
    category: "Income",
    merchant: "DTE Energy Company",
    accountType: "checking",
    status: "posted",
    location: "Electronic Transfer"
  },
  {
    id: "tx3",
    date: "2024-01-13",
    description: "Whole Foods Market",
    amount: -127.89,
    type: "debit",
    category: "Groceries",
    merchant: "Whole Foods Market",
    accountType: "checking",
    status: "posted",
    location: "Detroit, MI"
  },
  {
    id: "tx4",
    date: "2024-01-13",
    description: "Shell Gas Station",
    amount: -52.34,
    type: "debit", 
    category: "Transportation",
    merchant: "Shell #45621",
    accountType: "credit",
    status: "posted",
    location: "Detroit, MI"
  },
  {
    id: "tx5",
    date: "2024-01-12",
    description: "Transfer to Savings",
    amount: -500.00,
    type: "transfer",
    category: "Transfer",
    merchant: "Internal Transfer",
    accountType: "checking",
    status: "posted",
    location: "Online Banking"
  },
  {
    id: "tx6",
    date: "2024-01-12",
    description: "Investment Dividend",
    amount: 89.45,
    type: "credit",
    category: "Investment Income",
    merchant: "DTE Dividend Portfolio",
    accountType: "investment",
    status: "posted",
    location: "Electronic Transfer"
  },
  {
    id: "tx7",
    date: "2024-01-11",
    description: "Credit Card Payment",
    amount: -800.00,
    type: "payment",
    category: "Payment",
    merchant: "DTE Platinum Card",
    accountType: "checking",
    status: "posted",
    location: "Online Banking"
  }
];

// Comprehensive banking responses with professional tone
export const mockBankingResponses = {
  greeting: [
    `Good ${getTimeOfDay()}, ${mockUserData.preferredName}! 👋 Welcome back to DTE Banking. I'm DTEBot, your dedicated AI banking assistant powered by IBM Watsonx. As a valued customer since ${new Date(mockUserData.memberSince).getFullYear()}, I'm here to provide you with personalized banking assistance. How may I help you today?`,
    `Hello ${mockUserData.preferredName}! I hope you're having a wonderful day. I'm DTEBot, your intelligent banking companion, ready to assist you with all your financial needs. What can I help you accomplish today?`,
    `Welcome back, ${mockUserData.preferredName}! It's great to see you again. I'm here to make your banking experience seamless and efficient. Whether you need account information, want to make a transfer, or have questions about our services, I'm at your service.`
  ],
  
  balance: [
    `Here's a comprehensive overview of your accounts, ${mockUserData.preferredName}:

💰 **${mockUserData.accounts[0].type}** (${mockUserData.accounts[0].number})
Current Balance: $${mockUserData.accounts[0].balance.toLocaleString()}
Interest Rate: ${mockUserData.accounts[0].interestRate}% APY

🏦 **${mockUserData.accounts[1].type}** (${mockUserData.accounts[1].number})  
Current Balance: $${mockUserData.accounts[1].balance.toLocaleString()}
Interest Rate: ${mockUserData.accounts[1].interestRate}% APY

💳 **${mockUserData.accounts[2].type}** (${mockUserData.accounts[2].number})
Available Credit: $${mockUserData.accounts[2].availableCredit.toLocaleString()}
Credit Limit: $${mockUserData.accounts[2].creditLimit.toLocaleString()}

📈 **${mockUserData.accounts[3].type}** (${mockUserData.accounts[3].number})
Portfolio Value: $${mockUserData.accounts[3].balance.toLocaleString()}
Today's Change: ${mockUserData.accounts[3].dayChange > 0 ? '+' : ''}$${Math.abs(mockUserData.accounts[3].dayChange).toFixed(2)} (${mockUserData.accounts[3].dayChangePercent > 0 ? '+' : ''}${mockUserData.accounts[3].dayChangePercent}%)

Is there a specific account you'd like to know more about, or would you like help with any transactions?`
  ],
  
  transactions: [
    `Here are your most recent transactions, ${mockUserData.preferredName}:

${mockTransactions.slice(0, 5).map(tx => 
  `📅 **${new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}** • ${tx.description}
  ${tx.amount > 0 ? '✅ +' : '💳 '}$${Math.abs(tx.amount).toFixed(2)} • ${tx.category}
  ${tx.accountType.charAt(0).toUpperCase() + tx.accountType.slice(1)} Account • ${tx.location}`
).join('\n\n')}

💡 **Quick Actions:**
• View transactions by category
• Search specific transactions
• Download statements
• Set up account alerts

Would you like me to help you with any of these options or show transactions for a specific account?`
  ],
  
  transfer: [
    `I'd be happy to help you transfer funds, ${mockUserData.preferredName}! 

**Your Available Accounts:**
• **Checking**: $${mockUserData.accounts[0].balance.toLocaleString()} available
• **Savings**: $${mockUserData.accounts[1].balance.toLocaleString()} available
• **Investment**: $${mockUserData.accounts[3].balance.toLocaleString()} available

**Transfer Options:**
🔄 **Between Your Accounts** (Instant, No Fees)
💸 **To External Accounts** (1-3 business days)
🌐 **Wire Transfers** (Same day, fees apply)
📱 **Send Money to Friends** (Zelle®)

To proceed, please specify:
1. **From** which account
2. **To** which account or recipient
3. **Amount** you'd like to transfer

🔒 **Security Note:** For your protection, transfers over $2,500 require additional verification through our secure IBM Watsonx authentication system.

What type of transfer would you like to make today?`
  ],
  
  help: [
    `I'm here to provide comprehensive banking assistance, ${mockUserData.preferredName}! Here's what I can help you with:

🏦 **Account Management**
• Check balances and account details
• View transaction history and statements
• Account alerts and notifications
• Interest rates and fee information

💸 **Transfers & Payments**
• Internal account transfers
• External bank transfers
• Bill payments and scheduling
• Zelle® money transfers

💳 **Credit & Lending**
• Credit card information
• Loan applications and status
• Credit score monitoring
• Payment scheduling

📈 **Investments & Planning**
• Portfolio performance
• Investment recommendations
• Retirement planning
• Financial goal tracking

🔒 **Security & Support**
• Fraud monitoring and alerts
• Card management (freeze/unfreeze)
• Password and PIN changes
• Account security settings

🤖 **Powered by IBM Watsonx** - I'm continuously learning to provide you with more personalized and intelligent assistance.

What would you like assistance with today?`
  ],
  
  credit: [
    `Here's your credit account information, ${mockUserData.preferredName}:

💳 **${mockUserData.accounts[2].type}** (${mockUserData.accounts[2].number})

**Current Status:**
• Available Credit: $${mockUserData.accounts[2].availableCredit.toLocaleString()}
• Credit Limit: $${mockUserData.accounts[2].creditLimit.toLocaleString()}
• Current Balance: $${Math.abs(mockUserData.accounts[2].balance).toLocaleString()}
• Interest Rate: ${mockUserData.accounts[2].interestRate}% APR

**Recent Activity:**
${mockTransactions.filter(tx => tx.accountType === 'credit').slice(0, 3).map(tx => 
  `• ${tx.description}: $${Math.abs(tx.amount).toFixed(2)}`
).join('\n')}

**Payment Options:**
🔄 Quick Pay from Checking
📅 Schedule Automatic Payments
💰 Pay Minimum ($35.00) or Full Balance

Would you like to make a payment or need help with any credit card features?`
  ],

  investment: [
    `Here's your investment portfolio summary, ${mockUserData.preferredName}:

📈 **${mockUserData.accounts[3].type}** (${mockUserData.accounts[3].number})

**Portfolio Performance:**
• Total Value: $${mockUserData.accounts[3].balance.toLocaleString()}
• Today's Change: ${mockUserData.accounts[3].dayChange > 0 ? '📈 +' : '📉 '}$${Math.abs(mockUserData.accounts[3].dayChange).toFixed(2)} (${mockUserData.accounts[3].dayChangePercent}%)
• YTD Performance: +8.2%

**Recent Investment Activity:**
${mockTransactions.filter(tx => tx.accountType === 'investment').slice(0, 2).map(tx => 
  `• ${tx.description}: +$${tx.amount.toFixed(2)}`
).join('\n')}

**Investment Services:**
🎯 Rebalance Portfolio
📊 Performance Reports
💡 Investment Recommendations
📞 Schedule Advisor Consultation

*Investment advice powered by IBM Watsonx AI analytics*

Would you like detailed performance metrics or help with investment planning?`
  ],
  
  issue: [
    `I'm sorry to hear you're experiencing an issue, ${mockUserData.preferredName}. I'm here to help resolve this quickly and efficiently! 

**Common Issues I Can Assist With:**
🔐 **Security & Access**
• Login problems or locked accounts
• Forgotten passwords/PINs
• Suspicious activity alerts
• Two-factor authentication setup

💳 **Card Services**
• Lost or stolen card reporting
• Card activation or replacement
• Transaction disputes
• Travel notifications

💰 **Transaction Issues**
• Pending or missing transactions
• Transfer problems
• Payment failures
• Fee inquiries

📱 **Digital Banking**
• Mobile app troubleshooting
• Online banking access
• Bill pay setup
• Alert configuration

🏛️ **Branch & ATM Support**
• ATM locations and issues
• Branch hours and services
• Appointment scheduling
• Safe deposit box access

**🚨 Emergency Services Available 24/7:**
• Card blocking/freezing
• Fraud reporting
• Emergency cash access

Please describe your specific issue, and I'll provide immediate assistance or connect you with the appropriate specialist. Your security and satisfaction are our top priorities.`
  ],
  
  default: [
    `I understand you're asking about our banking services, ${mockUserData.preferredName}. While I'm continuously learning through IBM Watsonx AI, I want to ensure I provide you with accurate information.

**I can immediately help you with:**
• Account balances and transactions
• Money transfers and payments
• Credit card and loan information
• Investment portfolio details
• General banking inquiries

**For specialized assistance, I can connect you with:**
• Personal Banking Specialists
• Investment Advisors
• Loan Officers
• Technical Support

Could you please rephrase your question or let me know which of these areas I can help you with? You can also use the quick action buttons below for common requests.

Remember, I'm powered by IBM Watsonx and learning from every interaction to serve you better! 🤖✨`
  ]
};

// Helper function to determine time of day
function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
}

// Additional banking utility functions
export const bankingUtils = {
  formatCurrency: (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  },
  
  formatAccountNumber: (accountNumber) => {
    return accountNumber.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '****-****-****-$4');
  },
  
  calculateNextPaymentDate: () => {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1, 1);
    return nextMonth.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
}; 