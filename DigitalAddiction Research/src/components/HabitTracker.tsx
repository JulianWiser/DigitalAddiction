/**
 * Comprehensive habit tracking component for digital wellness
 */

import React, { useState, useEffect } from 'react';
import { CheckCircle, Target, Calendar, TrendingUp, Zap, X } from 'lucide-react';

interface Habit {
  id: string;
  name: string;
  description: string;
  type: 'positive' | 'negative';
  streak: number;
  completed: boolean[];
  color: string;
}

export default function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      name: 'Phone-Free Morning',
      description: 'No phone for first 30 minutes after waking',
      type: 'positive',
      streak: 0,
      completed: [],
      color: 'bg-green-500'
    },
    {
      id: '2',
      name: 'Digital Sunset',
      description: 'No screens 1 hour before bed',
      type: 'positive',
      streak: 0,
      completed: [],
      color: 'bg-purple-500'
    },
    {
      id: '3',
      name: 'Mindful Social Media',
      description: 'Check social media only 3 times per day',
      type: 'positive',
      streak: 0,
      completed: [],
      color: 'bg-blue-500'
    },
    {
      id: '4',
      name: 'No Phantom Vibrations',
      description: 'Resist checking phone without notification',
      type: 'positive',
      streak: 0,
      completed: [],
      color: 'bg-orange-500'
    },
    {
      id: '5',
      name: 'Elevator Phone Rule',
      description: 'No phone use while in elevators or waiting',
      type: 'positive',
      streak: 0,
      completed: [],
      color: 'bg-pink-500'
    }
  ]);

  const [showAddHabit, setShowAddHabit] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('digitalHabits');
    if (saved) {
      setHabits(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('digitalHabits', JSON.stringify(habits));
  }, [habits]);

  const toggleHabit = (habitId: string) => {
    const today = new Date().toDateString();
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const newCompleted = [...habit.completed];
        const todayIndex = newCompleted.findIndex(date => date === today);
        
        if (todayIndex >= 0) {
          newCompleted.splice(todayIndex, 1);
          return { ...habit, completed: newCompleted, streak: Math.max(0, habit.streak - 1) };
        } else {
          newCompleted.push(today);
          return { ...habit, completed: newCompleted, streak: habit.streak + 1 };
        }
      }
      return habit;
    }));
  };

  const addCustomHabit = () => {
    if (newHabitName.trim()) {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: newHabitName.trim(),
        description: 'Custom habit',
        type: 'positive',
        streak: 0,
        completed: [],
        color: 'bg-indigo-500'
      };
      setHabits(prev => [...prev, newHabit]);
      setNewHabitName('');
      setShowAddHabit(false);
    }
  };

  const isCompletedToday = (habit: Habit) => {
    const today = new Date().toDateString();
    return habit.completed.includes(today);
  };

  const getWeeklyProgress = (habit: Habit) => {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weekDates = habit.completed.filter(date => {
      const completedDate = new Date(date);
      return completedDate >= weekAgo && completedDate <= today;
    });
    return Math.round((weekDates.length / 7) * 100);
  };

  return (
    <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Target className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-bold text-white">Digital Habit Tracker</h3>
        </div>
        <button
          onClick={() => setShowAddHabit(!showAddHabit)}
          className="flex items-center gap-2 px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors text-sm"
        >
          {showAddHabit ? <X className="w-4 h-4" /> : <Target className="w-4 h-4" />}
          {showAddHabit ? 'Cancel' : 'Add Habit'}
        </button>
      </div>

      {showAddHabit && (
        <div className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              placeholder="Enter custom habit name..."
              className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all"
              onKeyPress={(e) => e.key === 'Enter' && addCustomHabit()}
            />
            <button
              onClick={addCustomHabit}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {habits.map((habit) => {
          const completedToday = isCompletedToday(habit);
          const weeklyProgress = getWeeklyProgress(habit);
          
          return (
            <div key={habit.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleHabit(habit.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      completedToday
                        ? 'bg-cyan-500 border-cyan-500 text-white'
                        : 'border-gray-500 hover:border-cyan-400'
                    }`}
                  >
                    {completedToday && <CheckCircle className="w-4 h-4" />}
                  </button>
                  
                  <div>
                    <h4 className={`font-medium ${completedToday ? 'text-cyan-300' : 'text-white'}`}>
                      {habit.name}
                    </h4>
                    <p className="text-sm text-gray-400">{habit.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  {habit.streak > 0 && (
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-orange-400" />
                      <span className="text-orange-400 font-medium">{habit.streak} day streak</span>
                    </div>
                  )}
                  
                  <div className="text-right">
                    <div className="text-sm text-gray-400">This week</div>
                    <div className="text-cyan-400 font-medium">{weeklyProgress}%</div>
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${habit.color}`}
                  style={{ width: `${weeklyProgress}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-400">
          Research shows it takes an average of 66 days to form a habit. Keep going! 💪
        </p>
      </div>
    </div>
  );
}
