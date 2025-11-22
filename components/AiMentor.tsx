import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { askAiTutor } from '../services/geminiService';
import { Send, Bot, User, Sparkles, HelpCircle, Gavel, BookOpen, Clock } from 'lucide-react';

const quickPrompts = [
  { icon: Gavel, text: "Important Legal Maxims" },
  { icon: BookOpen, text: "Explain Kesavananda Bharati Case" },
  { icon: Clock, text: "Time Management Strategy" },
  { icon: HelpCircle, text: "MHCET Exam Pattern 2025" },
];

const AiMentor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'intro',
      role: 'model',
      text: "Greetings, future Rank 1! I'm your LawRanker strategist. Ask me about legal concepts, current affairs, or exam strategies.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (textToSend: string = input) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const aiResponseText = await askAiTutor(textToSend);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: aiResponseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-indigo-900 p-4 flex items-center gap-3 text-white shadow-md">
        <div className="bg-white/10 p-2 rounded-full">
          <Sparkles className="w-5 h-5 text-yellow-400" />
        </div>
        <div>
          <h3 className="font-bold">AI Mentor</h3>
          <p className="text-xs text-indigo-300">Powered by Gemini 2.5 Flash</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-indigo-600'
            }`}>
              {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>
            
            <div className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
            }`}>
              <div className="whitespace-pre-wrap">{msg.text}</div>
              <span className={`text-[10px] block mt-2 ${msg.role === 'user' ? 'text-indigo-200' : 'text-gray-400'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-4">
             <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-indigo-600">
               <Bot className="w-5 h-5" />
             </div>
             <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex items-center gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions & Input */}
      <div className="p-4 bg-white border-t border-gray-100">
        {messages.length < 3 && !isTyping && (
          <div className="flex gap-2 overflow-x-auto pb-3 mb-2 no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt.text)}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 rounded-full border border-gray-200 text-xs whitespace-nowrap transition-colors"
              >
                <prompt.icon className="w-3 h-3" />
                {prompt.text}
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-300 transition-all">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Explain 'Res Judicata' or ask for a study plan..."
            className="flex-1 bg-transparent border-none outline-none resize-none p-2 text-sm text-gray-700 h-12 max-h-32"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className={`p-3 rounded-lg transition-all ${
              input.trim() && !isTyping
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiMentor;