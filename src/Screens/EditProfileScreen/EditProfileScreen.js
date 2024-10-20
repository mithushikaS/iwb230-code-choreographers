import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EditProfileScreen = ({ route, navigation }) => {
  const { userName, userEmail } = route.params; // Receive the initial profile info from ProfileScreen

  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);

  const handleSave = () => {
    navigation.navigate("ProfileScreen", {
      updatedName: name,
      updatedEmail: email,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>

      {/* Input for Name */}
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      {/* Input for Email */}
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
      />

      {/* Save Button */}
      <Button title="Save" onPress={handleSave} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

export default EditProfileScreen;
