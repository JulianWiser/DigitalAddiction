/**
 * Home page component for Digital Addiction Reflection website
 * Displays course materials and assignments in organized sections
 */

import React, { useState } from 'react';
import { BookOpen, Brain, AlertCircle, TrendingUp, Smartphone, Shield } from 'lucide-react';
import ProgressTracker from '../components/ProgressTracker';
import SearchBar from '../components/SearchBar';
import StudyTimer from '../components/StudyTimer';
import QuickNotes from '../components/QuickNotes';
import ScreenTimeAnalytics from '../components/ScreenTimeAnalytics';
import FloatingActionButton from '../components/FloatingActionButton';
import FunFactsCarousel from '../components/FunFactsCarousel';
import DigitalDetoxChallenge from '../components/DigitalDetoxChallenge';
import MoodTracker from '../components/MoodTracker';
import InteractiveQuiz from '../components/InteractiveQuiz';
import HabitTracker from '../components/HabitTracker';
import MindfulnessTimer from '../components/MindfulnessTimer';
import DigitalWellnessAssessment from '../components/DigitalWellnessAssessment';
import WeeklyChallenges from '../components/WeeklyChallenges';
import FocusSessionTracker from '../components/FocusSessionTracker';
import Navigation from '../components/Navigation';



export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');



  const completedCount = 3; // Static count for progress tracking

  /**
   * Scroll to specific sections
   */
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navigation />
      {/* Enhanced Header with Visual Elements */}
      <header className="relative bg-gradient-to-r from-gray-900 via-blue-900/30 to-purple-900/30 border-b border-gray-800 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute top-32 right-20 w-24 h-24 bg-purple-500 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-green-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-28 h-28 bg-indigo-500 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 py-12 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/40 text-blue-300 rounded-full text-sm mb-6 backdrop-blur-sm border border-blue-700/30">
                <Brain className="w-4 h-4" />
                Digital Psychology & Behavioral Addiction Course
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight">
                Swipe, Scroll, Repeat
              </h1>
              
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-300 mb-6">
                Understanding My Digital Dependencies
              </h2>
              
              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mb-8">
                A comprehensive exploration into the psychology of modern technology addiction, examining how digital platforms 
                capture attention and exploring evidence-based strategies for reclaiming autonomy over our devices.
              </p>
              
              {/* Stats Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-800/60 rounded-lg p-4 backdrop-blur-sm border border-gray-700/50">
                  <div className="text-2xl font-bold text-blue-400">5</div>
                  <div className="text-sm text-gray-400">Classes</div>
                </div>
                <div className="bg-gray-800/60 rounded-lg p-4 backdrop-blur-sm border border-gray-700/50">
                  <div className="text-2xl font-bold text-green-400">15+</div>
                  <div className="text-sm text-gray-400">Tools</div>
                </div>
                <div className="bg-gray-800/60 rounded-lg p-4 backdrop-blur-sm border border-gray-700/50">
                  <div className="text-2xl font-bold text-purple-400">50+</div>
                  <div className="text-sm text-gray-400">Facts</div>
                </div>
                <div className="bg-gray-800/60 rounded-lg p-4 backdrop-blur-sm border border-gray-700/50">
                  <div className="text-2xl font-bold text-yellow-400">NYU</div>
                  <div className="text-sm text-gray-400">Course</div>
                </div>
              </div>
            </div>
            
            {/* Right Visual Element */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="relative">
                {/* Phone Mockup */}
                <div className="relative mx-auto w-48 h-96 bg-gray-800 rounded-3xl border-4 border-gray-700 shadow-2xl">
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full"></div>
                  <div className="p-6 pt-8 h-full flex flex-col">
                    {/* Mock screen content */}
                    <div className="bg-blue-900/40 rounded-lg p-3 mb-3">
                      <div className="h-2 bg-blue-400 rounded mb-2"></div>
                      <div className="h-1 bg-blue-300 rounded w-3/4"></div>
                    </div>
                    <div className="bg-purple-900/40 rounded-lg p-3 mb-3">
                      <div className="h-2 bg-purple-400 rounded mb-2"></div>
                      <div className="h-1 bg-purple-300 rounded w-2/3"></div>
                    </div>
                    <div className="bg-green-900/40 rounded-lg p-3 mb-3">
                      <div className="h-2 bg-green-400 rounded mb-2"></div>
                      <div className="h-1 bg-green-300 rounded w-1/2"></div>
                    </div>
                    <div className="flex-1 flex items-end">
                      <div className="w-full h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                        <Smartphone className="w-6 h-6 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Icons */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-bounce">
                  <AlertCircle className="w-4 h-4 text-white" />
                </div>
                <div className="absolute top-20 -right-6 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center animate-pulse">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div className="absolute bottom-20 -left-6 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce delay-300">
                  <Shield className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-6">
            {/* Quick Navigation */}
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 backdrop-blur-sm sticky top-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                Quick Navigation
              </h3>
              <nav className="space-y-2">
                <button 
                  onClick={() => window.location.hash = '/progress'}
                  className="w-full text-left px-3 py-2 text-blue-300 hover:text-white hover:bg-blue-800/50 rounded-lg transition-colors text-sm font-medium border border-blue-700/30"
                >
                  📈 Full Progress Dashboard
                </button>
                <button 
                  onClick={() => scrollToSection('dashboard')}
                  className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors text-sm"
                >
                  📊 Quick Dashboard
                </button>
                <button 
                  onClick={() => scrollToSection('weekly-challenges')}
                  className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors text-sm"
                >
                  🏆 Weekly Challenges
                </button>
                <button 
                  onClick={() => scrollToSection('assessment')}
                  className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors text-sm"
                >
                  📋 Wellness Assessment
                </button>
                <button 
                  onClick={() => scrollToSection('tracking')}
                  className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors text-sm"
                >
                  🎯 Habit Tracking
                </button>
                <button 
                  onClick={() => scrollToSection('mindfulness')}
                  className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors text-sm"
                >
                  🧘 Mindfulness
                </button>
              </nav>
            </div>

            {/* Progress Overview */}
            <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-700/30 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                Learning Progress
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Interactive Tools</span>
                    <span className="text-purple-400">15+</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full w-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Wellness Tools</span>
                    <span className="text-green-400">10+</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full w-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Course Progress</span>
                    <span className="text-blue-400">{completedCount}/6</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${Math.round((completedCount / 6) * 100)}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Facts */}
            <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border border-green-700/30 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-green-400" />
                Did You Know?
              </h3>
              <div className="space-y-3">
                <p className="text-sm text-gray-300">
                  <span className="text-green-400 font-semibold">95%</span> of text messages are read within 3 minutes
                </p>
                <p className="text-sm text-gray-300">
                  It takes <span className="text-green-400 font-semibold">66 days</span> on average to form a new habit
                </p>
                <p className="text-sm text-gray-300">
                  TikTok users become 'addicted' after just <span className="text-green-400 font-semibold">35 minutes</span>
                </p>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9 space-y-12">
        
        {/* Dashboard Features */}
        <section id="dashboard">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ProgressTracker 
              totalAssignments={6}
              completedAssignments={completedCount}
              totalLectures={5}
            />
            <StudyTimer />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ScreenTimeAnalytics />
            <QuickNotes />
          </div>
        </section>

        {/* Floating Action Button */}
        <FloatingActionButton
          onTimerClick={() => scrollToSection('dashboard')}
          onNotesClick={() => scrollToSection('dashboard')}
          onAnalyticsClick={() => scrollToSection('dashboard')}
        />

        {/* Search Functionality */}
        <section>
          <SearchBar onSearch={setSearchQuery} />
        </section>

        {/* Fun Facts from Lectures */}
        <section>
          <FunFactsCarousel />
        </section>

        {/* Weekly Challenges */}
        <section id="weekly-challenges">
          <WeeklyChallenges />
        </section>

        {/* Assessment Tool */}
        <section id="assessment">
          <DigitalWellnessAssessment />
        </section>

        {/* Core Tracking Tools */}
        <section id="tracking">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Brain className="w-6 h-6 text-purple-400" />
            Core Tracking & Wellness Tools
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HabitTracker />
            <MoodTracker />
          </div>
        </section>

        {/* Focus & Mindfulness */}
        <section id="mindfulness">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Brain className="w-6 h-6 text-indigo-400" />
            Focus & Mindfulness Training
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FocusSessionTracker />
            <MindfulnessTimer />
          </div>
        </section>

        {/* Digital Detox & Challenges */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Brain className="w-6 h-6 text-emerald-400" />
            Digital Detox & Challenges
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <DigitalDetoxChallenge />
          </div>
        </section>

        {/* Knowledge Testing */}
        <section>
          <InteractiveQuiz />
        </section>



          </main>
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
    </div>
  );
}
