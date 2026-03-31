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

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * Generates a study plan or explanation based on the prompt.
 */
export const askAiTutor = async (prompt: string): Promise<string> => {
  if (!ai) {
    return "AI Tutor is unavailable right now because API key is missing.";
  }
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
  if (!ai) {
    return "AI explanation is unavailable right now because API key is missing.";
  }
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
  if (!ai) {
    return "{}";
  }
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
  if (!ai) {
    return [];
  }
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
  if (!ai) {
    return "Study plan generation is unavailable right now because API key is missing.";
  }
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

/**
 * Searches for Current Affairs using Google Search Grounding
 */
export interface Source {
  title: string;
  uri: string;
}

export interface SearchResult {
  text: string;
  sources: Source[];
}

export interface ReelNewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  imageUrl?: string;
  publishedAt?: string;
  category?: string;
}

export interface ReelNewsQueryOptions {
  category?: 'all' | 'legal' | 'business' | 'tech' | 'sports' | 'world';
  limit?: number;
  offset?: number;
  date?: string;
  fromDate?: string;
}

export const fetchCurrentAffairs = async (year: string, topic: string): Promise<SearchResult> => {
  if (!ai) {
    return { text: "Current affairs search is unavailable right now because API key is missing.", sources: [] };
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Find detailed Current Affairs and General Knowledge facts for the year ${year} specifically regarding "${topic}". 
      
      Focus on:
      1. Major Events
      2. Winners/Appointments
      3. Legal Significance (if any)
      4. Key Dates
      
      Summarize the key points in a concise, bulleted manner suitable for exam revision.`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    const text = response.text || "No data found.";
    
    // Extract sources from grounding metadata
    const sources: Source[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web) {
          sources.push({
            title: chunk.web.title,
            uri: chunk.web.uri
          });
        }
      });
    }

    return { text, sources };
  } catch (error) {
    console.error("Gemini API Search Error:", error);
    return { text: "Error retrieving current affairs. Please check your internet connection.", sources: [] };
  }
};

const INSHORTS_CATEGORY_MAP: Record<string, string> = {
  all: 'all',
  legal: 'national',
  business: 'business',
  tech: 'technology',
  sports: 'sports',
  world: 'world'
};

const RSS_QUERY_MAP: Record<string, string> = {
  all: 'India current affairs',
  legal: 'India law legal policy supreme court',
  business: 'India economy business market RBI',
  tech: 'India technology AI startups',
  sports: 'India sports cricket olympics',
  world: 'global current affairs geopolitics'
};

const normalizeText = (value: unknown): string => {
  if (typeof value !== 'string') return '';
  return value.replace(/\s+/g, ' ').trim();
};

const decodeHtmlEntities = (value: string): string => {
  if (!value) return '';
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
};

const stripHtml = (value: unknown): string => {
  const text = typeof value === 'string' ? value : '';
  const noTags = text
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');
  return normalizeText(decodeHtmlEntities(noTags));
};

const buildSummary = (value: unknown): string => {
  const clean = stripHtml(value);
  if (!clean) return 'Tap to read full article.';
  const sentenceChunks = clean.split(/(?<=[.!?])\s+/).filter(Boolean);
  const preview = sentenceChunks.slice(0, 2).join(' ');
  const trimmed = preview || clean;
  return trimmed.length > 260 ? `${trimmed.slice(0, 257)}...` : trimmed;
};

const sanitizeUrl = (value: unknown): string => {
  const raw = normalizeText(value);
  if (!raw) return '#';

  const decoded = decodeHtmlEntities(raw).replace(/\s/g, '');

  if (decoded.startsWith('http://') || decoded.startsWith('https://')) {
    return decoded;
  }

  if (decoded.startsWith('//')) {
    return `https:${decoded}`;
  }

  return '#';
};

const sanitizeImageUrl = (value: unknown): string | undefined => {
  const cleaned = sanitizeUrl(value);
  return cleaned === '#' ? undefined : cleaned;
};

const dedupeNews = (items: ReelNewsItem[]): ReelNewsItem[] => {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = `${item.url}|${item.title}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export const fetchReelNews = async (
  options: ReelNewsQueryOptions = {}
): Promise<ReelNewsItem[]> => {
  const category = options.category || 'all';
  const limit = options.limit ?? 15;
  const offset = options.offset ?? 0;
  const date = options.date;
  const fromDate = options.fromDate;
  const inshortsCategory = INSHORTS_CATEGORY_MAP[category] || 'all';

  const hasDateFilter = Boolean(date || fromDate);

  const addDays = (dateStr: string, days: number): string => {
    const base = new Date(dateStr);
    if (Number.isNaN(base.getTime())) return dateStr;
    base.setDate(base.getDate() + days);
    return base.toISOString().split('T')[0];
  };

  const mapInshortsItem = (item: any, index: number): ReelNewsItem => {
    const title = stripHtml(item.title || item.heading || `News ${index + 1}`);
    const summary = buildSummary(item.content || item.summary || item.description);
    const url = sanitizeUrl(item.readMoreUrl || item.url || '#');

    return {
      id: `inshorts-${category}-${index}-${title.slice(0, 24)}`,
      title,
      summary,
      source: stripHtml(item.author || item.source || 'Inshorts'),
      url,
      imageUrl: sanitizeImageUrl(item.imageUrl || item.image || item.thumbnailUrl),
      publishedAt: stripHtml(item.date || item.time) || undefined,
      category
    };
  };

  try {
    if (!hasDateFilter) {
      const res = await fetch(`https://inshortsapi.vercel.app/news?category=${encodeURIComponent(inshortsCategory)}`);
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json?.data)) {
          const items = dedupeNews(json.data.map(mapInshortsItem)).slice(offset, offset + limit);
          if (items.length > 0) return items;
        }
      }
    }
  } catch (error) {
    console.warn('Inshorts API (vercel) unavailable, trying fallback.', error);
  }

  try {
    if (!hasDateFilter) {
      const res = await fetch(`https://inshorts.deta.dev/news?category=${encodeURIComponent(inshortsCategory)}`);
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json?.data)) {
          const items = dedupeNews(json.data.map(mapInshortsItem)).slice(offset, offset + limit);
          if (items.length > 0) return items;
        }
      }
    }
  } catch (error) {
    console.warn('Inshorts API (deta) unavailable, trying RSS fallback.', error);
  }

  const withDateQuery = (baseQuery: string): string => {
    if (date) {
      const nextDate = addDays(date, 1);
      return `${baseQuery} after:${date} before:${nextDate}`;
    }
    if (fromDate) {
      return `${baseQuery} after:${fromDate}`;
    }
    return baseQuery;
  };

  const primaryQuery = RSS_QUERY_MAP[category] || RSS_QUERY_MAP.all;
  const fallbackQuery = RSS_QUERY_MAP.all;

  const candidateQueries = [
    withDateQuery(primaryQuery),
    ...(hasDateFilter ? [primaryQuery] : []),
    ...(category !== 'all' ? [withDateQuery(fallbackQuery)] : []),
    ...(category !== 'all' && hasDateFilter ? [fallbackQuery] : [])
  ].filter(Boolean);

  const uniqueQueries = Array.from(new Set(candidateQueries));
  const rssCount = Math.max(offset + limit, 20);

  const fetchFromRssQuery = async (queryText: string): Promise<ReelNewsItem[]> => {
    const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(queryText)}&hl=en-IN&gl=IN&ceid=IN:en`;
    const rssJsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&count=${rssCount}`;
    const res = await fetch(rssJsonUrl);
    if (!res.ok) throw new Error('RSS feed unavailable');

    const json = await res.json();
    const items = Array.isArray(json?.items) ? json.items : [];

    const mapped: ReelNewsItem[] = items.map((item: any, index: number) => ({
      id: `rss-${category}-${index}-${stripHtml(item.title).slice(0, 24)}`,
      title: stripHtml(item.title || `News ${index + 1}`),
      summary: buildSummary(item.description || item.content || item.contentSnippet),
      source: stripHtml(item.author || item.source || json?.feed?.title || 'Google News'),
      url: sanitizeUrl(item.link || item.guid || '#'),
      imageUrl: sanitizeImageUrl(item.thumbnail || item?.enclosure?.link || item?.media_thumbnail || item?.image),
      publishedAt: stripHtml(item.pubDate) || undefined,
      category
    }));

    return dedupeNews(mapped.filter((item) => item.title && item.url !== '#')).slice(offset, offset + limit);
  };

  for (const queryText of uniqueQueries) {
    try {
      const result = await fetchFromRssQuery(queryText);
      if (result.length > 0) {
        return result;
      }
    } catch (error) {
      console.warn(`RSS query failed: ${queryText}`, error);
    }
  }

  console.error('All free news sources failed.');
  return [];
};