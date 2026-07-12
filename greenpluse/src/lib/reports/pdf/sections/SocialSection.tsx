import { View, Text } from "@react-pdf/renderer";
import type { ReportKind } from "../../branding";
import { createStyles } from "../styles";
import { mockKPIs, mockDeptESG, mockCSRActivities, mockLeaderboard } from "@/lib/mock-data";

export function SocialSection({ kind }: { kind: ReportKind }) {
  const s = createStyles(kind);

  return (
    <View>
      <View style={s.section}>
        <Text style={s.sectionTitle}>Social Performance Overview</Text>
        <View style={s.kpiRow}>
          <View style={s.kpiCard}>
            <Text style={s.kpiLabel}>CSR Participation</Text>
            <Text style={s.kpiValue}>{mockKPIs.csrParticipation.value}%</Text>
            <Text style={s.kpiUnit}>of employees</Text>
          </View>
          <View style={s.kpiCard}>
            <Text style={s.kpiLabel}>Employee Engagement</Text>
            <Text style={s.kpiValue}>{mockKPIs.employeeEngagement.value}%</Text>
            <Text style={s.kpiUnit}>active participation</Text>
          </View>
          <View style={s.kpiCard}>
            <Text style={s.kpiLabel}>vs Previous Period</Text>
            <Text style={{ ...s.kpiValue, color: "#22c55e" }}>+{mockKPIs.csrParticipation.value - mockKPIs.csrParticipation.prev}pp</Text>
            <Text style={s.kpiUnit}>improvement</Text>
          </View>
        </View>
      </View>

      <View style={s.section}>
        <Text style={s.sectionTitle}>Department Social Scores</Text>
        <View style={s.table}>
          <View style={s.tableHeader}>
            <Text style={{ ...s.tableHeaderCell, flex: 2 }}>Department</Text>
            <Text style={s.tableHeaderCell}>Social Score</Text>
            <Text style={s.tableHeaderCell}>Rating</Text>
          </View>
          {mockDeptESG.map((row) => (
            <View key={row.dept} style={s.tableRow}>
              <Text style={{ ...s.tableCell, flex: 2 }}>{row.dept}</Text>
              <Text style={s.tableCell}>{row.social}/100</Text>
              <Text style={s.tableCell}>
                {row.social >= 80 ? "Excellent" : row.social >= 60 ? "Good" : "Needs Improvement"}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={s.section}>
        <Text style={s.sectionTitle}>CSR Activities</Text>
        <View style={s.table}>
          <View style={s.tableHeader}>
            <Text style={{ ...s.tableHeaderCell, flex: 2 }}>Activity</Text>
            <Text style={s.tableHeaderCell}>Category</Text>
            <Text style={s.tableHeaderCell}>Participants</Text>
            <Text style={s.tableHeaderCell}>Status</Text>
          </View>
          {mockCSRActivities.map((a) => (
            <View key={a.id} style={s.tableRow}>
              <Text style={{ ...s.tableCell, flex: 2 }}>{a.title}</Text>
              <Text style={s.tableCell}>{a.category}</Text>
              <Text style={s.tableCell}>{a.participants}/{a.maxParticipants}</Text>
              <Text style={{
                ...s.tableCell,
                color: a.status === "completed" ? "#22c55e" : a.status === "active" ? "#f59e0b" : "#6b7280",
              }}>
                {a.status}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={s.section}>
        <Text style={s.sectionTitle}>Leaderboard — Top Performers</Text>
        <View style={s.table}>
          <View style={s.tableHeader}>
            <Text style={{ ...s.tableHeaderCell, flex: 0.5 }}>#</Text>
            <Text style={{ ...s.tableHeaderCell, flex: 2 }}>Name</Text>
            <Text style={s.tableHeaderCell}>Department</Text>
            <Text style={s.tableHeaderCell}>XP</Text>
          </View>
          {mockLeaderboard.slice(0, 4).map((row) => (
            <View key={row.rank} style={s.tableRow}>
              <Text style={{ ...s.tableCell, flex: 0.5 }}>{row.rank}</Text>
              <Text style={{ ...s.tableCell, flex: 2 }}>{row.name}</Text>
              <Text style={s.tableCell}>{row.dept}</Text>
              <Text style={s.tableCell}>{row.xp}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
