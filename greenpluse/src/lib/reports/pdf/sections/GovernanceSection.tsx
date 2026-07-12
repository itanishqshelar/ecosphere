import { View, Text } from "@react-pdf/renderer";
import type { ReportKind } from "../../branding";
import { createStyles } from "../styles";
import { mockKPIs, mockDeptESG, mockPolicies } from "@/lib/mock-data";

export function GovernanceSection({ kind }: { kind: ReportKind }) {
  const s = createStyles(kind);

  return (
    <View>
      <View style={s.section}>
        <Text style={s.sectionTitle}>Governance Overview</Text>
        <View style={s.kpiRow}>
          <View style={s.kpiCard}>
            <Text style={s.kpiLabel}>Compliance Rate</Text>
            <Text style={s.kpiValue}>{mockKPIs.complianceRate.value}%</Text>
            <Text style={s.kpiUnit}>overall</Text>
          </View>
          <View style={s.kpiCard}>
            <Text style={s.kpiLabel}>vs Previous Period</Text>
            <Text style={{ ...s.kpiValue, color: "#22c55e" }}>+{mockKPIs.complianceRate.value - mockKPIs.complianceRate.prev}pp</Text>
            <Text style={s.kpiUnit}>improvement</Text>
          </View>
          <View style={s.kpiCard}>
            <Text style={s.kpiLabel}>ESG Score</Text>
            <Text style={s.kpiValue}>{mockKPIs.esgScore.value}</Text>
            <Text style={s.kpiUnit}>/100</Text>
          </View>
        </View>
      </View>

      <View style={s.section}>
        <Text style={s.sectionTitle}>Department Governance Scores</Text>
        <View style={s.table}>
          <View style={s.tableHeader}>
            <Text style={{ ...s.tableHeaderCell, flex: 2 }}>Department</Text>
            <Text style={s.tableHeaderCell}>Governance</Text>
            <Text style={s.tableHeaderCell}>Rating</Text>
          </View>
          {mockDeptESG.map((row) => (
            <View key={row.dept} style={s.tableRow}>
              <Text style={{ ...s.tableCell, flex: 2 }}>{row.dept}</Text>
              <Text style={s.tableCell}>{row.governance}/100</Text>
              <Text style={s.tableCell}>
                {row.governance >= 80 ? "Excellent" : row.governance >= 60 ? "Good" : "Needs Improvement"}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={s.section}>
        <Text style={s.sectionTitle}>Active Policies</Text>
        <View style={s.table}>
          <View style={s.tableHeader}>
            <Text style={{ ...s.tableHeaderCell, flex: 2 }}>Policy</Text>
            <Text style={s.tableHeaderCell}>Department</Text>
            <Text style={s.tableHeaderCell}>Accepted</Text>
            <Text style={s.tableHeaderCell}>Status</Text>
          </View>
          {mockPolicies.filter((p) => p.status === "active").map((p) => (
            <View key={p.id} style={s.tableRow}>
              <Text style={{ ...s.tableCell, flex: 2 }}>{p.title}</Text>
              <Text style={s.tableCell}>{p.department}</Text>
              <Text style={s.tableCell}>{p.accepted}</Text>
              <Text style={{ ...s.tableCell, color: "#22c55e" }}>{p.status}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
