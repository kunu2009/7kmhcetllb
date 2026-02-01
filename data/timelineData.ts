// Important Dates, Events, and Timeline for MH CET Law GK Section

export interface HistoricalEvent {
  id: string;
  year: number;
  month?: string;
  day?: number;
  event: string;
  category: 'constitution' | 'independence' | 'legal' | 'political' | 'international' | 'economic' | 'science' | 'sports';
  significance: string;
  frequentlyAsked: boolean;
}

export interface ImportantDay {
  id: string;
  date: string; // "DD Month" format
  name: string;
  theme2024?: string;
  description: string;
  category: 'national' | 'international' | 'awareness' | 'memorial';
}

// ============ CONSTITUTIONAL & LEGAL TIMELINE ============
export const CONSTITUTIONAL_TIMELINE: HistoricalEvent[] = [
  // Pre-Independence
  { id: 'ct-1', year: 1857, event: 'First War of Independence (Sepoy Mutiny)', category: 'independence', significance: 'Beginning of organized resistance against British rule', frequentlyAsked: true },
  { id: 'ct-2', year: 1885, event: 'Indian National Congress founded', category: 'political', significance: 'First all-India political organization', frequentlyAsked: true },
  { id: 'ct-3', year: 1906, event: 'Muslim League founded', category: 'political', significance: 'Represented Muslim political interests', frequentlyAsked: false },
  { id: 'ct-4', year: 1909, event: 'Morley-Minto Reforms (Indian Councils Act)', category: 'constitution', significance: 'Introduced separate electorates', frequentlyAsked: true },
  { id: 'ct-5', year: 1919, event: 'Montagu-Chelmsford Reforms (GoI Act 1919)', category: 'constitution', significance: 'Introduced dyarchy in provinces', frequentlyAsked: true },
  { id: 'ct-6', year: 1919, month: 'April', day: 13, event: 'Jallianwala Bagh Massacre', category: 'independence', significance: 'Turning point in freedom struggle', frequentlyAsked: true },
  { id: 'ct-7', year: 1920, event: 'Non-Cooperation Movement launched', category: 'independence', significance: 'Gandhi\'s first mass movement', frequentlyAsked: true },
  { id: 'ct-8', year: 1930, month: 'March', day: 12, event: 'Dandi March / Salt Satyagraha begins', category: 'independence', significance: 'Civil disobedience against salt tax', frequentlyAsked: true },
  { id: 'ct-9', year: 1935, event: 'Government of India Act 1935', category: 'constitution', significance: 'Basis for current Constitution; provincial autonomy', frequentlyAsked: true },
  { id: 'ct-10', year: 1942, month: 'August', day: 8, event: 'Quit India Movement launched', category: 'independence', significance: '"Do or Die" call by Gandhi', frequentlyAsked: true },
  { id: 'ct-11', year: 1946, month: 'December', day: 9, event: 'Constituent Assembly first met', category: 'constitution', significance: 'Beginning of Constitution making', frequentlyAsked: true },
  { id: 'ct-12', year: 1947, month: 'August', day: 15, event: 'Independence Day', category: 'independence', significance: 'India gains independence from British', frequentlyAsked: true },
  { id: 'ct-13', year: 1948, month: 'January', day: 30, event: 'Mahatma Gandhi assassinated', category: 'independence', significance: 'Father of the Nation martyred', frequentlyAsked: true },
  { id: 'ct-14', year: 1949, month: 'November', day: 26, event: 'Constitution adopted by Constituent Assembly', category: 'constitution', significance: 'Constitution Day; drafting completed', frequentlyAsked: true },
  { id: 'ct-15', year: 1950, month: 'January', day: 26, event: 'Constitution came into force', category: 'constitution', significance: 'Republic Day; India became a Republic', frequentlyAsked: true },
  
  // Post-Independence Constitutional Amendments
  { id: 'ct-16', year: 1951, event: '1st Constitutional Amendment', category: 'constitution', significance: 'Added 9th Schedule; restrictions on Art. 19', frequentlyAsked: true },
  { id: 'ct-17', year: 1956, event: '7th Amendment & States Reorganization', category: 'constitution', significance: 'States reorganized on linguistic basis', frequentlyAsked: true },
  { id: 'ct-18', year: 1967, event: 'Golaknath Case decided', category: 'legal', significance: 'FRs cannot be amended (later overruled)', frequentlyAsked: true },
  { id: 'ct-19', year: 1971, event: '24th & 25th Amendments', category: 'constitution', significance: 'Parliament can amend FRs; property not a FR', frequentlyAsked: true },
  { id: 'ct-20', year: 1973, event: 'Kesavananda Bharati Case', category: 'legal', significance: 'Basic Structure Doctrine established', frequentlyAsked: true },
  { id: 'ct-21', year: 1975, month: 'June', day: 25, event: 'National Emergency declared', category: 'political', significance: 'FRs suspended; dark period of Indian democracy', frequentlyAsked: true },
  { id: 'ct-22', year: 1976, event: '42nd Amendment (Mini Constitution)', category: 'constitution', significance: 'Added Socialist, Secular, Integrity; FDs', frequentlyAsked: true },
  { id: 'ct-23', year: 1977, event: 'Emergency revoked; Janata Government formed', category: 'political', significance: 'First non-Congress government at Centre', frequentlyAsked: true },
  { id: 'ct-24', year: 1978, event: '44th Amendment', category: 'constitution', significance: 'Undid 42nd; Property removed from FRs', frequentlyAsked: true },
  { id: 'ct-25', year: 1978, event: 'Maneka Gandhi Case', category: 'legal', significance: 'Article 21 expanded; procedure must be fair', frequentlyAsked: true },
  { id: 'ct-26', year: 1980, event: 'Minerva Mills Case', category: 'legal', significance: 'Judicial review is basic structure', frequentlyAsked: true },
  { id: 'ct-27', year: 1985, event: '52nd Amendment', category: 'constitution', significance: 'Anti-Defection Law (10th Schedule)', frequentlyAsked: true },
  { id: 'ct-28', year: 1988, event: '61st Amendment', category: 'constitution', significance: 'Voting age reduced from 21 to 18', frequentlyAsked: true },
  { id: 'ct-29', year: 1992, event: '73rd & 74th Amendments', category: 'constitution', significance: 'Panchayati Raj & Municipalities', frequentlyAsked: true },
  { id: 'ct-30', year: 1992, event: 'Indra Sawhney Case', category: 'legal', significance: '50% ceiling on reservation; creamy layer', frequentlyAsked: true },
  { id: 'ct-31', year: 1994, event: 'S.R. Bommai Case', category: 'legal', significance: 'Secularism is basic structure', frequentlyAsked: true },
  { id: 'ct-32', year: 1997, event: 'Vishakha Case', category: 'legal', significance: 'Guidelines on sexual harassment at workplace', frequentlyAsked: true },
  { id: 'ct-33', year: 2002, event: '86th Amendment', category: 'constitution', significance: 'Right to Education (Art. 21A)', frequentlyAsked: true },
  { id: 'ct-34', year: 2016, event: '101st Amendment', category: 'constitution', significance: 'GST introduced', frequentlyAsked: true },
  { id: 'ct-35', year: 2017, event: 'K.S. Puttaswamy Case', category: 'legal', significance: 'Right to Privacy as fundamental right', frequentlyAsked: true },
  { id: 'ct-36', year: 2018, event: 'Navtej Singh Johar Case', category: 'legal', significance: 'Section 377 partially struck down', frequentlyAsked: true },
  { id: 'ct-37', year: 2019, event: '103rd Amendment', category: 'constitution', significance: '10% EWS reservation', frequentlyAsked: true },
  { id: 'ct-38', year: 2019, month: 'August', day: 5, event: 'Article 370 abrogated', category: 'constitution', significance: 'J&K special status revoked', frequentlyAsked: true },
  { id: 'ct-39', year: 2024, month: 'July', day: 1, event: 'New Criminal Laws effective', category: 'legal', significance: 'BNS, BNSS, BSA replaced IPC, CrPC, Evidence Act', frequentlyAsked: true },
];

// ============ IMPORTANT DAYS ============
export const IMPORTANT_DAYS: ImportantDay[] = [
  // January
  { id: 'id-1', date: '1 January', name: 'Global Family Day', category: 'international', description: 'Promotes peace and sharing among peoples' },
  { id: 'id-2', date: '9 January', name: 'NRI Day (Pravasi Bharatiya Divas)', category: 'national', description: 'Marks contribution of overseas Indian community' },
  { id: 'id-3', date: '12 January', name: 'National Youth Day', category: 'national', description: 'Birthday of Swami Vivekananda' },
  { id: 'id-4', date: '15 January', name: 'Army Day', category: 'national', description: 'Commemorates Field Marshal K.M. Cariappa taking charge' },
  { id: 'id-5', date: '23 January', name: 'Netaji Subhas Chandra Bose Jayanti / Parakram Diwas', category: 'national', description: 'Birth anniversary of Netaji' },
  { id: 'id-6', date: '25 January', name: 'National Voters Day', category: 'national', description: 'Foundation day of Election Commission' },
  { id: 'id-7', date: '26 January', name: 'Republic Day', category: 'national', description: 'Constitution came into force in 1950' },
  { id: 'id-8', date: '30 January', name: 'Martyrs Day / Gandhi Smriti Diwas', category: 'national', description: 'Assassination of Mahatma Gandhi' },
  
  // February
  { id: 'id-9', date: '4 February', name: 'World Cancer Day', category: 'awareness', description: 'Raises awareness about cancer prevention' },
  { id: 'id-10', date: '14 February', name: 'Valentine\'s Day', category: 'international', description: 'Day of love and affection' },
  { id: 'id-11', date: '28 February', name: 'National Science Day', category: 'national', description: 'Discovery of Raman Effect by C.V. Raman' },
  
  // March
  { id: 'id-12', date: '8 March', name: 'International Women\'s Day', category: 'international', description: 'Celebrates women\'s achievements' },
  { id: 'id-13', date: '14 March', name: 'Pi Day', category: 'international', description: 'Celebrates mathematical constant π' },
  { id: 'id-14', date: '21 March', name: 'World Forestry Day', category: 'awareness', description: 'Raises awareness about forest importance' },
  { id: 'id-15', date: '22 March', name: 'World Water Day', category: 'international', description: 'Focuses on importance of freshwater' },
  { id: 'id-16', date: '23 March', name: 'Shaheed Diwas / Martyrs Day', category: 'national', description: 'Bhagat Singh, Rajguru, Sukhdev executed (1931)' },
  
  // April
  { id: 'id-17', date: '1 April', name: 'Odisha Day', category: 'national', description: 'Formation of Odisha state (1936)' },
  { id: 'id-18', date: '5 April', name: 'National Maritime Day', category: 'national', description: 'First Indian ship sailed to UK (1919)' },
  { id: 'id-19', date: '7 April', name: 'World Health Day', category: 'international', description: 'WHO founding anniversary' },
  { id: 'id-20', date: '14 April', name: 'Ambedkar Jayanti', category: 'national', description: 'Birthday of Dr. B.R. Ambedkar' },
  { id: 'id-21', date: '22 April', name: 'Earth Day', category: 'international', description: 'Environmental protection awareness' },
  
  // May
  { id: 'id-22', date: '1 May', name: 'International Labour Day / May Day', category: 'international', description: 'Celebrates workers\' rights' },
  { id: 'id-23', date: '3 May', name: 'World Press Freedom Day', category: 'international', description: 'Promotes press freedom globally' },
  { id: 'id-24', date: '11 May', name: 'National Technology Day', category: 'national', description: 'Pokhran nuclear tests (1998)' },
  { id: 'id-25', date: '21 May', name: 'Anti-Terrorism Day', category: 'national', description: 'Assassination of Rajiv Gandhi' },
  { id: 'id-26', date: '31 May', name: 'World No Tobacco Day', category: 'awareness', description: 'Discourages tobacco use' },
  
  // June
  { id: 'id-27', date: '5 June', name: 'World Environment Day', category: 'international', description: 'Environmental awareness day' },
  { id: 'id-28', date: '14 June', name: 'World Blood Donor Day', category: 'international', description: 'Thanks blood donors' },
  { id: 'id-29', date: '21 June', name: 'International Yoga Day', category: 'international', description: 'Initiated by India, adopted by UN' },
  
  // July
  { id: 'id-30', date: '1 July', name: 'National Doctors Day', category: 'national', description: 'Birthday of Dr. B.C. Roy' },
  { id: 'id-31', date: '11 July', name: 'World Population Day', category: 'international', description: 'Population issues awareness' },
  { id: 'id-32', date: '26 July', name: 'Kargil Vijay Diwas', category: 'national', description: 'Victory in Kargil War (1999)' },
  
  // August
  { id: 'id-33', date: '6 August', name: 'Hiroshima Day', category: 'memorial', description: 'Atomic bombing of Hiroshima (1945)' },
  { id: 'id-34', date: '9 August', name: 'Quit India Day / Nagasaki Day', category: 'national', description: 'Quit India Movement (1942)' },
  { id: 'id-35', date: '12 August', name: 'International Youth Day', category: 'international', description: 'Celebrates young people worldwide' },
  { id: 'id-36', date: '15 August', name: 'Independence Day', category: 'national', description: 'India gained independence (1947)' },
  { id: 'id-37', date: '29 August', name: 'National Sports Day', category: 'national', description: 'Birthday of Dhyan Chand' },
  
  // September
  { id: 'id-38', date: '5 September', name: 'Teachers Day', category: 'national', description: 'Birthday of Dr. S. Radhakrishnan' },
  { id: 'id-39', date: '8 September', name: 'International Literacy Day', category: 'international', description: 'Importance of literacy' },
  { id: 'id-40', date: '14 September', name: 'Hindi Diwas', category: 'national', description: 'Hindi adopted as official language (1949)' },
  { id: 'id-41', date: '15 September', name: 'Engineers Day', category: 'national', description: 'Birthday of M. Visvesvaraya' },
  { id: 'id-42', date: '21 September', name: 'International Day of Peace', category: 'international', description: 'Promotes peace worldwide' },
  { id: 'id-43', date: '27 September', name: 'World Tourism Day', category: 'international', description: 'Promotes tourism awareness' },
  
  // October
  { id: 'id-44', date: '2 October', name: 'Gandhi Jayanti / International Day of Non-Violence', category: 'national', description: 'Birthday of Mahatma Gandhi' },
  { id: 'id-45', date: '4 October', name: 'World Animal Day', category: 'international', description: 'Animal welfare awareness' },
  { id: 'id-46', date: '8 October', name: 'Indian Air Force Day', category: 'national', description: 'Establishment of IAF (1932)' },
  { id: 'id-47', date: '10 October', name: 'World Mental Health Day', category: 'awareness', description: 'Mental health awareness' },
  { id: 'id-48', date: '16 October', name: 'World Food Day', category: 'international', description: 'FAO founding anniversary' },
  { id: 'id-49', date: '24 October', name: 'United Nations Day', category: 'international', description: 'UN Charter came into force (1945)' },
  { id: 'id-50', date: '31 October', name: 'National Unity Day / Rashtriya Ekta Diwas', category: 'national', description: 'Birthday of Sardar Patel' },
  
  // November
  { id: 'id-51', date: '7 November', name: 'National Cancer Awareness Day', category: 'awareness', description: 'Birthday of Marie Curie' },
  { id: 'id-52', date: '11 November', name: 'National Education Day', category: 'national', description: 'Birthday of Maulana Abul Kalam Azad' },
  { id: 'id-53', date: '14 November', name: 'Children\'s Day', category: 'national', description: 'Birthday of Jawaharlal Nehru' },
  { id: 'id-54', date: '19 November', name: 'National Integration Day', category: 'national', description: 'Birthday of Indira Gandhi' },
  { id: 'id-55', date: '26 November', name: 'Constitution Day / National Law Day', category: 'national', description: 'Constitution adopted (1949)' },
  
  // December
  { id: 'id-56', date: '1 December', name: 'World AIDS Day', category: 'awareness', description: 'HIV/AIDS awareness' },
  { id: 'id-57', date: '4 December', name: 'Indian Navy Day', category: 'national', description: 'Attack on Karachi harbor (1971)' },
  { id: 'id-58', date: '6 December', name: 'Mahaparinirvan Diwas', category: 'memorial', description: 'Dr. Ambedkar\'s death anniversary' },
  { id: 'id-59', date: '7 December', name: 'Armed Forces Flag Day', category: 'national', description: 'Honors armed forces personnel' },
  { id: 'id-60', date: '10 December', name: 'Human Rights Day', category: 'international', description: 'UDHR adopted (1948)' },
  { id: 'id-61', date: '16 December', name: 'Vijay Diwas', category: 'national', description: 'Victory in 1971 war; liberation of Bangladesh' },
  { id: 'id-62', date: '22 December', name: 'National Mathematics Day', category: 'national', description: 'Birthday of Ramanujan' },
  { id: 'id-63', date: '25 December', name: 'Good Governance Day', category: 'national', description: 'Birthday of Atal Bihari Vajpayee' },
];

// ============ HELPER FUNCTIONS ============
export const getEventsByCategory = (category: string): HistoricalEvent[] => {
  return CONSTITUTIONAL_TIMELINE.filter(e => e.category === category);
};

export const getFrequentlyAskedEvents = (): HistoricalEvent[] => {
  return CONSTITUTIONAL_TIMELINE.filter(e => e.frequentlyAsked);
};

export const getDaysByCategory = (category: string): ImportantDay[] => {
  return IMPORTANT_DAYS.filter(d => d.category === category);
};

export const getDaysByMonth = (month: string): ImportantDay[] => {
  return IMPORTANT_DAYS.filter(d => d.date.includes(month));
};
