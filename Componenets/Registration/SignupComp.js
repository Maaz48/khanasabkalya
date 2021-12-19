import React, { useState, useEffect } from "react";
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
  createUserWithEmailAndPassword,
  addDoc,
  collection,
  db,
} from "../../Firebase/firebase";
import { ActivityIndicator } from "react-native-paper";

const SignupComp = ({ navigation }) => {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [BtnLoader, setBtnLoader] = useState(false);

  async function signup() {
    await createUserWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        setBtnLoader(true);
        // Signed in

        const user = userCredential.user;
        // console.log(user.uid);
        let uid = user.uid;
        try {
          const docRef = addDoc(collection(db, "Registration"), {
            fname: fname,
            lname: lname,
            email: Email,
            registerUserId: user.uid,
            // registrationCompleted: false,
            registrationType: "user",
          });
          ToastAndroid.show("Successfully Signup ", ToastAndroid.SHORT);
          console.log("Document written with ID: ", docRef.id);
          setfname(" ");
          setlname(" ");
          setEmail(" ");
          setPassword(" ");
          setBtnLoader(false);
        } catch (e) {
          console.error("Error adding document: ", e);
          setBtnLoader(false);
        }
      })
      .then(() => {
        navigation.navigate("UserComp");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
        setBtnLoader(false);
        // ..
      });
  }

  useEffect(() => {
    if (BtnLoader) {
      <ActivityIndicator
        style={{ justifyContent: "center", alignItems: "center" }}
        animating={true}
        color="red"
      />;
    }
  }, [BtnLoader]);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 0,
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
          SIGN UP FOR USER
        </Text>
      </View>
      <View style={styles.middlePart}>
        <InputFieldComp
          //   placeholder="Enter Your First Name"
          label="First Name"
          mode="outlined"
          text={fname}
          onChangeTextFunction={(text) => {
            setfname(text);
          }}
          outlineClr="black"
          borderColor="#8dc63f"
        />
        <InputFieldComp
          //   placeholder="Enter Your Email"
          label="Last Name"
          mode="outlined"
          text={lname}
          onChangeTextFunction={(text) => {
            setlname(text);
          }}
          outlineClr="black"
          borderColor="#8dc63f"
        />
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
          btnValue="REGISTER AS A USER"
          onPressAction={signup}
          btnStructure="contained"
          loadingBoleanValue={BtnLoader}
          btnColr="#8dc63f"
          btnStyle={{
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            width: "90%",
          }}
        />
        <ButtonComp
          btnValue="Already Have An Account...??"
          onPressAction={() => {
            navigation.navigate("Login");
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

export default SignupComp;

const styles = StyleSheet.create({
  upperPart: {
    // flex: 0.4,
    justifyContent: "flex-end",
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
