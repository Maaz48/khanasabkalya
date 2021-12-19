import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Dimensions, ToastAndroid } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import haversine from "haversine";
import { ActivityIndicator } from "react-native-paper";
import { Appbar } from "react-native-paper";
import {
  auth,
  collection,
  db,
  where,
  getDocs,
  query,
  onAuthStateChanged,
  signOut,
} from "../../Firebase/firebase";
import { StoreData } from "../../App";

const UserScreen = ({ navigation }) => {
  const { getUserNearestData } = useContext(StoreData);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [shortestDistance, setshortestDistance] = useState(null);
  const [UserData, getUserData] = useState(null);
  const [loader, setloader] = useState(false);
  console.log("checking location state", location);
  let distanceKM = [];
  let branches = [
    {
      branch_name: "Aliabad",
      latitude: 24.9200172,
      longitude: 67.0612345,
    },
    {
      branch_name: "Numaish chowrangi",
      latitude: 24.8732834,
      longitude: 67.0337457,
    },
    {
      branch_name: "Saylani house phase 2",
      latitude: 24.8278999,
      longitude: 67.0688257,
    },
    {
      branch_name: "Touheed commercial",
      latitude: 24.8073692,
      longitude: 67.0357446,
    },
    {
      branch_name: "Sehar Commercial",
      latitude: 24.8138924,
      longitude: 67.0677652,
    },
    {
      branch_name: "Jinnah avenue",
      latitude: 24.8949528,
      longitude: 67.1767206,
    },
    {
      branch_name: "Johar chowrangi",
      latitude: 24.9132328,
      longitude: 67.1246195,
    },
    {
      branch_name: "Johar chowrangi 2",
      latitude: 24.9100704,
      longitude: 67.1208811,
    },
    {
      branch_name: "Hill park",
      latitude: 24.8673515,
      longitude: 67.0724497,
    },
  ];
  getUserNearestData(shortestDistance);
  console.log("array check", distanceKM, shortestDistance);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);

      const start = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      branches.map((data, index) => {
        distanceKM.push(haversine(start, data));
      });

      if (
        distanceKM[0] < distanceKM[1] &&
        distanceKM[0] < distanceKM[2] &&
        distanceKM[0] < distanceKM[3] &&
        distanceKM[0] < distanceKM[4] &&
        distanceKM[0] < distanceKM[5] &&
        distanceKM[0] < distanceKM[6] &&
        distanceKM[0] < distanceKM[7] &&
        distanceKM[0] < distanceKM[8]
      ) {
        console.log("shortest distance is", distanceKM[0]);
        setshortestDistance({
          val1: distanceKM[0],
          val2: branches[0],
          branchName: branches[0].branch_name,
        });
        console.log("nearest branch", shortestDistance);
        setloader(true);
      } else if (
        distanceKM[1] < distanceKM[0] &&
        distanceKM[1] < distanceKM[2] &&
        distanceKM[1] < distanceKM[3] &&
        distanceKM[1] < distanceKM[4] &&
        distanceKM[1] < distanceKM[5] &&
        distanceKM[1] < distanceKM[6] &&
        distanceKM[1] < distanceKM[7] &&
        distanceKM[1] < distanceKM[8]
      ) {
        console.log("shortest distance is", distanceKM[1]);
        setshortestDistance({
          val1: distanceKM[1],
          val2: branches[1],
          branchName: branches[1].branch_name,
        });
        console.log("nearest branch", shortestDistance);
        setloader(true);
      } else if (
        distanceKM[2] < distanceKM[0] &&
        distanceKM[2] < distanceKM[1] &&
        distanceKM[2] < distanceKM[3] &&
        distanceKM[2] < distanceKM[4] &&
        distanceKM[2] < distanceKM[5] &&
        distanceKM[2] < distanceKM[6] &&
        distanceKM[2] < distanceKM[7] &&
        distanceKM[2] < distanceKM[8]
      ) {
        console.log("shortest distance is", distanceKM[2]);
        setshortestDistance({
          val1: distanceKM[2],
          val2: branches[2],
          branchName: branches[2].branch_name,
        });
        console.log("nearest branch", shortestDistance);
        setloader(true);
      } else if (
        distanceKM[3] < distanceKM[0] &&
        distanceKM[3] < distanceKM[1] &&
        distanceKM[3] < distanceKM[2] &&
        distanceKM[3] < distanceKM[4] &&
        distanceKM[3] < distanceKM[5] &&
        distanceKM[3] < distanceKM[6] &&
        distanceKM[3] < distanceKM[7] &&
        distanceKM[3] < distanceKM[8]
      ) {
        console.log("shortest distance is", distanceKM[3]);
        setshortestDistance({
          val1: distanceKM[3],
          val2: branches[3],
          branchName: branches[3].branch_name,
        });
        console.log("nearest branch", shortestDistance);
        setloader(true);
      } else if (
        distanceKM[4] < distanceKM[0] &&
        distanceKM[4] < distanceKM[1] &&
        distanceKM[4] < distanceKM[2] &&
        distanceKM[4] < distanceKM[3] &&
        distanceKM[4] < distanceKM[5] &&
        distanceKM[4] < distanceKM[6] &&
        distanceKM[4] < distanceKM[7] &&
        distanceKM[4] < distanceKM[8]
      ) {
        console.log("shortest distance is", distanceKM[4]);
        setshortestDistance({
          val1: distanceKM[4],
          val2: branches[4],
          branchName: branches[4].branch_name,
        });
        console.log("nearest branch", shortestDistance);
        setloader(true);
      } else if (
        distanceKM[5] < distanceKM[0] &&
        distanceKM[5] < distanceKM[1] &&
        distanceKM[5] < distanceKM[2] &&
        distanceKM[5] < distanceKM[3] &&
        distanceKM[5] < distanceKM[4] &&
        distanceKM[5] < distanceKM[6] &&
        distanceKM[5] < distanceKM[7] &&
        distanceKM[5] < distanceKM[8]
      ) {
        console.log("shortest distance is", distanceKM[5]);
        setshortestDistance({
          val1: distanceKM[5],
          val2: branches[5],
          branchName: branches[5].branch_name,
        });
        console.log("nearest branch", shortestDistance);
        setloader(true);
      } else if (
        distanceKM[6] < distanceKM[0] &&
        distanceKM[6] < distanceKM[1] &&
        distanceKM[6] < distanceKM[2] &&
        distanceKM[6] < distanceKM[3] &&
        distanceKM[6] < distanceKM[4] &&
        distanceKM[6] < distanceKM[5] &&
        distanceKM[6] < distanceKM[7] &&
        distanceKM[6] < distanceKM[8]
      ) {
        console.log("shortest distance is", distanceKM[6]);
        setshortestDistance({
          val1: distanceKM[6],
          val2: branches[6],
          branchName: branches[6].branch_name,
        });
        console.log("nearest branch", shortestDistance);
        setloader(true);
      } else if (
        distanceKM[7] < distanceKM[0] &&
        distanceKM[7] < distanceKM[1] &&
        distanceKM[7] < distanceKM[2] &&
        distanceKM[7] < distanceKM[3] &&
        distanceKM[7] < distanceKM[4] &&
        distanceKM[7] < distanceKM[5] &&
        distanceKM[7] < distanceKM[6] &&
        distanceKM[7] < distanceKM[8]
      ) {
        console.log("shortest distance is", distanceKM[7]);
        setshortestDistance({
          val1: distanceKM[7],
          val2: branches[7],
          branchName: branches[7].branch_name,
        });
        console.log("nearest branch", shortestDistance);
        setloader(true);
      } else if (
        distanceKM[8] < distanceKM[0] &&
        distanceKM[8] < distanceKM[1] &&
        distanceKM[8] < distanceKM[2] &&
        distanceKM[8] < distanceKM[3] &&
        distanceKM[8] < distanceKM[4] &&
        distanceKM[8] < distanceKM[5] &&
        distanceKM[8] < distanceKM[6] &&
        distanceKM[8] < distanceKM[7]
      ) {
        console.log("shortest distance is", distanceKM[8]);
        setshortestDistance({
          val1: distanceKM[8],
          val2: branches[8],
          branchName: branches[8].branch_name,
        });

        setloader(true);
        console.log("nearest branch", shortestDistance);
      } else {
        console.log("error aa rha ha...");
      }
    })();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;

        const q = query(
          collection(db, "Registration"),
          where("registerUserId", "==", uid)
        );
        const querySnapshot = await getDocs(q);
        // console.log("query console", querySnapshot);

        querySnapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          getUserData(doc.data());
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
  console.log("distance km ", distanceKM);
  //   useEffect(() => {

  //   }, []);

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
      }}
    >
      {loader ? (
        <>
          <Appbar.Header
            style={{
              backgroundColor: "#8dc63f",
              width: Dimensions.get("screen").width,
              height: 120,
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
          <MapView
            style={{
              width: Dimensions.get("screen").width,
              height: Dimensions.get("screen").height,
            }}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.04,
              longitudeDelta: 0.04,
            }}
          >
            <Marker
              draggable
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              image={require("../../Asset/home.png")}
              style={{ width: 10, height: 10 }}
            />
            {branches.map((data, index) => {
              console.log("checking data", data);
              return (
                <Marker
                  coordinate={{
                    latitude: data.latitude,
                    longitude: data.longitude,
                  }}
                  key={index + 1}
                  pinColor={
                    shortestDistance !== null &&
                    shortestDistance.val2.latitude == data.latitude &&
                    shortestDistance.val2.longitude == data.longitude
                      ? "yellow"
                      : "red"
                  }
                  title={data.branch_name}
                />
              );
            })}
          </MapView>
        </>
      ) : (
        <ActivityIndicator
          animating={true}
          color="green"
          size="large"
          style={{ justifyContent: "center", alignItems: "center" }}
        />
      )}
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({});
