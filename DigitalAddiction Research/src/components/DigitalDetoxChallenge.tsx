/**
 * Digital detox challenge tracker component
 */

import React, { useState, useEffect } from 'react';
import { Shield, Target, CheckCircle, Calendar, Zap } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  streak: number;
}

export default function DigitalDetoxChallenge() {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Phone-Free Meals',
      description: 'Eat without checking your phone for one full meal',
      duration: '1 meal',
      completed: false,
      streak: 0
    },
    {
      id: '2',
      title: 'Morning Delay',
      description: 'Wait 30 minutes after waking before checking your phone',
      duration: '30 minutes',
      completed: false,
      streak: 0
    },
    {
      id: '3',
      title: 'Bedtime Boundary',
      description: 'No phone 1 hour before sleep',
      duration: '1 hour',
      completed: false,
      streak: 0
    },
    {
      id: '4',
      title: 'Social Media Sabbath',
      description: 'Go 24 hours without social media',
      duration: '24 hours',
      completed: false,
      streak: 0
    },
    {
      id: '5',
      title: 'Notification Cleanse',
      description: 'Turn off all non-essential notifications for a day',
      duration: '1 day',
      completed: false,
      streak: 0
    }
  ]);

  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const savedChallenges = localStorage.getItem('detoxChallenges');
    const savedPoints = localStorage.getItem('detoxPoints');
    
    if (savedChallenges) {
      setChallenges(JSON.parse(savedChallenges));
    }
    if (savedPoints) {
      setTotalPoints(parseInt(savedPoints));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('detoxChallenges', JSON.stringify(challenges));
    localStorage.setItem('detoxPoints', totalPoints.toString());
  }, [challenges, totalPoints]);

  const toggleChallenge = (id: string) => {
    setChallenges(prev => prev.map(challenge => {
      if (challenge.id === id) {
        const newCompleted = !challenge.completed;
        const newStreak = newCompleted ? challenge.streak + 1 : Math.max(0, challenge.streak - 1);
        
        if (newCompleted && !challenge.completed) {
          setTotalPoints(prev => prev + 10);
        } else if (!newCompleted && challenge.completed) {
          setTotalPoints(prev => Math.max(0, prev - 10));
        }
        
        return {
          ...challenge,
          completed: newCompleted,
          streak: newStreak
        };
      }
      return challenge;
    }));
  };

  const completedCount = challenges.filter(c => c.completed).length;
  const completionPercentage = Math.round((completedCount / challenges.length) * 100);

  return (
    <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border border-emerald-500/30 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-6 h-6 text-emerald-400" />
        <h3 className="text-xl font-bold text-white">Digital Detox Challenge</h3>
        <div className="flex items-center gap-2 ml-auto">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-yellow-400 font-bold">{totalPoints} pts</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-5 h-5 text-emerald-400" />
          <span className="text-white font-medium">Progress: {completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-3">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleChallenge(challenge.id)}
                className={`flex items-center justify-center w-6 h-6 rounded-full transition-colors ${
                  challenge.completed 
                    ? 'bg-emerald-500 text-white' 
                    : 'border-2 border-gray-500 hover:border-emerald-400'
                }`}
              >
                {challenge.completed && <CheckCircle className="w-4 h-4" />}
              </button>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className={`font-medium ${challenge.completed ? 'text-emerald-300' : 'text-white'}`}>
                    {challenge.title}
                  </h4>
                  <span className="px-2 py-1 text-xs rounded-full bg-emerald-800/50 text-emerald-200">
                    {challenge.duration}
                  </span>
                  {challenge.streak > 0 && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-orange-400" />
                      <span className="text-xs text-orange-400">{challenge.streak} day streak</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-400">
                  {challenge.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-400">
          Complete challenges to earn points and build healthy digital habits!
        </p>
      </div>
    </div>
  );
}
