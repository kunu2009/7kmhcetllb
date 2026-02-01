// Math Formulas, Shortcuts, and Tricks for MH CET Law
// Covers: Percentage, Profit/Loss, SI/CI, Ratio, Time & Work, Time & Distance, Averages, etc.

export interface FormulaCategory {
  id: string;
  title: string;
  icon: string;
  formulas: Formula[];
}

export interface Formula {
  id: string;
  name: string;
  formula: string;
  explanation?: string;
  example?: string;
  shortcut?: string;
}

export const MATH_FORMULAS: FormulaCategory[] = [
  {
    id: 'percentage',
    title: 'Percentage',
    icon: '📊',
    formulas: [
      {
        id: 'pct-1',
        name: 'Basic Percentage',
        formula: 'x% of N = (x/100) × N',
        example: '20% of 500 = (20/100) × 500 = 100',
        shortcut: 'To find 10%, move decimal one place left. To find 5%, halve the 10%.'
      },
      {
        id: 'pct-2',
        name: 'Percentage Increase',
        formula: '% Increase = [(New - Old)/Old] × 100',
        example: 'Price increased from 100 to 120: [(120-100)/100] × 100 = 20%'
      },
      {
        id: 'pct-3',
        name: 'Percentage Decrease',
        formula: '% Decrease = [(Old - New)/Old] × 100',
        example: 'Price decreased from 100 to 80: [(100-80)/100] × 100 = 20%'
      },
      {
        id: 'pct-4',
        name: 'Successive Percentage Change',
        formula: 'Net % = a + b + (ab/100)',
        explanation: 'For two successive changes of a% and b%',
        example: '10% and 20% increase: 10 + 20 + (10×20)/100 = 32%',
        shortcut: 'For two equal changes: Net = 2a + (a²/100)'
      },
      {
        id: 'pct-5',
        name: 'Reverse Percentage',
        formula: 'Original = Final × (100/(100 ± change%))',
        example: 'If price after 20% increase is 600: Original = 600 × (100/120) = 500'
      },
      {
        id: 'pct-6',
        name: 'Percentage Equivalents',
        formula: '1/2=50%, 1/3=33.33%, 1/4=25%, 1/5=20%, 1/6=16.67%, 1/8=12.5%',
        shortcut: 'Memorize these fractions for quick calculation'
      }
    ]
  },
  {
    id: 'profit-loss',
    title: 'Profit & Loss',
    icon: '💰',
    formulas: [
      {
        id: 'pl-1',
        name: 'Basic Formulas',
        formula: 'Profit = SP - CP | Loss = CP - SP',
        explanation: 'SP = Selling Price, CP = Cost Price'
      },
      {
        id: 'pl-2',
        name: 'Profit/Loss Percentage',
        formula: 'Profit% = (Profit/CP) × 100 | Loss% = (Loss/CP) × 100',
        example: 'CP=100, SP=120: Profit% = (20/100) × 100 = 20%'
      },
      {
        id: 'pl-3',
        name: 'SP from CP and Profit%',
        formula: 'SP = CP × (100 + P%)/100',
        example: 'CP=400, Profit=25%: SP = 400 × 125/100 = 500'
      },
      {
        id: 'pl-4',
        name: 'CP from SP and Profit%',
        formula: 'CP = SP × 100/(100 + P%)',
        example: 'SP=600, Profit=20%: CP = 600 × 100/120 = 500'
      },
      {
        id: 'pl-5',
        name: 'Marked Price & Discount',
        formula: 'SP = MP × (100 - Discount%)/100',
        explanation: 'MP = Marked Price',
        example: 'MP=500, Discount=20%: SP = 500 × 80/100 = 400'
      },
      {
        id: 'pl-6',
        name: 'Successive Discounts',
        formula: 'Net Discount = a + b - (ab/100)',
        explanation: 'For discounts of a% and b%',
        example: 'Discounts of 10% and 20%: Net = 10 + 20 - 2 = 28%'
      },
      {
        id: 'pl-7',
        name: 'False Weight Formula',
        formula: 'Profit% = (True Weight - False Weight)/False Weight × 100',
        shortcut: 'Or: Profit% = Error/True Value × 100 when selling less'
      }
    ]
  },
  {
    id: 'simple-interest',
    title: 'Simple Interest',
    icon: '🏦',
    formulas: [
      {
        id: 'si-1',
        name: 'Simple Interest',
        formula: 'SI = (P × R × T)/100',
        explanation: 'P=Principal, R=Rate%, T=Time in years',
        example: 'P=5000, R=8%, T=3 years: SI = (5000×8×3)/100 = 1200'
      },
      {
        id: 'si-2',
        name: 'Amount',
        formula: 'A = P + SI = P(1 + RT/100)',
        example: 'P=1000, R=10%, T=2: A = 1000(1 + 20/100) = 1200'
      },
      {
        id: 'si-3',
        name: 'Principal from SI',
        formula: 'P = (SI × 100)/(R × T)',
        example: 'SI=600, R=10%, T=2: P = (600×100)/(10×2) = 3000'
      },
      {
        id: 'si-4',
        name: 'Rate from SI',
        formula: 'R = (SI × 100)/(P × T)',
        example: 'SI=450, P=3000, T=3: R = (450×100)/(3000×3) = 5%'
      },
      {
        id: 'si-5',
        name: 'Time from SI',
        formula: 'T = (SI × 100)/(P × R)',
        example: 'SI=800, P=4000, R=10%: T = (800×100)/(4000×10) = 2 years'
      },
      {
        id: 'si-6',
        name: 'Doubling Time',
        formula: 'Time to double = 100/R years',
        shortcut: 'At 10%, money doubles in 10 years; at 5%, in 20 years'
      }
    ]
  },
  {
    id: 'compound-interest',
    title: 'Compound Interest',
    icon: '📈',
    formulas: [
      {
        id: 'ci-1',
        name: 'Compound Amount',
        formula: 'A = P(1 + R/100)ⁿ',
        explanation: 'n = number of time periods',
        example: 'P=1000, R=10%, n=2: A = 1000(1.1)² = 1210'
      },
      {
        id: 'ci-2',
        name: 'Compound Interest',
        formula: 'CI = P[(1 + R/100)ⁿ - 1]',
        example: 'P=1000, R=10%, n=2: CI = 1000[(1.1)² - 1] = 210'
      },
      {
        id: 'ci-3',
        name: 'CI for 2 Years (Shortcut)',
        formula: 'CI = P × R × (200 + R)/10000',
        shortcut: 'Quick formula for 2-year CI calculation',
        example: 'P=5000, R=10%: CI = 5000 × 10 × 210/10000 = 1050'
      },
      {
        id: 'ci-4',
        name: 'Difference CI-SI for 2 Years',
        formula: 'Difference = P(R/100)²',
        example: 'P=1000, R=10%: Diff = 1000 × (0.1)² = 10'
      },
      {
        id: 'ci-5',
        name: 'Half-Yearly Compounding',
        formula: 'A = P(1 + R/200)²ⁿ',
        explanation: 'Rate halved, time periods doubled',
        shortcut: 'Quarterly: A = P(1 + R/400)⁴ⁿ'
      }
    ]
  },
  {
    id: 'ratio',
    title: 'Ratio & Proportion',
    icon: '⚖️',
    formulas: [
      {
        id: 'rat-1',
        name: 'Ratio Basics',
        formula: 'If a:b = x:y, then a/b = x/y',
        explanation: 'Ratios can be simplified like fractions'
      },
      {
        id: 'rat-2',
        name: 'Combining Ratios',
        formula: 'If a:b = 2:3 and b:c = 4:5, make b common',
        example: 'a:b = 8:12, b:c = 12:15 → a:b:c = 8:12:15',
        shortcut: 'LCM of b values, then adjust'
      },
      {
        id: 'rat-3',
        name: 'Dividing in Ratio',
        formula: 'Parts = Total × (part ratio/sum of ratios)',
        example: 'Divide 100 in 2:3: First part = 100 × 2/5 = 40'
      },
      {
        id: 'rat-4',
        name: 'Componendo-Dividendo',
        formula: 'If a/b = c/d, then (a+b)/(a-b) = (c+d)/(c-d)',
        shortcut: 'Useful when ratio of sum/difference is given'
      },
      {
        id: 'rat-5',
        name: 'Mixture Alligation',
        formula: 'Ratio = (Higher - Mean):(Mean - Lower)',
        example: 'Mix at Rs.60 and Rs.80 to get Rs.65: Ratio = 15:5 = 3:1',
        shortcut: 'Draw alligation diagram for quick solution'
      }
    ]
  },
  {
    id: 'time-work',
    title: 'Time & Work',
    icon: '⏰',
    formulas: [
      {
        id: 'tw-1',
        name: 'Basic Principle',
        formula: 'Work = Rate × Time | Rate = Work/Time',
        explanation: 'If A does work in n days, A\'s 1 day work = 1/n'
      },
      {
        id: 'tw-2',
        name: 'Combined Work',
        formula: '1/A + 1/B = 1/Together',
        example: 'A in 10 days, B in 15 days: Together = 1/(1/10 + 1/15) = 6 days',
        shortcut: 'Together = (A×B)/(A+B) days'
      },
      {
        id: 'tw-3',
        name: 'Work Equivalence',
        formula: 'M₁ × D₁ × H₁ / W₁ = M₂ × D₂ × H₂ / W₂',
        explanation: 'M=Men, D=Days, H=Hours, W=Work',
        shortcut: 'MDH/W = Constant'
      },
      {
        id: 'tw-4',
        name: 'Efficiency Ratio',
        formula: 'Efficiency ∝ 1/Time taken',
        example: 'If A is twice as efficient as B, A takes half the time'
      },
      {
        id: 'tw-5',
        name: 'Pipes & Cisterns',
        formula: 'Inlet fills, Outlet empties: Net = 1/Fill - 1/Empty',
        example: 'Fill in 6h, Empty in 8h: Net = 1/6 - 1/8 = 1/24 (fills in 24h)'
      }
    ]
  },
  {
    id: 'time-distance',
    title: 'Time, Speed & Distance',
    icon: '🚗',
    formulas: [
      {
        id: 'td-1',
        name: 'Basic Formula',
        formula: 'Distance = Speed × Time | Speed = D/T | Time = D/S',
        shortcut: 'DST Triangle: Cover what you need, remaining gives formula'
      },
      {
        id: 'td-2',
        name: 'Unit Conversion',
        formula: 'km/h to m/s: × 5/18 | m/s to km/h: × 18/5',
        example: '72 km/h = 72 × 5/18 = 20 m/s'
      },
      {
        id: 'td-3',
        name: 'Average Speed',
        formula: 'Average Speed = Total Distance / Total Time',
        shortcut: 'For equal distances: Avg = 2ab/(a+b) where a,b are speeds'
      },
      {
        id: 'td-4',
        name: 'Relative Speed (Same Direction)',
        formula: 'Relative Speed = |S₁ - S₂|',
        example: 'Two trains at 60 and 40 km/h same direction: RS = 20 km/h'
      },
      {
        id: 'td-5',
        name: 'Relative Speed (Opposite Direction)',
        formula: 'Relative Speed = S₁ + S₂',
        example: 'Two trains at 60 and 40 km/h opposite: RS = 100 km/h'
      },
      {
        id: 'td-6',
        name: 'Train Crossing',
        formula: 'Time = (L₁ + L₂) / Relative Speed',
        explanation: 'L = Length of train(s). For pole/man, only train length',
        example: 'Train 200m at 72 km/h crosses pole: T = 200/20 = 10 sec'
      },
      {
        id: 'td-7',
        name: 'Boats & Streams',
        formula: 'Downstream = B + S | Upstream = B - S',
        explanation: 'B = Boat speed in still water, S = Stream speed',
        shortcut: 'B = (D + U)/2, S = (D - U)/2'
      }
    ]
  },
  {
    id: 'average',
    title: 'Average',
    icon: '📏',
    formulas: [
      {
        id: 'avg-1',
        name: 'Basic Average',
        formula: 'Average = Sum of observations / Number of observations',
        shortcut: 'Sum = Average × Count'
      },
      {
        id: 'avg-2',
        name: 'Weighted Average',
        formula: 'WA = (w₁x₁ + w₂x₂ + ...)/(w₁ + w₂ + ...)',
        example: 'Two groups of 10 and 20 with avg 50 and 60: WA = (10×50 + 20×60)/30 = 56.67'
      },
      {
        id: 'avg-3',
        name: 'Average of First n Natural Numbers',
        formula: 'Average = (n + 1)/2',
        example: 'Avg of 1 to 50: (50+1)/2 = 25.5'
      },
      {
        id: 'avg-4',
        name: 'Average of First n Even Numbers',
        formula: 'Average = n + 1',
        example: 'Avg of first 10 even numbers: 10+1 = 11'
      },
      {
        id: 'avg-5',
        name: 'Average of First n Odd Numbers',
        formula: 'Average = n',
        example: 'Avg of first 10 odd numbers: 10'
      },
      {
        id: 'avg-6',
        name: 'Change in Average',
        formula: 'New Avg = Old Avg ± (Change/n)',
        shortcut: 'If one value changes, avg changes by change/n'
      }
    ]
  },
  {
    id: 'number-system',
    title: 'Number System',
    icon: '🔢',
    formulas: [
      {
        id: 'ns-1',
        name: 'Sum of First n Natural Numbers',
        formula: 'Sum = n(n+1)/2',
        example: 'Sum of 1 to 100: 100×101/2 = 5050'
      },
      {
        id: 'ns-2',
        name: 'Sum of First n Squares',
        formula: 'Sum = n(n+1)(2n+1)/6',
        example: 'Sum of 1² to 5²: 5×6×11/6 = 55'
      },
      {
        id: 'ns-3',
        name: 'Sum of First n Cubes',
        formula: 'Sum = [n(n+1)/2]²',
        shortcut: 'Sum of cubes = (Sum of numbers)²'
      },
      {
        id: 'ns-4',
        name: 'Divisibility by 4',
        formula: 'Last 2 digits divisible by 4',
        example: '1324: 24÷4=6, so divisible'
      },
      {
        id: 'ns-5',
        name: 'Divisibility by 8',
        formula: 'Last 3 digits divisible by 8',
        example: '13256: 256÷8=32, so divisible'
      },
      {
        id: 'ns-6',
        name: 'Divisibility by 11',
        formula: '(Sum of odd position digits) - (Sum of even position) = 0 or ÷11',
        example: '1364: (1+6)-(3+4) = 0, divisible by 11'
      },
      {
        id: 'ns-7',
        name: 'HCF × LCM',
        formula: 'HCF × LCM = Product of two numbers',
        shortcut: 'For multiple numbers, this doesn\'t hold'
      }
    ]
  },
  {
    id: 'geometry',
    title: 'Geometry',
    icon: '📐',
    formulas: [
      {
        id: 'geo-1',
        name: 'Triangle Area',
        formula: 'Area = ½ × base × height | Area = √[s(s-a)(s-b)(s-c)] (Heron)',
        explanation: 's = semi-perimeter = (a+b+c)/2'
      },
      {
        id: 'geo-2',
        name: 'Circle',
        formula: 'Area = πr² | Circumference = 2πr',
        shortcut: 'π ≈ 22/7 or 3.14'
      },
      {
        id: 'geo-3',
        name: 'Rectangle',
        formula: 'Area = l × b | Perimeter = 2(l + b) | Diagonal = √(l² + b²)'
      },
      {
        id: 'geo-4',
        name: 'Square',
        formula: 'Area = a² | Perimeter = 4a | Diagonal = a√2'
      },
      {
        id: 'geo-5',
        name: 'Cube',
        formula: 'Volume = a³ | TSA = 6a² | Diagonal = a√3'
      },
      {
        id: 'geo-6',
        name: 'Cylinder',
        formula: 'Volume = πr²h | CSA = 2πrh | TSA = 2πr(r+h)'
      },
      {
        id: 'geo-7',
        name: 'Cone',
        formula: 'Volume = ⅓πr²h | Slant = √(r²+h²) | CSA = πrl'
      },
      {
        id: 'geo-8',
        name: 'Sphere',
        formula: 'Volume = (4/3)πr³ | Surface Area = 4πr²'
      }
    ]
  }
];

// Quick calculation tricks
export const CALCULATION_TRICKS = [
  {
    id: 'trick-1',
    title: 'Multiplication by 11',
    trick: 'For two-digit: Put sum of digits in middle. Ex: 24×11 = 2(2+4)4 = 264',
  },
  {
    id: 'trick-2',
    title: 'Square of numbers ending in 5',
    trick: 'n5² = n(n+1) followed by 25. Ex: 35² = 3×4|25 = 1225',
  },
  {
    id: 'trick-3',
    title: 'Percentage to Fraction',
    trick: '12.5%=1/8, 16.67%=1/6, 33.33%=1/3, 37.5%=3/8, 62.5%=5/8, 66.67%=2/3, 87.5%=7/8',
  },
  {
    id: 'trick-4',
    title: 'Multiplication by 5',
    trick: 'Divide by 2, multiply by 10. Ex: 48×5 = 480/2 = 240',
  },
  {
    id: 'trick-5',
    title: 'Multiplication by 25',
    trick: 'Divide by 4, multiply by 100. Ex: 48×25 = 4800/4 = 1200',
  },
  {
    id: 'trick-6',
    title: 'Finding squares near 50',
    trick: '(50±n)² = 2500 ± 100n + n². Ex: 52² = 2500 + 200 + 4 = 2704',
  },
];

export default MATH_FORMULAS;
