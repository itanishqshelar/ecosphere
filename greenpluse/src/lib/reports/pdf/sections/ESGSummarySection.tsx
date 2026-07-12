import { View, Text } from "@react-pdf/renderer";
import type { ReportKind } from "../../branding";
import { createStyles } from "../styles";
import { mockKPIs, mockDeptESG, mockCarbonTrend } from "@/lib/mock-data";

export function ESGSummarySection({ kind }: { kind: ReportKind }) {
  const s = createStyles(kind);

  return (
    <View>
      <View style={s.section}>
        <Text style={s.sectionTitle}>ESG Scorecard</Text>
        <View style={s.kpiRow}>
          <View style={s.kpiCard}>
            <Text style={s.kpiLabel}>Overall ESG Score</Text>
            <Text style={s.kpiValue}>{mockKPIs.esgScore.value}</Text>
            <Text style={s.kpiUnit}>/100 — {mockKPIs.esgScore.value >= 80 ? "Excellent" : mockKPIs.esgScore.value >= 60 ? "Good" : "Needs Improvement"}</Text>
          </View>
          <View style={s.kpiCard}>
            <Text style={s.kpiLabel}>Carbon (YTD)</Text>
            <Text style={s.kpiValue}>{mockKPIs.carbonEmission.value}</Text>
            <Text style={s.kpiUnit}>tCO₂</Text>
          </View>
          <View style={s.kpiCard}>
            <Text style={s.kpiLabel}>CSR Participation</Text>
            <Text style={s.kpiValue}>{mockKPIs.csrParticipation.value}%</Text>
            <Text style={s.kpiUnit}>of employees</Text>
          </View>
          <View style={s.kpiCard}>
            <Text style={s.kpiLabel}>Compliance</Text>
            <Text style={s.kpiValue}>{mockKPIs.complianceRate.value}%</Text>
            <Text style={s.kpiUnit}>rate</Text>
          </View>
        </View>
      </View>

      <View style={s.section}>
        <Text style={s.sectionTitle}>Department ESG Breakdown</Text>
        <View style={s.table}>
          <View style={s.tableHeader}>
            <Text style={{ ...s.tableHeaderCell, flex: 1.5 }}>Department</Text>
            <Text style={s.tableHeaderCell}>Environmental</Text>
            <Text style={s.tableHeaderCell}>Social</Text>
            <Text style={s.tableHeaderCell}>Governance</Text>
            <Text style={s.tableHeaderCell}>Average</Text>
          </View>
          {mockDeptESG.map((row) => {
            const avg = Math.round((row.environmental + row.social + row.governance) / 3);
            return (
              <View key={row.dept} style={s.tableRow}>
                <Text style={{ ...s.tableCell, flex: 1.5 }}>{row.dept}</Text>
                <Text style={s.tableCell}>{row.environmental}</Text>
                <Text style={s.tableCell}>{row.social}</Text>
                <Text style={s.tableCell}>{row.governance}</Text>
                <Text style={{ ...s.tableCell, fontWeight: "bold" }}>{avg}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={s.section}>
        <Text style={s.sectionTitle}>Carbon Trend Summary</Text>
        <View style={s.table}>
          <View style={s.tableHeader}>
            <Text style={{ ...s.tableHeaderCell, flex: 2 }}>Period</Text>
            <Text style={s.tableHeaderCell}>Emissions (tCO₂)</Text>
            <Text style={s.tableHeaderCell}>Target</Text>
            <Text style={s.tableHeaderCell}>Status</Text>
          </View>
          {mockCarbonTrend.slice(-4).map((row) => (
            <View key={row.month} style={s.tableRow}>
              <Text style={{ ...s.tableCell, flex: 2 }}>{row.month} 2026</Text>
              <Text style={s.tableCell}>{row.emission}</Text>
              <Text style={s.tableCell}>{row.target}</Text>
              <Text style={{
                ...s.tableCell,
                color: row.emission <= row.target ? "#22c55e" : "#ef4444",
              }}>
                {row.emission <= row.target ? "On Track" : "Over"}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
