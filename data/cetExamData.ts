import { CourseTrack } from '../types';

export interface ExamSection {
  name: string;
  questions: number;
  marks: number;
  syllabus: string[];
}

export interface CetExamInfo {
  id: string;
  title: string;
  shortTitle: string;
  category: 'Law' | 'Management' | 'Hospitality' | 'Science' | 'General';
  mappedTrack: CourseTrack;
  examDate2026: string;
  durationMinutes: number;
  totalQuestions: number;
  totalMarks: number;
  negativeMarking: string;
  sections: ExamSection[];
  officialLinks: { label: string; url: string }[];
  appCoverage: {
    availableSections: string[];
    missingSections: string[];
    nextUp: string[];
  };
}

const CET_PORTAL = 'https://cetcell.mahacet.org/';
const CET_NOTICE = 'https://cetcell.mahacet.org/cet_landing_page_2026/';

export const CET_EXAMS: CetExamInfo[] = [
  {
    id: 'mah-llb-5y',
    title: 'MAH-LL.B 5-Year CET (BA/BBA/BMS/B.Com LL.B)',
    shortTitle: 'LLB 5-Year',
    category: 'Law',
    mappedTrack: CourseTrack.LLB5,
    examDate2026: '2026-05-05',
    durationMinutes: 120,
    totalQuestions: 120,
    totalMarks: 120,
    negativeMarking: 'No negative marking',
    sections: [
      {
        name: 'Legal Aptitude & Legal Reasoning',
        questions: 32,
        marks: 32,
        syllabus: ['Constitution basics', 'Law of Torts', 'Contracts', 'Legal maxims', 'Principle-fact reasoning']
      },
      {
        name: 'General Knowledge & Current Affairs',
        questions: 24,
        marks: 24,
        syllabus: ['National/International current affairs', 'Polity', 'History', 'Geography', 'Economy basics']
      },
      {
        name: 'Logical & Analytical Reasoning',
        questions: 32,
        marks: 32,
        syllabus: ['Statements & assumptions', 'Syllogism', 'Arrangements', 'Critical reasoning']
      },
      {
        name: 'English',
        questions: 24,
        marks: 24,
        syllabus: ['Reading comprehension', 'Vocabulary', 'Grammar', 'Usage']
      },
      {
        name: 'Basic Mathematics',
        questions: 8,
        marks: 8,
        syllabus: ['Class 10 arithmetic', 'Percentages', 'Ratio', 'Profit/Loss', 'Simple interest']
      }
    ],
    officialLinks: [
      { label: 'CET Cell Portal', url: CET_PORTAL },
      { label: '2026 CET Notices', url: CET_NOTICE }
    ],
    appCoverage: {
      availableSections: ['Legal Aptitude', 'GK + CA', 'Logical Reasoning', 'English', 'Math basics', 'Daily practice', 'Mocks'],
      missingSections: ['Dedicated LLB-5-year-only chapter path per subject', 'Official 2026 paper-wise PYQ tagging'],
      nextUp: ['Subject-wise LLB5 master roadmaps', 'More 5-year integrated law mock sets']
    }
  },
  {
    id: 'mah-llb-3y',
    title: 'MAH-LL.B 3-Year CET',
    shortTitle: 'LLB 3-Year',
    category: 'Law',
    mappedTrack: CourseTrack.LLB3,
    examDate2026: '2026-03-20',
    durationMinutes: 120,
    totalQuestions: 120,
    totalMarks: 120,
    negativeMarking: 'No negative marking',
    sections: [
      {
        name: 'Legal Aptitude & Legal Reasoning',
        questions: 24,
        marks: 24,
        syllabus: ['Constitution', 'Law of Torts', 'Contracts', 'Criminal law basics', 'Legal principles']
      },
      {
        name: 'General Knowledge & Current Affairs',
        questions: 32,
        marks: 32,
        syllabus: ['Current affairs', 'Polity', 'History', 'Civics', 'Static GK']
      },
      {
        name: 'Logical & Analytical Reasoning',
        questions: 24,
        marks: 24,
        syllabus: ['Puzzles', 'Syllogism', 'Coding-decoding', 'Critical reasoning']
      },
      {
        name: 'English',
        questions: 40,
        marks: 40,
        syllabus: ['Grammar', 'RC', 'Vocabulary', 'Sentence correction']
      }
    ],
    officialLinks: [
      { label: 'CET Cell Portal', url: CET_PORTAL },
      { label: '2026 CET Notices', url: CET_NOTICE }
    ],
    appCoverage: {
      availableSections: ['Legal Aptitude', 'GK + CA', 'Logical Reasoning', 'English', 'Mocks', 'PYQ'],
      missingSections: ['Official paper-slot wise analytics'],
      nextUp: ['More year-wise PYQ drill packs']
    }
  },
  {
    id: 'mah-bba-bms',
    title: 'MAH BBA/BMS CET',
    shortTitle: 'BBA/BMS CET',
    category: 'Management',
    mappedTrack: CourseTrack.BBA_BMS,
    examDate2026: '2026-04-18',
    durationMinutes: 90,
    totalQuestions: 100,
    totalMarks: 100,
    negativeMarking: 'No negative marking',
    sections: [
      {
        name: 'English Language',
        questions: 25,
        marks: 25,
        syllabus: ['Vocabulary', 'Grammar', 'Reading comprehension']
      },
      {
        name: 'Reasoning',
        questions: 25,
        marks: 25,
        syllabus: ['Verbal reasoning', 'Analytical reasoning', 'Arrangements']
      },
      {
        name: 'General Knowledge',
        questions: 25,
        marks: 25,
        syllabus: ['Business GK', 'Current affairs', 'Economy basics']
      },
      {
        name: 'Quantitative Aptitude',
        questions: 25,
        marks: 25,
        syllabus: ['Arithmetic', 'DI', 'Percentages', 'Profit/Loss']
      }
    ],
    officialLinks: [
      { label: 'CET Cell Portal', url: CET_PORTAL },
      { label: '2026 CET Notices', url: CET_NOTICE }
    ],
    appCoverage: {
      availableSections: ['English', 'Reasoning', 'GK', 'Math', 'DI starter topics', 'Practice modes'],
      missingSections: ['Full BBA/BMS-specific section-wise mock blueprint'],
      nextUp: ['Management interview prep layer', 'Business current affairs capsules']
    }
  },
  {
    id: 'mah-hmct',
    title: 'MAH-HM CET / Hotel Management Track',
    shortTitle: 'Hotel Mgmt CET',
    category: 'Hospitality',
    mappedTrack: CourseTrack.HOTEL_MGMT,
    examDate2026: '2026-04-25',
    durationMinutes: 90,
    totalQuestions: 100,
    totalMarks: 100,
    negativeMarking: 'No negative marking',
    sections: [
      {
        name: 'English & Communication',
        questions: 25,
        marks: 25,
        syllabus: ['Comprehension', 'Usage', 'Communication clarity']
      },
      {
        name: 'Reasoning & Aptitude',
        questions: 25,
        marks: 25,
        syllabus: ['Logical reasoning', 'Arrangements', 'Analytical thinking']
      },
      {
        name: 'Hospitality GK + CA',
        questions: 25,
        marks: 25,
        syllabus: ['Tourism', 'Hospitality terms', 'Current affairs']
      },
      {
        name: 'Numerical Ability',
        questions: 25,
        marks: 25,
        syllabus: ['Basic arithmetic', 'Percentages', 'Ratios']
      }
    ],
    officialLinks: [
      { label: 'CET Cell Portal', url: CET_PORTAL },
      { label: '2026 CET Notices', url: CET_NOTICE }
    ],
    appCoverage: {
      availableSections: ['English', 'Reasoning', 'Hospitality GK', 'Math basics', 'Daily practice'],
      missingSections: ['Hotel-management interview + GD module'],
      nextUp: ['Hospitality scenario-based mocks']
    }
  },
  {
    id: 'mah-bca-bba-bms-bbm',
    title: 'MAH BCA/BBA/BMS/BBM CET',
    shortTitle: 'BCA/BBA/BMS/BBM CET',
    category: 'Management',
    mappedTrack: CourseTrack.BBA_BMS,
    examDate2026: '2026-04-19',
    durationMinutes: 90,
    totalQuestions: 100,
    totalMarks: 100,
    negativeMarking: 'No negative marking',
    sections: [
      {
        name: 'English Language',
        questions: 25,
        marks: 25,
        syllabus: ['Vocabulary', 'Grammar', 'Comprehension']
      },
      {
        name: 'Reasoning',
        questions: 25,
        marks: 25,
        syllabus: ['Logical reasoning', 'Critical reasoning', 'Puzzles']
      },
      {
        name: 'GK & Current Affairs',
        questions: 25,
        marks: 25,
        syllabus: ['Static GK', 'Current affairs', 'Business awareness']
      },
      {
        name: 'Quantitative Aptitude',
        questions: 25,
        marks: 25,
        syllabus: ['Arithmetic', 'Percentages', 'DI basics']
      }
    ],
    officialLinks: [
      { label: 'CET Cell Portal', url: CET_PORTAL },
      { label: '2026 CET Notices', url: CET_NOTICE }
    ],
    appCoverage: {
      availableSections: ['Math', 'Reasoning', 'English', 'GK', 'Mock practice'],
      missingSections: ['Program-wise specialization tracks (BCA vs BBA)'],
      nextUp: ['BCA-specific logical + computing aptitude sets']
    }
  },
  {
    id: 'mht-cet-pcm-pcb',
    title: 'MHT-CET (PCM/PCB)',
    shortTitle: 'MHT-CET PCM/PCB',
    category: 'Science',
    mappedTrack: CourseTrack.OTHER,
    examDate2026: '2026-05-10',
    durationMinutes: 180,
    totalQuestions: 150,
    totalMarks: 200,
    negativeMarking: 'As per official subject rules',
    sections: [
      {
        name: 'Physics',
        questions: 50,
        marks: 100,
        syllabus: ['State board XI/XII aligned chapters']
      },
      {
        name: 'Chemistry',
        questions: 50,
        marks: 100,
        syllabus: ['State board XI/XII aligned chapters']
      },
      {
        name: 'Mathematics or Biology',
        questions: 50,
        marks: 100,
        syllabus: ['PCM or PCB stream specific chapters']
      }
    ],
    officialLinks: [
      { label: 'CET Cell Portal', url: CET_PORTAL },
      { label: '2026 CET Notices', url: CET_NOTICE }
    ],
    appCoverage: {
      availableSections: ['General planning and productivity tools'],
      missingSections: ['Dedicated Physics/Chemistry/Biology full syllabus modules'],
      nextUp: ['Future science-track expansion if prioritized']
    }
  },
  {
    id: 'other-cet-cell-exam',
    title: 'Other CET Cell Exams (BA, B.Com, B.Ed, etc.)',
    shortTitle: 'Other CET Cell Exams',
    category: 'General',
    mappedTrack: CourseTrack.OTHER,
    examDate2026: '2026-06-01',
    durationMinutes: 120,
    totalQuestions: 100,
    totalMarks: 100,
    negativeMarking: 'As per respective CET brochure',
    sections: [
      {
        name: 'Exam-specific sections',
        questions: 100,
        marks: 100,
        syllabus: ['Refer course brochure on CET portal for exact subject split']
      }
    ],
    officialLinks: [
      { label: 'CET Cell Portal', url: CET_PORTAL },
      { label: '2026 CET Notices', url: CET_NOTICE }
    ],
    appCoverage: {
      availableSections: ['General aptitude prep', 'Study planner', 'Daily practice'],
      missingSections: ['Course-wise full syllabus packs for every CET program'],
      nextUp: ['Add program-specific tracks based on demand']
    }
  }
];

export const getExamById = (examId: string): CetExamInfo => {
  return CET_EXAMS.find((exam) => exam.id === examId) || CET_EXAMS[0];
};

export const getDefaultExamIdByTrack = (track: CourseTrack): string => {
  const found = CET_EXAMS.find((exam) => exam.mappedTrack === track);
  return found?.id || CET_EXAMS[0].id;
};
