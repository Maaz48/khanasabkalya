import React, { useState, useContext } from "react";
import { StoreData } from "../../App";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { Text } from "react-native-paper";
import InputFieldComp from "../ReuseableComp/InputFieldComp";
import ButtonComp from "../ReuseableComp/ButtonComp";
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

const LoginComp = ({ navigation }) => {
  const { getUserData } = useContext(StoreData);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [BtnLoader, setBtnLoader] = useState(false);
  const [userid, setuserid] = useState(null);

  async function login() {
    await signInWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        setBtnLoader(true);
        // Signed in
        const user = userCredential.user;
        setuserid(user.uid);
        // console.log(user);
      })
      .then(() => {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const uid = user.uid;
            const q = query(
              collection(db, "Registration"),
              where("registerUserId", "==", uid)
            );
            const r = query(
              collection(db, "NeedyUSERAndMANAGER"),
              where("registerUserId", "==", uid)
            );
            const querySnapshot = await getDocs(q);
            const querySnapshotb = await getDocs(r);
            // console.log("query console", querySnapshot);
            querySnapshotb.forEach((doc) => {
              if (doc.data().registrationType == "branchManager") {
                navigation.navigate("BranchManager");
              } else {
                querySnapshot.forEach((doc) => {
                  // console.log(doc.id, " => ", doc.data());
                  getUserData(doc.data());
                  if (doc.data().status === "pending") {
                    ToastAndroid.show("Login Sucefully", ToastAndroid.SHORT);
                    navigation.navigate("UserComp");
                    // console.log("true condition matched");
                    setBtnLoader(false);
                    setEmail("");
                    setPassword("");
                  } else {
                    navigation.navigate("ApprovedUser");
                    ToastAndroid.show("Login Sucefully", ToastAndroid.SHORT);
                    // console.log("go to seller home page");
                    // console.log("another condition matched");
                    setBtnLoader(false);
                    setEmail(" ");
                    setPassword(" ");
                  }
                });
              }
            });
          } else {
            // User is signed out
            // ...
          }
        });
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
        setBtnLoader(false);
      });
  }
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
      }}
    >
      <View style={styles.upperPart}>
        <Image source={require("../../Asset/logo.png")} style={styles.logo} />
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: "bold",
            color: "#8dc63f",
          }}
        >
          LOGIN HERE
        </Text>
      </View>
      <View style={styles.middlePart}>
        <InputFieldComp
          //   placeholder="Enter Your Email"
          label="Email"
          mode="outlined"
          text={Email}
          onChangeTextFunction={(text) => {
            setEmail(text);
          }}
          borderColor="#8dc63f"
          outlineClr="black"
        />
        <InputFieldComp
          //   placeholder="Enter Your Password"
          label="Password"
          mode="outlined"
          text={Password}
          onChangeTextFunction={(text) => {
            setPassword(text);
          }}
          borderColor="#8dc63f"
          outlineClr="black"
        />
      </View>
      <View
        style={{
          width: Dimensions.get("window").width,
          paddingHorizontal: Dimensions.get("window").width / 10,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 10,
        }}
      >
        <ButtonComp
          btnValue="LOGIN"
          onPressAction={login}
          btnStructure="contained"
          loadingBoleanValue={BtnLoader}
          btnColr="#8dc63f"
          btnStyle={{
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            width: "100%",
            fontSize: 30,
            color: "white",
          }}
        />
        <ButtonComp
          btnValue="Don't Have An Account...??"
          onPressAction={() => {
            navigation.navigate("Signup");
          }}
          btnStructure="text"
          loadingBoleanValue={false}
          btnColr="#8dc63f"
          btnStyle={{
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
          }}
        />
      </View>
    </ScrollView>
  );
};

export default LoginComp;

const styles = StyleSheet.create({
  upperPart: {
    // flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
    paddingVertical: 10,
  },
  middlePart: {
    paddingHorizontal: 20,
    // flex: 0.6,
    justifyContent: "center",
    alignContent: "center",
    width: Dimensions.get("window").width,
  },

  logo: {
    height: 150,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
  },
});
