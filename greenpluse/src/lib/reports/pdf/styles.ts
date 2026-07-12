import { StyleSheet } from "@react-pdf/renderer";
import { REPORT_ACCENTS, type ReportKind } from "../branding";

export function createStyles(kind: ReportKind) {
  const accent = REPORT_ACCENTS[kind];
  return StyleSheet.create({
    page: {
      padding: 40,
      fontFamily: "Helvetica",
      fontSize: 10,
      color: "#1f2937",
    },
    header: {
      marginBottom: 24,
      borderBottomWidth: 3,
      borderBottomColor: accent,
      paddingBottom: 12,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
    headerLeft: {
      flexDirection: "column",
    },
    headerRight: {
      flexDirection: "column",
      alignItems: "flex-end",
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      color: "#111827",
    },
    subtitle: {
      fontSize: 10,
      color: "#6b7280",
      marginTop: 2,
    },
    brandName: {
      fontSize: 9,
      color: accent,
      fontWeight: "bold",
    },
    confidentiality: {
      fontSize: 7,
      color: "#9ca3af",
      marginTop: 2,
    },
    section: {
      marginBottom: 18,
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: "bold",
      color: "#111827",
      marginBottom: 6,
      borderBottomWidth: 1,
      borderBottomColor: "#e5e7eb",
      paddingBottom: 4,
    },
    kpiRow: {
      flexDirection: "row",
      gap: 10,
      marginBottom: 12,
    },
    kpiCard: {
      flex: 1,
      padding: 10,
      borderWidth: 1,
      borderColor: "#e5e7eb",
      borderRadius: 4,
    },
    kpiLabel: {
      fontSize: 8,
      color: "#6b7280",
      marginBottom: 2,
    },
    kpiValue: {
      fontSize: 16,
      fontWeight: "bold",
      color: accent,
    },
    kpiUnit: {
      fontSize: 8,
      color: "#9ca3af",
    },
    table: {
      marginTop: 4,
    },
    tableHeader: {
      flexDirection: "row",
      backgroundColor: "#f3f4f6",
      borderBottomWidth: 1,
      borderBottomColor: "#d1d5db",
      paddingVertical: 4,
      paddingHorizontal: 6,
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#e5e7eb",
      paddingVertical: 4,
      paddingHorizontal: 6,
    },
    tableCell: {
      flex: 1,
      fontSize: 9,
      color: "#374151",
    },
    tableHeaderCell: {
      flex: 1,
      fontSize: 9,
      fontWeight: "bold",
      color: "#111827",
    },
    footer: {
      position: "absolute",
      bottom: 20,
      left: 40,
      right: 40,
      borderTopWidth: 1,
      borderTopColor: "#e5e7eb",
      paddingTop: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      fontSize: 7,
      color: "#9ca3af",
    },
    pageNumber: {
      position: "absolute",
      bottom: 20,
      right: 40,
      fontSize: 7,
      color: "#9ca3af",
    },
    badge: {
      fontSize: 8,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 10,
      color: "white",
    },
    badgeGreen: { backgroundColor: "#22c55e" },
    badgeAmber: { backgroundColor: "#f59e0b" },
    badgeRed: { backgroundColor: "#ef4444" },
    badgeGray: { backgroundColor: "#6b7280" },
    disclaimer: {
      marginTop: 20,
      padding: 10,
      backgroundColor: "#f9fafb",
      borderRadius: 4,
      fontSize: 7,
      color: "#9ca3af",
      textAlign: "center",
    },
    spacer: {
      height: 10,
    },
  });
}
