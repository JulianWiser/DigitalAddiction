/**
 * Focus session tracker with analytics and insights
 */

import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Clock, BarChart3, Target, TrendingUp } from 'lucide-react';

interface FocusSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  category: string;
  quality: number;
  distractions: number;
}

export default function FocusSessionTracker() {
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [category, setCategory] = useState('study');
  const [sessions, setSessions] = useState<FocusSession[]>([]);
  const [showStats, setShowStats] = useState(false);

  const categories = [
    { id: 'study', name: 'Study/Work', emoji: '📚' },
    { id: 'reading', name: 'Reading', emoji: '📖' },
    { id: 'creative', name: 'Creative Work', emoji: '🎨' },
    { id: 'reflection', name: 'Reflection', emoji: '🤔' },
    { id: 'planning', name: 'Planning', emoji: '📋' }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('focusSessions');
    if (saved) {
      setSessions(JSON.parse(saved).map((session: any) => ({
        ...session,
        startTime: new Date(session.startTime),
        endTime: session.endTime ? new Date(session.endTime) : undefined
      })));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('focusSessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && startTime) {
      interval = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime.getTime()) / 1000));
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, startTime]);

  const startSession = () => {
    const now = new Date();
    setStartTime(now);
    setElapsed(0);
    setIsActive(true);
  };

  const pauseSession = () => {
    setIsActive(false);
  };

  const endSession = () => {
    if (startTime) {
      const endTime = new Date();
      const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
      
      if (duration >= 60) { // Only save sessions longer than 1 minute
        const newSession: FocusSession = {
          id: Date.now().toString(),
          startTime,
          endTime,
          duration,
          category,
          quality: 8, // Default quality, could be user input
          distractions: 0 // Could be tracked
        };
        
        setSessions(prev => [newSession, ...prev.slice(0, 49)]); // Keep last 50 sessions
      }
    }
    
    setIsActive(false);
    setStartTime(null);
    setElapsed(0);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStats = () => {
    const today = new Date();
    const todaySessions = sessions.filter(s => 
      s.startTime.toDateString() === today.toDateString()
    );
    
    const thisWeek = sessions.filter(s => {
      const sessionDate = s.startTime;
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      return sessionDate >= weekAgo;
    });

    const totalTimeToday = todaySessions.reduce((sum, s) => sum + s.duration, 0);
    const totalTimeWeek = thisWeek.reduce((sum, s) => sum + s.duration, 0);
    const avgSessionLength = sessions.length > 0 ? 
      sessions.reduce((sum, s) => sum + s.duration, 0) / sessions.length : 0;

    return {
      todayCount: todaySessions.length,
      todayTime: totalTimeToday,
      weekTime: totalTimeWeek,
      totalSessions: sessions.length,
      avgLength: avgSessionLength
    };
  };

  const stats = getStats();

  if (showStats) {
    return (
      <div className="bg-gradient-to-r from-violet-900/30 to-purple-900/30 border border-violet-500/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-violet-400" />
            <h3 className="text-xl font-bold text-white">Focus Analytics</h3>
          </div>
          <button
            onClick={() => setShowStats(false)}
            className="px-3 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors text-sm"
          >
            ← Back to Timer
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800/50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-white">{stats.todayCount}</div>
            <div className="text-sm text-gray-400">Sessions Today</div>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-white">{formatTime(stats.todayTime)}</div>
            <div className="text-sm text-gray-400">Time Today</div>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-white">{formatTime(stats.weekTime)}</div>
            <div className="text-sm text-gray-400">This Week</div>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-white">{formatTime(Math.round(stats.avgLength))}</div>
            <div className="text-sm text-gray-400">Avg Length</div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-white">Recent Sessions</h4>
          {sessions.slice(0, 5).map((session) => (
            <div key={session.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg">
                    {categories.find(c => c.id === session.category)?.emoji}
                  </span>
                  <div>
                    <div className="text-white font-medium">
                      {categories.find(c => c.id === session.category)?.name}
                    </div>
                    <div className="text-sm text-gray-400">
                      {session.startTime.toLocaleDateString()} at {session.startTime.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-violet-400 font-medium">{formatTime(session.duration)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-violet-900/30 to-purple-900/30 border border-violet-500/30 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Target className="w-6 h-6 text-violet-400" />
          <h3 className="text-xl font-bold text-white">Focus Session Tracker</h3>
        </div>
        <button
          onClick={() => setShowStats(true)}
          className="flex items-center gap-2 px-3 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors text-sm"
        >
          <BarChart3 className="w-4 h-4" />
          View Stats
        </button>
      </div>

      <div className="text-center mb-6">
        <div className="text-6xl font-mono font-bold text-white mb-4">
          {formatTime(elapsed)}
        </div>
        
        {!isActive && !startTime && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Session Type</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.emoji} {cat.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="flex gap-3 justify-center mb-6">
        {!isActive && !startTime ? (
          <button
            onClick={startSession}
            className="flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors"
          >
            <Play className="w-5 h-5" />
            Start Focus Session
          </button>
        ) : (
          <>
            <button
              onClick={isActive ? pauseSession : () => setIsActive(true)}
              className="flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors"
            >
              {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isActive ? 'Pause' : 'Resume'}
            </button>
            
            <button
              onClick={endSession}
              className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <Square className="w-5 h-5" />
              End Session
            </button>
          </>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-lg font-bold text-white">{stats.todayCount}</div>
          <div className="text-sm text-gray-400">Today</div>
        </div>
        <div>
          <div className="text-lg font-bold text-white">{formatTime(stats.todayTime)}</div>
          <div className="text-sm text-gray-400">Time Today</div>
        </div>
        <div>
          <div className="text-lg font-bold text-white">{stats.totalSessions}</div>
          <div className="text-sm text-gray-400">Total Sessions</div>
        </div>
      </div>
    </div>
  );
}