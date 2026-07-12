// ── GreenPulse AI — TypeScript Types ──────────────────────────

export type Role = "admin" | "esg_manager" | "employee";
export type Status = "active" | "inactive" | "draft" | "archived" | "completed" | "cancelled";
export type ApprovalStatus = "pending" | "approved" | "rejected";

// ── Tables ─────────────────────────────────────────────────────

export interface Department {
  id: string;
  name: string;
  created_at: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department_id: string | null;
  role: Role;
  xp: number;
  avatar: string | null;
  created_at: string;
  // joined
  department?: Department;
}

export interface EmissionFactor {
  id: string;
  name: string;
  category: string;
  co2_per_unit: number;
  unit: string;
  status: "active" | "inactive";
  created_at: string;
}

export interface CarbonTransaction {
  id: string;
  department_id: string | null;
  activity: string;
  emission_factor_id: string | null;
  quantity: number;
  unit: string;
  co2_kg: number;
  status: ApprovalStatus;
  date: string;
  created_by: string | null;
  created_at: string;
  // joined
  department?: Department;
  emission_factor?: EmissionFactor;
}

export interface EsgGoal {
  id: string;
  title: string;
  department_id: string | null;
  target_carbon: number;
  current_carbon: number;
  deadline: string;
  status: "active" | "achieved" | "failed";
  created_at: string;
  department?: Department;
}

export interface CsrActivity {
  id: string;
  title: string;
  category: string;
  description: string | null;
  location: string | null;
  date: string;
  points: number;
  max_participants: number;
  status: "upcoming" | "active" | "completed" | "cancelled";
  created_at: string;
  // computed
  participant_count?: number;
}

export interface CsrParticipation {
  id: string;
  csr_activity_id: string;
  employee_id: string;
  proof_url: string | null;
  approval_status: ApprovalStatus;
  points_earned: number;
  comments: string | null;
  completion_date: string | null;
  created_at: string;
  employee?: Employee;
  csr_activity?: CsrActivity;
}

export interface Policy {
  id: string;
  title: string;
  description: string | null;
  version: string;
  effective_date: string;
  department_id: string | null;
  status: "draft" | "active" | "archived";
  created_at: string;
  department?: Department;
  // computed
  accepted_count?: number;
  pending_count?: number;
  rejected_count?: number;
}

export interface PolicyAcknowledgement {
  id: string;
  policy_id: string;
  employee_id: string;
  status: "pending" | "accepted" | "rejected";
  acknowledged_at: string | null;
  created_at: string;
}

export interface Audit {
  id: string;
  title: string;
  department_id: string | null;
  auditor_id: string | null;
  checklist: { item: string; done: boolean }[];
  result: "pass" | "fail" | "partial" | "pending" | null;
  remarks: string | null;
  audit_date: string | null;
  created_at: string;
  department?: Department;
  auditor?: Employee;
}

export interface ComplianceIssue {
  id: string;
  title: string;
  description: string | null;
  department_id: string | null;
  owner_id: string | null;
  severity: "low" | "medium" | "high" | "critical";
  deadline: string | null;
  status: "open" | "in_progress" | "resolved" | "closed";
  resolution: string | null;
  created_at: string;
  department?: Department;
  owner?: Employee;
}

export interface Challenge {
  id: string;
  title: string;
  category: string;
  description: string | null;
  difficulty: "Easy" | "Medium" | "Hard";
  xp: number;
  deadline: string;
  evidence_required: boolean;
  status: "active" | "completed" | "cancelled";
  created_at: string;
  // computed
  participant_count?: number;
  completed_count?: number;
}

export interface ChallengeParticipation {
  id: string;
  challenge_id: string;
  employee_id: string;
  status: "joined" | "completed" | "rejected" | "pending";
  evidence_url: string | null;
  joined_at: string;
  employee?: Employee;
  challenge?: Challenge;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string | null;
  xp_required: number;
  created_at: string;
  // computed
  earned?: boolean;
  earned_at?: string;
}

export interface Reward {
  id: string;
  name: string;
  icon: string;
  xp_cost: number;
  category: string;
  stock: number;
  created_at: string;
}

export interface RewardRedemption {
  id: string;
  reward_id: string;
  employee_id: string;
  xp_spent: number;
  redeemed_at: string;
}

export interface Notification {
  id: string;
  employee_id: string | null;
  type: string;
  title: string;
  message: string;
  icon: string;
  read: boolean;
  created_at: string;
}

// ── View types ────────────────────────────────────────────────

export interface DeptESGScore {
  id: string;
  department: string;
  environmental_score: number;
  social_score: number;
  governance_score: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  xp: number;
  avatar: string | null;
  department: string;
  rank: number;
}

export interface MonthlyCarbonTrend {
  month: string;
  month_num: number;
  year: number;
  emission_tons: number;
}

// ── Dashboard KPI type ────────────────────────────────────────
export interface DashboardKPIs {
  totalCarbonTons: number;
  prevCarbonTons: number;
  csrParticipationPct: number;
  compliancePct: number;
  totalXP: number;
  esgScore: number;
  activeEmployees: number;
  activeChallenges: number;
}
