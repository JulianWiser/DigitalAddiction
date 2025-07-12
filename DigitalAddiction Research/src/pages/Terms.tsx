/**
 * Terms of Service page component
 * Displays terms of service for the TrackWell platform
 */

import React from 'react';
import { FileText, AlertTriangle, BookOpen, Users, Gavel, Shield, Brain } from 'lucide-react';
import Navigation from '../components/Navigation';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navigation />
      
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 via-purple-900/30 to-indigo-900/30 border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Terms of Service</h1>
              <p className="text-gray-300 mt-2">Guidelines for using the TrackWell platform</p>
            </div>
          </div>
          <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-purple-300 font-medium">Educational Platform Agreement</p>
                <p className="text-purple-200 text-sm">By using this platform, you agree to these terms as part of your course participation.</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-invert max-w-none">
          
          {/* Acceptance of Terms */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Gavel className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white m-0">Acceptance of Terms</h2>
            </div>
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
              <p className="text-gray-300 leading-relaxed">
                By accessing and using TrackWell, you accept and agree to be bound by these Terms of Service. This platform is provided 
                as part of the academic course "Clicks, Likes, and Tweets: Behavioral Addiction in the Digital Space" (CAMS-UA 503) 
                at New York University.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4">
                <strong className="text-white">Effective Date:</strong> July 2025
              </p>
            </div>
          </section>

          {/* Platform Purpose */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white m-0">Platform Purpose</h2>
            </div>
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
              <ul className="text-gray-300 space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <span><strong className="text-white">Educational Tool:</strong> TrackWell is designed for academic learning and research purposes</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <span><strong className="text-white">Self-Reflection:</strong> Tools provided help students understand digital usage patterns</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <span><strong className="text-white">Course Integration:</strong> Platform activities are part of course requirements and assessment</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <span><strong className="text-white">Research Component:</strong> Anonymous usage data may inform academic research</span>
                </li>
              </ul>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white m-0">User Responsibilities</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Academic Integrity</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Provide honest and accurate information in assessments and reflections</li>
                  <li>• Complete assignments independently unless collaboration is explicitly permitted</li>
                  <li>• Respect the academic purpose of the platform and course materials</li>
                  <li>• Follow NYU's Academic Integrity Policy in all platform interactions</li>
                </ul>
              </div>

              <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Appropriate Use</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Use the platform only for its intended educational purposes</li>
                  <li>• Respect the privacy and confidentiality of course materials</li>
                  <li>• Do not attempt to circumvent security measures or access unauthorized data</li>
                  <li>• Report any technical issues or concerns to the course instructor</li>
                </ul>
              </div>

              <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Personal Safety</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Use the platform in a safe and healthy manner</li>
                  <li>• Seek professional help for any serious mental health concerns</li>
                  <li>• Understand that this platform is not a substitute for medical advice</li>
                  <li>• Take breaks and practice healthy digital habits while using the platform</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Prohibited Activities */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <h2 className="text-2xl font-bold text-white m-0">Prohibited Activities</h2>
            </div>
            <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-6">
              <p className="text-red-200 mb-4">The following activities are strictly prohibited:</p>
              <ul className="text-red-200 space-y-2">
                <li>• Sharing login credentials or course materials with non-enrolled students</li>
                <li>• Attempting to hack, modify, or exploit the platform</li>
                <li>• Using the platform for non-academic or commercial purposes</li>
                <li>• Submitting false or misleading information in assignments</li>
                <li>• Violating any applicable laws or university policies</li>
                <li>• Interfering with other students' use of the platform</li>
              </ul>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white m-0">Disclaimer</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-yellow-200 mb-3">Educational Purpose Only</h3>
                <p className="text-yellow-200 leading-relaxed">
                  TrackWell is designed for educational purposes only. The tools, assessments, and information provided are not intended 
                  to diagnose, treat, or provide medical advice for any mental health conditions or digital addiction issues.
                </p>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-yellow-200 mb-3">No Medical Advice</h3>
                <p className="text-yellow-200 leading-relaxed">
                  If you are experiencing serious mental health concerns, digital addiction, or related issues, please consult with 
                  qualified healthcare professionals. This platform does not replace professional medical care or counseling.
                </p>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-yellow-200 mb-3">Platform Availability</h3>
                <p className="text-yellow-200 leading-relaxed">
                  We strive to maintain platform availability but cannot guarantee uninterrupted access. The platform may undergo 
                  maintenance, updates, or experience technical issues that could affect accessibility.
                </p>
              </div>
            </div>
          </section>

          {/* Data and Privacy */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white m-0">Data and Privacy</h2>
            </div>
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
              <p className="text-gray-300 leading-relaxed mb-4">
                Your use of this platform is also governed by our Privacy Policy. Key points include:
              </p>
              <ul className="text-gray-300 space-y-2">
                <li>• Personal data is stored locally on your device</li>
                <li>• No personal information is transmitted to external servers</li>
                <li>• Anonymous usage data may be used for academic research</li>
                <li>• You can clear your data at any time through browser settings</li>
              </ul>
              <p className="text-blue-400 mt-4">
                <button 
                  onClick={() => window.location.hash = '/privacy'}
                  className="hover:underline"
                >
                  Read our full Privacy Policy →
                </button>
              </p>
            </div>
          </section>

          {/* Course Integration */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white m-0">Course Integration</h2>
            </div>
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
              <p className="text-gray-300 leading-relaxed mb-4">
                This platform is integrated with CAMS-UA 503 course requirements:
              </p>
              <ul className="text-gray-300 space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <span><strong className="text-white">Assignment Tracking:</strong> Platform usage may be part of course assessment</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <span><strong className="text-white">Research Participation:</strong> Anonymous data may contribute to course research</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <span><strong className="text-white">Academic Credit:</strong> Completion of platform activities may affect your grade</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <span><strong className="text-white">Learning Outcomes:</strong> Platform designed to support course learning objectives</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Modifications */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-orange-400" />
              <h2 className="text-2xl font-bold text-white m-0">Modifications to Terms</h2>
            </div>
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
              <p className="text-gray-300 leading-relaxed">
                These terms may be updated during the course to reflect changes in platform functionality or course requirements. 
                Students will be notified of significant changes through course communication channels. Continued use of the platform 
                after modifications constitutes acceptance of the updated terms.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white m-0">Contact Information</h2>
            </div>
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
              <p className="text-gray-300 leading-relaxed mb-4">
                For questions about these terms or platform usage, please contact:
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
                  <FileText className="w-5 h-5 text-white" />
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
