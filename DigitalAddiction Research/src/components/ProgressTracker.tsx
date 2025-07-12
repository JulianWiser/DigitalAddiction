/**
 * Progress tracker component showing course completion status
 */

import React from 'react';
import { CheckCircle, Clock, Target } from 'lucide-react';

interface ProgressTrackerProps {
  totalAssignments: number;
  completedAssignments: number;
  totalLectures: number;
}

export default function ProgressTracker({ totalAssignments, completedAssignments, totalLectures }: ProgressTrackerProps) {
  const completionPercentage = Math.round((completedAssignments / totalAssignments) * 100);
  
  return (
    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <Target className="w-6 h-6 text-purple-400" />
        <h3 className="text-xl font-bold text-white">Course Progress</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-2xl font-bold text-white">{completedAssignments}</span>
            <span className="text-gray-400">/ {totalAssignments}</span>
          </div>
          <p className="text-sm text-gray-300">Assignments Complete</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-blue-400" />
            <span className="text-2xl font-bold text-white">{totalLectures}</span>
          </div>
          <p className="text-sm text-gray-300">Lectures Attended</p>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400 mb-2">{completionPercentage}%</div>
          <p className="text-sm text-gray-300">Overall Progress</p>
        </div>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-3">
        <div 
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}
