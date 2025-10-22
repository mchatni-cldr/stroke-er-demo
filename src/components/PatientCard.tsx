import React from 'react';
import { PatientCase } from '@/types';

interface PatientCardProps {
  patient: PatientCase;
  onClick: () => void;
  isActive: boolean;
}

export const PatientCard: React.FC<PatientCardProps> = ({ patient, onClick, isActive }) => {
  const statusColors = {
    processing: 'bg-blue-100 text-blue-800',
    approved: 'bg-green-100 text-green-800',
    flagged: 'bg-amber-100 text-amber-800',
    urgent: 'bg-red-100 text-red-800'
  };

  const strokeColors = {
    ischemic: 'text-blue-600',
    hemorrhagic: 'text-red-600',
    tia: 'text-green-600',
    unknown: 'text-gray-600'
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
        isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="font-semibold text-gray-900">{patient.patient.name}</div>
          <div className="text-xs text-gray-600">
            {patient.patient.age}yo {patient.patient.gender} • {patient.patient.id}
          </div>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[patient.status]}`}>
          {patient.status.toUpperCase()}
        </span>
      </div>
      <div className="space-y-1 text-sm">
        <div className={`font-semibold ${strokeColors[patient.strokeType]}`}>
          {patient.strokeType.toUpperCase()} • NIHSS: {patient.nihssScore}
        </div>
        <div className="text-xs text-gray-600">{patient.arrival.chiefComplaint}</div>
        <div className="text-xs font-medium text-gray-700">
          LKW: {patient.arrival.lastKnownWell}
        </div>
      </div>
    </div>
  );
};