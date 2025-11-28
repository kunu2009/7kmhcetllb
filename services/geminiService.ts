import { GoogleGenAI } from "@google/genai";

// Robust API Key retrieval to prevent "process is not defined" crashes on Vercel/Vite
const getApiKey = (): string => {
  try {
    // Priority 1: Standard Node/Webpack env (used in this editor)
    if (typeof process !== 'undefined' && process.env?.API_KEY) {
      return process.env.API_KEY;
    }
    // Priority 2: Vite/Vercel env
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_KEY) {
      // @ts-ignore
      return import.meta.env.VITE_API_KEY;
    }
  } catch (e) {
    console.warn("Error retrieving API key", e);
  }
  return '';
};

const apiKey = getApiKey();

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
 * Explains a specific concept in detail.
 */
export const explainConcept = async (concept: string, subject: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Explain the concept of "${concept}" in the context of ${subject} for the MHCET Law Entrance Exam.
      
      Structure:
      1. Simple Definition (ELI5)
      2. Key Legal Principle
      3. Relevant Case Law or Example (Crucial for Law)
      4. Exam Tip (How they trick you in questions)
      
      Keep it concise but comprehensive. Use Markdown formatting.`,
    });
    return response.text || "Could not explain concept.";
  } catch (error) {
    console.error("Gemini API Explain Error:", error);
    return "Error generating explanation.";
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
      - explanation (string) - Include the specific legal section, principle, or logic used.
      - topic (string) - The specific sub-topic this question belongs to.`,
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
 * Generates a quick 5-question quiz for a specific topic.
 */
export const generateTopicQuiz = async (topic: string, subject: string): Promise<any[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate 5 multiple-choice questions specifically about "${topic}" for ${subject} (MHCET Law).
      
      Return ONLY raw JSON (no markdown formatting) as an array of objects with fields: 
      - question (string)
      - options (array of 4 strings)
      - correctIndex (number 0-3)
      - explanation (string)
      `,
      config: {
        responseMimeType: "application/json"
      }
    });
    const text = response.text || "[]";
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Quiz Error:", error);
    return [];
  }
};

/**
 * Generates a personalized 12-week study plan.
 */
export const generateStudyPlan = async (weakAreas?: string, hoursPerDay?: string): Promise<string> => {
  try {
    const customization = weakAreas 
      ? `Focus heavily on improving these weak areas: ${weakAreas}. The student can dedicate ${hoursPerDay || '4'} hours per day.`
      : `The student can dedicate ${hoursPerDay || '4'} hours per day.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Create a highly personalized, detailed, week-by-week 12-Week "Rank 1" Study Plan for MHCET 5-Year LLB.
      
      Profile Context:
      ${customization}
      
      Requirements:
      - Cover all 5 subjects: Legal Aptitude, GK, Logical Reasoning, English, Math.
      - Structure it into 3 Phases: Foundation (Weeks 1-4), Strengthening & Speed (Weeks 5-8), Mastery & Mocks (Weeks 9-12).
      - Include explicit reminders for "Daily Newspaper Analysis" and "Weekly Mock Tests".
      - Format the output clearly with headers (Phase 1, Week 1, etc.) and bullet points using Markdown.
      - Provide specific time slots/strategy for the weak areas mentioned.`,
    });
    return response.text || "Could not generate study plan.";
  } catch (error) {
    console.error("Gemini API Study Plan Error:", error);
    return "Error generating plan.";
  }
};