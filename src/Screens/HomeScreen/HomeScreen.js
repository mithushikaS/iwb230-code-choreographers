import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import profile from "../../../assets/profile6.jpg";

const HomeScreen = ({ navigation }) => {
  const userName = "John Doe"; 
  const notifications = [
    { id: "1", message: "Your appointment is confirmed for Oct 10, 2024." },
    { id: "2", message: "Reminder: Take your medication at 6 PM." },
  ];

  const appointmentDetails = {
    date: "Oct 12, 2024",
    time: "2:00 PM",
    doctor: "Dr. Smith",
    status: "Confirmed",
  };

  const actions = [
    { id: "1", name: "Book Appointment", icon: "calendar" },
    { id: "2", name: "View Queue", icon: "list" },
    { id: "3", name: "Medical Records", icon: "folder" },
    { id: "4", name: "Prescriptions", icon: "document" },
  ];

  const renderHeader = () => (
    <>
      {/* Header with User Greeting */}
      <View style={styles.header}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Hello, {userName}</Text>
          <Text style={styles.subGreetingText}>
            Welcome back to Smart Health
          </Text>
        </View>

        {/* Navigate to Profile Screen when clicked */}
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
          <Image
            source={profile} 
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Upcoming Appointment Card */}
      <View style={styles.appointmentCard}>
        <Text style={styles.appointmentTitle}>Upcoming Appointment</Text>
        <Text style={styles.appointmentInfo}>
          {appointmentDetails.date} at {appointmentDetails.time}
        </Text>
        <Text style={styles.appointmentDoctor}>
          With {appointmentDetails.doctor}
        </Text>
        <Text
          style={[
            styles.appointmentStatus,
            appointmentDetails.status === "Confirmed"
              ? styles.statusConfirmed
              : styles.statusPending,
          ]}
        >
          {appointmentDetails.status}
        </Text>
      </View>

      {/* Quick Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        {actions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={styles.actionButton}
            onPress={() => {
              if (action.name === "Book Appointment") {
                navigation.navigate("AppointmentBooking");
              } else if (action.name === "View Queue") {
                navigation.navigate("QueueStatusScreen"); 
              } else if (action.name === "Medical Records") {
                navigation.navigate("MedicalRecordsScreen"); 
              } else if (action.name === "Prescriptions") {
                navigation.navigate("PrescriptionsScreen"); 
              }
            }}
          >
            <Ionicons name={action.icon} size={24} color="#fff" />
            <Text style={styles.actionButtonText}>{action.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.notificationTitle}>Notifications</Text>
    </>
  );

  return (
    <View style={styles.container}>
      {/* FlatList handling both dynamic notifications and static content */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationCard}>
            <Text style={styles.notificationMessage}>{item.message}</Text>
          </View>
        )}
        ListHeaderComponent={renderHeader} 
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#f4f4f9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
    marginVertical: 25,
  },
  greetingContainer: {
    flexDirection: "column",
  },
  greetingText: {
    fontSize: 30,
    fontWeight: "600",
    color: "#1b1b2f",
  },
  subGreetingText: {
    fontSize: 16,
    color: "#777",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#007bff",
  },
  appointmentCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 22,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    marginBottom: 35,
  },
  appointmentTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#007bff",
  },
  appointmentInfo: {
    fontSize: 18,
    color: "#555",
    marginBottom: 8,
  },
  appointmentDoctor: {
    fontSize: 16,
    color: "#777",
    marginBottom: 8,
  },
  appointmentStatus: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
  },
  statusConfirmed: {
    color: "#28a745",
  },
  statusPending: {
    color: "#ffc107",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: "#007bff",
    width: "45%",
    paddingVertical: 22,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  actionButtonText: {
    color: "#fff",
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 15,
  },
  notificationTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1b1b2f",
  },
  notificationCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 18,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  notificationMessage: {
    fontSize: 16,
    color: "#333",
  },
});

export default HomeScreen;
