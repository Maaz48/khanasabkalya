import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  ToastAndroid,
} from "react-native";
import { Avatar, Button, ActivityIndicator } from "react-native-paper";
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
} from "../../Firebase/firebase";
import ButtonComp from "../ReuseableComp/ButtonComp";
import DropdownComp from "../ReuseableComp/DropDownComp";
import InputFieldComp from "../ReuseableComp/InputFieldComp";
import * as ImagePicker from "expo-image-picker";
import { v4 } from "uuid";
import { StoreData } from "../../App";
import DatePicker from "react-native-datepicker";

const UserForm = ({ navigation }) => {
  const [loader, setloader] = useState(false);
  const { getNearestData } = useContext(StoreData);
  console.log("check context api data", getNearestData);
  const [date, setDate] = useState("09-10-2020");
  console.log("our date", date);
  /////////////get document Id to replace old data on new
  const [docId, setdocId] = useState("");
  const [fatherName, setfatherName] = useState("");
  const [cnicNo, setcnicNo] = useState("");
  const [RashanType, setRashanType] = useState("");
  const [btnloading, setbtnloading] = useState(false);
  const [familyMembers, setfamilyMembers] = useState("");
  const [contatcNo, setcontatcNo] = useState("");
  /////////////////// ASKING PERMISSION FOR IMAGE
  const [uri, setImage] = useState("");
  const [activityIndicate, setactivityIndicate] = useState(false);
  // console.log(Image);
  const user = auth.currentUser;

  //   useEffect(() => {
  //     if (user === null) {
  //       // User is signed in, see docs for a list of available properties
  //       // https://firebase.google.com/docs/reference/js/firebase.User
  //       navigation.navigate("ResturantLogin");
  //       // ...
  //     } else if (user && userLoginData.registrationCompleted === true) {
  //       // No user is signed in.
  //       navigation.navigate("ResturantmainScreen");
  //     }
  //   }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  /////////////activity indicator
  useEffect(() => {
    if (activityIndicate) {
      <ActivityIndicator
        style={{ justifyContent: "center", alignItems: "center" }}
        animating={true}
        color="#8dc63f"
      />;
      ToastAndroid.show("Waiting...", ToastAndroid.SHORT);
    }
  }, [activityIndicate]);

  //////////// get user login data
  const [loginUserData, setloginUserData] = useState("");

  ///////Uplaod Image
  const uploadImage = async () => {
    setbtnloading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setbtnloading(false);
      ToastAndroid.show("Image Uploaded", ToastAndroid.SHORT);
    }
  };

  /////////////// get user data
  useEffect(async () => {
    setloader(true);
    await onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const q = query(
          collection(db, "Registration"),
          where("registerUserId", "==", uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          setloginUserData(doc.data());
          setloader(false);
          setdocId(doc.id);
        });
      } else {
        // User is signed out
        // ...
        navigation.navigate("Login");
      }
    });
  }, []);
  // console.log("document id", docId);

  const uploadImagePath = async () => {
    setactivityIndicate(true);
    setloader(true);
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(storage, v4());
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(fileRef).then(async (url) => {
      console.log(url);

      await setDoc(doc(db, "NeedyUSERAndMANAGER", docId), {
        fname: loginUserData.fname,
        lname: loginUserData.lname,
        email: loginUserData.email,
        userImage: url,
        registerUserId: loginUserData.registerUserId,
        registrationType: "user",
        fatherName: fatherName,
        cnicNo: cnicNo,
        RashanType: RashanType,
        docId: docId,
        familyMembers: familyMembers,
        dateOfBirth: date,
        BranchName: getNearestData.branchName,
        issueDate: new Date().toDateString(),
        contactNO: contatcNo,
        expiry:
          new Date().getDate() +
          4 +
          "/" +
          (new Date().getMonth() + 1) +
          "/" +
          new Date().getFullYear(),
        status: "pending",
      })
        .then(() => {
          setbtnloading(false);
        })
        .then(() => {
          setactivityIndicate(false);
          setloader(false);

          navigation.navigate("success");

          ToastAndroid.show(
            "Your Form Has been submitted please wait We are considering Your Request...",
            ToastAndroid.LONG
          );
          console.log("done ho gya ga gorm");
        })
        .then(() => {
          Alert.alert(
            "Congratulation",
            "Your Form Has been submitted please wait We are considering Your Request"
          );
          ToastAndroid.show(
            "Your Form Has been submitted please wait We are considering Your Request...",
            ToastAndroid.LONG
          );
        });
    });
  };
  // console.log();
  return (
    <View
      style={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        // height: Dimensions.get("window").height,
        // width: Dimensions.get("window").width,
        paddingVertical: 50,
      }}
    >
      {loader ? (
        <ActivityIndicator animating={true} color="#8dc63f" size="large" />
      ) : (
        <>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar.Image size={80} source={require("../../Asset/logo.png")} />
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginVertical: 5,
                paddingHorizontal: 10,
              }}
            >
              PLEASE FILL COMPLETE FORM TO SEND YOUR RASHAN REQUEST
            </Text>
          </View>
          <ScrollView
            contentContainerStyle={{
              //   flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 20,
              width: Dimensions.get("window").width,
            }}
          >
            <View style={styles.middlePart}>
              <InputFieldComp
                //   placeholder="Enter Your First Name"
                label="First Name"
                mode="outlined"
                text={loginUserData.fname}
                // onChangeTextFunction={(text) => {
                //   setfname(text);
                // }}
                outlineClr="black"
                borderColor="#8dc63f"
                inputStateDisable={false}
              />
              <InputFieldComp
                //   placeholder="Enter Your First Name"
                label="Last Name"
                mode="outlined"
                text={loginUserData.lname}
                // onChangeTextFunction={(text) => {
                //   setfname(text);
                // }}
                outlineClr="black"
                borderColor="#8dc63f"
                inputStateDisable={false}
              />

              <InputFieldComp
                //   placeholder="Enter Your First Name"
                label="Father Name"
                mode="outlined"
                text={fatherName}
                onChangeTextFunction={(text) => {
                  setfatherName(text);
                }}
                outlineClr="black"
                borderColor="#8dc63f"
              />
              <InputFieldComp
                //   placeholder="Enter Your First Name"
                label="Email"
                mode="outlined"
                text={loginUserData.email}
                // onChangeTextFunction={(text) => {
                //   setfname(text);
                // }}
                outlineClr="black"
                borderColor="#8dc63f"
                inputStateDisable={false}
              />

              <InputFieldComp
                //   placeholder="Enter Your First Name"
                label="Enter Your CNIC NUMBER"
                mode="outlined"
                text={cnicNo}
                onChangeTextFunction={(text) => {
                  setcnicNo(text);
                }}
                outlineClr="black"
                borderColor="#8dc63f"
              />
              <InputFieldComp
                //   placeholder="Enter Your First Name"
                label="Enter Your Contact"
                mode="outlined"
                text={contatcNo}
                onChangeTextFunction={(text) => {
                  setcontatcNo(text);
                }}
                outlineClr="black"
                borderColor="#8dc63f"
              />
              <InputFieldComp
                //   placeholder="Enter Your First Name"
                label="No Of Family Members"
                mode="outlined"
                text={familyMembers}
                onChangeTextFunction={(text) => {
                  setfamilyMembers(text);
                }}
                outlineClr="black"
                borderColor="#8dc63f"
              />

              <DatePicker
                style={{
                  width: 250,
                  marginVertical: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                date={date} // Initial date from state
                mode="date" // The enum of date, datetime and time
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate="01-01-1990"
                maxDate="01-01-2019"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    //display: 'none',
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                }}
                onDateChange={(date) => {
                  setDate(date);
                }}
              />

              <DropdownComp
                pickDropdownvalue={(itemValue, itemIndex) => {
                  setRashanType(itemValue);
                  console.log(itemValue);
                }}
                selectedLanguage={RashanType}
                valueA="Monthly"
                valueB="Weekly"
                valueC="1 Day "
                valueD="2 day"
              />
              <ButtonComp
                btnValue="Upload Your Image"
                btnIcon="upload"
                btnStructure="outlined"
                onPressAction={uploadImage}
                btnColr="#8dc63f"
                btnStyle={{
                  marginVertical: 10,
                  height: 60,
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
                loadingBoleanValue={btnloading}
              />
              <ButtonComp
                btnValue="GO TO DASHBOARD"
                // btnIcon="upload"
                btnStructure="contained"
                onPressAction={uploadImagePath}
                btnColr="#8dc63f"
                btnStyle={{
                  height: 60,
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  marginVertical: 6,
                  marginBottom: 10,
                }}
              />
            </View>
          </ScrollView>
        </>
      )}
      <StatusBar style="auto" />
    </View>
  );
};

export default UserForm;

const styles = StyleSheet.create({
  middlePart: {
    paddingHorizontal: 30,
    // flex: 0.6,
    justifyContent: "center",
    alignContent: "center",
    width: Dimensions.get("window").width,
  },
});
