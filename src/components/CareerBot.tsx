import React, { useState } from 'react';
import { Send, Bot, User, Loader2, X } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface CareerBotProps {
  className?: string;
}

const CareerBot: React.FC<CareerBotProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm an AI assistant that can help you learn more about Saurabh's experience and expertise. Share a job description or role you're interested in, and I'll analyze how well it matches his skills, experience, and background. I can provide insights on his technical expertise, project experience, and career fit."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.ANALYZE_CAREER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobDescription: userMessage,
          resume: {
            name: 'Saurabh Maurya',
            title: 'Full Stack Engineer',
            experience: [
              {
                company: 'Salesforce',
                role: 'Software Engineer',
                duration: '2022 - Present',
                highlights: [
                  'Developed and maintained scalable web applications using React, Node.js, and TypeScript',
                  'Collaborated with cross-functional teams to deliver high-quality software solutions',
                  'Implemented CI/CD pipelines and automated testing processes'
                ]
              },
              {
                company: 'Razorpay',
                role: 'Software Engineer',
                duration: '2021 - 2022',
                highlights: [
                  'Built payment processing systems and financial technology solutions',
                  'Worked with microservices architecture and cloud platforms',
                  'Optimized application performance and database queries'
                ]
              }
            ],
            skills: [
              'React', 'TypeScript', 'Node.js', 'Python', 'Java', 'PostgreSQL',
              'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'REST APIs',
              'Microservices', 'CI/CD', 'Git', 'Agile/Scrum'
            ],
            education: 'Bachelor of Technology in Computer Science',
            location: 'Bangalore, India',
            email: 'saurabh.maurya@example.com',
            github: 'https://github.com/saurabhmaurya'
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze career');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.analysis }]);
    } catch (error) {
      console.error('Error analyzing career:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm sorry, I encountered an error while analyzing the job description. Please try again or check your API configuration." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Hello! I'm an AI assistant that can help you learn more about Saurabh's experience and expertise. Share a job description or role you're interested in, and I'll analyze how well it matches his skills, experience, and background. I can provide insights on his technical expertise, project experience, and career fit."
      }
    ]);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${className}`}
        aria-label="Open career bot"
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot size={20} />
                <h3 className="font-semibold">Saurabh's AI Assistant</h3>
              </div>
              <button
                onClick={clearChat}
                className="text-white/80 hover:text-white transition-colors"
                title="Clear chat"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-sm text-white/90 mt-1">
              Learn about Saurabh's expertise
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.role === 'assistant' && (
                      <Bot size={16} className="mt-0.5 text-blue-600 flex-shrink-0" />
                    )}
                    <div className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </div>
                    {message.role === 'user' && (
                      <User size={16} className="mt-0.5 text-white/80 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot size={16} className="text-blue-600" />
                    <Loader2 size={16} className="animate-spin text-blue-600" />
                    <span className="text-sm">Analyzing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste a job description here..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-2 rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default CareerBot; 