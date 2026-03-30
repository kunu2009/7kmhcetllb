# LawRanker: MH CET Law Prep Platform 📚⚖️

> The ultimate intelligent study companion for cracking **MH CET LLB** and admission to **Government Law College, Mumbai**. Built for Law, BBA/BMS, Hotel Management, and other competitive exam aspirants.

---

## 🎯 What is LawRanker?

LawRanker is a **Progressive Web App (PWA)** designed to make exam preparation efficient, personalized, and engaging. It combines AI-powered learning with offline-first access, ensuring you can study anytime, anywhere—even without internet.

### ✨ Key Features

- **🧠 AI-Powered Study Assistant** – Get instant explanations, summaries, and clarifications via Google Gemini AI
- **📊 Multi-Track Support** – Tailored content for:
  - LLB 3-Year & 5-Year (Legal Aptitude focus)
  - BBA/BMS entrance exams
  - Hotel Management entrance exams
  - General competitive exams
  
- **📖 Comprehensive Study Hub**
  - 1300+ study topics with markdown-formatted content
  - Quick revision cards with difficulty levels (Easy/Medium/Hard)
  - Formula sheets for Math
  - Legal Reasoning systematizers
  - Reading Comprehension strategies
  - English language excellence guides

- **🎯 Test Arena (Multiple Practice Modes)**
  - Classic mode: Single question practice
  - Topic mode: Focus on specific subjects
  - Mixed mode: Diverse question rotation
  - Exam mode: Full-length mock exams
  - Bank mode: Large question pools
  - Full Mock: Complete MHCET simulation

- **📈 Smart Analytics Dashboard**
  - Real-time performance insights
  - Weak point identification
  - Subject-wise trend analysis
  - Success rate tracking
  - Time management metrics

- **⚡ Weak Point Destroyer**
  - Automated weak area detection
  - Focused revision sessions
  - Retry tracking with improvement metrics
  - Mini-performance charts

- **📋 Additional Learning Tools**
  - Daily Practice challenges
  - Study Planner with timeline management
  - Quick Notes for personal annotations
  - Quick Revision checklists
  - Flashcards for rote memorization
  - Study Tips collection
  - Previous Year Questions (PYQ) 2019-2024
  - College Information Hub

- **🌙 Offline-First Experience**
  - Works without internet connection
  - Automatic service worker caching
  - Offline fallback pages
  - Resume sessions from cache

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Modern browser supporting PWA (Chrome, Edge, Firefox, Safari)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/chhed/7kmhcetllb.git
   cd 7kmhcetllb
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root:
   ```
   VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
   ```
   Get your free API key: [Google AI Studio](https://aistudio.google.com/app/apikey)

4. **Start development server:**
   ```bash
   npm run dev
   ```
   Open http://localhost:5173 in your browser

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📱 Installation as PWA

LawRanker can be installed as a native app on your device:

**Desktop (Chrome/Edge/Firefox):**
- Click the install icon (usually top-right of address bar)
- Or go to Settings → "Install LawRanker"

**iOS (Safari):**
- Tap Share → Add to Home Screen
- Tap "Add"

**Android (Chrome):**
- Tap menu (⋮) → "Install app"
- Or tap notification banner when it appears

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Runtime** | React 19.2.0 + TypeScript 5.8 |
| **Build** | Vite 6.4.1 (ultra-fast bundler) |
| **Routing** | React Router 7.9.6 |
| **UI Components** | Lucide Icons, Recharts |
| **AI Integration** | Google Generative AI (Gemini) |
| **PWA** | Native Service Workers + Web App Manifest |
| **Styling** | Tailwind CSS (dark mode included) |

---

## 📊 Project Structure

```
├── components/              # React components (19 modules)
│   ├── Dashboard.tsx       # Main learner hub
│   ├── StudyHub.tsx        # 1300+ study topics library
│   ├── TestArena.tsx       # Multi-mode practice engine
│   ├── WeakPointDestroyer.tsx
│   ├── Analytics.tsx       # Performance insights
│   ├── Layout.tsx          # Navigation & theme
│   └── ... (13 more components)
├── context/                # React Context (learner profile/progress)
├── data/                   # Content & question banks
│   ├── flashcardsData.ts
│   ├── mockTestQuestions.ts   # 5000+ MCQs
│   ├── pyqData.ts          # Previous Year Papers
│   ├── mathFormulas.ts
│   └── ... (5 more data files)
├── services/
│   └── geminiService.ts   # AI integration layer
├── public/                 # PWA assets
│   ├── sw.js              # Service worker
│   ├── manifest.webmanifest
│   ├── offline.html
│   └── pwa-icons/         # 5 icon variants
├── index.tsx              # React entry point
├── App.tsx                # Route configuration
├── types.ts               # TypeScript interfaces
└── vite.config.ts         # Build configuration
```

---

## 🎓 Exam Coverage

### MH CET LLB (3-Year)
- **Legal Aptitude**: Constitution, Torts, Contracts, Trusts, Property, Criminal Law
- **English**: Reading Comprehension, Vocabulary, Grammar
- **General Knowledge**: Current Affairs, History, Geography, Politics
- **Logical Reasoning**: Arrangements, Analytical Reasoning, Arguments

### MH CET LLB (5-Year)
- All 3-Year content plus
- Additional Legal Aptitude focus
- Deeper English proficiency requirements

### Non-Law Tracks
- **BBA/BMS**: Business English, Data Interpretation, Business Economy, Critical Reasoning
- **Hotel Management**: Hospitality GK, Business Communication, Tourism Facts
- **Other Exams**: Balanced coverage across all subjects

---

## 💡 Core Concepts

### 📌 Track-Aware Personalization
Choose your exam track during onboarding:
- `LLB_3`: Law 3-year program → 50Q Legal Aptitude focus
- `LLB_5`: Law 5-year program → Similar to 3-year
- `BBA_BMS`: Business programs → Emphasis on math, logic, business topics
- `HOTEL_MGMT`: Hotel management → Hospitality GK, communication skills
- `OTHER`: General competitive exams → Balanced curriculum

Each track filters study materials, quick starters, and practice questions accordingly.

### 🎯 AI-Powered Explanations
- Ask questions about any topic
- Get detailed explanations powered by Google Gemini
- Fallback system ensures practice continues even if AI is unavailable
- Fully offline-compatible through cached local question banks

### 📈 Progress Tracking
- Real-time learner profile in React Context
- Daily goal tracking (questions/time targets)
- Subject-wise performance metrics
- Weak point auto-detection
- Session history for analytics

---

## 🔗 Discover More

### 🌐 My Portfolio & Services
Interested in learning more? Visit my professional work:

- **Portfolio**: [www.7kc.me](https://www.7kc.me) – My complete professional profile, services, and expertise
- **Shop**: [7kc.me/shop](https://www.7kc.me/shop) – Educational resources, digital products, courses
- **Services**: [7kc.me/service](https://www.7kc.me/service) – Consulting, mentoring, custom development

---

## 📖 How to Use

### 1️⃣ **Setup Profile**
- Start with onboarding wizard
- Select exam track (Law, BBA, Hotel, etc.)
- Set exam year and daily practice goal
- Choose your learning style

### 2️⃣ **Study Strategically**
- Visit **Study Hub** for topic-specific learning
- Use **Quick Revision** cards for quick reviews
- Reference **Formula Sheets** for math formulas
- Read **Study Tips** for exam strategies

### 3️⃣ **Practice Regularly**
- **Daily Challenge**: 5-10 mins of guided practice
- **Test Arena**: Targeted topic practice or full mocks
- **Weak Point Destroyer**: Auto-focus on weak areas
- **PYQ Papers**: Solve actual previous year questions

### 4️⃣ **Track Progress**
- Check **Analytics** dashboard for trends
- Monitor weak point elimination
- Verify study time vs. target
- Adjust strategy based on insights

### 5️⃣ **Review & Improve**
- Use **Flashcards** for quick rote learning
- Take **Quick Notes** for personalized summaries
- Use **AI Mentor** for instant clarifications
- Join **Study Groups** (upcoming feature)

---

## 🚀 Roadmap (2026 & Beyond)

### Completed ✅
- [x] Multi-track onboarding and personalization
- [x] 1300+ study topics with AI explanations
- [x] 6+ practice modes (Classic, Topic, Exam, etc.)
- [x] Weak point detection and focused drills
- [x] Analytics with trend insights
- [x] PWA with offline support
- [x] Dark mode support

### In Progress 🔄
- [ ] Expand PYQ coverage to 10+ years (2015-2025)
- [ ] Advanced badge system & gamification
- [ ] Study group forums & discussion
- [ ] Voice-based practice & pronunciation coaching
- [ ] Spaced repetition algorithm

### Planned 📋
- [ ] Multi-language support (Hindi, Marathi)
- [ ] Collaborative study groups with mentors
- [ ] Real-time exam simulations
- [ ] College admission predictor
- [ ] Extended analytics with AI coaching

---

## 🤝 Contributing

Found a bug? Have a feature idea? Contributions welcome!

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is private. Contact for licensing details.

---

## 💬 Support & Feedback

- **Report Issues**: [GitHub Issues](https://github.com/chhed/7kmhcetllb/issues)
- **Suggestions**: Use the feedback feature in-app or email
- **Contact**: Visit [7kc.me/service](https://www.7kc.me/service)

---

## 🎯 Quick Links

| Feature | Path |
|---------|------|
| Study Topics | `/study` |
| Practice Tests | `/practice` |
| Performance Tracking | `/analytics` |
| Study Planner | `/planner` |
| AI Mentor | `/mentor` |
| College Info | `/colleges` |
| Previous Year Papers | `/pyq` |

---

## 🏆 Why LawRanker?

✨ **For Serious Exam Takers:**
- Scientifically-designed learning paths
- AI-powered personalized explanations
- Realistic mock exams
- Real progress tracking
- Offline-first = Never miss study time

🎯 **Built with Love by:**
[Chhед](https://www.7kc.me) – Educator, Developer, Ex-MHCET Aspirant

```
"Making exam prep simple, smart, and stress-free."
```

---

<div align="center">

**Made with ❤️ for every MHCET and competitive exam aspirant**

*Last Updated: March 30, 2026*

[→ Visit Portfolio](https://www.7kc.me) | [→ Shop](https://www.7kc.me/shop) | [→ Services](https://www.7kc.me/service)

</div>
