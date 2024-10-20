import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MedicalReportsScreen = ({ navigation }) => {
  // Sample data for medical reports
  const [medicalReports, setMedicalReports] = useState([
    {
      id: "1",
      reportName: "Blood Test",
      reportDate: "2024-09-30",
      doctor: "Dr. John Smith",
      description: "Complete Blood Count (CBC) test report.",
    },
    {
      id: "2",
      reportName: "X-Ray",
      reportDate: "2024-08-25",
      doctor: "Dr. Jane Doe",
      description: "Chest X-Ray report showing clear lungs.",
    },
    {
      id: "3",
      reportName: "MRI Scan",
      reportDate: "2024-07-20",
      doctor: "Dr. Alice Green",
      description: "MRI scan of the knee showing no significant abnormalities.",
    },
  ]);

  // Function to handle tapping on a medical report
  const handleReportPress = (report) => {
    Alert.alert(
      `Report: ${report.reportName}`,
      `Date: ${report.reportDate}\nDoctor: ${report.doctor}\nDescription: ${report.description}`,
      [
        {
          text: "Close",
          style: "cancel",
        },
      ]
    );
  };

  // Function to render each medical report item
  const renderReport = ({ item }) => (
    <TouchableOpacity
      style={styles.reportItem}
      onPress={() => handleReportPress(item)}
    >
      <Text style={styles.reportNameText}>{item.reportName}</Text>
      <Text style={styles.reportDateText}>Date: {item.reportDate}</Text>
      <Text style={styles.doctorText}>Doctor: {item.doctor}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Your Medical Reports</Text>

      {/* FlatList to display the list of medical reports */}
      <FlatList
        data={medicalReports}
        renderItem={renderReport}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.reportsList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  reportsList: {
    paddingBottom: 30,
  },
  reportItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  reportNameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
  },
  reportDateText: {
    fontSize: 16,
    color: "#333",
    marginTop: 5,
  },
  doctorText: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});

export default MedicalReportsScreen;
