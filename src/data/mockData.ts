import { PatientCase, ValidationCategory, MLScore } from '@/types';

// Generate random patient cases
export const generatePatient = (): PatientCase => {
  const patients: PatientCase[] = [
    // Ischemic Stroke - LVO - Thrombectomy
    {
      id: `PT-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      status: 'urgent',
      patient: {
        id: `MRN-${Math.floor(Math.random() * 900000 + 100000)}`,
        name: 'James Wilson',
        age: 67,
        gender: 'M'
      },
      arrival: {
        time: new Date(Date.now() - 18 * 60000).toISOString(),
        chiefComplaint: 'Sudden onset right-sided weakness, speech difficulty',
        lastKnownWell: '45 minutes ago'
      },
      vitals: {
        bp: '168/92',
        hr: 88,
        temperature: 98.6,
        o2sat: 97
      },
      symptoms: ['Right hemiparesis', 'Aphasia', 'Facial droop'],
      nihssScore: 18,
      imaging: {
        type: 'CT Angiography',
        timestamp: new Date(Date.now() - 6 * 60000).toISOString(),
        findings: ['Left MCA occlusion', 'No hemorrhage', 'ASPECTS score: 8']
      },
      strokeType: 'ischemic',
      aiAnalysis: {
        lvo: true,
        hemorrhage: false,
        confidence: 0.94
      },
      protocol: 'thrombectomy',
      timings: {
        doorToImaging: 12,
        doorToNeedle: 28
      }
    },
    // Hemorrhagic Stroke - Surgical
    {
      id: `PT-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      status: 'flagged',
      patient: {
        id: `MRN-${Math.floor(Math.random() * 900000 + 100000)}`,
        name: 'Margaret Chen',
        age: 72,
        gender: 'F'
      },
      arrival: {
        time: new Date(Date.now() - 25 * 60000).toISOString(),
        chiefComplaint: 'Severe headache, vomiting, confusion',
        lastKnownWell: '2 hours ago'
      },
      vitals: {
        bp: '188/110',
        hr: 102,
        temperature: 99.1,
        o2sat: 95
      },
      symptoms: ['Severe headache', 'Altered mental status', 'Nuchal rigidity'],
      nihssScore: 8,
      imaging: {
        type: 'CT Head',
        timestamp: new Date(Date.now() - 8 * 60000).toISOString(),
        findings: ['Intraparenchymal hemorrhage', 'Left basal ganglia', 'Mild mass effect']
      },
      strokeType: 'hemorrhagic',
      aiAnalysis: {
        lvo: false,
        hemorrhage: true,
        confidence: 0.98
      },
      protocol: 'surgical',
      timings: {
        doorToImaging: 15
      }
    },
    // TIA - Observation
    {
      id: `PT-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      status: 'approved',
      patient: {
        id: `MRN-${Math.floor(Math.random() * 900000 + 100000)}`,
        name: 'Robert Martinez',
        age: 58,
        gender: 'M'
      },
      arrival: {
        time: new Date(Date.now() - 32 * 60000).toISOString(),
        chiefComplaint: 'Transient left arm numbness, resolved',
        lastKnownWell: '90 minutes ago'
      },
      vitals: {
        bp: '142/86',
        hr: 76,
        temperature: 98.4,
        o2sat: 98
      },
      symptoms: ['Resolved left arm weakness', 'No current deficits'],
      nihssScore: 0,
      imaging: {
        type: 'MRI Brain',
        timestamp: new Date(Date.now() - 10 * 60000).toISOString(),
        findings: ['No acute infarct', 'Chronic small vessel disease', 'No hemorrhage']
      },
      strokeType: 'tia',
      aiAnalysis: {
        lvo: false,
        hemorrhage: false,
        confidence: 0.89
      },
      protocol: 'observation',
      timings: {
        doorToImaging: 22
      }
    },
    // Ischemic Stroke - tPA only
    {
      id: `PT-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      status: 'urgent',
      patient: {
        id: `MRN-${Math.floor(Math.random() * 900000 + 100000)}`,
        name: 'Linda Thompson',
        age: 71,
        gender: 'F'
      },
      arrival: {
        time: new Date(Date.now() - 22 * 60000).toISOString(),
        chiefComplaint: 'Sudden left-sided weakness, facial droop',
        lastKnownWell: '2 hours ago'
      },
      vitals: {
        bp: '154/88',
        hr: 82,
        temperature: 98.2,
        o2sat: 96
      },
      symptoms: ['Left hemiparesis', 'Facial asymmetry', 'Mild dysarthria'],
      nihssScore: 8,
      imaging: {
        type: 'CT Head',
        timestamp: new Date(Date.now() - 9 * 60000).toISOString(),
        findings: ['No hemorrhage', 'Early ischemic changes right MCA territory', 'No large vessel occlusion']
      },
      strokeType: 'ischemic',
      aiAnalysis: {
        lvo: false,
        hemorrhage: false,
        confidence: 0.91
      },
      protocol: 'tpa',
      timings: {
        doorToImaging: 13,
        doorToNeedle: 35
      }
    },
    // Ischemic Stroke - Basilar artery
    {
      id: `PT-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      status: 'urgent',
      patient: {
        id: `MRN-${Math.floor(Math.random() * 900000 + 100000)}`,
        name: 'David Kim',
        age: 63,
        gender: 'M'
      },
      arrival: {
        time: new Date(Date.now() - 28 * 60000).toISOString(),
        chiefComplaint: 'Dizziness, double vision, difficulty speaking',
        lastKnownWell: '1 hour ago'
      },
      vitals: {
        bp: '172/96',
        hr: 94,
        temperature: 98.8,
        o2sat: 96
      },
      symptoms: ['Diplopia', 'Ataxia', 'Dysarthria', 'Vertigo'],
      nihssScore: 12,
      imaging: {
        type: 'CT Angiography',
        timestamp: new Date(Date.now() - 7 * 60000).toISOString(),
        findings: ['Basilar artery occlusion', 'No hemorrhage', 'Posterior circulation involvement']
      },
      strokeType: 'ischemic',
      aiAnalysis: {
        lvo: true,
        hemorrhage: false,
        confidence: 0.96
      },
      protocol: 'thrombectomy',
      timings: {
        doorToImaging: 11,
        doorToNeedle: 25
      }
    },
    // Hemorrhagic - Small, Conservative
    {
      id: `PT-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      status: 'processing',
      patient: {
        id: `MRN-${Math.floor(Math.random() * 900000 + 100000)}`,
        name: 'Patricia Johnson',
        age: 68,
        gender: 'F'
      },
      arrival: {
        time: new Date(Date.now() - 35 * 60000).toISOString(),
        chiefComplaint: 'Sudden headache, mild confusion',
        lastKnownWell: '3 hours ago'
      },
      vitals: {
        bp: '178/102',
        hr: 88,
        temperature: 98.9,
        o2sat: 97
      },
      symptoms: ['Headache', 'Mild confusion', 'No focal deficits'],
      nihssScore: 3,
      imaging: {
        type: 'CT Head',
        timestamp: new Date(Date.now() - 12 * 60000).toISOString(),
        findings: ['Small intraparenchymal hemorrhage', 'Right frontal lobe', 'No mass effect']
      },
      strokeType: 'hemorrhagic',
      aiAnalysis: {
        lvo: false,
        hemorrhage: true,
        confidence: 0.92
      },
      protocol: 'observation',
      timings: {
        doorToImaging: 18
      }
    },
    // Wake-up Stroke
    {
      id: `PT-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      status: 'processing',
      patient: {
        id: `MRN-${Math.floor(Math.random() * 900000 + 100000)}`,
        name: 'Michael Anderson',
        age: 69,
        gender: 'M'
      },
      arrival: {
        time: new Date(Date.now() - 20 * 60000).toISOString(),
        chiefComplaint: 'Woke up with right arm weakness',
        lastKnownWell: 'Unknown - found on waking'
      },
      vitals: {
        bp: '162/90',
        hr: 80,
        temperature: 98.5,
        o2sat: 98
      },
      symptoms: ['Right arm weakness', 'Mild aphasia'],
      nihssScore: 6,
      imaging: {
        type: 'MRI Brain with DWI',
        timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
        findings: ['Acute DWI restriction left corona radiata', 'FLAIR negative', 'No hemorrhage']
      },
      strokeType: 'ischemic',
      aiAnalysis: {
        lvo: false,
        hemorrhage: false,
        confidence: 0.88
      },
      protocol: 'tpa',
      timings: {
        doorToImaging: 20,
        doorToNeedle: 42
      }
    },
    // Subarachnoid Hemorrhage
    {
      id: `PT-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      status: 'urgent',
      patient: {
        id: `MRN-${Math.floor(Math.random() * 900000 + 100000)}`,
        name: 'Sarah Williams',
        age: 54,
        gender: 'F'
      },
      arrival: {
        time: new Date(Date.now() - 15 * 60000).toISOString(),
        chiefComplaint: 'Worst headache of life, sudden onset',
        lastKnownWell: '30 minutes ago'
      },
      vitals: {
        bp: '195/115',
        hr: 108,
        temperature: 99.2,
        o2sat: 94
      },
      symptoms: ['Thunderclap headache', 'Photophobia', 'Neck stiffness', 'Vomiting'],
      nihssScore: 2,
      imaging: {
        type: 'CT Head',
        timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
        findings: ['Subarachnoid hemorrhage', 'Blood in sylvian fissures', 'Possible aneurysm']
      },
      strokeType: 'hemorrhagic',
      aiAnalysis: {
        lvo: false,
        hemorrhage: true,
        confidence: 0.99
      },
      protocol: 'surgical',
      timings: {
        doorToImaging: 10
      }
    }
  ];
  return patients[Math.floor(Math.random() * patients.length)];
};

// Validation scenarios
export const mockValidations: Record<string, ValidationCategory[]> = {
  tpa: [
    {
      category: 'tPA Eligibility',
      checks: [
        { name: 'Ischemic stroke confirmed', status: 'pass', duration: 120 },
        { name: 'Within 4.5 hour window', status: 'pass', duration: 45, detail: '45 minutes since LKW' },
        { name: 'No hemorrhage on imaging', status: 'pass', duration: 180 },
        { name: 'No anticoagulation contraindications', status: 'pass', duration: 90 }
      ]
    },
    {
      category: 'Contraindications Check',
      checks: [
        { name: 'No recent surgery (<14 days)', status: 'pass', duration: 60 },
        { name: 'No active bleeding', status: 'pass', duration: 40 },
        { name: 'Platelet count adequate', status: 'pass', duration: 75 },
        { name: 'Blood pressure controlled', status: 'warning', duration: 50, detail: 'BP 168/92, monitoring' }
      ]
    },
    {
      category: 'Lab Verification',
      checks: [
        { name: 'INR < 1.7', status: 'pass', duration: 95 },
        { name: 'Glucose level checked', status: 'pass', duration: 55 },
        { name: 'Renal function assessed', status: 'pass', duration: 85 }
      ]
    }
  ],
  hemorrhagic: [
    {
      category: 'Hemorrhage Protocol',
      checks: [
        { name: 'Hemorrhagic stroke confirmed', status: 'pass', duration: 150 },
        { name: 'Neurosurgery consulted', status: 'pass', duration: 90, detail: 'Team alerted' },
        { name: 'ICU bed reserved', status: 'pass', duration: 60 }
      ]
    },
    {
      category: 'Contraindications Check',
      checks: [
        { name: 'No tPA administration', status: 'pass', duration: 30 },
        { name: 'No antiplatelet agents', status: 'pass', duration: 40 },
        { name: 'Reversal agents ready', status: 'pass', duration: 120 }
      ]
    },
    {
      category: 'Surgical Evaluation',
      checks: [
        { name: 'Volume assessment', status: 'pass', duration: 100, detail: 'Moderate volume' },
        { name: 'Location accessibility', status: 'pass', duration: 80 },
        { name: 'Patient stability', status: 'warning', duration: 70, detail: 'BP elevated' }
      ]
    }
  ],
  observation: [
    {
      category: 'TIA Protocol',
      checks: [
        { name: 'Symptoms resolved', status: 'pass', duration: 80 },
        { name: 'No acute findings on imaging', status: 'pass', duration: 140 },
        { name: 'ABCD2 score calculated', status: 'pass', duration: 50, detail: 'Score: 4' }
      ]
    },
    {
      category: 'Risk Assessment',
      checks: [
        { name: 'Carotid ultrasound ordered', status: 'pass', duration: 60 },
        { name: 'Echocardiogram scheduled', status: 'pass', duration: 55 },
        { name: 'Antiplatelet initiated', status: 'pass', duration: 45 }
      ]
    },
    {
      category: 'Disposition Planning',
      checks: [
        { name: 'Neurology follow-up', status: 'pass', duration: 40 },
        { name: 'Patient education provided', status: 'pass', duration: 90 },
        { name: 'Observation period complete', status: 'pass', duration: 120 }
      ]
    }
  ]
};

// ML Scoring scenarios
export const mockMLScores: Record<string, MLScore> = {
  tpa: {
    overallScore: 88,
    riskLevel: 'critical',
    factors: [
      { name: 'Large Vessel Occlusion Detected', score: 95, impact: 0.40, explanation: 'Aidoc AI identified left MCA occlusion with 94% confidence' },
      { name: 'NIHSS Score Severity', score: 90, impact: 0.25, explanation: 'NIHSS 18 indicates severe stroke, high benefit from intervention' },
      { name: 'Time Window Optimal', score: 85, impact: 0.20, explanation: 'Within 45 min of symptom onset, excellent treatment window' },
      { name: 'ASPECTS Score Favorable', score: 80, impact: 0.15, explanation: 'ASPECTS 8/10 suggests good salvageable tissue' }
    ],
    reasoning: [
      'Patient presents with acute ischemic stroke with LVO',
      'Within optimal treatment window for both tPA and thrombectomy',
      'High NIHSS and imaging suggest mechanical thrombectomy candidate',
      'No contraindications identified for acute intervention'
    ],
    recommendation: 'thrombectomy'
  },
  hemorrhagic: {
    overallScore: 92,
    riskLevel: 'critical',
    factors: [
      { name: 'Hemorrhage Detected', score: 98, impact: 0.45, explanation: 'Aidoc confirmed intraparenchymal hemorrhage with 98% confidence' },
      { name: 'Blood Pressure Critical', score: 95, impact: 0.25, explanation: 'BP 188/110 requires immediate control to prevent expansion' },
      { name: 'Mass Effect Present', score: 85, impact: 0.20, explanation: 'Mild mass effect detected, monitoring for deterioration' },
      { name: 'Surgical Candidate', score: 75, impact: 0.10, explanation: 'Location and volume suggest potential surgical benefit' }
    ],
    reasoning: [
      'Acute hemorrhagic stroke with elevated intracranial pressure risk',
      'Immediate BP control critical to prevent hematoma expansion',
      'Neurosurgery consultation needed for evacuation consideration',
      'ICU-level monitoring required for neurological status'
    ],
    recommendation: 'surgical'
  },
  observation: {
    overallScore: 28,
    riskLevel: 'low',
    factors: [
      { name: 'Transient Symptoms', score: 30, impact: 0.35, explanation: 'Complete symptom resolution suggests TIA rather than stroke' },
      { name: 'Normal Imaging', score: 25, impact: 0.30, explanation: 'No acute infarct on MRI, no hemorrhage detected' },
      { name: 'ABCD2 Score Moderate', score: 35, impact: 0.20, explanation: 'Score of 4 indicates moderate short-term stroke risk' },
      { name: 'Stable Vitals', score: 20, impact: 0.15, explanation: 'Hemodynamically stable with controlled blood pressure' }
    ],
    reasoning: [
      'Clinical presentation consistent with transient ischemic attack',
      'Risk stratification indicates need for urgent workup but not acute intervention',
      'Secondary prevention measures should be initiated',
      'Outpatient neurology follow-up recommended within 48 hours'
    ],
    recommendation: 'observation'
  }
};