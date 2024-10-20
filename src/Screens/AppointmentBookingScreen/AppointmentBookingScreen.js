import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker"; // For Date Picker
import { SafeAreaView } from "react-native-safe-area-context";

const profile1 = require("../../../assets/profile6.jpg");
const profile2 = require("../../../assets/profile2.jpg");
const profile3 = require("../../../assets/profile3.jpg");
const profile4 = require("../../../assets/profile4.jpg");
const profile5 = require("../../../assets/profile5.jpg");

const AppointmentBookingScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const doctors = [
    {
      id: "1",
      name: "Dr. John Smith",
      specialization: "Cardiologist",
      rating: 4.5,
      availability: "9:00 AM - 5:00 PM",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "2",
      name: "Dr. Jane Doe",
      specialization: "Dermatologist",
      rating: 4.2,
      availability: "10:00 AM - 4:00 PM",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "3",
      name: "Dr. Emily Williams",
      specialization: "Pediatrician",
      rating: 4.8,
      availability: "8:00 AM - 2:00 PM",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "4",
      name: "Dr. Sarah Johnson",
      specialization: "Oncologist",
      rating: 4.6,
      availability: "1:00 PM - 6:00 PM",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "5",
      name: "Dr. Michael Brown",
      specialization: "Neurologist",
      rating: 4.4,
      availability: "12:00 PM - 5:00 PM",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "6",
      name: "Dr. Olivia Davis",
      specialization: "Gastroenterologist",
      rating: 4.7,
      availability: "9:00 AM - 3:00 PM",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "7",
      name: "Dr. David Wilson",
      specialization: "Orthopedic",
      rating: 4.5,
      availability: "10:00 AM - 6:00 PM",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "8",
      name: "Dr. Ava Martinez",
      specialization: "Psychiatrist",
      rating: 4.9,
      availability: "11:00 AM - 4:00 PM",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "9",
      name: "Dr. James Lee",
      specialization: "Endocrinologist",
      rating: 4.3,
      availability: "9:00 AM - 1:00 PM",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "10",
      name: "Dr. Isabella Clark",
      specialization: "Ophthalmologist",
      rating: 4.8,
      availability: "8:00 AM - 2:00 PM",
      image: "https://via.placeholder.com/50",
    },
  ];

  const availableTimeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "2:00 PM",
    "3:00 PM",
    "5:00 PM",
  ];

  const handleDateChange = (event, date) => {
    if (date) {
      setSelectedDate(date);
      setShowPicker(false);
      //console.log("Selected date:", date);
    }
    // setSelectedDate(date || selectedDate);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleConfirmAppointment = () => {
    if (selectedDoctor && selectedTime) {
      alert(
        `Appointment confirmed with ${
          selectedDoctor.name
        } on ${selectedDate.toDateString()} at ${selectedTime}`
      );
    } else {
      alert("Please select a doctor and time slot.");
    }
  };

  // Filtering the doctors list based on search query
  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.availability.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <FlatList
      ListHeaderComponent={
        <SafeAreaView>
          {/* Search Bar */}
          <View style={styles.searchBarContainer}>
            <Ionicons name="search" size={24} color="#888" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
          </View>

          {/* Doctor List */}
          <FlatList
            data={filteredDoctors}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.doctorCard}>
                <Image source={profile1} style={styles.doctorImage} />
                <View style={styles.doctorInfo}>
                  <Text style={styles.doctorName}>{item.name}</Text>
                  <Text style={styles.specialization}>
                    {item.specialization}
                  </Text>
                  <Text style={styles.rating}>Rating: {item.rating} ★</Text>
                  <Text style={styles.availability}>
                    Available: {item.availability}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.bookButton}
                  onPress={() => setSelectedDoctor(item)} // Update selected doctor here
                >
                  <Text style={styles.bookButtonText}>Book Appointment</Text>
                </TouchableOpacity>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            style={styles.doctorList}
          />

          {/* Date Picker */}
          {/* <Text style={styles.sectionTitle}>Select Appointment Date</Text>
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="calendar"
            onChange={handleDateChange}
            style={styles.datePicker}
          /> */}
          <TouchableOpacity
            style={styles.datePicker}
            onPress={() => setShowPicker(true)}
          >
            <Text style={styles.datePickerButtonText}>Select Date</Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="calendar"
              onChange={handleDateChange}
              style={styles.datePicker}
            />
          )}

          {/* Time Slot Selector */}
          <Text style={styles.sectionTitle}>Select Time Slot</Text>
          <View style={styles.timeSlotContainer}>
            {availableTimeSlots.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlot,
                  selectedTime === time ? styles.selectedTimeSlot : null,
                ]}
                onPress={() => handleTimeSelect(time)}
              >
                <Text
                  style={[
                    styles.timeSlotText,
                    selectedTime === time ? styles.selectedTimeSlotText : null,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Confirmation Summary */}

          {/* <View style={styles.confirmationSummary}>
            <Text style={styles.summaryText}>
              Date: {selectedDate.toDateString()}
            </Text>
            <Text style={styles.summaryText}>
              Time: {selectedTime || "Select a time slot"}
            </Text>
          </View> */}

          <View style={styles.confirmationSummary}>
            <Text style={styles.summaryText}>
              Doctor:{" "}
              {selectedDoctor ? selectedDoctor.name : "No doctor selected"}
            </Text>
            <Text style={styles.summaryText}>
              Date: {selectedDate.toDateString()}
            </Text>
            <Text style={styles.summaryText}>
              Time: {selectedTime || "Select a time slot"}
            </Text>
          </View>
        </SafeAreaView>
      }
      //Confirm Appointment Button
      ListFooterComponent={
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmAppointment}
        >
          <Text style={styles.confirmButtonText}>Confirm Appointment</Text>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f9fc",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    marginTop: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
    color: "#4f4f4f",
    fontWeight: "400",
  },
  doctorList: {
    marginBottom: 20,
  },
  doctorCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
    elevation: 1,
    shadowColor: "#cfd8dc",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
  },
  specialization: {
    fontSize: 14,
    color: "#2980b9",
    marginVertical: 2,
  },
  rating: {
    fontSize: 14,
    color: "#007bff",
  },
  availability: {
    fontSize: 14,
    color: "#28a745",
  },
  bookButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  bookButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#34495e",
  },
  datePicker: {
    backgroundColor: "#ecf0f1",
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  datePickerButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  timeSlotContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  timeSlot: {
    backgroundColor: "#ecf0f1",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedTimeSlot: {
    backgroundColor: "#007bff",
  },
  timeSlotText: {
    fontSize: 16,
    color: "#2c3e50",
  },
  selectedTimeSlotText: {
    color: "#ffffff",
  },
  confirmationSummary: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: "#dfe6e9", 
    borderWidth: 1,
  },
  summaryText: {
    fontSize: 16,
    color: "green", 
    marginBottom: 5,
  },
  confirmButton: {
    backgroundColor: "#28a745",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  flatListHeader: {
    marginBottom: 15,
  },
});

export default AppointmentBookingScreen;
