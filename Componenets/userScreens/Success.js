import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Success = () => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: "20" }}>YOUR FORM HAS BEEN SUBMITTED</Text>
      <Text style={{ fontSize: "15" }}>PLEASE WAIT FOR APPROVAL</Text>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({});
