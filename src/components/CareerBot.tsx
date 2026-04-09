import React, { useState } from 'react';
import { Send, Bot, User, Loader2, X, Trash2 } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';
import knowledgeBase from '../config/knowledgeBase.json';
import { useModal } from '../hooks/useModal';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface CareerBotProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

const CareerBot: React.FC<CareerBotProps> = ({ className = '', isOpen: externalIsOpen, onClose: externalOnClose, onOpen: externalOnOpen }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi there! 👋 This is Saurabh's AI assistant. You can ask about Saurabh's experience, projects, technical skills, and background. Feel free to ask about:\n\n• Saurabh's professional experience and current role at Salesforce\n• His projects (YAML Visualizer, MERN Chat, ML-based Ecommerce Search, etc.)\n• His technical skills and expertise\n• How to reach him or collaborate\n• Anything else about his background and journey!\n\nWhat would you like to know?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isProjectModalOpen } = useModal();

  // Use external state if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const handleToggle = () => {
    if (externalIsOpen !== undefined) {
      // If externally controlled
      if (isOpen) {
        externalOnClose?.();
      } else {
        externalOnOpen?.();
      }
    } else {
      // If internally controlled, toggle internal state
      setInternalIsOpen(!internalIsOpen);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Build conversation context from previous messages (to help AI understand the conversation flow)
      const conversationContext = messages
        .slice(-4) // Last 4 messages for context
        .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n\n');

      const response = await fetch(API_ENDPOINTS.ANALYZE_CAREER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: userMessage,
          conversationContext: conversationContext,
          // Still support job descriptions for backward compatibility
          jobDescription: userMessage.toLowerCase().includes('job') || userMessage.toLowerCase().includes('role') || userMessage.toLowerCase().includes('position') ? userMessage : null,
          resume: {
            name: knowledgeBase.personalInfo.name,
            title: knowledgeBase.personalInfo.title,
            experience: knowledgeBase.experience.map(exp => ({
              company: exp.company,
              role: exp.title,
              duration: exp.duration,
              highlights: exp.highlights
            })),
            skills: [
              ...(knowledgeBase.skills.frontend || []),
              ...(knowledgeBase.skills.backend || []),
              ...(knowledgeBase.skills.databases || []),
              ...(knowledgeBase.skills.devops || []),
              ...(knowledgeBase.skills.other || [])
            ],
            education: `${knowledgeBase.education.degree} in ${knowledgeBase.education.field}`,
            location: knowledgeBase.personalInfo.location,
            email: knowledgeBase.personalInfo.email,
            github: knowledgeBase.personalInfo.github
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.analysis }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, Saurabh's assistant encountered an error processing your request. Please try again or check your internet connection."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Hi there! 👋 This is Saurabh's AI assistant. You can ask about Saurabh's experience, projects, technical skills, and background. Feel free to ask about:\n\n• Saurabh's professional experience and current role at Salesforce\n• His projects (YAML Visualizer, MERN Chat, ML-based Ecommerce Search, etc.)\n• His technical skills and expertise\n• How to reach him or collaborate\n• Anything else about his background and journey!\n\nWhat would you like to know?"
      }
    ]);
  };

  // Utility: Parse URLs in text and return an array of text and anchor elements
  const parseLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=%]+)|(www\.[\w\-._~:/?#[\]@!$&'()*+,;=%]+)/gi;
    const parts = [];
    let lastIndex = 0;
    let match;
    let key = 0;
    while ((match = urlRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      let url = match[0];
      if (!url.startsWith('http')) url = 'https://' + url;
      parts.push(
        <a
          key={key++}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800 transition-colors"
          title={url}
          tabIndex={0}
        >
          {match[0]}
        </a>
      );
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    return parts;
  }

  return (
    <>
      {/* Chat Toggle Button */}
      {!isProjectModalOpen && (
        <button
          onClick={handleToggle}
          className={`fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${className}`}
          aria-label={isOpen ? 'Close career bot' : 'Open career bot'}
        >
          {isOpen ? <X size={24} /> : <Bot size={24} />}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && !isProjectModalOpen && (
        <div
          className="fixed bottom-20 left-0 right-0 mx-auto z-40 w-[calc(100vw-1rem)] max-w-[100vw] mx-2 h-[70vh] sm:bottom-24 sm:right-6 sm:left-auto sm:w-96 sm:max-w-[420px] sm:mx-0 sm:h-[500px] rounded-lg sm:rounded-lg shadow-2xl border flex flex-col"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--border-color)'
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Career chat window"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg" role="banner">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot size={20} />
                <h3 className="font-semibold">Ask About Saurabh</h3>
              </div>
              <button
                onClick={clearChat}
                className="text-white/80 hover:text-white transition-colors"
                title="Clear chat"
                aria-label="Clear chat messages"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <p className="text-sm text-white/90 mt-1">
              Questions about experience, projects & skills
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4" aria-live="polite" aria-atomic="false">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] max-w-full p-3 rounded-lg break-words ${message.role === 'user' ? 'text-white' : ''}`}
                  style={{
                    backgroundColor: message.role === 'user'
                      ? 'var(--primary-color)'
                      : 'var(--tag-bg)',
                    color: message.role === 'user'
                      ? 'white'
                      : 'var(--text-primary)',
                    wordBreak: 'break-word',
                    overflowWrap: 'anywhere',
                  }}
                >
                  <div className="flex items-start space-x-2">
                    {message.role === 'assistant' && (
                      <Bot size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--primary-color)' }} />
                    )}
                    <div
                      className="text-sm whitespace-pre-wrap break-words max-w-full"
                      style={{ width: '100%', userSelect: 'text', cursor: 'text', wordBreak: 'break-word', overflowWrap: 'anywhere' }}
                      tabIndex={0}
                    >
                      {message.role === 'assistant'
                        ? parseLinks(message.content)
                        : message.content}
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
                <div className="p-3 rounded-lg" style={{
                  backgroundColor: 'var(--tag-bg)',
                  color: 'var(--text-primary)'
                }}>
                  <div className="flex items-center space-x-2">
                    <Bot size={16} style={{ color: 'var(--primary-color)' }} />
                    <Loader2 size={16} className="animate-spin" style={{ color: 'var(--primary-color)' }} />
                    <span className="text-sm">Analyzing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about Saurabh..."
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-sm"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--primary-color)';
                  e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border-color)';
                  e.target.style.boxShadow = 'none';
                }}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="text-white p-2 rounded-lg transition-colors disabled:cursor-not-allowed"
                style={{
                  backgroundColor: input.trim() && !isLoading ? 'var(--primary-color)' : 'var(--text-secondary)'
                }}
                onMouseEnter={(e) => {
                  if (input.trim() && !isLoading) {
                    e.currentTarget.style.backgroundColor = 'var(--secondary-color)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (input.trim() && !isLoading) {
                    e.currentTarget.style.backgroundColor = 'var(--primary-color)';
                  }
                }}
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
