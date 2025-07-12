/**
 * Privacy Policy page component
 * Displays privacy policy information for the TrackWell platform
 */

import React from 'react';
import { Shield, Eye, Lock, Database, UserCheck, AlertCircle, Brain, Smartphone } from 'lucide-react';
import Navigation from '../components/Navigation';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navigation />
      
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 via-blue-900/30 to-purple-900/30 border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
              <p className="text-gray-300 mt-2">How we protect and handle your information</p>
            </div>
          </div>
          <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-blue-300 font-medium">Academic Platform</p>
                <p className="text-blue-200 text-sm">This platform is designed for educational purposes as part of CAMS-UA 503 at NYU.</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-invert max-w-none">
          
          {/* Introduction */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white m-0">Introduction</h2>
            </div>
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
              <p className="text-gray-300 leading-relaxed">
                TrackWell is an educational platform created for the course "Clicks, Likes, and Tweets: Behavioral Addiction in the Digital Space" 
                (CAMS-UA 503) at New York University. This privacy policy explains how we collect, use, and protect information when you use our platform.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4">
                <strong className="text-white">Last Updated:</strong> July 2025
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white m-0">Information We Collect</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Local Storage Data</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Personal reflection entries and notes</li>
                  <li>• Progress tracking information</li>
                  <li>• App usage preferences and settings</li>
                  <li>• Completed assessments and quiz results</li>
                </ul>
                <div className="mt-4 p-3 bg-green-900/20 border border-green-700/30 rounded-lg">
                  <p className="text-green-300 text-sm">
                    <strong>Note:</strong> All data is stored locally in your browser and is not transmitted to external servers.
                  </p>
                </div>
              </div>

              <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Usage Analytics</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Time spent on different platform sections</li>
                  <li>• Feature usage patterns (for educational analysis)</li>
                  <li>• Anonymous interaction data</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <UserCheck className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white m-0">How We Use Your Information</h2>
            </div>
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
              <ul className="text-gray-300 space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <span><strong className="text-white">Educational Purposes:</strong> To provide learning tools and track your progress through course materials</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <span><strong className="text-white">Platform Improvement:</strong> To understand how students interact with digital wellness tools</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <span><strong className="text-white">Research Insights:</strong> Anonymous data may be used for academic research on digital addiction patterns</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <span><strong className="text-white">Personal Reflection:</strong> To help you track and understand your own digital usage patterns</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white m-0">Data Security & Storage</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Local Storage</h3>
                <p className="text-gray-300 leading-relaxed">
                  Your personal data, including notes, progress tracking, and assessment results, is stored locally in your browser using 
                  localStorage and sessionStorage. This data never leaves your device unless you explicitly choose to share it.
                </p>
              </div>

              <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">No External Transmission</h3>
                <p className="text-gray-300 leading-relaxed">
                  We do not collect, store, or transmit personal information to external servers. All your interactions with the platform 
                  remain on your local device.
                </p>
              </div>

              <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Third-Party Services</h3>
                <p className="text-gray-300 leading-relaxed">
                  This platform may use third-party services for images and educational content. We do not share personal data with these services.
                </p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <UserCheck className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white m-0">Your Rights</h2>
            </div>
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
              <ul className="text-gray-300 space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <span><strong className="text-white">Data Control:</strong> You can clear your local data at any time through your browser settings</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <span><strong className="text-white">Opt-Out:</strong> You can stop using the platform at any time without penalty</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <span><strong className="text-white">Data Portability:</strong> Your data can be exported through browser developer tools if needed</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <span><strong className="text-white">Questions:</strong> Contact the course instructor for any privacy-related concerns</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Academic Context */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-6 h-6 text-orange-400" />
              <h2 className="text-2xl font-bold text-white m-0">Academic Context</h2>
            </div>
            <div className="bg-orange-900/20 border border-orange-700/30 rounded-xl p-6">
              <p className="text-orange-200 leading-relaxed">
                This platform is designed as an educational tool for academic research and learning. While we protect your privacy, 
                please be aware that this is a course-related project and not a commercial health platform. For real mental health 
                concerns, please consult with appropriate healthcare professionals.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <UserCheck className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white m-0">Contact Information</h2>
            </div>
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have questions about this privacy policy or how your information is handled, please contact:
              </p>
              <div className="space-y-2">
                <p className="text-white font-medium">Dr. Anna Van Meter</p>
                <p className="text-gray-300">Course Instructor, CAMS-UA 503</p>
                <p className="text-gray-300">Department of Child and Adolescent Psychiatry</p>
                <p className="text-gray-300">New York University School of Medicine</p>
                <p className="text-blue-400">anna.vanmeter@nyulangone.org</p>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* About Section */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
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
