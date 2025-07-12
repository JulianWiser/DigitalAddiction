/**
 * Interactive flashcards component for studying key concepts
 */

import React, { useState, useEffect } from 'react';
import { RotateCcw, ChevronLeft, ChevronRight, Brain, Star, Shuffle } from 'lucide-react';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  mastered: boolean;
}

export default function Flashcards() {
  const [cards, setCards] = useState<Flashcard[]>([
    {
      id: '1',
      front: 'What is dopamine?',
      back: 'A neurotransmitter that plays a key role in reward, motivation, and addiction. It signals prediction of reward rather than the reward itself.',
      category: 'Neuroscience',
      difficulty: 'medium',
      mastered: false
    },
    {
      id: '2',
      front: 'Define \"intermittent reinforcement\"',
      back: 'A schedule where rewards are given unpredictably, creating stronger habits than continuous reinforcement. Used extensively in social media and gambling.',
      category: 'Psychology',
      difficulty: 'medium',
      mastered: false
    },
    {
      id: '3',
      front: 'What is the \"attention economy\"?',
      back: 'A business model where companies profit by capturing and monetizing human attention, treating attention as a scarce resource.',
      category: 'Technology',
      difficulty: 'easy',
      mastered: false
    },
    {
      id: '4',
      front: 'Explain the Zeigarnik Effect',
      back: 'The tendency to remember incomplete tasks better than completed ones. Apps exploit this by leaving things unfinished (notifications, cliffhangers).',
      category: 'Psychology',
      difficulty: 'hard',
      mastered: false
    },
    {
      id: '5',
      front: 'What is nomophobia?',
      back: 'The fear or anxiety of being without your mobile phone or being unable to use it. Increasingly common in smartphone users.',
      category: 'Psychology',
      difficulty: 'easy',
      mastered: false
    },
    {
      id: '6',
      front: 'Define \"persuasive design\"',
      back: 'Design techniques that influence user behavior, often to increase engagement and time spent on platforms. Includes variable rewards, social proof, and loss aversion.',
      category: 'Technology',
      difficulty: 'medium',
      mastered: false
    },
    {
      id: '7',
      front: 'What is blue light and why does it matter?',
      back: 'High-energy visible light emitted by screens that can suppress melatonin production and disrupt sleep patterns.',
      category: 'Health',
      difficulty: 'easy',
      mastered: false
    },
    {
      id: '8',
      front: 'Explain social comparison theory',
      back: 'People evaluate themselves relative to others. Social media amplifies this by providing constant opportunities for comparison, often leading to negative outcomes.',
      category: 'Psychology',
      difficulty: 'medium',
      mastered: false
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [studyMode, setStudyMode] = useState<'all' | 'unmastered'>('all');

  // Load saved progress
  useEffect(() => {
    const savedCards = localStorage.getItem('flashcards');
    if (savedCards) {
      setCards(JSON.parse(savedCards));
    }
  }, []);

  // Save progress
  useEffect(() => {
    localStorage.setItem('flashcards', JSON.stringify(cards));
  }, [cards]);

  // Filter cards based on category and study mode
  const filteredCards = cards.filter(card => {
    const categoryMatch = selectedCategory === 'all' || card.category === selectedCategory;
    const studyMatch = studyMode === 'all' || !card.mastered;
    return categoryMatch && studyMatch;
  });

  const currentCard = filteredCards[currentIndex];
  const categories = ['all', ...Array.from(new Set(cards.map(c => c.category)))];

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
    setShowBack(false);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
    setShowBack(false);
  };

  const shuffleCards = () => {
    const shuffled = [...filteredCards].sort(() => Math.random() - 0.5);
    setCurrentIndex(0);
    setShowBack(false);
  };

  const toggleMastered = () => {
    if (!currentCard) return;
    
    setCards(prev => prev.map(card => 
      card.id === currentCard.id 
        ? { ...card, mastered: !card.mastered }
        : card
    ));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-900/30';
      case 'medium': return 'text-yellow-400 bg-yellow-900/30';
      case 'hard': return 'text-red-400 bg-red-900/30';
      default: return 'text-gray-400 bg-gray-900/30';
    }
  };

  const masteredCount = cards.filter(c => c.mastered).length;
  const masteredPercentage = Math.round((masteredCount / cards.length) * 100);

  if (!currentCard) {
    return (
      <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/30 rounded-xl p-6 text-center">
        <Brain className="w-12 h-12 text-blue-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">No Cards Found</h3>
        <p className="text-gray-300">Try changing your filters or study mode.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/30 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <Brain className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-bold text-white">Study Flashcards</h3>
        <div className="ml-auto text-sm text-blue-300">
          {currentIndex + 1}/{filteredCards.length}
        </div>
      </div>

      {/* Progress and controls */}
      <div className="mb-4">
        <div className="flex gap-4 mb-3">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentIndex(0);
              setShowBack(false);
            }}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>

          <select
            value={studyMode}
            onChange={(e) => {
              setStudyMode(e.target.value as 'all' | 'unmastered');
              setCurrentIndex(0);
              setShowBack(false);
            }}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
          >
            <option value="all">All Cards</option>
            <option value="unmastered">Need Review</option>
          </select>

          <button
            onClick={shuffleCards}
            className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            <Shuffle className="w-4 h-4" />
          </button>
        </div>

        <div className="text-sm text-gray-300">
          Mastered: {masteredCount}/{cards.length} ({masteredPercentage}%)
        </div>
      </div>

      {/* Flashcard */}
      <div className="relative mb-6">
        <div 
          className="bg-gray-800 border-2 border-gray-700 rounded-xl p-8 min-h-[200px] cursor-pointer transition-all duration-300 hover:border-blue-500"
          onClick={() => setShowBack(!showBack)}
        >
          <div className="flex items-center justify-between mb-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentCard.difficulty)}`}>
              {currentCard.difficulty}
            </span>
            <span className="px-2 py-1 bg-blue-800/50 text-blue-200 rounded-full text-xs">
              {currentCard.category}
            </span>
          </div>

          <div className="text-center">
            <div className="text-lg font-medium text-white mb-2">
              {showBack ? 'Answer' : 'Question'}
            </div>
            <div className="text-gray-200 leading-relaxed">
              {showBack ? currentCard.back : currentCard.front}
            </div>
          </div>

          <div className="absolute bottom-4 right-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {showBack ? 'A' : 'Q'}
            </div>
          </div>
        </div>

        <div className="text-center mt-2 text-sm text-gray-400">
          Click card to flip
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3 justify-center mb-4">
        <button
          onClick={prevCard}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={() => setShowBack(!showBack)}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Flip
        </button>

        <button
          onClick={nextCard}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Mastery toggle */}
      <div className="text-center">
        <button
          onClick={toggleMastered}
          className={`px-4 py-2 rounded-lg transition-colors ${
            currentCard.mastered 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-gray-600 hover:bg-gray-500 text-white'
          }`}
        >
          <Star className={`w-4 h-4 mr-2 ${currentCard.mastered ? 'fill-current' : ''}`} />
          {currentCard.mastered ? 'Mastered' : 'Mark as Mastered'}
        </button>
      </div>
    </div>
  );
}
