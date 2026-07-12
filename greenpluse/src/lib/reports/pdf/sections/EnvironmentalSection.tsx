import { View, Text } from "@react-pdf/renderer";
import type { ReportKind } from "../../branding";
import { createStyles } from "../styles";
import { mockCarbonTrend, mockDeptESG, mockKPIs, mockEmissionFactors } from "@/lib/mock-data";

export function EnvironmentalSection({ kind }: { kind: ReportKind }) {
  const s = createStyles(kind);

  return (
    <View>
      <View style={s.section}>
        <Text style={s.sectionTitle}>Carbon Emissions Overview</Text>
        <View style={s.kpiRow}>
          <View style={s.kpiCard}>
            <Text style={s.kpiLabel}>Total Emissions (YTD)</Text>
            <Text style={s.kpiValue}>{mockKPIs.carbonEmission.value}</Text>
            <Text style={s.kpiUnit}>tCO₂</Text>
          </View>
          <View style={s.kpiCard}>
            <Text style={s.kpiLabel}>vs Previous Period</Text>
            <Text style={{ ...s.kpiValue, color: "#22c55e" }}>-{Math.round((1 - mockKPIs.carbonEmission.value / mockKPIs.carbonEmission.prev) * 100)}%</Text>
            <Text style={s.kpiUnit}>reduction</Text>
          </View>
          <View style={s.kpiCard}>
            <Text style={s.kpiLabel}>Compliance Rate</Text>
            <Text style={s.kpiValue}>{mockKPIs.complianceRate.value}%</Text>
            <Text style={s.kpiUnit}>regulatory</Text>
          </View>
        </View>
      </View>

      <View style={s.section}>
        <Text style={s.sectionTitle}>Monthly Carbon Trend</Text>
        <View style={s.table}>
          <View style={s.tableHeader}>
            <Text style={{ ...s.tableHeaderCell, flex: 2 }}>Month</Text>
            <Text style={s.tableHeaderCell}>Actual (tCO₂)</Text>
            <Text style={s.tableHeaderCell}>Target (tCO₂)</Text>
            <Text style={s.tableHeaderCell}>Variance</Text>
          </View>
          {mockCarbonTrend.map((row) => (
            <View key={row.month} style={s.tableRow}>
              <Text style={{ ...s.tableCell, flex: 2 }}>{row.month}</Text>
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

      <View style={s.section}>
        <Text style={s.sectionTitle}>Department Environmental Scores</Text>
        <View style={s.table}>
          <View style={s.tableHeader}>
            <Text style={{ ...s.tableHeaderCell, flex: 2 }}>Department</Text>
            <Text style={s.tableHeaderCell}>Environmental</Text>
            <Text style={s.tableHeaderCell}>Rating</Text>
          </View>
          {mockDeptESG.map((row) => (
            <View key={row.dept} style={s.tableRow}>
              <Text style={{ ...s.tableCell, flex: 2 }}>{row.dept}</Text>
              <Text style={s.tableCell}>{row.environmental}/100</Text>
              <Text style={s.tableCell}>
                {row.environmental >= 80 ? "Excellent" : row.environmental >= 60 ? "Good" : "Needs Improvement"}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={s.section}>
        <Text style={s.sectionTitle}>Emission Factors (Active)</Text>
        <View style={s.table}>
          <View style={s.tableHeader}>
            <Text style={{ ...s.tableHeaderCell, flex: 2 }}>Factor</Text>
            <Text style={s.tableHeaderCell}>Category</Text>
            <Text style={s.tableHeaderCell}>kg CO₂/unit</Text>
          </View>
          {mockEmissionFactors.map((f) => (
            <View key={f.id} style={s.tableRow}>
              <Text style={{ ...s.tableCell, flex: 2 }}>{f.name}</Text>
              <Text style={s.tableCell}>{f.category}</Text>
              <Text style={s.tableCell}>{f.co2PerUnit}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
