/**
 * Weekly digital wellness challenges with progress tracking
 */

import React, { useState, useEffect } from 'react';
import { Calendar, Target, Trophy, Star, CheckCircle } from 'lucide-react';

interface WeeklyChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  type: 'awareness' | 'reduction' | 'replacement' | 'mindfulness';
  completed: boolean;
  progress: number;
  maxProgress: number;
}

export default function WeeklyChallenges() {
  const [challenges, setChallenges] = useState<WeeklyChallenge[]>([
    {
      id: '1',
      title: 'Notification Audit',
      description: 'Turn off non-essential notifications for all apps',
      difficulty: 'easy',
      points: 100,
      type: 'awareness',
      completed: false,
      progress: 0,
      maxProgress: 1
    },
    {
      id: '2',
      title: 'Phone-Free Meals',
      description: 'Eat 5 meals this week without any device',
      difficulty: 'medium',
      points: 250,
      type: 'replacement',
      completed: false,
      progress: 0,
      maxProgress: 5
    },
    {
      id: '3',
      title: 'Digital Sunset',
      description: 'No screens 1 hour before bed for 4 nights',
      difficulty: 'hard',
      points: 400,
      type: 'reduction',
      completed: false,
      progress: 0,
      maxProgress: 4
    },
    {
      id: '4',
      title: 'Mindful Morning',
      description: 'Start each day with 5 minutes of meditation instead of checking phone',
      difficulty: 'medium',
      points: 300,
      type: 'mindfulness',
      completed: false,
      progress: 0,
      maxProgress: 7
    },
    {
      id: '5',
      title: 'App Usage Awareness',
      description: 'Check and record your screen time daily',
      difficulty: 'easy',
      points: 150,
      type: 'awareness',
      completed: false,
      progress: 0,
      maxProgress: 7
    }
  ]);

  const [totalPoints, setTotalPoints] = useState(0);
  const [currentWeek, setCurrentWeek] = useState(1);

  useEffect(() => {
    const saved = localStorage.getItem('weeklyChallenges');
    const savedPoints = localStorage.getItem('challengePoints');
    const savedWeek = localStorage.getItem('currentChallengeWeek');
    
    if (saved) setChallenges(JSON.parse(saved));
    if (savedPoints) setTotalPoints(parseInt(savedPoints));
    if (savedWeek) setCurrentWeek(parseInt(savedWeek));
  }, []);

  useEffect(() => {
    localStorage.setItem('weeklyChallenges', JSON.stringify(challenges));
    localStorage.setItem('challengePoints', totalPoints.toString());
    localStorage.setItem('currentChallengeWeek', currentWeek.toString());
  }, [challenges, totalPoints, currentWeek]);

  const updateProgress = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => {
      if (challenge.id === challengeId && !challenge.completed) {
        const newProgress = Math.min(challenge.progress + 1, challenge.maxProgress);
        const isCompleted = newProgress >= challenge.maxProgress;
        
        if (isCompleted && !challenge.completed) {
          setTotalPoints(prev => prev + challenge.points);
        }
        
        return {
          ...challenge,
          progress: newProgress,
          completed: isCompleted
        };
      }
      return challenge;
    }));
  };

  const resetProgress = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => {
      if (challenge.id === challengeId) {
        if (challenge.completed) {
          setTotalPoints(prev => prev - challenge.points);
        }
        return {
          ...challenge,
          progress: 0,
          completed: false
        };
      }
      return challenge;
    }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-900/30';
      case 'medium': return 'text-yellow-400 bg-yellow-900/30';
      case 'hard': return 'text-red-400 bg-red-900/30';
      default: return 'text-gray-400 bg-gray-900/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'awareness': return '👁️';
      case 'reduction': return '📱';
      case 'replacement': return '🔄';
      case 'mindfulness': return '🧘';
      default: return '⭐';
    }
  };

  const completedChallenges = challenges.filter(c => c.completed).length;
  const overallProgress = (completedChallenges / challenges.length) * 100;

  return (
    <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-500/30 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-amber-400" />
          <h3 className="text-xl font-bold text-white">Weekly Challenges</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 font-bold">{totalPoints}</span>
            </div>
            <div className="text-xs text-gray-400">Points</div>
          </div>
          <div className="text-center">
            <div className="text-amber-400 font-bold">Week {currentWeek}</div>
            <div className="text-xs text-gray-400">{Math.round(overallProgress)}% Complete</div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-4">
        {challenges.map((challenge) => {
          const progressPercentage = (challenge.progress / challenge.maxProgress) * 100;
          
          return (
            <div key={challenge.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <span className="text-xl">{getTypeIcon(challenge.type)}</span>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`font-medium ${challenge.completed ? 'text-green-300' : 'text-white'}`}>
                        {challenge.title}
                      </h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(challenge.difficulty)}`}>
                        {challenge.difficulty}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-3">{challenge.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              challenge.completed ? 'bg-green-500' : 'bg-amber-500'
                            }`}
                            style={{ width: `${progressPercentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400">
                          {challenge.progress}/{challenge.maxProgress}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400 font-medium">{challenge.points}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {challenge.completed ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <button
                        onClick={() => resetProgress(challenge.id)}
                        className="text-xs text-gray-400 hover:text-white transition-colors"
                      >
                        Reset
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => updateProgress(challenge.id)}
                      className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white text-sm rounded-md transition-colors"
                    >
                      +1
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-400 mb-2">
          Complete challenges to earn points and build healthy digital habits!
        </p>
        {completedChallenges === challenges.length && (
          <div className="p-3 bg-green-900/30 border border-green-500/30 rounded-lg">
            <p className="text-green-400 font-medium">🎉 All challenges completed!</p>
            <p className="text-sm text-gray-300">You've earned {totalPoints} points this week!</p>
          </div>
        )}
      </div>
    </div>
  );
}
