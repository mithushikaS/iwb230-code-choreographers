import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const handleResetPassword = () => {
    // Logic for sending reset password link to the user's email
    // Example: Call an API to send the reset link to the provided email
    console.log("Reset password link sent to:", email);
    // Navigate back to the login screen after sending the link
    navigation.navigate("SigninScreen");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Reset Password</Text>
      <Text style={styles.instruction}>
        Enter your email address to receive a reset password link.
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <TouchableOpacity
        style={styles.resetButton}
        onPress={handleResetPassword}
      >
        <Text style={styles.buttonText}>Send Reset Link</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  instruction: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  inputContainer: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 25,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  resetButton: {
    width: "100%",
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#007bff",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default ForgotPasswordScreen;