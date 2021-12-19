import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { ActivityIndicator } from "react-native-paper";
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

const QrcodeScannerComp = () => {
  const [loader, setloader] = useState(true);
  const [qrcode, setqrcode] = useState("");

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
          setqrcode(doc.data().registerUserId);
          setloader(false);
          console.log("data aa gya ha", doc.data());
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
    <View style={styles.container}>
      {loader ? (
        <ActivityIndicator animating={true} color="green" size="large" />
      ) : (
        <>
          {/* <TextInput
            style={styles.input}
            onChangeText={(text) => setState({ text: text })}
            value={qrcode}
          /> */}
          <QRCode
            //QR code value
            value={qrcode ? qrcode : "NA"}
            //size of QR Code
            size={250}
            //Color of the QR Code (Optional)
            color="black"
            //Background Color of the QR Code (Optional)
            backgroundColor="white"
            //Logo of in the center of QR Code (Optional)

            //Center Logo size  (Optional)
            logoSize={30}
            //Center Logo margin (Optional)
            logoMargin={2}
            //Center Logo radius (Optional)
            logoBorderRadius={15}
            //Center Logo background (Optional)
            // logoBackgroundColor="green"
          />
        </>
      )}
    </View>
  );
};

export default QrcodeScannerComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5,
  },
});
