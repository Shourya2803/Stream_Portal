'use client';

import { useState, useRef, useEffect } from 'react';
import { Sparkles, MessageSquare, Lightbulb } from 'lucide-react';

const faqData = {
  'how to upload my receipt': 'Go to the payment section and click upload. Make sure your seat is accepted first.',
  'when will i get my offer letter': 'Once you accept your seat and the admin verifies your payment, your offer letter will be sent.',
  'can i change my branch': 'You need to contact the admin for branch change requests.',
  'how to login': 'Use your registered Google account to log in through the sign-in page.',
  'is hostel compulsory': 'No, hostel accommodation is optional.',
  'can i get refund': 'Admission fees are non-refundable once submitted.',
  'how much fees do i need to pay': ' for CSE students, ₹63,000; for other ECE students, ₹53,000.',
  'I how many days will i get my Offer Letter': 'You will receive your admission letter within 7 working days after payment verification.',
    'how to contact admin': 'You can reach out via email at 6XHlU@example.com ',
    'how to change my password': 'Go to your profile settings and click on "Change Password".',
    'how to reset my password': 'Click on "Forgot Password" at the login page and follow the instructions.',
};


type Question = keyof typeof faqData;

const HelpChat = () => {
  const [chat, setChat] = useState<{ question: string; answer: string; isUser: boolean }[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const handleSuggestedClick = (question: Question) => {
    const userMessage = { question, answer: '', isUser: true };
    const botMessage = { question, answer: faqData[question], isUser: false };
    setChat((prev) => [...prev, userMessage, botMessage]);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-purple-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="flex items-center justify-center p-4 bg-purple-700 dark:bg-purple-900 text-white shadow-md">
        <Sparkles className="h-5 w-5 mr-2 text-pink-300 animate-pulse" />
        <h1 className="text-xl md:text-2xl font-bold tracking-wide">Your Smart Assistant</h1>
        <MessageSquare className="h-5 w-5 ml-2 text-pink-300" />
      </header>

      {/* Chat Box */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 custom-scrollbar">
        {chat.length === 0 && (
          <div className="flex justify-center">
            <div className="bg-white/80 dark:bg-gray-800/70 p-5 rounded-xl shadow max-w-md text-center backdrop-blur-md">
              <Lightbulb className="h-6 w-6 mx-auto mb-2 text-pink-500" />
              <p className="font-semibold text-lg">Hello! How can I help you today?</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                Select a question below to get started.
              </p>
            </div>
          </div>
        )}

        {chat.map((entry, i) => (
          <div key={i} className={`flex ${entry.isUser ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[75%] p-4 rounded-2xl shadow transition-all duration-300 ${
                entry.isUser
                  ? 'bg-purple-600 text-white rounded-br-none'
                  : 'bg-pink-200 dark:bg-pink-800 text-purple-900 dark:text-pink-100 rounded-bl-none'
              }`}
              style={{
                animation: entry.isUser ? 'slideInRight 0.3s ease-out' : 'slideInLeft 0.3s ease-out',
              }}
            >
              <p className="text-xs font-semibold mb-1">{entry.isUser ? 'You' : 'Bot'}</p>
              <p>{entry.isUser ? entry.question : entry.answer}</p>
            </div>
          </div>
        ))}

        <div ref={chatEndRef} />
      </main>

      {/* Suggestions */}
      <section className="bg-white/70 dark:bg-gray-900/70 px-4 py-4 shadow-inner">
        <p className="text-sm font-medium mb-2 text-purple-700 dark:text-purple-300">
          💡 Suggested Questions:
        </p>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(faqData) as Question[]).map((q) => (
            <button
              key={q}
              onClick={() => handleSuggestedClick(q)}
              className="text-sm px-4 py-2 rounded-full bg-pink-200 dark:bg-pink-700 text-pink-800 dark:text-white hover:scale-105 transition transform shadow-sm"
            >
              {q}
            </button>
          ))}
        </div>
      </section>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(180, 100, 255, 0.4);
          border-radius: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(180, 100, 255, 0.4) transparent;
        }
      `}</style>
    </div>
  );
};

export default HelpChat;
