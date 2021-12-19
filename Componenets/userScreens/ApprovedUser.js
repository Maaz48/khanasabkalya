import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { ActivityIndicator } from "react-native-paper";
import QrcodeScannerComp from "./QrcodeScannerComp";
import SubmittedForm from "./SubmittedForm";
import {
  auth,
  signInWithEmailAndPassword,
  collection,
  db,
  where,
  getDocs,
  query,
  onAuthStateChanged,
} from "../../Firebase/firebase";
const ApprovedUser = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="AddNewDish"
      activeColor="white"
      // labeled={false}
      barStyle={{ backgroundColor: "#8dc63f" }}
      tabBarStyle={{ height: 80 }}
    >
      <Tab.Screen
        name="Approved Form"
        component={SubmittedForm}
        options={{
          tabBarLabel: "Your Form",
        }}
      />
      <Tab.Screen
        name="UserComp"
        component={QrcodeScannerComp}
        // component={() => {
        //   return <UserComp navigation={navigation} />;
        // }}
        options={{
          tabBarLabel: "UserProfile",
        }}
      />
    </Tab.Navigator>
  );
};

export default ApprovedUser;

const styles = StyleSheet.create({});
