/**
 * Personalized dashboard showing user's learning analytics and recommendations
 */

import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Target, Award, BookOpen, Clock, Zap, User } from 'lucide-react';

interface LearningAnalytics {
  totalStudyTime: number;
  quizzesCompleted: number;
  averageScore: number;
  currentStreak: number;
  longestStreak: number;
  strongestCategory: string;
  weakestCategory: string;
  favoriteTools: string[];
  weeklyProgress: { day: string; minutes: number }[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

export default function PersonalizedDashboard() {
  const [analytics, setAnalytics] = useState<LearningAnalytics>({
    totalStudyTime: 0,
    quizzesCompleted: 0,
    averageScore: 0,
    currentStreak: 0,
    longestStreak: 0,
    strongestCategory: 'Psychology',
    weakestCategory: 'Neuroscience',
    favoriteTools: ['Quiz', 'Flashcards'],
    weeklyProgress: [
      { day: 'Mon', minutes: 45 },
      { day: 'Tue', minutes: 30 },
      { day: 'Wed', minutes: 60 },
      { day: 'Thu', minutes: 25 },
      { day: 'Fri', minutes: 50 },
      { day: 'Sat', minutes: 35 },
      { day: 'Sun', minutes: 40 }
    ]
  });

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first quiz',
      icon: '🏆',
      earned: false
    },
    {
      id: '2',
      title: 'Quiz Master',
      description: 'Complete 5 quizzes',
      icon: '🧠',
      earned: false
    },
    {
      id: '3',
      title: 'Perfect Score',
      description: 'Get 100% on a quiz',
      icon: '🌟',
      earned: false
    },
    {
      id: '4',
      title: 'Study Streak',
      description: 'Study for 7 days in a row',
      icon: '🔥',
      earned: false
    },
    {
      id: '5',
      title: 'Night Owl',
      description: 'Study after 10 PM',
      icon: '🦉',
      earned: false
    },
    {
      id: '6',
      title: 'Early Bird',
      description: 'Study before 8 AM',
      icon: '🌅',
      earned: false
    }
  ]);

  const [userName, setUserName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);

  // Load saved data
  useEffect(() => {
    const savedAnalytics = localStorage.getItem('learningAnalytics');
    const savedAchievements = localStorage.getItem('achievements');
    const savedUserName = localStorage.getItem('userName');
    
    if (savedAnalytics) {
      setAnalytics(JSON.parse(savedAnalytics));
    }
    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    }
    if (savedUserName) {
      setUserName(savedUserName);
    }
  }, []);

  // Save data
  useEffect(() => {
    localStorage.setItem('learningAnalytics', JSON.stringify(analytics));
  }, [analytics]);

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem('userName', userName);
  }, [userName]);

  // Update analytics based on other components
  useEffect(() => {
    const updateAnalytics = () => {
      const quizStats = localStorage.getItem('quizStats');
      const studyTime = localStorage.getItem('totalStudyTime');
      
      if (quizStats) {
        const stats = JSON.parse(quizStats);
        setAnalytics(prev => ({
          ...prev,
          quizzesCompleted: stats.totalQuizzes,
          averageScore: stats.totalQuizzes > 0 ? Math.round((stats.totalCorrect / (stats.totalQuizzes * 12)) * 100) : 0
        }));

        // Check achievements
        setAchievements(prev => prev.map(achievement => {
          let earned = achievement.earned;
          
          switch (achievement.id) {
            case '1':
              earned = stats.totalQuizzes >= 1;
              break;
            case '2':
              earned = stats.totalQuizzes >= 5;
              break;
            case '3':
              earned = stats.bestScore >= 100;
              break;
          }
          
          if (earned && !achievement.earned) {
            return { ...achievement, earned: true, earnedDate: new Date().toISOString() };
          }
          return { ...achievement, earned };
        }));
      }
    };

    updateAnalytics();
    const interval = setInterval(updateAnalytics, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const totalMinutesThisWeek = analytics.weeklyProgress.reduce((sum, day) => sum + day.minutes, 0);
  const maxMinutes = Math.max(...analytics.weeklyProgress.map(d => d.minutes));
  const earnedAchievements = achievements.filter(a => a.earned);

  const getRecommendation = () => {
    if (analytics.quizzesCompleted === 0) {
      return "Start with a quiz to test your knowledge!";
    }
    if (analytics.averageScore < 60) {
      return "Try reviewing flashcards to improve your scores.";
    }
    if (analytics.currentStreak === 0) {
      return "Build a study streak - consistency is key!";
    }
    return "Great progress! Try exploring advanced topics.";
  };

  const saveName = () => {
    setIsEditingName(false);
  };

  return (
    <div className="bg-gradient-to-r from-slate-900/50 to-gray-900/50 border border-gray-700 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <User className="w-6 h-6 text-blue-400" />
        <div className="flex-1">
          {isEditingName ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onBlur={saveName}
                onKeyPress={(e) => e.key === 'Enter' && saveName()}
                className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-white text-xl font-bold"
                placeholder="Enter your name"
                autoFocus
              />
            </div>
          ) : (
            <h3 
              className="text-xl font-bold text-white cursor-pointer hover:text-blue-300 transition-colors"
              onClick={() => setIsEditingName(true)}
            >
              {userName || "Click to set your name"}
            </h3>
          )}
        </div>
        <div className="text-sm text-gray-400">Your Learning Dashboard</div>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
          <BookOpen className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{analytics.quizzesCompleted}</div>
          <div className="text-sm text-gray-400">Quizzes</div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
          <Target className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{analytics.averageScore}%</div>
          <div className="text-sm text-gray-400">Avg Score</div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
          <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{analytics.currentStreak}</div>
          <div className="text-sm text-gray-400">Day Streak</div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
          <Clock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{totalMinutesThisWeek}</div>
          <div className="text-sm text-gray-400">Minutes</div>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-blue-400" />
          <h4 className="text-lg font-semibold text-white">Weekly Study Time</h4>
        </div>
        <div className="flex items-end justify-between gap-2 h-32 bg-gray-800/30 rounded-lg p-4">
          {analytics.weeklyProgress.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-blue-500 rounded-t transition-all duration-500 min-h-[4px]"
                style={{ 
                  height: `${maxMinutes > 0 ? (day.minutes / maxMinutes) * 100 : 0}%`,
                  minHeight: day.minutes > 0 ? '8px' : '4px'
                }}
              ></div>
              <div className="text-xs text-gray-400 mt-2">{day.day}</div>
              <div className="text-xs text-blue-300 font-medium">{day.minutes}m</div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-yellow-400" />
          <h4 className="text-lg font-semibold text-white">Achievements</h4>
          <span className="text-sm text-gray-400">({earnedAchievements.length}/{achievements.length})</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`p-3 rounded-lg border transition-all ${
                achievement.earned 
                  ? 'bg-yellow-900/20 border-yellow-500/50' 
                  : 'bg-gray-800/30 border-gray-700'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">{achievement.icon}</div>
                <div className={`font-medium text-sm ${achievement.earned ? 'text-yellow-300' : 'text-gray-400'}`}>
                  {achievement.title}
                </div>
                <div className={`text-xs ${achievement.earned ? 'text-yellow-200' : 'text-gray-500'}`}>
                  {achievement.description}
                </div>
                {achievement.earned && achievement.earnedDate && (
                  <div className="text-xs text-yellow-400 mt-1">
                    Earned {new Date(achievement.earnedDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Personalized Recommendation */}
      <div className="bg-gradient-to-r from-blue-800/30 to-purple-800/30 border border-blue-600/30 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          <h4 className="text-lg font-semibold text-white">Recommendation</h4>
        </div>
        <p className="text-blue-200">{getRecommendation()}</p>
      </div>
    </div>
  );
}
