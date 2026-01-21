
import React, { useState, useCallback } from 'react';
import { ViewState, Donation } from '../types';
import { DONATIONS } from '../constants';
import { analyzeDonationsForAnomalies } from '../services/geminiService';
import Card from '../components/Card';
import Badge from '../components/Badge';

interface Anomaly {
    donationId: string;
    reason: string;
    severity: 'High' | 'Medium' | 'Low';
    recommendation: string;
}

const AIFeatures: React.FC<{ setView: (view: ViewState) => void }> = ({ setView }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{ summary: string; anomalies: Anomaly[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    try {
      const result = await analyzeDonationsForAnomalies(DONATIONS);
      setAnalysisResult(result);
    } catch (err) {
      setError('Failed to get analysis. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getSeverityColor = (severity: Anomaly['severity']): 'red' | 'yellow' | 'blue' => {
      switch(severity) {
          case 'High': return 'red';
          case 'Medium': return 'yellow';
          case 'Low': return 'blue';
          default: return 'blue';
      }
  }

  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-brand-blue-900">AI-Powered Fraud Detection</h1>
        <p className="text-lg text-slate-600 mt-2 max-w-3xl mx-auto">
          Utilizing Google Gemini to analyze donation patterns for anomalies, ensuring fund integrity and preventing misuse. This is a demonstration using mock data.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <div className="p-6">
          <h2 className="font-bold text-lg">Donation Data for Analysis</h2>
          <p className="text-sm text-slate-500 mb-4">A sample set of recent donations across all institutions.</p>
          <div className="max-h-60 overflow-y-auto bg-slate-50 p-3 rounded-md border text-sm font-mono">
            <pre>{JSON.stringify(DONATIONS, null, 2)}</pre>
          </div>
          <div className="text-center mt-6">
            <button
              onClick={handleAnalysis}
              disabled={isLoading}
              className="px-8 py-3 bg-brand-blue-600 text-white font-bold rounded-lg hover:bg-brand-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Analyzing...' : 'Run Gemini Analysis'}
            </button>
          </div>
        </div>

        {error && <div className="p-4 bg-red-100 text-red-800 border-t">{error}</div>}

        {analysisResult && (
          <div className="bg-slate-50 border-t p-6">
            <h2 className="text-xl font-bold text-slate-800">Analysis Results</h2>
            <p className="mt-2 p-4 bg-blue-50 text-blue-800 border border-blue-200 rounded-md">{analysisResult.summary}</p>

            <div className="mt-6 space-y-4">
              {analysisResult.anomalies.map((anomaly) => (
                <div key={anomaly.donationId} className="p-4 border border-yellow-300 bg-yellow-50 rounded-lg">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-yellow-900">Anomaly Detected: Donation ID {anomaly.donationId}</h3>
                        <Badge text={anomaly.severity} color={getSeverityColor(anomaly.severity)} />
                    </div>
                    <p className="text-sm text-slate-700 mt-2"><span className="font-semibold">Reason:</span> {anomaly.reason}</p>
                    <p className="text-sm text-slate-700 mt-1"><span className="font-semibold">Recommendation:</span> {anomaly.recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AIFeatures;
