# Stroke Patient ER - AI-Powered Clinical Decision Support

A comprehensive React TypeScript demo showcasing an AI-powered clinical decision support system for stroke patient management in emergency rooms. This application demonstrates real-time patient monitoring, AI-driven analysis, and automated clinical protocol selection.

## 🚀 Features

- **Real-time Patient Monitoring**: Live tracking of stroke patients with automatic data ingestion
- **AI-Powered Analysis**: Integration with Aidoc AI for radiology analysis and stroke detection
- **Clinical Protocol Selection**: Automated selection of treatment protocols (tPA, thrombectomy, surgical, observation)
- **Quality Metrics Tracking**: Real-time monitoring of critical care metrics (door-to-imaging, door-to-needle times)
- **ML Explainability**: Transparent AI decision-making with confidence scores and feature analysis
- **Validation Dashboard**: Clinical validation workflows and approval processes
- **Agent Activity Logging**: Detailed step-by-step tracking of AI agent actions

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data Processing**: Mock data simulation with Cloudera Data Platform integration
- **AI Integration**: Aidoc AI radiology analysis simulation

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd stroke-patient-er-demo
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── MetricCard.tsx          # Dashboard metrics display
│   ├── PatientCard.tsx         # Individual patient card component
│   ├── ValidationPanel.tsx     # Clinical validation interface
│   ├── MLExplainabilityPanel.tsx # AI decision explanation
│   └── AgentActivityLog.tsx    # AI agent action tracking
├── data/
│   └── mockData.ts            # Mock patient and validation data
├── types/
│   └── index.ts               # TypeScript type definitions
├── App.tsx                    # Main application component
└── main.tsx                   # Application entry point
```

## 🎯 Key Components

### Dashboard Metrics
- **Patients Processed**: Total number of stroke patients handled
- **Protocols Initiated**: Count of active treatment protocols
- **Avg Door-to-Imaging**: Average time from arrival to imaging completion
- **Lives Saved**: Estimated lives saved through rapid intervention

### Patient Management
- Real-time patient data streaming
- Automated stroke type classification (ischemic, hemorrhagic, TIA)
- NIHSS score tracking
- Vital signs monitoring

### AI Integration
- **Aidoc AI**: Automated radiology analysis for LVO detection and hemorrhage identification
- **Cloudera AI**: Clinical protocol selection and team coordination
- **Confidence Scoring**: ML model confidence levels for clinical decisions

### Treatment Protocols
- **tPA**: Tissue plasminogen activator for ischemic strokes
- **Thrombectomy**: Mechanical clot removal for large vessel occlusions
- **Surgical**: Emergency surgical intervention for hemorrhagic strokes
- **Observation**: Conservative management for minor strokes

## 🔄 Data Flow

1. **Patient Ingestion**: EMR data received from hospital systems via NiFi
2. **Real-time Monitoring**: Vital signs streaming through Kafka
3. **Image Processing**: DICOM image processing via Flink
4. **AI Analysis**: Aidoc AI performs radiology analysis
5. **Protocol Selection**: Cloudera AI selects appropriate treatment protocol
6. **Team Coordination**: Automated notification and resource allocation
7. **Quality Tracking**: Metrics recording for continuous improvement

## 🎨 Styling

The application uses Tailwind CSS for styling with a medical-grade color scheme:
- Primary: Blue/Indigo gradients for professional medical interface
- Accent colors: Red for critical alerts, Green for successful outcomes
- Typography: Clean, readable fonts optimized for clinical environments

## 📊 Mock Data

The demo includes realistic mock data for:
- Patient demographics and medical history
- Clinical symptoms and presentations
- Imaging results and AI analysis
- Treatment protocols and outcomes
- Validation scenarios and ML explainability



### Customization
- Modify `src/data/mockData.ts` to adjust patient scenarios
- Update `src/types/index.ts` for additional data fields
- Customize styling in Tailwind classes throughout components

## 🚀 Deployment

### Build for Production
```bash
npm run build
# or
yarn build
```

### Deploy to Static Hosting
The built files in the `dist/` directory can be deployed to any static hosting service:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages



## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
