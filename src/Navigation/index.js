import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../Screens/SplashScreen/SplashScreen";
import SigninScreen from "../Screens/SigninScreen/SigninScreen";
import HomeScreen from "../Screens/HomeScreen";
import AppointmentBookingScreen from "../Screens/AppointmentBookingScreen";
import QueueStatusScreen from "../Screens/QueueStatusScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import EditProfileScreen from "../Screens/EditProfileScreen";
import PrescriptionsScreen from "../Screens/PrescriptionsScreen";
import MedicalRecordsScreen from "../Screens/MedicalRecordsScreen";
import ForgotPasswordScreen from "../Screens/ForgotPasswordScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="SigninScreen" component={SigninScreen} />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="AppointmentBooking"
          component={AppointmentBookingScreen}
        />
        <Stack.Screen name="QueueStatusScreen" component={QueueStatusScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
        <Stack.Screen
          name="PrescriptionsScreen"
          component={PrescriptionsScreen}
        />
        <Stack.Screen
          name="MedicalRecordsScreen"
          component={MedicalRecordsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
