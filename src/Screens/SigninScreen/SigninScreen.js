import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import * as Animatable from "react-native-animatable"; 
import { Picker } from "@react-native-picker/picker"; 
import { SafeAreaView } from "react-native-safe-area-context";

const AuthScreen = ({ navigation }) => {
  const [isSignUp, setIsSignUp] = useState(true); 
  const [role, setRole] = useState("Patient");

  // Navigate to HomeScreen after Log In or Sign Up
  const handleLogin = () => {
    navigation.navigate("HomeScreen");
  };

  const handleSignup = () => {
    navigation.navigate("HomeScreen");
  };

  const toggleAuthMode = () => {
    setIsSignUp((prevState) => !prevState);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>{isSignUp ? "Sign Up" : "Log In"}</Text>

      {/* Input Fields */}
      {isSignUp && (
        <View style={styles.inputContainer}>
          <Ionicons name="person" size={20} color="#666" style={styles.icon} />
          <TextInput
            placeholder="Full Name"
            style={styles.input}
            placeholderTextColor="#666"
          />
        </View>
      )}

      <View style={styles.inputContainer}>
        <Ionicons name="mail" size={20} color="#666" style={styles.icon} />
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          style={styles.input}
          placeholderTextColor="#666"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed"
          size={20}
          color="#666"
          style={styles.icon}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={styles.input}
          placeholderTextColor="#666"
        />
      </View>

      {isSignUp && (
        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry={true}
            style={styles.input}
            placeholderTextColor="#666"
          />
        </View>
      )}

      {/* Role Selection for Sign Up */}
      {isSignUp && (
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Select Role</Text>
          <Picker
            selectedValue={role}
            style={styles.picker}
            onValueChange={(itemValue) => setRole(itemValue)}
          >
            <Picker.Item label="Patient" value="Patient" />
            <Picker.Item label="Doctor" value="Doctor" />
            <Picker.Item label="Admin" value="Admin" />
          </Picker>
        </View>
      )}

      {/* Forgot Password for Log In */}
      {!isSignUp && (
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPasswordScreen")}
        >
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      )}

      {/* CTA Button */}
      <Animatable.View animation="fadeInUp" delay={500}>
        <TouchableOpacity
          style={[
            styles.ctaButton,
            isSignUp ? styles.signUpButton : styles.logInButton,
          ]}
          onPress={isSignUp ? handleSignup : handleLogin} // Navigate on press
        >
          <Text style={styles.ctaText}>{isSignUp ? "Sign Up" : "Log In"}</Text>
        </TouchableOpacity>
      </Animatable.View>

      {/* Toggle between Sign Up and Log In */}
      <TouchableOpacity onPress={toggleAuthMode}>
        <Text style={styles.toggleText}>
          {isSignUp
            ? "Already have an account? Log In"
            : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>

      {/* Social Logins */}
      <View style={styles.socialContainer}>
        <TouchableOpacity onPress={() => {}}>
          <Image
            source={require("../../../assets/google.png")} // Add a Google logo
            style={styles.socialIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <Image
            source={require("../../../assets/facebook.png")} // Add a Facebook logo
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>
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
    marginVertical: 30,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 25,
    width: "100%",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowoffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 10,
    color: "#666",
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  pickerContainer: {
    width: "100%",
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
  pickerLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: "#666",
  },
  picker: {
    height: 50,
    width: "100%",
    // borderWidth: 1,
    // borderColor: "#ccc",
  },
  forgotPassword: {
    color: "#1e90ff",
    marginBottom: 20,
    alignSelf: "flex-end",
    fontSize: 14,
    fontWeight: "500",
  },
  ctaButton: {
    width: "100%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginTop: 10,
  },
  signUpButton: {
    backgroundColor: "#28a745",
  },
  logInButton: {
    backgroundColor: "#007bff",
  },
  ctaText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  toggleText: {
    color: "#333",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  socialContainer: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "center",
  },
  socialIcon: {
    width: 50,
    height: 50,
    marginHorizontal: 15,
    borderRadius: 25,
    backgroundColor: "#fff",
    elevation: 3,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});

export default AuthScreen;
