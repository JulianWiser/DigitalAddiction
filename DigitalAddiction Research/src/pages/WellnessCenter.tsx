/**
 * Digital Wellness Center page with mindfulness tools, habit tracking, and wellness assessments
 */

import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Leaf, 
  Moon, 
  Sun, 
  Target,
  TrendingUp,
  Calendar,
  Clock,
  Zap,
  Shield,
  Smile,
  Frown,
  Meh,
  Award,
  CheckCircle,
  Plus,
  Trash2,
  Play,
  Pause,
  RotateCcw,
  Brain,
  Activity,
  BarChart3,
  Smartphone
} from 'lucide-react';
import Navigation from '../components/Navigation';

interface Habit {
  id: string;
  name: string;
  description: string;
  category: 'digital' | 'wellness' | 'mindfulness' | 'health';
  targetFrequency: number;
  completedDates: string[];
  createdAt: string;
}

interface MoodEntry {
  id: string;
  date: string;
  mood: 'happy' | 'neutral' | 'sad';
  energy: number;
  screenTime: number;
  notes: string;
}

interface MindfulnessSession {
  id: string;
  date: string;
  type: 'breathing' | 'meditation' | 'body-scan' | 'gratitude';
  duration: number;
  completed: boolean;
}

interface WellnessGoal {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  category: string;
  deadline: string;
  completed: boolean;
}

export default function WellnessCenter() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [mindfulnessSessions, setMindfulnessSessions] = useState<MindfulnessSession[]>([]);
  const [wellnessGoals, setWellnessGoals] = useState<WellnessGoal[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [newHabitName, setNewHabitName] = useState('');
  const [showNewHabitForm, setShowNewHabitForm] = useState(false);
  const [currentMoodEntry, setCurrentMoodEntry] = useState<Partial<MoodEntry>>({
    mood: 'neutral',
    energy: 5,
    screenTime: 0,
    notes: ''
  });
  
  // Mindfulness timer state
  const [mindfulnessTimer, setMindfulnessTimer] = useState({
    isRunning: false,
    timeLeft: 300, // 5 minutes default
    originalTime: 300,
    type: 'breathing' as 'breathing' | 'meditation' | 'body-scan' | 'gratitude'
  });

  // Load saved data
  useEffect(() => {
    const savedHabits = localStorage.getItem('wellnessHabits');
    const savedMoodEntries = localStorage.getItem('moodEntries');
    const savedMindfulness = localStorage.getItem('mindfulnessSessions');
    const savedGoals = localStorage.getItem('wellnessGoals');

    if (savedHabits) setHabits(JSON.parse(savedHabits));
    if (savedMoodEntries) setMoodEntries(JSON.parse(savedMoodEntries));
    if (savedMindfulness) setMindfulnessSessions(JSON.parse(savedMindfulness));
    if (savedGoals) setWellnessGoals(JSON.parse(savedGoals));
    
    // Initialize with default habits if none exist
    if (!savedHabits) {
      const defaultHabits: Habit[] = [
        {
          id: '1',
          name: 'Phone-free meals',
          description: 'Eat without checking your phone',
          category: 'digital',
          targetFrequency: 3,
          completedDates: [],
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Morning mindfulness',
          description: '5 minutes of mindful breathing',
          category: 'mindfulness',
          targetFrequency: 7,
          completedDates: [],
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Digital sunset',
          description: 'No screens 1 hour before bed',
          category: 'digital',
          targetFrequency: 7,
          completedDates: [],
          createdAt: new Date().toISOString()
        },
        {
          id: '4',
          name: 'Gratitude practice',
          description: 'Write down 3 things you\'re grateful for',
          category: 'wellness',
          targetFrequency: 7,
          completedDates: [],
          createdAt: new Date().toISOString()
        }
      ];
      setHabits(defaultHabits);
    }

    if (!savedGoals) {
      const defaultGoals: WellnessGoal[] = [
        {
          id: '1',
          title: 'Reduce daily screen time',
          description: 'Limit recreational screen time to 4 hours per day',
          targetValue: 4,
          currentValue: 0,
          unit: 'hours',
          category: 'Digital Wellness',
          deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          completed: false
        },
        {
          id: '2',
          title: 'Mindfulness streak',
          description: 'Practice mindfulness for 7 consecutive days',
          targetValue: 7,
          currentValue: 0,
          unit: 'days',
          category: 'Mindfulness',
          deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          completed: false
        }
      ];
      setWellnessGoals(defaultGoals);
    }
  }, []);

  // Save data
  useEffect(() => {
    localStorage.setItem('wellnessHabits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
  }, [moodEntries]);

  useEffect(() => {
    localStorage.setItem('mindfulnessSessions', JSON.stringify(mindfulnessSessions));
  }, [mindfulnessSessions]);

  useEffect(() => {
    localStorage.setItem('wellnessGoals', JSON.stringify(wellnessGoals));
  }, [wellnessGoals]);

  // Mindfulness timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (mindfulnessTimer.isRunning && mindfulnessTimer.timeLeft > 0) {
      interval = setInterval(() => {
        setMindfulnessTimer(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }));
      }, 1000);
    } else if (mindfulnessTimer.timeLeft === 0) {
      // Session completed
      completeMindfulnessSession();
      setMindfulnessTimer(prev => ({ ...prev, isRunning: false }));
    }

    return () => clearInterval(interval);
  }, [mindfulnessTimer.isRunning, mindfulnessTimer.timeLeft]);

  const toggleHabit = (habitId: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const isCompletedToday = habit.completedDates.includes(selectedDate);
        const newCompletedDates = isCompletedToday
          ? habit.completedDates.filter(date => date !== selectedDate)
          : [...habit.completedDates, selectedDate];
        
        return { ...habit, completedDates: newCompletedDates };
      }
      return habit;
    }));
  };

  const addHabit = () => {
    if (newHabitName.trim()) {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: newHabitName,
        description: '',
        category: 'wellness',
        targetFrequency: 7,
        completedDates: [],
        createdAt: new Date().toISOString()
      };
      setHabits(prev => [...prev, newHabit]);
      setNewHabitName('');
      setShowNewHabitForm(false);
    }
  };

  const deleteHabit = (habitId: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== habitId));
  };

  const saveMoodEntry = () => {
    const moodEntry: MoodEntry = {
      id: Date.now().toString(),
      date: selectedDate,
      mood: currentMoodEntry.mood || 'neutral',
      energy: currentMoodEntry.energy || 5,
      screenTime: currentMoodEntry.screenTime || 0,
      notes: currentMoodEntry.notes || ''
    };

    setMoodEntries(prev => {
      const filtered = prev.filter(entry => entry.date !== selectedDate);
      return [...filtered, moodEntry];
    });

    setCurrentMoodEntry({
      mood: 'neutral',
      energy: 5,
      screenTime: 0,
      notes: ''
    });
  };

  const startMindfulness = (type: typeof mindfulnessTimer.type, minutes: number) => {
    const seconds = minutes * 60;
    setMindfulnessTimer({
      isRunning: true,
      timeLeft: seconds,
      originalTime: seconds,
      type
    });
  };

  const toggleMindfulnessTimer = () => {
    setMindfulnessTimer(prev => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const resetMindfulnessTimer = () => {
    setMindfulnessTimer(prev => ({
      ...prev,
      isRunning: false,
      timeLeft: prev.originalTime
    }));
  };

  const completeMindfulnessSession = () => {
    const session: MindfulnessSession = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      type: mindfulnessTimer.type,
      duration: Math.floor(mindfulnessTimer.originalTime / 60),
      completed: true
    };
    
    setMindfulnessSessions(prev => [...prev, session]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy': return <Smile className="w-5 h-5 text-green-400" />;
      case 'sad': return <Frown className="w-5 h-5 text-red-400" />;
      default: return <Meh className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'digital': return <Shield className="w-4 h-4" />;
      case 'wellness': return <Heart className="w-4 h-4" />;
      case 'mindfulness': return <Leaf className="w-4 h-4" />;
      case 'health': return <Activity className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const getHabitStreak = (habit: Habit) => {
    const sortedDates = habit.completedDates.sort().reverse();
    let streak = 0;
    let currentDate = new Date();
    
    for (const dateStr of sortedDates) {
      const date = new Date(dateStr);
      const diffDays = Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === streak) {
        streak++;
        currentDate = date;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const todaysMood = moodEntries.find(entry => entry.date === selectedDate);
  const weeklyHabits = habits.map(habit => ({
    ...habit,
    completionRate: Math.round((habit.completedDates.length / Math.max(habit.targetFrequency, 1)) * 100)
  }));

  const totalMindfulnessMinutes = mindfulnessSessions
    .filter(session => session.completed)
    .reduce((total, session) => total + session.duration, 0);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navigation />
      
      {/* Header */}
      <header className="relative bg-gradient-to-r from-gray-900 via-emerald-900/30 to-teal-900/30 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-500 rounded-full blur-3xl"></div>
          <div className="absolute top-32 right-20 w-24 h-24 bg-teal-500 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-green-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 py-12 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-900/40 text-emerald-300 rounded-full text-sm mb-6 backdrop-blur-sm border border-emerald-700/30">
              <Heart className="w-4 h-4" />
              Digital Wellness & Mindfulness
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent leading-tight">
              Wellness Center
            </h1>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Transform your relationship with technology through mindful habits, mood tracking, 
              and wellness practices designed to restore balance in your digital life.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-800/60 rounded-lg p-4 backdrop-blur-sm border border-gray-700/50">
                <div className="text-2xl font-bold text-emerald-400">{habits.filter(h => h.completedDates.includes(selectedDate)).length}</div>
                <div className="text-sm text-gray-400">Today's Habits</div>
              </div>
              <div className="bg-gray-800/60 rounded-lg p-4 backdrop-blur-sm border border-gray-700/50">
                <div className="text-2xl font-bold text-teal-400">{totalMindfulnessMinutes}</div>
                <div className="text-sm text-gray-400">Minutes Mindful</div>
              </div>
              <div className="bg-gray-800/60 rounded-lg p-4 backdrop-blur-sm border border-gray-700/50">
                <div className="text-2xl font-bold text-green-400">{moodEntries.length}</div>
                <div className="text-sm text-gray-400">Mood Entries</div>
              </div>
              <div className="bg-gray-800/60 rounded-lg p-4 backdrop-blur-sm border border-gray-700/50">
                <div className="text-2xl font-bold text-cyan-400">{wellnessGoals.filter(g => g.completed).length}</div>
                <div className="text-sm text-gray-400">Goals Achieved</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Date Selector */}
        <div className="mb-8">
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <Calendar className="w-5 h-5 text-emerald-400" />
              <label className="text-white font-medium">Track for date:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Habit Tracker */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Target className="w-6 h-6 text-emerald-400" />
                  Daily Habits
                </h2>
                <button
                  onClick={() => setShowNewHabitForm(!showNewHabitForm)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Habit
                </button>
              </div>

              {showNewHabitForm && (
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-6">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newHabitName}
                      onChange={(e) => setNewHabitName(e.target.value)}
                      placeholder="Enter new habit name..."
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none"
                      onKeyPress={(e) => e.key === 'Enter' && addHabit()}
                    />
                    <button
                      onClick={addHabit}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}

              <div className="grid gap-4">
                {weeklyHabits.map((habit) => (
                  <div key={habit.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <button
                          onClick={() => toggleHabit(habit.id)}
                          className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                            habit.completedDates.includes(selectedDate)
                              ? 'bg-emerald-500 text-white'
                              : 'border-2 border-gray-500 hover:border-emerald-400'
                          }`}
                        >
                          {habit.completedDates.includes(selectedDate) && <CheckCircle className="w-5 h-5" />}
                        </button>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {getCategoryIcon(habit.category)}
                            <h3 className="font-semibold text-white">{habit.name}</h3>
                            <span className="px-2 py-1 text-xs rounded-full bg-emerald-800/50 text-emerald-200">
                              {habit.category}
                            </span>
                          </div>
                          {habit.description && (
                            <p className="text-gray-400 text-sm mb-2">{habit.description}</p>
                          )}
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span>Streak: {getHabitStreak(habit)} days</span>
                            <span>This week: {habit.completedDates.filter(date => {
                              const d = new Date(date);
                              const now = new Date();
                              const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
                              return d >= weekStart;
                            }).length}/{habit.targetFrequency}</span>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => deleteHabit(habit.id)}
                        className="text-gray-400 hover:text-red-400 p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Mindfulness Timer */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Leaf className="w-6 h-6 text-teal-400" />
                Mindfulness Practice
              </h2>
              
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="text-center mb-6">
                  <div className="w-32 h-32 mx-auto mb-4 relative">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                      <circle 
                        cx="60" 
                        cy="60" 
                        r="50" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="4" 
                        className="text-gray-700"
                      />
                      <circle 
                        cx="60" 
                        cy="60" 
                        r="50" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="4" 
                        strokeLinecap="round"
                        className="text-teal-400"
                        strokeDasharray={`${((mindfulnessTimer.originalTime - mindfulnessTimer.timeLeft) / mindfulnessTimer.originalTime) * 314} 314`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-2xl font-mono font-bold text-teal-400">
                        {formatTime(mindfulnessTimer.timeLeft)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 justify-center mb-6">
                    <button
                      onClick={toggleMindfulnessTimer}
                      disabled={mindfulnessTimer.timeLeft === mindfulnessTimer.originalTime && !mindfulnessTimer.isRunning}
                      className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                        mindfulnessTimer.isRunning 
                          ? 'bg-red-600 hover:bg-red-700' 
                          : 'bg-teal-600 hover:bg-teal-700'
                      } text-white disabled:opacity-50`}
                    >
                      {mindfulnessTimer.isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {mindfulnessTimer.isRunning ? 'Pause' : 'Start'}
                    </button>
                    
                    <button
                      onClick={resetMindfulnessTimer}
                      className="flex items-center gap-2 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <button
                    onClick={() => startMindfulness('breathing', 5)}
                    className="p-4 bg-teal-800/30 hover:bg-teal-700/40 border border-teal-700/50 rounded-lg text-center transition-colors"
                  >
                    <div className="text-teal-400 font-medium">Breathing</div>
                    <div className="text-sm text-gray-400">5 min</div>
                  </button>
                  <button
                    onClick={() => startMindfulness('meditation', 10)}
                    className="p-4 bg-emerald-800/30 hover:bg-emerald-700/40 border border-emerald-700/50 rounded-lg text-center transition-colors"
                  >
                    <div className="text-emerald-400 font-medium">Meditation</div>
                    <div className="text-sm text-gray-400">10 min</div>
                  </button>
                  <button
                    onClick={() => startMindfulness('body-scan', 15)}
                    className="p-4 bg-green-800/30 hover:bg-green-700/40 border border-green-700/50 rounded-lg text-center transition-colors"
                  >
                    <div className="text-green-400 font-medium">Body Scan</div>
                    <div className="text-sm text-gray-400">15 min</div>
                  </button>
                  <button
                    onClick={() => startMindfulness('gratitude', 7)}
                    className="p-4 bg-cyan-800/30 hover:bg-cyan-700/40 border border-cyan-700/50 rounded-lg text-center transition-colors"
                  >
                    <div className="text-cyan-400 font-medium">Gratitude</div>
                    <div className="text-sm text-gray-400">7 min</div>
                  </button>
                </div>

                {mindfulnessSessions.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <h4 className="text-white font-medium mb-3">Recent Sessions</h4>
                    <div className="space-y-2">
                      {mindfulnessSessions.slice(-3).reverse().map((session) => (
                        <div key={session.id} className="flex items-center justify-between text-sm">
                          <span className="text-gray-300 capitalize">{session.type}</span>
                          <div className="flex items-center gap-2 text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span>{session.duration}m</span>
                            <span>{new Date(session.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Mood Tracker */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Heart className="w-6 h-6 text-pink-400" />
                Mood Tracker
              </h2>
              
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                {todaysMood ? (
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      {getMoodIcon(todaysMood.mood)}
                      <span className="text-xl text-white capitalize">{todaysMood.mood}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center mb-4">
                      <div>
                        <div className="text-2xl font-bold text-yellow-400">{todaysMood.energy}</div>
                        <div className="text-sm text-gray-400">Energy Level</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-400">{todaysMood.screenTime}h</div>
                        <div className="text-sm text-gray-400">Screen Time</div>
                      </div>
                    </div>
                    {todaysMood.notes && (
                      <div className="bg-gray-800/50 rounded-lg p-3">
                        <div className="text-sm text-gray-300">{todaysMood.notes}</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-medium mb-2">How are you feeling today?</label>
                      <div className="flex gap-4 justify-center">
                        {(['happy', 'neutral', 'sad'] as const).map((mood) => (
                          <button
                            key={mood}
                            onClick={() => setCurrentMoodEntry(prev => ({ ...prev, mood }))}
                            className={`p-3 rounded-lg transition-colors ${
                              currentMoodEntry.mood === mood 
                                ? 'bg-pink-600 text-white' 
                                : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                            }`}
                          >
                            {getMoodIcon(mood)}
                            <div className="text-sm mt-1 capitalize">{mood}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        Energy Level: {currentMoodEntry.energy}/10
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={currentMoodEntry.energy}
                        onChange={(e) => setCurrentMoodEntry(prev => ({ ...prev, energy: Number(e.target.value) }))}
                        className="w-full accent-pink-500"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Screen Time (hours)</label>
                      <input
                        type="number"
                        min="0"
                        max="24"
                        step="0.5"
                        value={currentMoodEntry.screenTime}
                        onChange={(e) => setCurrentMoodEntry(prev => ({ ...prev, screenTime: Number(e.target.value) }))}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-pink-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Notes (optional)</label>
                      <textarea
                        value={currentMoodEntry.notes}
                        onChange={(e) => setCurrentMoodEntry(prev => ({ ...prev, notes: e.target.value }))}
                        placeholder="How was your day? Any thoughts or observations..."
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none"
                        rows={3}
                      />
                    </div>

                    <button
                      onClick={saveMoodEntry}
                      className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors"
                    >
                      Save Mood Entry
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Wellness Goals */}
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                Wellness Goals
              </h3>
              <div className="space-y-3">
                {wellnessGoals.map((goal) => (
                  <div key={goal.id} className="bg-gray-800/50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white">{goal.title}</h4>
                      {goal.completed && <CheckCircle className="w-4 h-4 text-green-400" />}
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{goal.description}</p>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Progress</span>
                      <span className="text-emerald-400">{goal.currentValue}/{goal.targetValue} {goal.unit}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((goal.currentValue / goal.targetValue) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Due: {new Date(goal.deadline).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Overview */}
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                This Week Overview
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Habits Completed</span>
                    <span className="text-blue-400">
                      {habits.reduce((total, habit) => {
                        const thisWeekCompletions = habit.completedDates.filter(date => {
                          const d = new Date(date);
                          const now = new Date();
                          const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
                          return d >= weekStart;
                        }).length;
                        return total + thisWeekCompletions;
                      }, 0)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Mindfulness Sessions</span>
                    <span className="text-teal-400">{mindfulnessSessions.filter(s => {
                      const sessionDate = new Date(s.date);
                      const now = new Date();
                      const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
                      return sessionDate >= weekStart;
                    }).length}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full w-1/2"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Mood Entries</span>
                    <span className="text-pink-400">{moodEntries.filter(entry => {
                      const entryDate = new Date(entry.date);
                      const now = new Date();
                      const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
                      return entryDate >= weekStart;
                    }).length}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-pink-500 h-2 rounded-full w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => startMindfulness('breathing', 3)}
                  className="w-full p-3 bg-teal-800/30 hover:bg-teal-700/40 border border-teal-700/50 rounded-lg text-left transition-colors"
                >
                  <div className="text-teal-400 font-medium">Quick Breathing</div>
                  <div className="text-sm text-gray-400">3-minute session</div>
                </button>
                <button className="w-full p-3 bg-emerald-800/30 hover:bg-emerald-700/40 border border-emerald-700/50 rounded-lg text-left transition-colors">
                  <div className="text-emerald-400 font-medium">Digital Detox</div>
                  <div className="text-sm text-gray-400">Start 1-hour break</div>
                </button>
                <button className="w-full p-3 bg-pink-800/30 hover:bg-pink-700/40 border border-pink-700/50 rounded-lg text-left transition-colors">
                  <div className="text-pink-400 font-medium">Gratitude Practice</div>
                  <div className="text-sm text-gray-400">Write 3 things</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
