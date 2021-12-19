import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

const DropdownComp = ({
  pickDropdownvalue,
  selectedLanguage,
  valueA,
  valueB,
  valueC,
  valueD,
}) => {
  return (
    <View style={{ marginVertical: 6, width: "100%" }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          paddingVertical: 5,
          textAlign: "center",
          color: "#8dc63f",
          width: "100%",
        }}
      >
        SELECT RASHAN CATEGEORY
      </Text>
      <View style={{ borderWidth: 2, borderColor: "#D3D3D3", borderRadius: 5 }}>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={pickDropdownvalue}
        >
          <Picker.Item label={valueA} value="monthly" color="#8dc63f" />
          <Picker.Item label={valueB} color="#8dc63f" value="weekly" />
          <Picker.Item label={valueC} value="oneday" color="#8dc63f" />
          <Picker.Item label={valueD} color="#8dc63f" value="twoday" />
        </Picker>
      </View>
    </View>
  );
};

export default DropdownComp;

const styles = StyleSheet.create({});
