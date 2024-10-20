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

const PrescriptionsScreen = ({ navigation }) => {
  // Sample data for prescriptions
  const [prescriptions, setPrescriptions] = useState([
    {
      id: "1",
      medication: "Aspirin",
      dosage: "100 mg",
      prescribedDate: "2024-10-05",
      doctor: "Dr. John Smith",
      instructions: "Take one pill after every meal.",
    },
    {
      id: "2",
      medication: "Ibuprofen",
      dosage: "200 mg",
      prescribedDate: "2024-09-20",
      doctor: "Dr. Jane Doe",
      instructions: "Take two pills twice a day.",
    },
    {
      id: "3",
      medication: "Amoxicillin",
      dosage: "500 mg",
      prescribedDate: "2024-08-15",
      doctor: "Dr. Alice Green",
      instructions: "Take one pill three times a day for 7 days.",
    },
  ]);

  // Function to handle tapping on a prescription
  const handlePrescriptionPress = (prescription) => {
    Alert.alert(
      `Prescription Details for ${prescription.medication}`,
      `Dosage: ${prescription.dosage}\nDoctor: ${prescription.doctor}\nInstructions: ${prescription.instructions}`,
      [
        {
          text: "Close",
          style: "cancel",
        },
      ]
    );
  };

  // Function to render each prescription item
  const renderPrescription = ({ item }) => (
    <TouchableOpacity
      style={styles.prescriptionItem}
      onPress={() => handlePrescriptionPress(item)}
    >
      <Text style={styles.medicationText}>{item.medication}</Text>
      <Text style={styles.dosageText}>Dosage: {item.dosage}</Text>
      <Text style={styles.dateText}>Prescribed on: {item.prescribedDate}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Your Prescriptions</Text>

      {/* FlatList to display the list of prescriptions */}
      <FlatList
        data={prescriptions}
        renderItem={renderPrescription}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.prescriptionsList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  prescriptionsList: {
    paddingBottom: 30,
  },
  prescriptionItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  medicationText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
  },
  dosageText: {
    fontSize: 16,
    color: "#333",
    marginTop: 5,
  },
  dateText: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});

export default PrescriptionsScreen;
