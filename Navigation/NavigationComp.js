import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignupComp from "../Componenets/Registration/SignupComp";
import LoginComp from "../Componenets/Registration/LoginComp";
import { StoreData } from "../App";
import UserScreen from "../Componenets/userScreens/UserScreen";
import BranchManager from "../Componenets/BranchManagerScreen/BranchManager";
import UserForm from "../Componenets/userScreens/UserForm";
import SubmittedForm from "../Componenets/userScreens/SubmittedForm";
import QrcodeScannerComp from "../Componenets/userScreens/QrcodeScannerComp";
import ApprovedUser from "../Componenets/userScreens/ApprovedUser";
import {
  auth,
  onAuthStateChanged,
  query,
  collection,
  db,
  where,
  getDocs,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  setDoc,
  doc,
} from "../Firebase/firebase";
import Success from "../Componenets/userScreens/Success";
const NavigationComp = () => {
  // const { userLoginData } = useContext(StoreData);
  // const [initialRoute, setinitialRoute] = useState("ResturantSignup");
  const user = auth.currentUser;

  // if (userLoginData.registrationCompleted === true) {
  //   setinitialRoute("ResturantmainScreen");
  //   console.log("user Online ho gya ha");
  // } else if (userLoginData.registrationCompleted === false) {
  //   setinitialRoute("ResturantRegistrationForm");
  //   console.log("user ki value false ha");
  // } else {
  //   setinitialRoute("ResturantSignup");
  // }
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="SignupComp"
      screenOptions={{ headerShown: false }}
    >
      {/* <Stack.Screen name="Login" component={LoginComp} />
      <Stack.Screen name="Signup" component={SignupComp} />
      <Stack.Screen name="UserComp" component={UserScreen} /> */}
      <Stack.Screen name="BranchManager" component={BranchManager} />
      {/* <Stack.Screen name="form" component={UserForm} />
      <Stack.Screen name="ApprovedUser" component={ApprovedUser} />
      <Stack.Screen name="success" component={Success} /> */}

      {/* <Stack.Screen name="SubmittedForm" component={SubmittedForm} />
      <Stack.Screen name="QrcodeScannerComp" component={QrcodeScannerComp} /> */}
    </Stack.Navigator>
  );
};

export default NavigationComp;

const styles = StyleSheet.create({});
