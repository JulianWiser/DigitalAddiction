/**
 * Floating action button with quick access menu
 */

import React, { useState } from 'react';
import { Plus, Clock, StickyNote, BarChart3, X, Target, Brain } from 'lucide-react';

interface Props {
  onTimerClick: () => void;
  onNotesClick: () => void;
  onAnalyticsClick: () => void;
}

export default function FloatingActionButton({ onTimerClick, onNotesClick, onAnalyticsClick }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  const menuItems = [
    {
      icon: <Clock className="w-5 h-5" />,
      label: 'Start Timer',
      action: onTimerClick,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      icon: <StickyNote className="w-5 h-5" />,
      label: 'Quick Note',
      action: onNotesClick,
      color: 'bg-yellow-600 hover:bg-yellow-700'
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      label: 'Analytics',
      action: onAnalyticsClick,
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      icon: <Target className="w-5 h-5" />,
      label: 'Focus Mode',
      action: () => {
        // Toggle focus mode
        document.body.classList.toggle('focus-mode');
        alert('Focus mode toggled! 🎯');
      },
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      icon: <Brain className="w-5 h-5" />,
      label: 'Mindfulness',
      action: () => {
        // Start a quick mindfulness session
        alert('Starting 1-minute mindfulness break... 🧘‍♀️');
      },
      color: 'bg-indigo-600 hover:bg-indigo-700'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Menu Items */}
      <div className={`absolute bottom-16 right-0 space-y-3 transition-all duration-300 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 animate-fadeInUp"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <span className="bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap border border-gray-700">
              {item.label}
            </span>
            <button
              onClick={() => handleAction(item.action)}
              className={`w-12 h-12 rounded-full ${item.color} text-white shadow-lg transition-all duration-200 hover:scale-110 flex items-center justify-center`}
            >
              {item.icon}
            </button>
          </div>
        ))}
      </div>

      {/* Main FAB */}
      <button
        onClick={toggleMenu}
        className={`w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl flex items-center justify-center ${
          isOpen ? 'rotate-45' : 'rotate-0'
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={toggleMenu}
        />
      )}
    </div>
  );
}