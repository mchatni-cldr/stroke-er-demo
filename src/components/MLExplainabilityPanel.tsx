import React from 'react';
import { Brain } from 'lucide-react';
import { MLScore } from '@/types';

interface MLExplainabilityPanelProps {
  score: MLScore;
}

export const MLExplainabilityPanel: React.FC<MLExplainabilityPanelProps> = ({ score }) => {
  const riskColors = {
    low: 'text-green-700 bg-green-100',
    medium: 'text-amber-700 bg-amber-100',
    high: 'text-orange-700 bg-orange-100',
    critical: 'text-red-700 bg-red-100'
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-600" />
          Aidoc AI Analysis + Cloudera ML Scoring
        </h3>
        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${riskColors[score.riskLevel]}`}>
          {score.riskLevel.toUpperCase()} PRIORITY
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Urgency Score</span>
          <span className="text-2xl font-bold text-gray-900">{score.overallScore}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-500 via-amber-500 to-red-500 h-2 rounded-full"
            style={{ width: `${score.overallScore}%` }}
          />
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {score.factors.map((factor, idx) => (
          <div key={idx}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">{factor.name}</span>
              <span className="text-sm font-semibold text-gray-900">{factor.score}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
              <div
                className="bg-blue-600 h-1.5 rounded-full"
                style={{ width: `${factor.score}%` }}
              />
            </div>
            <p className="text-xs text-gray-600">{factor.explanation}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-3">
        <div className="text-sm font-medium text-gray-700 mb-2">Clinical Reasoning:</div>
        <ul className="space-y-1">
          {score.reasoning.map((reason, idx) => (
            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="text-sm font-semibold text-blue-900 mb-1">
          Recommended Protocol: {score.recommendation.toUpperCase()}
        </div>
      </div>
    </div>
  );
};