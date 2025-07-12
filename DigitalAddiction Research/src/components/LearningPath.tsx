/**
 * Learning path component showing user's progress through different topics
 */

import React, { useState, useEffect } from 'react';
import { MapPin, CheckCircle, Lock, Star, Trophy, Clock } from 'lucide-react';

interface PathNode {
  id: string;
  title: string;
  description: string;
  category: string;
  prerequisites: string[];
  isCompleted: boolean;
  isUnlocked: boolean;
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xp: number;
}

export default function LearningPath() {
  const [pathNodes, setPathNodes] = useState<PathNode[]>([
    {
      id: '1',
      title: 'Introduction to Digital Psychology',
      description: 'Basic concepts of how technology affects behavior',
      category: 'Fundamentals',
      prerequisites: [],
      isCompleted: false,
      isUnlocked: true,
      estimatedTime: '30 min',
      difficulty: 'beginner',
      xp: 100
    },
    {
      id: '2',
      title: 'The Neuroscience of Addiction',
      description: 'How digital platforms affect brain chemistry',
      category: 'Neuroscience',
      prerequisites: ['1'],
      isCompleted: false,
      isUnlocked: false,
      estimatedTime: '45 min',
      difficulty: 'intermediate',
      xp: 150
    },
    {
      id: '3',
      title: 'Persuasive Design Patterns',
      description: 'Common techniques used to capture attention',
      category: 'Technology',
      prerequisites: ['1'],
      isCompleted: false,
      isUnlocked: false,
      estimatedTime: '40 min',
      difficulty: 'intermediate',
      xp: 150
    },
    {
      id: '4',
      title: 'Social Media and Mental Health',
      description: 'Understanding the psychological impacts',
      category: 'Health',
      prerequisites: ['2', '3'],
      isCompleted: false,
      isUnlocked: false,
      estimatedTime: '50 min',
      difficulty: 'intermediate',
      xp: 200
    },
    {
      id: '5',
      title: 'Breaking Digital Habits',
      description: 'Evidence-based strategies for behavior change',
      category: 'Interventions',
      prerequisites: ['2', '3'],
      isCompleted: false,
      isUnlocked: false,
      estimatedTime: '60 min',
      difficulty: 'advanced',
      xp: 250
    },
    {
      id: '6',
      title: 'Creating Healthy Digital Lives',
      description: 'Long-term strategies for digital wellness',
      category: 'Wellness',
      prerequisites: ['4', '5'],
      isCompleted: false,
      isUnlocked: false,
      estimatedTime: '45 min',
      difficulty: 'advanced',
      xp: 300
    }
  ]);

  const [totalXP, setTotalXP] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);

  // Load saved progress
  useEffect(() => {
    const savedPath = localStorage.getItem('learningPath');
    const savedXP = localStorage.getItem('learningXP');
    
    if (savedPath) {
      setPathNodes(JSON.parse(savedPath));
    }
    if (savedXP) {
      setTotalXP(parseInt(savedXP));
    }
  }, []);

  // Save progress and update unlocked nodes
  useEffect(() => {
    // Update unlocked status based on prerequisites
    const updatedNodes = pathNodes.map(node => ({
      ...node,
      isUnlocked: node.prerequisites.length === 0 || 
                 node.prerequisites.every(prereq => 
                   pathNodes.find(n => n.id === prereq)?.isCompleted
                 )
    }));

    if (JSON.stringify(updatedNodes) !== JSON.stringify(pathNodes)) {
      setPathNodes(updatedNodes);
    }

    localStorage.setItem('learningPath', JSON.stringify(pathNodes));
    localStorage.setItem('learningXP', totalXP.toString());
    
    // Calculate level (100 XP per level)
    setCurrentLevel(Math.floor(totalXP / 100) + 1);
  }, [pathNodes, totalXP]);

  const completeNode = (nodeId: string) => {
    setPathNodes(prev => prev.map(node => {
      if (node.id === nodeId && !node.isCompleted) {
        setTotalXP(prevXP => prevXP + node.xp);
        return { ...node, isCompleted: true };
      }
      return node;
    }));
  };

  const resetProgress = () => {
    setPathNodes(prev => prev.map(node => ({
      ...node,
      isCompleted: false,
      isUnlocked: node.prerequisites.length === 0
    })));
    setTotalXP(0);
    setCurrentLevel(1);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-900/30';
      case 'intermediate': return 'text-yellow-400 bg-yellow-900/30';
      case 'advanced': return 'text-red-400 bg-red-900/30';
      default: return 'text-gray-400 bg-gray-900/30';
    }
  };

  const completedCount = pathNodes.filter(n => n.isCompleted).length;
  const progressPercentage = Math.round((completedCount / pathNodes.length) * 100);
  const nextLevelXP = currentLevel * 100;
  const currentLevelProgress = totalXP % 100;

  return (
    <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <MapPin className="w-6 h-6 text-indigo-400" />
        <h3 className="text-xl font-bold text-white">Learning Path</h3>
        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 font-bold">Level {currentLevel}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 font-bold">{totalXP} XP</span>
          </div>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-300">Overall Progress</span>
          <span className="text-indigo-400">{completedCount}/{pathNodes.length} ({progressPercentage}%)</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Level Progress */}
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-300">Level {currentLevel} Progress</span>
          <span className="text-yellow-400">{currentLevelProgress}/100 XP</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${currentLevelProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Learning Path Nodes */}
      <div className="space-y-4">
        {pathNodes.map((node, index) => (
          <div key={node.id} className="relative">
            {/* Connection line */}
            {index < pathNodes.length - 1 && (
              <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-600"></div>
            )}
            
            <div className={`border rounded-lg p-4 transition-all ${
              node.isCompleted 
                ? 'bg-green-900/20 border-green-500/50' 
                : node.isUnlocked 
                  ? 'bg-gray-800/50 border-gray-600 hover:border-indigo-500' 
                  : 'bg-gray-900/20 border-gray-700'
            }`}>
              <div className="flex items-start gap-4">
                {/* Status Icon */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  node.isCompleted 
                    ? 'bg-green-600' 
                    : node.isUnlocked 
                      ? 'bg-indigo-600' 
                      : 'bg-gray-700'
                }`}>
                  {node.isCompleted ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : node.isUnlocked ? (
                    <span className="text-white font-bold">{index + 1}</span>
                  ) : (
                    <Lock className="w-6 h-6 text-gray-400" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className={`font-semibold ${
                      node.isCompleted ? 'text-green-300' : node.isUnlocked ? 'text-white' : 'text-gray-500'
                    }`}>
                      {node.title}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(node.difficulty)}`}>
                      {node.difficulty}
                    </span>
                    <span className="px-2 py-1 bg-purple-800/50 text-purple-200 rounded-full text-xs">
                      +{node.xp} XP
                    </span>
                  </div>
                  
                  <p className={`text-sm mb-3 ${
                    node.isCompleted ? 'text-green-200' : node.isUnlocked ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {node.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Clock className="w-3 h-3" />
                      {node.estimatedTime}
                    </div>
                    <span className="text-indigo-400">{node.category}</span>
                    
                    {node.isUnlocked && !node.isCompleted && (
                      <button
                        onClick={() => completeNode(node.id)}
                        className="ml-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg transition-colors"
                      >
                        Complete
                      </button>
                    )}
                    
                    {node.isCompleted && (
                      <span className="ml-auto text-green-400 text-sm font-medium">
                        ✓ Completed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reset button */}
      <div className="mt-6 text-center">
        <button
          onClick={resetProgress}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded-lg transition-colors"
        >
          Reset Progress
        </button>
      </div>
    </div>
  );
}
