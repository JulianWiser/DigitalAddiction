/**
 * Mood tracking component to monitor emotional well-being
 */

import React, { useState, useEffect } from 'react';
import { Heart, TrendingUp, Calendar, BarChart3 } from 'lucide-react';

interface MoodEntry {
  id: string;
  mood: number;
  energy: number;
  screenTime: number;
  date: string;
  notes: string;
}

export default function MoodTracker() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [currentMood, setCurrentMood] = useState(5);
  const [currentEnergy, setCurrentEnergy] = useState(5);
  const [currentScreenTime, setCurrentScreenTime] = useState(5);
  const [notes, setNotes] = useState('');

  const moodEmojis = ['😫', '😔', '😐', '🙂', '😊', '😄', '🤩', '🥳', '😍', '🚀'];
  const energyLevels = ['💀', '😴', '😑', '🙂', '😊', '💪', '⚡', '🔥', '🌟', '🚀'];

  useEffect(() => {
    const saved = localStorage.getItem('moodEntries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood: currentMood,
      energy: currentEnergy,
      screenTime: currentScreenTime,
      date: new Date().toLocaleDateString(),
      notes: notes.trim()
    };

    setEntries(prev => [newEntry, ...prev.slice(0, 6)]);
    setNotes('');
  };

  const getAverageMood = () => {
    if (entries.length === 0) return 0;
    return entries.reduce((sum, entry) => sum + entry.mood, 0) / entries.length;
  };

  const getMoodTrend = () => {
    if (entries.length < 2) return 'stable';
    const recent = entries.slice(0, 3).reduce((sum, entry) => sum + entry.mood, 0) / Math.min(3, entries.length);
    const older = entries.slice(3, 6).reduce((sum, entry) => sum + entry.mood, 0) / Math.min(3, entries.slice(3).length);
    
    if (recent > older + 0.5) return 'improving';
    if (recent < older - 0.5) return 'declining';
    return 'stable';
  };

  const averageMood = getAverageMood();
  const trend = getMoodTrend();

  return (
    <div className="bg-gradient-to-r from-pink-900/30 to-rose-900/30 border border-pink-500/30 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Heart className="w-6 h-6 text-pink-400" />
        <h3 className="text-xl font-bold text-white">Mood & Well-being Tracker</h3>
      </div>

      {/* Current Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <BarChart3 className="w-4 h-4 text-pink-400" />
            <span className="text-sm text-gray-300">Avg Mood</span>
          </div>
          <div className="text-2xl">{moodEmojis[Math.round(averageMood) - 1] || '🙂'}</div>
          <div className="text-sm text-pink-300">{averageMood.toFixed(1)}/10</div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-pink-400" />
            <span className="text-sm text-gray-300">Trend</span>
          </div>
          <div className="text-lg">
            {trend === 'improving' ? '📈' : trend === 'declining' ? '📉' : '➡️'}
          </div>
          <div className="text-sm text-pink-300 capitalize">{trend}</div>
        </div>
      </div>

      {/* Mood Input */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            How are you feeling? ({currentMood}/10)
          </label>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{moodEmojis[currentMood - 1]}</span>
            <input
              type="range"
              min="1"
              max="10"
              value={currentMood}
              onChange={(e) => setCurrentMood(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Energy Level ({currentEnergy}/10)
          </label>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{energyLevels[currentEnergy - 1]}</span>
            <input
              type="range"
              min="1"
              max="10"
              value={currentEnergy}
              onChange={(e) => setCurrentEnergy(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Screen Time Satisfaction ({currentScreenTime}/10)
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={currentScreenTime}
            onChange={(e) => setCurrentScreenTime(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What influenced your mood today?"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 focus:outline-none transition-all resize-none"
            rows={2}
          />
        </div>

        <button
          onClick={addEntry}
          className="w-full py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg transition-colors"
        >
          Log Entry
        </button>
      </div>

      {/* Recent Entries */}
      {entries.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Recent Entries
          </h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {entries.slice(0, 3).map((entry) => (
              <div key={entry.id} className="bg-gray-800/50 rounded-lg p-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{moodEmojis[entry.mood - 1]}</span>
                    <span className="text-sm text-gray-300">{entry.date}</span>
                  </div>
                  <div className="text-xs text-pink-300">
                    {entry.mood}/10
                  </div>
                </div>
                {entry.notes && (
                  <p className="text-xs text-gray-400 mt-1">{entry.notes}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
