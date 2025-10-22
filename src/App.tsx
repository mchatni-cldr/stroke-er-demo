import { useState, useEffect } from 'react';
import { Activity, Clock, Users, TrendingDown, Brain } from 'lucide-react';
import { PatientCase, AgentAction } from '@/types';
import { generatePatient, mockValidations, mockMLScores } from '@/data/mockData';
import { MetricCard } from '@/components/MetricCard';
import { PatientCard } from '@/components/PatientCard';
import { ValidationPanel } from '@/components/ValidationPanel';
import { MLExplainabilityPanel } from '@/components/MLExplainabilityPanel';
import { AgentActivityLog } from '@/components/AgentActivityLog';

// System Badge Component
const SystemBadge: React.FC<{ name: string; description: string }> = ({ name, description }) => (
  <div className="text-center">
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1.5 rounded-lg font-semibold text-sm shadow-md">
      {name}
    </div>
    <div className="text-xs text-gray-600 mt-1">{description}</div>
  </div>
);

function App() {
  const [patients, setPatients] = useState<PatientCase[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<PatientCase | null>(null);
  const [metrics, setMetrics] = useState({
    processed: 0,
    protocols: 0,
    avgDoorToImaging: 0,
    saved: 0
  });

  // Initialize with first patient
  useEffect(() => {
    const newPatient = generatePatient();
    setPatients([newPatient]);
    setSelectedPatient(newPatient);

    setMetrics({
      processed: 1,
      protocols: newPatient.protocol ? 1 : 0,
      avgDoorToImaging: newPatient.timings.doorToImaging,
      saved: newPatient.strokeType === 'ischemic' ? 1 : 0
    });
  }, []);

  // Add new patients periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const newPatient = generatePatient();
      setPatients(prev => [newPatient, ...prev].slice(0, 10));
      
      setMetrics(prev => ({
        processed: prev.processed + 1,
        protocols: prev.protocols + (newPatient.protocol ? 1 : 0),
        avgDoorToImaging: Math.round((prev.avgDoorToImaging * prev.processed + newPatient.timings.doorToImaging) / (prev.processed + 1)),
        saved: prev.saved + (newPatient.strokeType === 'ischemic' ? 1 : 0)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getAgentSteps = (patient: PatientCase): AgentAction[] => {
    const baseTime = new Date(patient.timestamp).getTime();
    
    return [
      {
        timestamp: new Date(baseTime).toISOString(),
        step: 'Patient Data Ingestion',
        thinking: 'EMR data received from hospital system, parsing demographics, vitals, medical history',
        result: `Ingested patient ${patient.patient.id}, identified stroke alert criteria`,
        duration: 234,
        system: 'nifi'
      },
      {
        timestamp: new Date(baseTime + 250).toISOString(),
        step: 'Vital Signs Streaming',
        thinking: 'Monitoring real-time vitals stream, detecting critical BP elevation',
        result: `BP ${patient.vitals.bp}, HR ${patient.vitals.hr} - abnormal patterns detected`,
        duration: 189,
        system: 'kafka'
      },
      {
        timestamp: new Date(baseTime + 500).toISOString(),
        step: 'DICOM Image Processing',
        thinking: 'Processing CT/MRI images, preparing for AI analysis pipeline',
        result: `${patient.imaging.type} images preprocessed and normalized`,
        duration: 1456,
        system: 'flink'
      },
      {
        timestamp: new Date(baseTime + 2000).toISOString(),
        step: 'Aidoc AI Radiology Analysis',
        thinking: 'Running deep learning models for LVO detection, hemorrhage identification, and tissue analysis',
        result: `${patient.aiAnalysis.lvo ? 'LVO detected' : 'No LVO'}, ${patient.aiAnalysis.hemorrhage ? 'Hemorrhage confirmed' : 'No hemorrhage'} (${(patient.aiAnalysis.confidence * 100).toFixed(0)}% confidence)`,
        duration: 2847,
        system: 'aidoc'
      },
      {
        timestamp: new Date(baseTime + 5000).toISOString(),
        step: 'Clinical Protocol Selection',
        thinking: `Analyzing stroke type (${patient.strokeType}), NIHSS score (${patient.nihssScore}), time window, and contraindications`,
        result: `Selected ${patient.protocol?.toUpperCase()} protocol based on clinical criteria`,
        duration: 567,
        system: 'cloudera-ai'
      },
      {
        timestamp: new Date(baseTime + 5600).toISOString(),
        step: 'Team Notification & Orchestration',
        thinking: 'Determining required specialists, coordinating resources, preparing treatment timeline',
        result: patient.protocol === 'thrombectomy' 
          ? 'Alerted: Stroke team, Interventional radiology, Anesthesia, ICU. Cath lab prepared.'
          : patient.protocol === 'surgical'
          ? 'Alerted: Neurosurgery, ICU, OR team. Emergency surgery pathway initiated.'
          : patient.protocol === 'tpa'
          ? 'Alerted: Stroke team, Pharmacy for tPA prep. Monitoring protocols activated.'
          : 'Neurology consulted, observation pathway initiated, outpatient follow-up scheduled.',
        duration: 423,
        system: 'cloudera-ai'
      },
      {
        timestamp: new Date(baseTime + 6100).toISOString(),
        step: 'Quality Metrics Tracking',
        thinking: 'Recording door-to-imaging, door-to-needle times for quality improvement',
        result: `Door-to-imaging: ${patient.timings.doorToImaging} min${patient.timings.doorToNeedle ? `, Door-to-needle: ${patient.timings.doorToNeedle} min` : ''}`,
        duration: 156,
        system: 'cloudera-ai'
      }
    ];
  };

  const getValidationScenario = (patient: PatientCase) => {
    if (patient.protocol === 'thrombectomy' || patient.protocol === 'tpa') {
      return mockValidations.tpa;
    } else if (patient.protocol === 'surgical') {
      return mockValidations.hemorrhagic;
    } else {
      return mockValidations.observation;
    }
  };

  const getMLScenario = (patient: PatientCase) => {
    if (patient.protocol === 'thrombectomy' || patient.protocol === 'tpa') {
      return mockMLScores.tpa;
    } else if (patient.protocol === 'surgical') {
      return mockMLScores.hemorrhagic;
    } else {
      return mockMLScores.observation;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Brain className="w-8 h-8 text-indigo-600" />
                Stroke Patient ER - AI-Powered Clinical Decision Support
              </h1>
              <p className="text-gray-600 mt-1">Cloudera Data Platform: Operationalizing AI in Critical Care</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Powered by</div>
              <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Cloudera AI
              </div>
            </div>
          </div>

          {/* Architecture Diagram */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
            <div className="text-sm font-semibold text-gray-700 mb-3">Data Flow Architecture</div>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <SystemBadge name="EMR Data" description="NiFi Ingestion" />
              <div className="flex items-center gap-1 flex-shrink-0">
                <div className="w-8 h-0.5 bg-gray-400"></div>
                <div className="text-gray-500 text-2xl font-bold leading-none">→</div>
                <div className="w-8 h-0.5 bg-gray-400"></div>
              </div>
              <SystemBadge name="Vitals Stream" description="Kafka Events" />
              <div className="flex items-center gap-1 flex-shrink-0">
                <div className="w-8 h-0.5 bg-gray-400"></div>
                <div className="text-gray-500 text-2xl font-bold leading-none">→</div>
                <div className="w-8 h-0.5 bg-gray-400"></div>
              </div>
              <SystemBadge name="DICOM Processing" description="Flink Pipeline" />
              <div className="flex items-center gap-1 flex-shrink-0">
                <div className="w-8 h-0.5 bg-gray-400"></div>
                <div className="text-gray-500 text-2xl font-bold leading-none">→</div>
                <div className="w-8 h-0.5 bg-gray-400"></div>
              </div>
              <SystemBadge name="Aidoc AI" description="Image Analysis" />
              <div className="flex items-center gap-1 flex-shrink-0">
                <div className="w-8 h-0.5 bg-gray-400"></div>
                <div className="text-gray-500 text-2xl font-bold leading-none">→</div>
                <div className="w-8 h-0.5 bg-gray-400"></div>
              </div>
              <SystemBadge name="Cloudera AI Agent" description="Protocol Orchestration" />
            </div>
            <div className="text-xs text-gray-600 mt-3 text-center italic">
              Cloudera acts as the integration backbone - connecting existing tools and adding intelligent orchestration
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <MetricCard
            label="Patients Screened"
            value={metrics.processed}
            icon={<Users className="w-5 h-5 text-white" />}
            color="bg-blue-600"
            trend="Live monitoring"
          />
          <MetricCard
            label="Protocols Activated"
            value={metrics.protocols}
            icon={<Activity className="w-5 h-5 text-white" />}
            color="bg-green-600"
            trend={`${((metrics.protocols / Math.max(metrics.processed, 1)) * 100).toFixed(0)}% of cases`}
          />
          <MetricCard
            label="Avg Door-to-Imaging"
            value={`${metrics.avgDoorToImaging} min`}
            icon={<Clock className="w-5 h-5 text-white" />}
            color="bg-purple-600"
            trend="Target: <15 min"
          />
          <MetricCard
            label="Lives Saved (Est.)"
            value={metrics.saved}
            icon={<TrendingDown className="w-5 h-5 text-white" />}
            color="bg-red-600"
            trend="Timely interventions"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Sidebar - Patient Feed + Agent Log */}
          <div className="space-y-4">
            {/* Patient Feed */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Live Patient Monitor
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {patients.map(patient => (
                  <PatientCard
                    key={patient.id}
                    patient={patient}
                    onClick={() => setSelectedPatient(patient)}
                    isActive={selectedPatient?.id === patient.id}
                  />
                ))}
              </div>
            </div>

            {/* Agent Activity Log */}
            {selectedPatient && (
              <AgentActivityLog actions={getAgentSteps(selectedPatient)} />
            )}
          </div>

          {/* Main Panel - Patient Details */}
          <div className="col-span-2 space-y-4">
            {selectedPatient ? (
              <>
                {/* Patient Details */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.patient.name}</h2>
                      <div className="text-gray-600">
                        {selectedPatient.patient.age}yo {selectedPatient.patient.gender === 'M' ? 'Male' : 'Female'} • MRN: {selectedPatient.patient.id}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        selectedPatient.strokeType === 'ischemic' ? 'text-blue-600' :
                        selectedPatient.strokeType === 'hemorrhagic' ? 'text-red-600' :
                        'text-green-600'
                      }`}>
                        {selectedPatient.strokeType.toUpperCase()} STROKE
                      </div>
                      <div className="text-sm text-gray-600">NIHSS: {selectedPatient.nihssScore}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Presentation</h3>
                      <div className="space-y-3 text-sm">
                        <div>
                          <div className="text-xs text-gray-600 mb-1">Arrival Time:</div>
                          <div className="font-semibold text-gray-900">
                            {new Date(selectedPatient.arrival.time).toLocaleString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true
                            })}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600 mb-1">Chief Complaint:</div>
                          <div className="font-semibold text-gray-900">{selectedPatient.arrival.chiefComplaint}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600 mb-1">Last Known Well:</div>
                          <div className="font-semibold text-red-600">{selectedPatient.arrival.lastKnownWell}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Vital Signs</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Blood Pressure:</span>
                          <span className="font-semibold text-gray-900">{selectedPatient.vitals.bp} mmHg</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Heart Rate:</span>
                          <span className="font-semibold text-gray-900">{selectedPatient.vitals.hr} bpm</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">O₂ Saturation:</span>
                          <span className="font-semibold text-gray-900">{selectedPatient.vitals.o2sat}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Temperature:</span>
                          <span className="font-semibold text-gray-900">{selectedPatient.vitals.temperature}°F</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Clinical Findings</h3>
                      <div className="space-y-2">
                        {selectedPatient.symptoms && selectedPatient.symptoms.length > 0 ? (
                          selectedPatient.symptoms.map((symptom, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                              <span className="text-gray-900">{symptom}</span>
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-gray-500 italic">No symptoms recorded</div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Imaging Results</h3>
                      <div className="text-sm space-y-3">
                        <div>
                          <div className="text-xs text-gray-600 mb-1">Study Type:</div>
                          <div className="font-semibold text-gray-900">{selectedPatient.imaging.type}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600 mb-1">Completed:</div>
                          <div className="font-semibold text-gray-900">
                            {new Date(selectedPatient.imaging.timestamp).toLocaleString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true
                            })}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600 mb-1">Key Findings:</div>
                          <div className="space-y-1">
                            {selectedPatient.imaging.findings.map((finding, idx) => (
                              <div key={idx} className="text-sm text-gray-900 flex items-start gap-2">
                                <span className="text-red-500 mt-1">•</span>
                                <span className="font-medium">{finding}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Protocol & Timings */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-200">
                        <div className="text-sm text-gray-600 mb-1">Active Protocol</div>
                        <div className="text-lg font-bold text-indigo-900">
                          {selectedPatient.protocol?.toUpperCase() || 'PENDING'}
                        </div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <div className="text-sm text-gray-600 mb-1">Door-to-Imaging</div>
                        <div className="text-lg font-bold text-blue-900">
                          {selectedPatient.timings.doorToImaging} min
                        </div>
                      </div>
                      {selectedPatient.timings.doorToNeedle && (
                        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                          <div className="text-sm text-gray-600 mb-1">Door-to-Needle</div>
                          <div className="text-lg font-bold text-green-900">
                            {selectedPatient.timings.doorToNeedle} min
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Validation Results */}
                <ValidationPanel validations={getValidationScenario(selectedPatient)} />

                {/* ML Explainability */}
                <MLExplainabilityPanel score={getMLScenario(selectedPatient)} />
              </>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Select a patient to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;