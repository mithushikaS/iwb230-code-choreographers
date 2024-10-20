import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ProgressBarAndroid,
  TouchableOpacity,
} from "react-native";

// Sample patient queue data
const initialQueue = [
  { id: 1, name: "Patient A" },
  { id: 2, name: "Patient B" },
  { id: 3, name: "Patient C" },
  { id: 4, name: "Patient D" },
  { id: 5, name: "You" }, // The current user
  { id: 6, name: "Patient E" },
];

// Function to get color based on the queue position
const getQueueColor = (position) => {
  if (position === 1) return "green";
  if (position <= 3) return "yellow";
  return "red";
};

const QueueStatusScreen = () => {
  const [queue, setQueue] = useState(initialQueue);
  const [userPosition, setUserPosition] = useState(5); // Starting position of the user
  const [waitTime, setWaitTime] = useState(30); // Total wait time in minutes
  const [progress, setProgress] = useState(1); // Progress bar full (1)

  // Move the user up the queue every minute and reduce the estimated wait time
  useEffect(() => {
    if (userPosition > 1) {
      const interval = setInterval(() => {
        setQueue((prevQueue) => prevQueue.slice(1)); // Remove first patient in the queue
        setUserPosition((prevPosition) => prevPosition - 1); // Move user up
        setWaitTime((prevTime) => prevTime - 5); // Reduce wait time
        setProgress((prevProgress) => prevProgress - 0.2); // Reduce progress bar
      }, 60000); // Move every minute (60000 ms)

      return () => clearInterval(interval);
    }
  }, [userPosition]);

  // Function to render each patient in the queue
  const renderPatient = ({ item, index }) => {
    const isCurrentUser = item.name === "You"; // Check if the item is the user
    return (
      <View
        style={[
          styles.patientItem,
          isCurrentUser && styles.currentUserHighlight,
        ]}
      >
        <Text style={styles.patientText}>
          {index + 1}. {item.name}
        </Text>
        {isCurrentUser && (
          <Text style={styles.queueDetails}>
            {userPosition === 1
              ? "It's your turn!"
              : `You are ${userPosition}rd in line.`}
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Queue Status</Text>

      {/* Queue List */}
      <View style={styles.queueContainer}>
        <Text style={styles.queueTitle}>Patient Queue:</Text>
        <FlatList
          data={queue}
          renderItem={renderPatient}
          keyExtractor={(item) => item.id.toString()}
          style={styles.queueList}
        />
      </View>

      {/* Current User Position */}
      <View style={styles.positionContainer}>
        <Text style={styles.positionText}>
          {userPosition === 1
            ? "It's your turn!"
            : `You are ${userPosition}rd in line.`}
        </Text>
      </View>

      {/* Estimated Wait Time */}
      <Text style={styles.estimatedWaitTime}>
        Estimated wait time: {waitTime > 0 ? waitTime : 0} minutes
      </Text>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={progress}
          color="#4caf50"
          style={styles.progressBar}
        />
        <Text style={styles.countdownText}>
          Time left: {waitTime > 0 ? waitTime : 0} minutes
        </Text>
      </View>

      {/* Circular Status Indicator */}
      <View
        style={[
          styles.statusIndicator,
          { backgroundColor: getQueueColor(userPosition) },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f7",
    padding: 20,
    alignItems: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 20,
    textAlign: "center",
  },
  queueContainer: {
    width: "100%",
    marginVertical: 20,
  },
  queueTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#555",
    textAlign: "left",
    width: "100%",
  },
  queueList: {
    width: "100%",
    marginBottom: 20,
  },
  patientItem: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  currentUserHighlight: {
    backgroundColor: "#e0f7fa",
  },
  patientText: {
    fontSize: 18,
    color: "#333",
  },
  queueDetails: {
    fontSize: 16,
    color: "#666",
  },
  positionContainer: {
    width: "100%",
    marginVertical: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  positionText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  estimatedWaitTime: {
    fontSize: 20,
    marginVertical: 20,
    color: "#444",
    textAlign: "center",
  },
  progressBarContainer: {
    width: "80%",
    marginVertical: 20,
    alignItems: "center",
  },
  progressBar: {
    height: 10,
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#d3d3d3",
  },
  countdownText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  statusIndicator: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 20,
  },
});

export default QueueStatusScreen;
