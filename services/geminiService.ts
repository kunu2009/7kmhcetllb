import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

/**
 * Generates a study plan or explanation based on the prompt.
 */
export const askAiTutor = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are an elite mentor for the MHCET 5-Year LLB entrance exam, dedicated to producing All India Rank 1 holders. 
        
        Your expertise covers:
        1. Legal Aptitude: Deep knowledge of Torts, Contracts, Criminal Law, Constitution, Legal Maxims, and Landmark Supreme Court Judgments (e.g., Kesavananda Bharati, Maneka Gandhi).
        2. General Knowledge: Current affairs (last 12 months), Static GK (History, Geography).
        3. Logical Reasoning: Analytical and Critical reasoning shortcuts.
        4. English: Vocabulary, Grammar, and Reading Comprehension speed techniques.
        
        Tone: Professional, encouraging, precise, and exam-oriented.
        Always cite specific legal principles or case laws when explaining legal concepts.`,
      }
    });
    return response.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error while connecting to the AI Tutor. Please check your connection or API key.";
  }
};

/**
 * Generates a practice question for a specific subject and difficulty.
 */
export const generateQuestion = async (subject: string, difficulty: string = 'Medium', topic?: string): Promise<string> => {
  try {
    const difficultyPrompt = difficulty === 'Hard' 
      ? "Create a complex, passage-based or principle-fact based question that tests deep understanding." 
      : difficulty === 'Easy' 
      ? "Create a direct, concept-based question." 
      : "Create a standard exam-level question.";
    
    const topicPrompt = topic ? `Focus specifically on the topic: ${topic}.` : '';

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate one multiple-choice question for MHCET LLB 5-Year exam subject: ${subject}. 
      ${topicPrompt}
      Difficulty Level: ${difficulty}. ${difficultyPrompt}
      
      Return ONLY raw JSON (no markdown formatting) with fields: 
      - question (string)
      - options (array of 4 strings)
      - correctIndex (number 0-3)
      - explanation (string) - Include the specific legal section, principle, or logic used.`,
      config: {
        responseMimeType: "application/json"
      }
    });
    return response.text || "{}";
  } catch (error) {
    console.error("Gemini API Question Error:", error);
    return "{}";
  }
};

/**
 * Generates a personalized 12-week study plan.
 */
export const generateStudyPlan = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Create a detailed, week-by-week 12-Week "Rank 1" Study Plan for MHCET 5-Year LLB.
      
      Requirements:
      - Cover all 5 subjects: Legal Aptitude, GK, Logical Reasoning, English, Math.
      - Structure it into 3 Phases: Foundation (Weeks 1-4), Strengthening & Speed (Weeks 5-8), Mastery & Mocks (Weeks 9-12).
      - Include explicit reminders for "Daily Newspaper Analysis" and "Weekly Mock Tests".
      - Mention specific high-yield topics (e.g., Law of Torts, Syllogisms, Indian Constitution).
      - Format the output clearly with headers (Phase 1, Week 1, etc.) and bullet points using Markdown.`,
    });
    return response.text || "Could not generate study plan.";
  } catch (error) {
    console.error("Gemini API Study Plan Error:", error);
    return "Error generating plan.";
  }
};