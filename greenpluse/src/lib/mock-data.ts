// Mock data for GreenPulse AI dashboard

export const mockKPIs = {
  esgScore:          { value: 82, prev: 76, unit: "/100" },
  carbonEmission:    { value: 1240, prev: 1380, unit: "tCO₂" },
  csrParticipation:  { value: 74, prev: 68, unit: "%" },
  complianceRate:    { value: 91, prev: 87, unit: "%" },
  employeeEngagement:{ value: 88, prev: 82, unit: "%" },
  totalXP:           { value: 48200, prev: 41000, unit: "XP" },
  leaderboardRank:   { value: 3, prev: 7, unit: "#" },
  departmentScore:   { value: 79, prev: 73, unit: "/100" },
};

export const mockCarbonTrend = [
  { month: "Jan", emission: 1580, target: 1400 },
  { month: "Feb", emission: 1490, target: 1380 },
  { month: "Mar", emission: 1420, target: 1350 },
  { month: "Apr", emission: 1380, target: 1320 },
  { month: "May", emission: 1310, target: 1290 },
  { month: "Jun", emission: 1280, target: 1260 },
  { month: "Jul", emission: 1240, target: 1230 },
];

export const mockDeptESG = [
  { dept: "Engineering", environmental: 85, social: 78, governance: 91 },
  { dept: "HR",          environmental: 72, social: 92, governance: 88 },
  { dept: "Finance",     environmental: 68, social: 75, governance: 95 },
  { dept: "Operations",  environmental: 61, social: 70, governance: 82 },
  { dept: "Marketing",   environmental: 79, social: 88, governance: 80 },
  { dept: "Sales",       environmental: 74, social: 83, governance: 77 },
];

export const mockCSRParticipation = [
  { name: "Joined",    value: 74, fill: "#22c55e" },
  { name: "Not Joined",value: 26, fill: "#374151" },
];

export const mockGovernance = [
  { name: "Compliant",   value: 91, fill: "#22c55e" },
  { name: "Pending",     value: 6,  fill: "#f59e0b" },
  { name: "Non-Compliant", value: 3, fill: "#ef4444" },
];

export const mockLeaderboard = [
  { rank: 1, name: "Priya Sharma",   dept: "HR",          xp: 4820, badge: "🌿", avatar: "PS" },
  { rank: 2, name: "Arjun Mehta",    dept: "Engineering", xp: 4560, badge: "⚡", avatar: "AM" },
  { rank: 3, name: "Sneha Patel",    dept: "Marketing",   xp: 4210, badge: "🌱", avatar: "SP" },
  { rank: 4, name: "Rahul Verma",    dept: "Finance",     xp: 3980, badge: "♻️", avatar: "RV" },
  { rank: 5, name: "Kavya Nair",     dept: "Operations",  xp: 3750, badge: "🌍", avatar: "KN" },
  { rank: 6, name: "Aditya Kumar",   dept: "Sales",       xp: 3540, badge: "💚", avatar: "AK" },
];

export const mockActivity = [
  { id: 1, type: "challenge",  text: "Priya completed 'Zero Plastic Week' challenge",        time: "2 min ago",  icon: "🏆" },
  { id: 2, type: "policy",     text: "Engineering team accepted Updated Data Privacy Policy", time: "15 min ago", icon: "📋" },
  { id: 3, type: "csr",        text: "Tree Plantation Drive proof approved for HR dept",      time: "1 hr ago",   icon: "🌳" },
  { id: 4, type: "carbon",     text: "Operations dept reduced emissions by 12% this month",   time: "3 hrs ago",  icon: "📉" },
  { id: 5, type: "badge",      text: "Arjun Mehta earned 'Eco Hero' badge",                  time: "5 hrs ago",  icon: "🎖️" },
  { id: 6, type: "reward",     text: "Sneha Patel redeemed Extra Leave reward (500 XP)",      time: "8 hrs ago",  icon: "🎁" },
];

export const mockChallenges = [
  {
    id: "c1", title: "Zero Plastic Week", category: "Environmental",
    difficulty: "Medium", xp: 300, deadline: "2026-07-20",
    participants: 42, completed: 18, status: "active",
  },
  {
    id: "c2", title: "Cycle to Office", category: "Environmental",
    difficulty: "Easy", xp: 150, deadline: "2026-07-31",
    participants: 68, completed: 35, status: "active",
  },
  {
    id: "c3", title: "Volunteer 3 Hours", category: "Social",
    difficulty: "Easy", xp: 200, deadline: "2026-07-25",
    participants: 55, completed: 30, status: "active",
  },
  {
    id: "c4", title: "Plant 5 Trees", category: "Environmental",
    difficulty: "Medium", xp: 400, deadline: "2026-08-10",
    participants: 29, completed: 8, status: "active",
  },
  {
    id: "c5", title: "Save 20% Electricity", category: "Environmental",
    difficulty: "Hard", xp: 600, deadline: "2026-08-01",
    participants: 15, completed: 3, status: "active",
  },
  {
    id: "c6", title: "Green Diet Challenge", category: "Social",
    difficulty: "Medium", xp: 250, deadline: "2026-07-28",
    participants: 37, completed: 22, status: "active",
  },
];

export const mockCSRActivities = [
  {
    id: "csr1", title: "Beach Cleanup Drive", category: "Environment",
    location: "Juhu Beach, Mumbai", date: "2026-07-15",
    points: 200, maxParticipants: 50, participants: 34, status: "upcoming",
  },
  {
    id: "csr2", title: "Blood Donation Camp", category: "Health",
    location: "HQ Office", date: "2026-07-08",
    points: 300, maxParticipants: 80, participants: 62, status: "completed",
  },
  {
    id: "csr3", title: "Tree Plantation Drive", category: "Environment",
    location: "Aarey Colony", date: "2026-07-22",
    points: 250, maxParticipants: 100, participants: 45, status: "upcoming",
  },
  {
    id: "csr4", title: "Education Camp", category: "Education",
    location: "Dharavi Community Center", date: "2026-07-12",
    points: 180, maxParticipants: 30, participants: 28, status: "active",
  },
];

export const mockPolicies = [
  {
    id: "p1", title: "Environmental Sustainability Policy",
    version: "v2.1", department: "All", effectiveDate: "2026-01-01",
    status: "active", accepted: 184, pending: 16, rejected: 2,
  },
  {
    id: "p2", title: "Data Privacy & Security Policy",
    version: "v3.0", department: "Engineering", effectiveDate: "2026-03-15",
    status: "active", accepted: 45, pending: 3, rejected: 0,
  },
  {
    id: "p3", title: "Code of Conduct",
    version: "v1.4", department: "All", effectiveDate: "2025-10-01",
    status: "active", accepted: 198, pending: 4, rejected: 0,
  },
  {
    id: "p4", title: "ESG Reporting Guidelines",
    version: "v1.0", department: "Finance", effectiveDate: "2026-06-01",
    status: "draft", accepted: 0, pending: 18, rejected: 0,
  },
];

export const mockDepartments = [
  "Engineering", "HR", "Finance", "Operations", "Marketing", "Sales", "Legal", "Product",
];

export const mockEmissionFactors = [
  { id: "ef1", name: "Diesel Fuel",        category: "Fuel",        co2PerUnit: 2.68, unit: "litre",  status: "active" },
  { id: "ef2", name: "Petrol Fuel",        category: "Fuel",        co2PerUnit: 2.31, unit: "litre",  status: "active" },
  { id: "ef3", name: "Grid Electricity",   category: "Electricity", co2PerUnit: 0.82, unit: "kWh",    status: "active" },
  { id: "ef4", name: "Air Travel (Short)", category: "Travel",      co2PerUnit: 0.255,unit: "km",     status: "active" },
  { id: "ef5", name: "Air Travel (Long)",  category: "Travel",      co2PerUnit: 0.195,unit: "km",     status: "active" },
  { id: "ef6", name: "Manufacturing",      category: "Industry",    co2PerUnit: 1.42, unit: "unit",   status: "active" },
];

export const mockBadges = [
  { id: "b1", name: "Green Warrior",     icon: "🌿", description: "Complete 5 environmental challenges",      earned: true,  xpRequired: 500  },
  { id: "b2", name: "Eco Hero",          icon: "⚡", description: "Reduce personal carbon footprint by 20%",  earned: true,  xpRequired: 1000 },
  { id: "b3", name: "Climate Champion",  icon: "🌍", description: "Complete all ESG training modules",        earned: false, xpRequired: 2000 },
  { id: "b4", name: "Volunteer King",    icon: "👑", description: "Participate in 10 CSR activities",         earned: false, xpRequired: 1500 },
  { id: "b5", name: "Compliance Master", icon: "📋", description: "Accept all company policies on time",      earned: true,  xpRequired: 300  },
  { id: "b6", name: "CSR Legend",        icon: "🌟", description: "Earn 5000+ XP from social activities",    earned: false, xpRequired: 5000 },
];

export const mockRewards = [
  { id: "r1", name: "Amazon Voucher ₹500",  icon: "🛒", xpCost: 500,  category: "Shopping",   stock: 20 },
  { id: "r2", name: "Movie Tickets (2)",    icon: "🎬", xpCost: 400,  category: "Experience",  stock: 15 },
  { id: "r3", name: "Coffee Coupon",        icon: "☕", xpCost: 150,  category: "Food",        stock: 50 },
  { id: "r4", name: "Extra Leave Day",      icon: "🏖️", xpCost: 1000, category: "Benefit",     stock: 5  },
  { id: "r5", name: "Gift Card ₹1000",      icon: "🎁", xpCost: 800,  category: "Shopping",   stock: 10 },
  { id: "r6", name: "Certificate of Merit", icon: "🏆", xpCost: 200,  category: "Recognition", stock: 100},
];
