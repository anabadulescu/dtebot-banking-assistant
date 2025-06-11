import React from 'react';
import ChatBot from './components/ChatBot';
import { Shield, Zap, Users, Star } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-dte-blue to-dte-light-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">DTE Banking</h1>
                <p className="text-sm text-gray-600">Powered by IBM Watsonx</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden sm:block">DTEBot Demo</span>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" title="AI Assistant Online"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-dte-blue to-purple-600">DTEBot</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your intelligent banking assistant powered by IBM Watsonx. Get instant help with your accounts, 
            transactions, and banking needs - available 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>AI-Powered Assistant</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Bank-Grade Security</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Zap className="w-4 h-4 text-blue-500" />
              <span>Instant Responses</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-dte-blue" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Personalized Banking</h3>
            <p className="text-gray-600">Get account-specific information and personalized recommendations tailored to your banking needs.</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Private</h3>
            <p className="text-gray-600">Your data is protected with enterprise-grade security and privacy measures.</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Actions</h3>
            <p className="text-gray-600">Check balances, transfer funds, and manage your accounts with simple commands.</p>
          </div>
        </div>

        {/* Demo Instructions */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Try DTEBot Now!</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Click the chat icon in the bottom-right corner to start chatting with DTEBot. 
            Try asking about your balance, recent transactions, or use the quick action buttons.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">"Check my balance"</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">"Show recent transactions"</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">"Transfer funds"</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">"Help"</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            DTEBot Demo • Built with React & IBM Watsonx • 
            <span className="text-blue-400 ml-2">IBM Internship Project</span>
          </p>
        </div>
      </footer>

      {/* ChatBot Component */}
      <ChatBot />
    </div>
  );
}

export default App; 