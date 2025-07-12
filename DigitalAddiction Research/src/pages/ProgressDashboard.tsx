/**
 * Interactive progress dashboard page with comprehensive analytics and tracking
 */

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  Award, 
  Clock, 
  BookOpen,
  Brain,
  CheckCircle,
  BarChart3,
  Filter,
  Download,
  Share2,
  Smartphone,
  Shield
} from 'lucide-react';
import Navigation from '../components/Navigation';
import ProgressTracker from '../components/ProgressTracker';
import HabitTracker from '../components/HabitTracker';
import MoodTracker from '../components/MoodTracker';
import ScreenTimeAnalytics from '../components/ScreenTimeAnalytics';
import FocusSessionTracker from '../components/FocusSessionTracker';
import StudyTimer from '../components/StudyTimer';

interface AnalyticsData {
  totalStudyHours: number;
  completedSessions: number;
  streakDays: number;
  averageMood: number;
  weeklyProgress: number[];
  achievements: string[];
}

export default function ProgressDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'all'>('week');
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalStudyHours: 47.5,
    completedSessions: 23,
    streakDays: 12,
    averageMood: 4.2,
    weeklyProgress: [85, 92, 78, 95, 88, 90, 87],
    achievements: ['First Week Complete', 'Study Streak Master', 'Mood Tracker']
  });

  const [showExportModal, setShowExportModal] = useState(false);

  useEffect(() => {
    // Load analytics data from localStorage
    const savedAnalytics = localStorage.getItem('userAnalytics');
    if (savedAnalytics) {
      setAnalytics(JSON.parse(savedAnalytics));
    }
  }, []);

  const exportProgress = (format: 'pdf' | 'csv' | 'json') => {
    const data = {
      timestamp: new Date().toISOString(),
      analytics,
      timeframe: selectedTimeframe
    };

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `progress-report-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
    }
    
    setShowExportModal(false);
    alert(`Progress report exported as ${format.toUpperCase()}! 📊`);
  };

  const shareProgress = () => {
    const shareText = `🎓 My Digital Wellness Journey Progress:
📚 ${analytics.totalStudyHours}h of study time
🎯 ${analytics.completedSessions} sessions completed  
🔥 ${analytics.streakDays} day streak
😊 ${analytics.averageMood}/5 average mood
🏆 ${analytics.achievements.length} achievements unlocked

#DigitalWellness #PersonalGrowth`;

    if (navigator.share) {
      navigator.share({
        title: 'My Digital Wellness Progress',
        text: shareText
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Progress summary copied to clipboard! 📋');
    }
  };

  const timeframes = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'all', label: 'All Time' }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navigation />
      
      {/* Header */}
      <header className="relative bg-gradient-to-r from-gray-900 via-green-900/30 to-emerald-900/30 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-green-500 rounded-full blur-3xl"></div>
          <div className="absolute top-32 right-20 w-24 h-24 bg-emerald-500 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 py-12 relative">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-900/40 text-green-300 rounded-full text-sm mb-6 backdrop-blur-sm border border-green-700/30">
                <TrendingUp className="w-4 h-4" />
                Personal Analytics Dashboard
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-green-100 to-emerald-200 bg-clip-text text-transparent leading-tight">
                Your Progress
              </h1>
              
              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                Track your digital wellness journey, monitor habits, and celebrate achievements as you build healthier relationships with technology.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowExportModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Download className="w-5 h-5" />
                Export Report
              </button>
              <button
                onClick={shareProgress}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Share2 className="w-5 h-5" />
                Share Progress
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-gray-300 text-sm">View:</span>
            <div className="flex gap-2">
              {timeframes.map(timeframe => (
                <button
                  key={timeframe.value}
                  onClick={() => setSelectedTimeframe(timeframe.value as any)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    selectedTimeframe === timeframe.value
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {timeframe.label}
                </button>
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-400">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 border border-blue-700/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-8 h-8 text-blue-400" />
              <div>
                <h3 className="text-lg font-semibold text-white">Study Time</h3>
                <p className="text-xs text-blue-300">Total hours logged</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-white">{analytics.totalStudyHours}h</div>
            <div className="text-sm text-blue-300 mt-2">+3.5h this week</div>
          </div>

          <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 border border-green-700/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-green-400" />
              <div>
                <h3 className="text-lg font-semibold text-white">Sessions</h3>
                <p className="text-xs text-green-300">Completed focus sessions</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-white">{analytics.completedSessions}</div>
            <div className="text-sm text-green-300 mt-2">+5 this week</div>
          </div>

          <div className="bg-gradient-to-br from-orange-900/40 to-orange-800/40 border border-orange-700/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-8 h-8 text-orange-400" />
              <div>
                <h3 className="text-lg font-semibold text-white">Streak</h3>
                <p className="text-xs text-orange-300">Days consecutive</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-white">{analytics.streakDays}</div>
            <div className="text-sm text-orange-300 mt-2">🔥 Personal best!</div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 border border-purple-700/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-purple-400" />
              <div>
                <h3 className="text-lg font-semibold text-white">Mood</h3>
                <p className="text-xs text-purple-300">Average score</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-white">{analytics.averageMood}/5</div>
            <div className="text-sm text-purple-300 mt-2">{"😊".repeat(Math.round(analytics.averageMood))}</div>
          </div>
        </div>

        {/* Interactive Components Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Analytics */}
          <div className="lg:col-span-8 space-y-8">
            {/* Progress Overview */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-green-400" />
                Progress Overview
              </h2>
              <div className="grid gap-6 lg:grid-cols-2">
                <ProgressTracker 
                  totalAssignments={6} 
                  completedAssignments={3} 
                  totalLectures={5} 
                />
                <ScreenTimeAnalytics />
              </div>
            </section>

            {/* Habit & Wellness Tracking */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-blue-400" />
                Habit & Wellness Tracking
              </h2>
              <div className="grid gap-6 lg:grid-cols-2">
                <HabitTracker />
                <MoodTracker />
              </div>
            </section>

            {/* Focus & Productivity */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Brain className="w-6 h-6 text-purple-400" />
                Focus & Productivity
              </h2>
              <div className="grid gap-6 lg:grid-cols-2">
                <FocusSessionTracker />
                <StudyTimer />
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Weekly Progress Chart */}
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Weekly Progress
              </h3>
              <div className="space-y-3">
                {analytics.weeklyProgress.map((progress, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-sm text-gray-400 w-8">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                    </span>
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-green-400 w-8">{progress}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                Recent Achievements
              </h3>
              <div className="space-y-3">
                {analytics.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-yellow-900/20 border border-yellow-700/30 rounded-lg">
                    <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{achievement}</div>
                      <div className="text-xs text-gray-400">Unlocked recently</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm">
                  📊 View Detailed Analytics
                </button>
                <button className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm">
                  🎯 Set New Goals
                </button>
                <button className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm">
                  🧘 Start Mindfulness Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* About Section */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">TrackWell</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                A comprehensive exploration of digital addiction through academic study and personal reflection. 
                This platform provides interactive tools and resources for understanding and managing our relationship with technology.
              </p>
              <p className="text-gray-500 text-xs">
                Course: CAMS-UA 503 • Instructor: Dr. Anna Van Meter • New York University
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-white font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => window.location.hash = '/'}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => window.location.hash = '/progress'}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    Progress Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => window.location.hash = '/learning'}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    Learning Hub
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => window.location.hash = '/wellness'}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    Wellness Center
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => window.location.hash = '/privacy'}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => window.location.hash = '/terms'}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-500 text-sm">
                © 2025 TrackWell. Created for academic purposes.
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Brain className="w-4 h-4" />
                  <span>Digital Psychology Research</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Shield className="w-4 h-4" />
                  <span>Student Privacy Protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-white mb-4">Export Progress Report</h3>
            <p className="text-gray-300 mb-6">Choose your preferred format:</p>
            
            <div className="space-y-3 mb-6">
              <button
                onClick={() => exportProgress('pdf')}
                className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-left"
              >
                📄 PDF Report - Visual summary with charts
              </button>
              <button
                onClick={() => exportProgress('csv')}
                className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-left"
              >
                📊 CSV Data - Raw data for analysis
              </button>
              <button
                onClick={() => exportProgress('json')}
                className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-left"
              >
                📋 JSON Format - Complete data export
              </button>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}