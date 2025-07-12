/**
 * Mindfulness and meditation timer with guided sessions
 */

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Brain, Volume2, VolumeX } from 'lucide-react';

interface MindfulnessSession {
  id: string;
  name: string;
  duration: number;
  description: string;
  type: 'breathing' | 'body-scan' | 'awareness' | 'focus';
}

export default function MindfulnessTimer() {
  const [selectedSession, setSelectedSession] = useState<MindfulnessSession | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [completedSessions, setCompletedSessions] = useState(0);

  const sessions: MindfulnessSession[] = [
    {
      id: '1',
      name: 'Digital Detox Breathing',
      duration: 300, // 5 minutes
      description: 'Release digital tension with focused breathing',
      type: 'breathing'
    },
    {
      id: '2',
      name: 'Screen Break Reset',
      duration: 180, // 3 minutes
      description: 'Quick mindfulness break from screen time',
      type: 'awareness'
    },
    {
      id: '3',
      name: 'Body Scan for Tech Stress',
      duration: 600, // 10 minutes
      description: 'Release physical tension from device use',
      type: 'body-scan'
    },
    {
      id: '4',
      name: 'Attention Training',
      duration: 240, // 4 minutes
      description: 'Rebuild focus after digital distraction',
      type: 'focus'
    },
    {
      id: '5',
      name: 'Evening Digital Sunset',
      duration: 480, // 8 minutes
      description: 'Prepare for screen-free sleep',
      type: 'awareness'
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('mindfulnessSessions');
    if (saved) {
      setCompletedSessions(parseInt(saved));
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && selectedSession) {
      setIsActive(false);
      setCompletedSessions(prev => {
        const newCount = prev + 1;
        localStorage.setItem('mindfulnessSessions', newCount.toString());
        return newCount;
      });
      // Session completed notification could go here
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, selectedSession]);

  const startSession = (session: MindfulnessSession) => {
    setSelectedSession(session);
    setTimeLeft(session.duration);
    setIsActive(true);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(selectedSession?.duration || 0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getSessionIcon = (type: string) => {
    switch (type) {
      case 'breathing': return '🫁';
      case 'body-scan': return '🧘';
      case 'awareness': return '👁️';
      case 'focus': return '🎯';
      default: return '✨';
    }
  };

  const getProgress = () => {
    if (!selectedSession) return 0;
    return ((selectedSession.duration - timeLeft) / selectedSession.duration) * 100;
  };

  return (
    <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Brain className="w-6 h-6 text-indigo-400" />
          <h3 className="text-xl font-bold text-white">Mindfulness Timer</h3>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {soundEnabled ? 
              <Volume2 className="w-5 h-5 text-indigo-400" /> : 
              <VolumeX className="w-5 h-5 text-gray-500" />
            }
          </button>
          <div className="text-right">
            <div className="text-sm text-gray-400">Sessions completed</div>
            <div className="text-indigo-400 font-bold">{completedSessions}</div>
          </div>
        </div>
      </div>

      {!selectedSession ? (
        <div className="space-y-3">
          <p className="text-gray-300 mb-4">Choose a mindfulness session to begin:</p>
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => startSession(session)}
              className="w-full text-left p-4 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-indigo-500 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getSessionIcon(session.type)}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-white">{session.name}</h4>
                    <span className="text-indigo-400 text-sm">{Math.floor(session.duration / 60)} min</span>
                  </div>
                  <p className="text-sm text-gray-400">{session.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-white mb-2">{selectedSession.name}</h4>
            <p className="text-gray-300">{selectedSession.description}</p>
          </div>

          <div className="mb-6">
            <div className="text-6xl font-mono font-bold text-white mb-4">
              {formatTime(timeLeft)}
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${getProgress()}%` }}
              ></div>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={toggleTimer}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
              >
                {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isActive ? 'Pause' : 'Resume'}
              </button>
              
              <button
                onClick={resetTimer}
                className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedSession(null);
              setIsActive(false);
              setTimeLeft(0);
            }}
            className="text-indigo-400 hover:text-white transition-colors"
          >
            ← Back to Sessions
          </button>
        </div>
      )}

      {timeLeft === 0 && selectedSession && (
        <div className="text-center p-4 bg-green-900/30 border border-green-500/30 rounded-lg">
          <p className="text-green-400 font-medium">🎉 Session Complete!</p>
          <p className="text-sm text-gray-300 mt-1">Take a moment to notice how you feel</p>
        </div>
      )}
    </div>
  );
}
