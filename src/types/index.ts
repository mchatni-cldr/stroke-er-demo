// Main domain type - Stroke Patient Case
export interface PatientCase {
  id: string;
  timestamp: string;
  status: 'processing' | 'approved' | 'flagged' | 'urgent';
  patient: {
    id: string;
    name: string;
    age: number;
    gender: string;
  };
  arrival: {
    time: string;
    chiefComplaint: string;
    lastKnownWell: string;
  };
  vitals: {
    bp: string;
    hr: number;
    temperature: number;
    o2sat: number;
  };
  symptoms: string[];
  nihssScore: number;
  imaging: {
    type: string;
    timestamp: string;
    findings: string[];
  };
  strokeType: 'ischemic' | 'hemorrhagic' | 'tia' | 'unknown';
  aiAnalysis: {
    lvo: boolean;
    hemorrhage: boolean;
    confidence: number;
  };
  protocol: 'tpa' | 'thrombectomy' | 'surgical' | 'observation' | null;
  timings: {
    doorToImaging: number;
    doorToNeedle?: number;
  };
}

// Keep these mostly the same across demos
export interface ValidationCategory {
  category: string;
  checks: Array<{
    name: string;
    status: 'pass' | 'fail' | 'warning';
    duration: number;
    detail?: string;
  }>;
}

export interface MLScore {
  overallScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  factors: Array<{
    name: string;
    score: number;
    impact: number;
    explanation: string;
  }>;
  reasoning: string[];
  recommendation: 'tpa' | 'thrombectomy' | 'surgical' | 'observation';
}

export interface AgentAction {
  timestamp: string;
  step: string;
  thinking: string;
  result: string;
  duration: number;
  system?: 'nifi' | 'kafka' | 'flink' | 'aidoc' | 'cloudera-ai';
}