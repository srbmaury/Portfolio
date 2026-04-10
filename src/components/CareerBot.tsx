import React, { useState, useEffect } from 'react';
import { Send, Bot, User, Loader2, X, Trash2, Maximize2, Minimize2, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { API_ENDPOINTS } from '../config/api';
import knowledgeBase from '../config/knowledgeBase.json';
import { useModal } from '../hooks/useModal';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isRegenerating?: boolean;
}

interface CareerBotProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

const CareerBot: React.FC<CareerBotProps> = ({ className = '', isOpen: externalIsOpen, onClose: externalOnClose, onOpen: externalOnOpen }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi there! 👋 This is Saurabh's AI assistant.\n\nYou can ask me about his experience, projects, technical skills, and background.\n\nFeel free to explore topics like:\n\n• His professional experience and current role at Salesforce\n\n• Projects he has built, including YAML Visualizer, MERN Chat, and ML-based Ecommerce Search\n\n• His technical skills and areas of expertise\n\n• How to connect or collaborate with him\n\n• His background, journey, and achievements\n\nWhat would you like to know?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isProjectModalOpen } = useModal();

  // Use external state if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  // Disable body scroll when expanded
  useEffect(() => {
    if (isExpanded && isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isExpanded, isOpen]);

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
        if (response.status === 429) {
          const data = await response.json();
          throw new Error(`RATE_LIMIT:${data.retryAfter || 60}`);
        }
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.analysis }]);
    } catch (error) {
      console.error('Error:', error);
      let errorMessage = "Sorry, Saurabh's assistant encountered an error processing your request. Please try again or check your internet connection.";

      if (error instanceof Error && error.message.startsWith('RATE_LIMIT:')) {
        const retryAfter = error.message.split(':')[1];
        const minutes = Math.ceil(parseInt(retryAfter) / 60);
        errorMessage = `You've reached the rate limit (10 questions per hour). Please wait ${minutes > 1 ? `${minutes} minutes` : `${retryAfter} seconds`} before trying again.`;
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: errorMessage
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Hi there! 👋 This is Saurabh's AI assistant.\n\nYou can ask me about his experience, projects, technical skills, and background.\n\nFeel free to explore topics like:\n\n• His professional experience and current role at Salesforce\n\n• Projects he has built, including YAML Visualizer, MERN Chat, and ML-based Ecommerce Search\n\n• His technical skills and areas of expertise\n\n• How to connect or collaborate with him\n\n• His background, journey, and achievements\n\nWhat would you like to know?"
      }
    ]);
  };

  const regenerateResponse = async (messageIndex: number) => {
    // Find the corresponding user message
    let userMessage = '';
    for (let i = messageIndex - 1; i >= 0; i--) {
      if (messages[i].role === 'user') {
        userMessage = messages[i].content;
        break;
      }
    }

    if (!userMessage) return;

    // Mark message as regenerating
    setMessages(prev => prev.map((msg, idx) =>
      idx === messageIndex ? { ...msg, isRegenerating: true } : msg
    ));

    try {
      // Build conversation context excluding the message being regenerated
      const conversationContext = messages
        .slice(0, messageIndex)
        .slice(-4)
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
          regenerate: true, // Flag to indicate regeneration
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
        if (response.status === 429) {
          const data = await response.json();
          throw new Error(`RATE_LIMIT:${data.retryAfter || 60}`);
        }
        throw new Error('Failed to regenerate response');
      }

      const data = await response.json();

      // Update the specific message
      setMessages(prev => prev.map((msg, idx) =>
        idx === messageIndex
          ? { role: 'assistant', content: data.analysis, isRegenerating: false }
          : msg
      ));
    } catch (error) {
      console.error('Error:', error);
      let errorMessage = "Sorry, failed to regenerate response. Please try again.";

      if (error instanceof Error && error.message.startsWith('RATE_LIMIT:')) {
        const retryAfter = error.message.split(':')[1];
        const minutes = Math.ceil(parseInt(retryAfter) / 60);
        errorMessage = `Rate limit reached (10 questions per hour). Please wait ${minutes > 1 ? `${minutes} minutes` : `${retryAfter} seconds`} before regenerating.`;
      }

      setMessages(prev => prev.map((msg, idx) =>
        idx === messageIndex
          ? {
              role: 'assistant',
              content: errorMessage,
              isRegenerating: false
            }
          : msg
      ));
    }
  };

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
          className={`fixed z-50 shadow-2xl border flex flex-col transition-all duration-300 ${
            isExpanded
              ? 'inset-0 rounded-none'
              : 'bottom-20 left-0 right-0 mx-auto w-[calc(100vw-1rem)] max-w-[100vw] mx-2 h-[70vh] sm:bottom-24 sm:right-6 sm:left-auto sm:w-96 sm:max-w-[420px] sm:mx-0 sm:h-[500px] rounded-lg'
          }`}
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--border-color)'
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Career chat window"
        >
          {/* Header */}
          <div className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 ${isExpanded ? '' : 'rounded-t-lg'}`} role="banner">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot size={20} />
                <h3 className="font-semibold">Ask About Saurabh</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="hidden sm:block text-white/80 hover:text-white transition-colors"
                  title={isExpanded ? "Minimize" : "Expand"}
                  aria-label={isExpanded ? "Minimize chat" : "Expand chat"}
                >
                  {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
                <button
                  onClick={clearChat}
                  className="text-white/80 hover:text-white transition-colors"
                  title="Clear chat"
                  aria-label="Clear chat messages"
                >
                  <Trash2 size={16} />
                </button>
              </div>
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
                className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}
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
                      className="text-sm max-w-full"
                      style={{
                        width: '100%',
                        userSelect: 'text',
                        cursor: 'text',
                        color: message.role === 'user' ? 'white' : 'var(--text-primary)'
                      }}
                      tabIndex={0}
                    >
                      {message.role === 'assistant' ? (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeSanitize]}
                          components={{
                            // Custom link styling
                            a: ({ ...props }) => (
                              <a
                                {...props}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline hover:text-blue-800 transition-colors"
                                style={{ userSelect: 'text' }}
                              />
                            ),
                            // Custom heading styling
                            h1: ({ ...props }) => <h1 {...props} className="text-lg font-bold mt-2 mb-1" style={{ userSelect: 'text' }} />,
                            h2: ({ ...props }) => <h2 {...props} className="text-base font-bold mt-2 mb-1" style={{ userSelect: 'text' }} />,
                            h3: ({ ...props }) => <h3 {...props} className="text-sm font-bold mt-1 mb-1" style={{ userSelect: 'text' }} />,
                            // Custom list styling
                            ul: ({ ...props }) => <ul {...props} className="list-disc pl-5 my-2 space-y-1" style={{ userSelect: 'text' }} />,
                            ol: ({ ...props }) => <ol {...props} className="list-decimal pl-5 my-2 space-y-1" style={{ userSelect: 'text' }} />,
                            li: ({ ...props }) => <li {...props} className="ml-0 pl-2" style={{ userSelect: 'text' }} />,
                            // Custom paragraph styling
                            p: ({ ...props }) => <p {...props} className="my-1" style={{ userSelect: 'text' }} />,
                            // Custom code styling
                            code: ({ className, children, ...props }) => {
                              const isInline = !className?.includes('language-');
                              return isInline ? (
                                <code {...props} className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-xs" style={{ userSelect: 'text' }}>
                                  {children}
                                </code>
                              ) : (
                                <code {...props} className={`block bg-gray-200 dark:bg-gray-700 p-2 rounded my-2 text-xs overflow-x-auto ${className || ''}`} style={{ userSelect: 'text' }}>
                                  {children}
                                </code>
                              );
                            },
                            // Custom strong/bold styling
                            strong: ({ ...props }) => <strong {...props} className="font-bold" style={{ userSelect: 'text' }} />,
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      ) : (
                        message.content
                      )}
                    </div>
                    {message.role === 'user' && (
                      <User size={16} className="mt-0.5 text-white/80 flex-shrink-0" />
                    )}
                  </div>
                </div>
                {/* Regenerate button for assistant messages */}
                {message.role === 'assistant' && index > 0 && (
                  <button
                    onClick={() => regenerateResponse(index)}
                    disabled={message.isRegenerating || isLoading}
                    className="mt-1 text-xs flex items-center space-x-1 px-2 py-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      color: 'var(--text-secondary)',
                    }}
                    onMouseEnter={(e) => {
                      if (!message.isRegenerating && !isLoading) {
                        e.currentTarget.style.color = 'var(--primary-color)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }}
                    title="Regenerate response"
                  >
                    <RefreshCw size={12} className={message.isRegenerating ? 'animate-spin' : ''} />
                    <span>{message.isRegenerating ? 'Regenerating...' : 'Regenerate'}</span>
                  </button>
                )}
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
