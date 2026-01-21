
import { Donation } from '../types';

// This is a MOCK implementation of the Gemini API client for demonstration purposes.
// In a real application, you would install and import `@google/genai`.
class MockGoogleGenAI {
  models = {
    generateContent: async (_params: { model: string; contents: string }): Promise<{ text: string }> => {
      // Simulate network delay to mimic a real API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockResponse = {
        summary: "Analysis of donation patterns revealed 2 potential anomalies requiring further review for potential fraud or data entry errors.",
        anomalies: [
          {
            donationId: "D003",
            reason: "Unusually large anonymous donation with no specific purpose indicated, significantly higher than the average donation value.",
            severity: "High",
            recommendation: "Flag for manual verification of source if possible. Cross-reference with any recent large public appeals by the institution."
          },
          {
            donationId: "D005, D006, D007",
            reason: "High frequency of small, identical, repeated donations from an anonymous source in a very short time frame. Could be automated activity or a misconfigured recurring payment.",
            severity: "Medium",
            recommendation: "Monitor source for further activity. Aggregate total and verify source identity if it crosses a set threshold."
          }
        ]
      };

      return { text: JSON.stringify(mockResponse) };
    }
  };
}

export const analyzeDonationsForAnomalies = async (donations: Donation[]): Promise<any> => {
  // In a real application, you would initialize with your API key:
  // const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const ai = new MockGoogleGenAI();

  const prompt = `
    Analyze the following donation data for a children's orphanage in India. Identify any suspicious patterns or anomalies that could indicate fraud, money laundering, or misuse of funds.
    
    Context: We need to ensure transparency and accountability. Look for patterns like:
    - Unusually large single anonymous donations.
    - High frequency of small, identical donations from the same anonymous source.
    - A sudden surge in donations with no clear cause.

    Data:
    ${JSON.stringify(donations.map(d => ({ id: d.id, amount: d.amount, donor: d.donor, type: d.type, date: d.date })), null, 2)}

    Please return your analysis in a valid JSON object with two keys: 
    1. "summary" (a brief text overview of findings).
    2. "anomalies" (an array of objects, where each object has "donationId", "reason", "severity" ['High', 'Medium', 'Low'], and "recommendation").
  `;

  console.log("SIMULATING GEMINI CALL with prompt:", prompt);
  
  // The model name is specified for context, though the mock ignores it.
  const response = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt });

  try {
    const jsonText = response.text.trim();
    // In a real app, you'd want more robust validation here.
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error parsing Gemini response:", error);
    throw new Error("Failed to parse AI analysis response.");
  }
};
