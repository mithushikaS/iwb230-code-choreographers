import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; 
const profile1 = require("../../../assets/profile6.jpg");

const ProfileScreen = ({ route, navigation }) => {
  const [userName, setUserName] = useState("John Doe");
  const [userEmail, setUserEmail] = useState("johndoe@example.com");
  const [userBio, setUserBio] = useState("Loving life, living in the moment.");
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150"
  );

  useEffect(() => {
    if (route.params?.updatedName) {
      setUserName(route.params.updatedName);
    }
    if (route.params?.updatedEmail) {
      setUserEmail(route.params.updatedEmail);
    }
    if (route.params?.updatedBio) {
      setUserBio(route.params.updatedBio);
    }
    if (route.params?.updatedProfileImage) {
      setProfileImage(route.params.updatedProfileImage);
    }
  }, [route.params]);

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          onPress: () => {
            alert("You have been logged out");
            navigation.navigate("SigninScreen"); 
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Clickable Profile Image */}
      <TouchableOpacity
        onPress={() => alert("Feature to update profile picture")}
      >
        <Image source={profile1} style={styles.profileImage} />
      </TouchableOpacity>

      {/* User Info */}
      <View style={styles.infoContainer}>
        <Ionicons name="person-outline" size={24} color="gray" />
        <Text style={styles.userInfoText}>{userName}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Ionicons name="mail-outline" size={24} color="gray" />
        <Text style={styles.userInfoText}>{userEmail}</Text>
      </View>

      {/* User Bio */}
      <View style={styles.bioContainer}>
        <Ionicons name="information-circle-outline" size={24} color="gray" />
        <Text style={styles.bioText}>{userBio}</Text>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity
        style={styles.editButtonContainer}
        onPress={() =>
          navigation.navigate("EditProfileScreen", {
            userName,
            userEmail,
            userBio,
            profileImage,
          })
        }
      >
        <LinearGradient
          colors={["#007bff", "#0056b3"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.editButton}
        >
          <Ionicons name="create-outline" size={20} color="#fff" />
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButtonContainer}
        onPress={handleLogout}
      >
        <LinearGradient
          colors={["#ff4d4d", "#cc0000"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.logoutButton}
        >
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f7",
    alignItems: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: "#007bff",
    marginBottom: 20,
    marginVertical: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  userInfoText: {
    fontSize: 18,
    marginLeft: 10,
    color: "#333",
    fontWeight: "bold",
  },
  bioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  bioText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#555",
    fontStyle: "italic",
  },
  editButtonContainer: {
    marginVertical: 20,
    width: "80%",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 25,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
  },
  logoutButtonContainer: {
    width: "80%",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 25,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
