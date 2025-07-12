/**
 * Carousel component displaying interesting facts from digital addiction lectures
 */

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Brain, Smartphone, Clock, TrendingUp } from 'lucide-react';

interface FunFact {
  fact: string;
  source: string;
  icon: React.ReactNode;
  category: string;
}

export default function FunFactsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const funFacts: FunFact[] = [
    {
      fact: "95% of text messages are read within 3 minutes, with an average response rate of just 90 seconds",
      source: "Class Lecture: Persuasive Technology",
      icon: <Smartphone className="w-6 h-6" />,
      category: "Communication"
    },
    {
      fact: "It takes an average of 66 days to form a new habit, but can range from 18 to 254 days depending on complexity",
      source: "Lally et al., 2009 Study",
      icon: <Clock className="w-6 h-6" />,
      category: "Behavior"
    },
    {
      fact: "Video game playing releases dopamine in magnitudes similar to drugs of abuse",
      source: "Brain Research on Gaming Disorder",
      icon: <Brain className="w-6 h-6" />,
      category: "Neuroscience"
    },
    {
      fact: "TikTok determined that users become 'addicted' after watching just 260 videos - achievable in under 35 minutes",
      source: "Kentucky AG Investigation",
      icon: <TrendingUp className="w-6 h-6" />,
      category: "Social Media"
    },
    {
      fact: "Fake news travels 6 times faster on Twitter than real news",
      source: "Aral, Roy, Vosoughi 2018",
      icon: <TrendingUp className="w-6 h-6" />,
      category: "Misinformation"
    },
    {
      fact: "In the rat casino experiment, rats became more risk-seeking when exposed to flashing lights and sounds",
      source: "Barrus & Winstanley, 2016",
      icon: <Brain className="w-6 h-6" />,
      category: "Psychology"
    },
    {
      fact: "Students would pay $59 to delete TikTok if others kept it, but would pay $28 to have everyone delete it",
      source: "Bursztyn et al., 2023 Study",
      icon: <Smartphone className="w-6 h-6" />,
      category: "Social Psychology"
    },
    {
      fact: "Netflix measured that most shows become addictive by episodes 2-4, not the pilot episode",
      source: "Streaming Platform Research",
      icon: <TrendingUp className="w-6 h-6" />,
      category: "Entertainment"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % funFacts.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [funFacts.length]);

  const nextFact = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % funFacts.length);
  };

  const prevFact = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + funFacts.length) % funFacts.length);
  };

  const currentFact = funFacts[currentIndex];

  return (
    <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <Brain className="w-6 h-6 text-indigo-400" />
        <h3 className="text-xl font-bold text-white">Digital Psychology Facts</h3>
      </div>
      
      <div className="relative min-h-[120px] flex items-center">
        <button
          onClick={prevFact}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 text-indigo-400 hover:text-white transition-colors z-10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <button
          onClick={nextFact}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 text-indigo-400 hover:text-white transition-colors z-10"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        
        <div className="mx-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="text-indigo-400">
              {currentFact.icon}
            </div>
            <span className="px-2 py-1 text-xs rounded-full bg-indigo-800/50 text-indigo-200">
              {currentFact.category}
            </span>
          </div>
          
          <p className="text-gray-300 text-lg mb-3 leading-relaxed">
            {currentFact.fact}
          </p>
          
          <p className="text-sm text-indigo-300">
            — {currentFact.source}
          </p>
        </div>
      </div>
      
      <div className="flex justify-center gap-2 mt-4">
        {funFacts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-indigo-400' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
