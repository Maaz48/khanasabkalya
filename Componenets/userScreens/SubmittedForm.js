import React, { useState, useEffect, useContext } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Alert,
  ToastAndroid,
} from "react-native";
import { Appbar } from "react-native-paper";

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
  signOut,
} from "../../Firebase/firebase";
import { ActivityIndicator } from "react-native-paper";
import { StoreData } from "../../App";

const SubmittedForm = ({ navigation }) => {
  const { getNearestData } = useContext(StoreData);
  const [UserData, getUserData] = useState(null);
  const [loader, setloader] = useState(true);
  console.log("branch name", getNearestData);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;

        const q = query(
          collection(db, "NeedyUSERAndMANAGER"),
          where("registerUserId", "==", uid)
        );
        const querySnapshot = await getDocs(q);
        // console.log("query console", querySnapshot);

        querySnapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          getUserData(doc.data());
          setloader(false);
          console.log("data aa gya ha", doc.data());
          if (doc.data().status == "Approved") {
            ToastAndroid.show(
              "Your Request Has been Approved",
              ToastAndroid.LONG
            );
          } else if (doc.data().status == "rejected") {
            ToastAndroid.show("Your Request Was Rejected", ToastAndroid.LONG);
            // navigation.navigate("Login");
          }
        });
        // ...
      } else {
        // User is signed out
        console.log("adsasdads");
        // ...
      }
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loader ? (
        <ActivityIndicator animating={true} color="#8dc63f" size="large" />
      ) : (
        <>
          <Appbar.Header
            style={{
              backgroundColor: "#8dc63f",
              width: Dimensions.get("screen").width,
              height: 40,
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Appbar.Action
              icon="logout"
              onPress={() => {
                signOut(auth)
                  .then(() => {
                    // Sign-out successful.
                    navigation.navigate("Login");

                    ToastAndroid.show("Logout Sucefully", ToastAndroid.SHORT);
                  })
                  .catch((error) => {
                    // An error happened.
                  });
              }}
            />
            <Appbar.Content
              style={{ justifyContent: "center", alignItems: "center" }}
              titleStyle={{ fontSize: 20, paddingBottom: 10 }}
              title={
                UserData !== null ? (
                  UserData.fname.toUpperCase()
                ) : (
                  <ActivityIndicator
                    size="small"
                    color="black"
                    animating={true}
                  />
                )
              }
            />
            <Appbar.Action
              icon="format-align-right"
              onPress={() => {
                navigation.navigate("form");
              }}
            />
          </Appbar.Header>
          <View
            style={{
              width: Dimensions.get("window").width,
              flex: 0.2,
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                height: 120,
                width: 150,
                justifyContent: "center",
                alignItems: "center",
              }}
              source={require("../../Asset/logo.png")}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              //   alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 28, color: "#8dc63f", marginVertical: 10 }}
            >
              USER INFORMATION
            </Text>
            <Text style={{ fontSize: 20 }}>
              NAME :{UserData.fname + " " + UserData.lname}
            </Text>
            <Text style={{ fontSize: 20, marginVertical: 5 }}>
              Father Name : {UserData.fatherName}
            </Text>
            <Text style={{ fontSize: 20, marginVertical: 5 }}>
              CNIC :{UserData.cnicNo}
            </Text>
            <Text style={{ fontSize: 20, marginVertical: 5 }}>
              Contatc No :{UserData.contactNO}
            </Text>
            <Text style={{ fontSize: 20, marginVertical: 5 }}>
              Date of issue :{UserData.issueDate}
            </Text>
            <Text style={{ fontSize: 20, marginVertical: 5 }}>
              Date Of expiry :{UserData.expiry}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "center",
              flex: 0.2,
            }}
          >
            <Text style={{ paddingBottom: 20, fontSize: 18, color: "#8dc63f" }}>
              BRANCH NAME:{UserData.BranchName}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default SubmittedForm;

const styles = StyleSheet.create({});
