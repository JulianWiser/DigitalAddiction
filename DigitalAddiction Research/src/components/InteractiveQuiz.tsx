/**
 * Interactive quiz component with questions from course material
 */

import React, { useState, useEffect } from 'react';
import { Brain, CheckCircle, XCircle, RotateCcw, Trophy, Star, BookOpen } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  source: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuizStats {
  totalQuizzes: number;
  totalCorrect: number;
  bestScore: number;
  categoriesCompleted: string[];
  achievements: string[];
}

export default function InteractiveQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStats, setQuizStats] = useState<QuizStats>({
    totalQuizzes: 0,
    totalCorrect: 0,
    bestScore: 0,
    categoriesCompleted: [],
    achievements: []
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);

  // Load saved quiz data
  useEffect(() => {
    const savedStats = localStorage.getItem('quizStats');
    if (savedStats) {
      setQuizStats(JSON.parse(savedStats));
    }
  }, []);

  // Save quiz data
  useEffect(() => {
    localStorage.setItem('quizStats', JSON.stringify(quizStats));
  }, [quizStats]);

  const questions: QuizQuestion[] = [
    {
      id: '1',
      question: 'How long does it take on average to form a new habit?',
      options: ['21 days', '30 days', '66 days', '100 days'],
      correctAnswer: 2,
      explanation: 'Research by Lally et al. (2009) found it takes an average of 66 days, though it can range from 18 to 254 days.',
      source: 'Lally et al., 2009'
    },
    {
      id: '2',
      question: 'What percentage of text messages are read within 3 minutes?',
      options: ['75%', '85%', '95%', '99%'],
      correctAnswer: 2,
      explanation: '95% of text messages are read within 3 minutes, with an average response time of 90 seconds.',
      source: 'Class Lecture: Persuasive Technology'
    },
    {
      id: '3',
      question: 'According to TikTok\'s internal research, how many videos does it take for a user to become "addicted"?',
      options: ['100 videos', '260 videos', '500 videos', '1000 videos'],
      correctAnswer: 1,
      explanation: 'TikTok determined users become "addicted" after 260 videos, achievable in under 35 minutes.',
      source: 'Kentucky AG Investigation'
    },
    {
      id: '4',
      question: 'How much faster does fake news travel compared to real news on Twitter?',
      options: ['2 times faster', '4 times faster', '6 times faster', '10 times faster'],
      correctAnswer: 2,
      explanation: 'Research shows fake news travels 6 times faster on Twitter than real news.',
      source: 'Aral, Roy, Vosoughi 2018'
    },
    {
      id: '5',
      question: 'What type of reinforcement schedule is most effective for creating habits?',
      options: ['Fixed ratio', 'Fixed interval', 'Variable ratio', 'Continuous'],
      correctAnswer: 2,
      explanation: 'Variable ratio (intermittent) reinforcement creates the strongest habits and is hardest to extinguish.',
      source: 'Operant Conditioning Research'
    }
  ];

  // Filter questions by category
  const filteredQuestions = selectedCategory === 'all' 
    ? questions 
    : questions.filter(q => q.category === selectedCategory);

  // Initialize user answers array
  useEffect(() => {
    setUserAnswers(new Array(filteredQuestions.length).fill(null));
  }, [filteredQuestions.length]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    // Store user's answer
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newAnswers);
    
    if (answerIndex === filteredQuestions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(userAnswers[currentQuestion + 1]);
      setShowResult(userAnswers[currentQuestion + 1] !== null);
    } else {
      setQuizCompleted(true);
      updateQuizStats();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(userAnswers[currentQuestion - 1]);
      setShowResult(userAnswers[currentQuestion - 1] !== null);
    }
  };

  const updateQuizStats = () => {
    const newStats = { ...quizStats };
    newStats.totalQuizzes += 1;
    newStats.totalCorrect += score;
    newStats.bestScore = Math.max(newStats.bestScore, Math.round((score / filteredQuestions.length) * 100));
    
    // Add category if not completed before
    const category = selectedCategory !== 'all' ? selectedCategory : 'General';
    if (!newStats.categoriesCompleted.includes(category)) {
      newStats.categoriesCompleted.push(category);
    }
    
    // Check for achievements
    const percentage = (score / filteredQuestions.length) * 100;
    if (percentage >= 100 && !newStats.achievements.includes('Perfect Score')) {
      newStats.achievements.push('Perfect Score');
    }
    if (newStats.totalQuizzes >= 5 && !newStats.achievements.includes('Quiz Master')) {
      newStats.achievements.push('Quiz Master');
    }
    if (newStats.categoriesCompleted.length >= 3 && !newStats.achievements.includes('Well Rounded')) {
      newStats.achievements.push('Well Rounded');
    }
    
    setQuizStats(newStats);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
    setUserAnswers(new Array(filteredQuestions.length).fill(null));
  };

  const categories = ['all', ...Array.from(new Set(questions.map(q => q.category)))];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-900/30';
      case 'medium': return 'text-yellow-400 bg-yellow-900/30';
      case 'hard': return 'text-red-400 bg-red-900/30';
      default: return 'text-gray-400 bg-gray-900/30';
    }
  };

  const getScoreMessage = () => {
    const percentage = (score / filteredQuestions.length) * 100;
    if (percentage >= 80) return { message: "Excellent! You've mastered the material!", emoji: "🏆" };
    if (percentage >= 60) return { message: "Good job! You understand the key concepts.", emoji: "👏" };
    if (percentage >= 40) return { message: "Not bad! Review the material for better retention.", emoji: "📚" };
    return { message: "Keep studying! The concepts will click soon.", emoji: "💪" };
  };

  if (quizCompleted) {
    const scoreMessage = getScoreMessage();
    const percentage = Math.round((score / filteredQuestions.length) * 100);
    
    return (
      <div className="bg-gradient-to-r from-violet-900/30 to-purple-900/30 border border-violet-500/30 rounded-xl p-6">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h3 className="text-2xl font-bold text-white">Quiz Complete!</h3>
          </div>
          
          <div className="text-6xl mb-4">{scoreMessage.emoji}</div>
          <div className="text-3xl font-bold text-white mb-2">
            {score}/{filteredQuestions.length} ({percentage}%)
          </div>
          <div className="text-lg text-violet-300 mb-4">
            {scoreMessage.message}
          </div>
          
          {/* New achievements */}
          {quizStats.achievements.length > 0 && (
            <div className="mb-4">
              <h4 className="text-white font-medium mb-2">🏆 Achievements</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {quizStats.achievements.map((achievement, index) => (
                  <span key={index} className="px-3 py-1 bg-yellow-600/30 text-yellow-300 rounded-full text-sm">
                    {achievement}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Detailed results */}
        <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
          <h4 className="text-white font-medium mb-3">Question Review</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {filteredQuestions.map((question, index) => (
              <div key={question.id} className="flex items-center gap-3 text-sm">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  userAnswers[index] === question.correctAnswer ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}>
                  {index + 1}
                </span>
                <span className={userAnswers[index] === question.correctAnswer ? 'text-green-300' : 'text-red-300'}>
                  {userAnswers[index] === question.correctAnswer ? '✓' : '✗'}
                </span>
                <span className="text-gray-300 truncate">{question.question}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-center">
          <div className="bg-gray-800/50 rounded-lg p-3">
            <div className="text-2xl font-bold text-violet-400">{quizStats.totalQuizzes}</div>
            <div className="text-sm text-gray-400">Total Quizzes</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <div className="text-2xl font-bold text-violet-400">{quizStats.bestScore}%</div>
            <div className="text-sm text-gray-400">Best Score</div>
          </div>
        </div>
        
        <div className="flex gap-3 justify-center">
          <button
            onClick={resetQuiz}
            className="flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
          <button
            onClick={() => {
              setSelectedCategory('all');
              resetQuiz();
            }}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            New Category
          </button>
        </div>
      </div>
    );
  }

  const current = filteredQuestions[currentQuestion];

  return (
    <div className="bg-gradient-to-r from-violet-900/30 to-purple-900/30 border border-violet-500/30 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <Brain className="w-6 h-6 text-violet-400" />
        <h3 className="text-xl font-bold text-white">Digital Psychology Quiz</h3>
        <div className="ml-auto text-sm text-violet-300">
          {currentQuestion + 1}/{filteredQuestions.length}
        </div>
      </div>

      {/* Category selector */}
      <div className="mb-4">
        <label className="text-sm text-violet-300 mb-2 block">Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentQuestion(0);
            setSelectedAnswer(null);
            setShowResult(false);
            setScore(0);
          }}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-violet-500 focus:outline-none"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
          <div 
            className="bg-gradient-to-r from-violet-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / filteredQuestions.length) * 100}%` }}
          ></div>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <h4 className="text-lg font-medium text-white flex-1">
            {current.question}
          </h4>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(current.difficulty)}`}>
            {current.difficulty}
          </span>
        </div>
        
        <div className="space-y-3">
          {current.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full p-3 text-left rounded-lg border transition-all ${
                showResult
                  ? index === current.correctAnswer
                    ? 'bg-green-900/50 border-green-500 text-green-300'
                    : selectedAnswer === index
                    ? 'bg-red-900/50 border-red-500 text-red-300'
                    : 'bg-gray-800/50 border-gray-600 text-gray-400'
                  : 'bg-gray-800/50 border-gray-600 text-white hover:border-violet-500 hover:bg-violet-900/20'
              }`}
            >
              <div className="flex items-center gap-3">
                {showResult && (
                  <div className="w-5 h-5">
                    {index === current.correctAnswer ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : selectedAnswer === index ? (
                      <XCircle className="w-5 h-5 text-red-400" />
                    ) : null}
                  </div>
                )}
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>

        {showResult && (
          <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
            <p className="text-gray-300 mb-2">
              <strong>Explanation:</strong> {current.explanation}
            </p>
            <p className="text-sm text-violet-300">
              <strong>Source:</strong> {current.source}
            </p>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-3">
        {currentQuestion > 0 && (
          <button
            onClick={prevQuestion}
            className="flex-1 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
          >
            Previous
          </button>
        )}
        
        {showResult && (
          <button
            onClick={nextQuestion}
            className="flex-1 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors"
          >
            {currentQuestion < filteredQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        )}
        
        {!showResult && selectedAnswer !== null && (
          <button
            onClick={() => setShowResult(true)}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
          >
            Check Answer
          </button>
        )}
      </div>
    </div>
  );
}
