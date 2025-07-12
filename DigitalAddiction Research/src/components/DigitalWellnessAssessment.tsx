/**
 * Comprehensive digital wellness assessment tool
 */

import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, TrendingUp, Brain, Smartphone } from 'lucide-react';

interface AssessmentQuestion {
  id: string;
  question: string;
  options: { value: number; text: string }[];
  category: 'usage' | 'awareness' | 'control' | 'impact';
}

interface AssessmentResult {
  category: string;
  score: number;
  maxScore: number;
  level: 'excellent' | 'good' | 'moderate' | 'concerning';
  description: string;
  recommendations: string[];
}

export default function DigitalWellnessAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const questions: AssessmentQuestion[] = [
    {
      id: '1',
      question: 'How often do you check your phone first thing in the morning?',
      options: [
        { value: 0, text: 'Never - I wait at least 30 minutes' },
        { value: 1, text: 'Rarely - only if expecting something important' },
        { value: 2, text: 'Sometimes - within 15-30 minutes' },
        { value: 3, text: 'Often - within 5-15 minutes' },
        { value: 4, text: 'Always - immediately upon waking' }
      ],
      category: 'usage'
    },
    {
      id: '2',
      question: 'How aware are you of your daily screen time?',
      options: [
        { value: 4, text: 'Very aware - I track it daily' },
        { value: 3, text: 'Somewhat aware - I check weekly' },
        { value: 2, text: 'Occasionally aware - I check monthly' },
        { value: 1, text: 'Rarely aware - I rarely check' },
        { value: 0, text: 'Not aware - I never check' }
      ],
      category: 'awareness'
    },
    {
      id: '3',
      question: 'How often do you feel anxious when you cannot access your phone?',
      options: [
        { value: 0, text: 'Never - I feel fine without it' },
        { value: 1, text: 'Rarely - only in emergencies' },
        { value: 2, text: 'Sometimes - in certain situations' },
        { value: 3, text: 'Often - most of the time' },
        { value: 4, text: 'Always - I need constant access' }
      ],
      category: 'control'
    },
    {
      id: '4',
      question: 'How has screen time affected your sleep quality?',
      options: [
        { value: 0, text: 'No impact - I sleep very well' },
        { value: 1, text: 'Minimal impact - slight changes' },
        { value: 2, text: 'Some impact - noticeable changes' },
        { value: 3, text: 'Significant impact - sleep problems' },
        { value: 4, text: 'Major impact - severe sleep issues' }
      ],
      category: 'impact'
    },
    {
      id: '5',
      question: 'How often do you use your phone while eating meals?',
      options: [
        { value: 0, text: 'Never - meals are phone-free' },
        { value: 1, text: 'Rarely - only for emergencies' },
        { value: 2, text: 'Sometimes - during some meals' },
        { value: 3, text: 'Often - during most meals' },
        { value: 4, text: 'Always - every meal includes phone use' }
      ],
      category: 'usage'
    },
    {
      id: '6',
      question: 'How successful are you at limiting your social media use when you intend to?',
      options: [
        { value: 4, text: 'Very successful - I always stick to my limits' },
        { value: 3, text: 'Mostly successful - I usually stick to limits' },
        { value: 2, text: 'Somewhat successful - about half the time' },
        { value: 1, text: 'Rarely successful - I often exceed limits' },
        { value: 0, text: 'Not successful - I always exceed limits' }
      ],
      category: 'control'
    },
    {
      id: '7',
      question: 'How has screen time affected your relationships?',
      options: [
        { value: 0, text: 'Positive impact - helps me connect' },
        { value: 1, text: 'No impact - relationships unchanged' },
        { value: 2, text: 'Minor impact - some distractions' },
        { value: 3, text: 'Significant impact - frequent distractions' },
        { value: 4, text: 'Major impact - relationships suffer' }
      ],
      category: 'impact'
    },
    {
      id: '8',
      question: 'How often do you notice your own phone usage patterns?',
      options: [
        { value: 4, text: 'Always - I am very mindful of my usage' },
        { value: 3, text: 'Often - I frequently notice patterns' },
        { value: 2, text: 'Sometimes - I occasionally notice' },
        { value: 1, text: 'Rarely - I seldom notice' },
        { value: 0, text: 'Never - I am unaware of patterns' }
      ],
      category: 'awareness'
    }
  ];

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers: number[]) => {
    setShowResults(true);
  };

  const getResults = (): AssessmentResult[] => {
    const categories = {
      usage: { questions: [0, 4], name: 'Usage Patterns' },
      awareness: { questions: [1, 7], name: 'Self-Awareness' },
      control: { questions: [2, 5], name: 'Self-Control' },
      impact: { questions: [3, 6], name: 'Life Impact' }
    };

    return Object.entries(categories).map(([key, cat]) => {
      const score = cat.questions.reduce((sum, qIndex) => sum + (answers[qIndex] || 0), 0);
      const maxScore = cat.questions.length * 4;
      const percentage = (score / maxScore) * 100;

      let level: AssessmentResult['level'];
      let description: string;
      let recommendations: string[];

      if (percentage <= 25) {
        level = 'excellent';
        description = 'Excellent digital wellness in this area!';
        recommendations = ['Keep up the great work!', 'Consider helping others develop similar habits'];
      } else if (percentage <= 50) {
        level = 'good';
        description = 'Good digital wellness with room for improvement';
        recommendations = ['Continue building positive habits', 'Set specific goals for improvement'];
      } else if (percentage <= 75) {
        level = 'moderate';
        description = 'Moderate concerns that could benefit from attention';
        recommendations = ['Implement specific behavior change strategies', 'Track your progress regularly'];
      } else {
        level = 'concerning';
        description = 'Significant concerns that may impact well-being';
        recommendations = ['Consider seeking support or guidance', 'Implement immediate changes'];
      }

      return {
        category: cat.name,
        score,
        maxScore,
        level,
        description,
        recommendations
      };
    });
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setIsStarted(false);
  };

  if (!isStarted) {
    return (
      <div className="bg-gradient-to-r from-teal-900/30 to-green-900/30 border border-teal-500/30 rounded-xl p-6 text-center">
        <div className="mb-6">
          <Brain className="w-12 h-12 text-teal-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-3">Digital Wellness Assessment</h3>
          <p className="text-gray-300 mb-4">
            Evaluate your digital habits and receive personalized recommendations for improved digital wellness.
          </p>
          <div className="text-sm text-gray-400 mb-6">
            <p>• 8 research-based questions</p>
            <p>• Takes 2-3 minutes to complete</p>
            <p>• Get personalized insights and recommendations</p>
          </div>
        </div>
        
        <button
          onClick={() => setIsStarted(true)}
          className="px-8 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-medium transition-colors"
        >
          Start Assessment
        </button>
      </div>
    );
  }

  if (showResults) {
    const results = getResults();
    const overallScore = answers.reduce((sum, answer) => sum + answer, 0);
    const maxOverallScore = questions.length * 4;
    const overallPercentage = (overallScore / maxOverallScore) * 100;

    return (
      <div className="bg-gradient-to-r from-teal-900/30 to-green-900/30 border border-teal-500/30 rounded-xl p-6">
        <div className="text-center mb-6">
          <Brain className="w-8 h-8 text-teal-400 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">Your Digital Wellness Results</h3>
          <div className="text-3xl font-bold text-teal-400 mb-1">
            {Math.round(100 - overallPercentage)}%
          </div>
          <p className="text-gray-300">Overall Wellness Score</p>
        </div>

        <div className="space-y-4 mb-6">
          {results.map((result, index) => (
            <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white">{result.category}</h4>
                <div className="flex items-center gap-2">
                  {result.level === 'excellent' && <CheckCircle className="w-5 h-5 text-green-400" />}
                  {result.level === 'concerning' && <AlertTriangle className="w-5 h-5 text-red-400" />}
                  <span className={`text-sm font-medium ${
                    result.level === 'excellent' ? 'text-green-400' :
                    result.level === 'good' ? 'text-blue-400' :
                    result.level === 'moderate' ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {result.level.charAt(0).toUpperCase() + result.level.slice(1)}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-3">{result.description}</p>
              
              <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    result.level === 'excellent' ? 'bg-green-500' :
                    result.level === 'good' ? 'bg-blue-500' :
                    result.level === 'moderate' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${100 - (result.score / result.maxScore) * 100}%` }}
                ></div>
              </div>
              
              <div className="space-y-1">
                {result.recommendations.map((rec, i) => (
                  <p key={i} className="text-xs text-gray-400">• {rec}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={resetAssessment}
            className="px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg transition-colors"
          >
            Take Assessment Again
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="bg-gradient-to-r from-teal-900/30 to-green-900/30 border border-teal-500/30 rounded-xl p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-white">Digital Wellness Assessment</h3>
          <span className="text-sm text-gray-400">
            {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-teal-500 to-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-medium text-white mb-4">{currentQ.question}</h4>
        
        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.value)}
              className="w-full text-left p-4 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-teal-500 hover:bg-teal-900/20 transition-colors"
            >
              <span className="text-gray-300">{option.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
