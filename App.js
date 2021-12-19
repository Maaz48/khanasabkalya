import React, { createContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import NavigationComp from "./Navigation/NavigationComp";
import { SafeAreaView } from "react-native";
export const StoreData = createContext();
export default function App() {
  const [userLoginData, setuserLoginData] = useState("");
  const [getNearestData, setgetNearestData] = useState("");
  const getUserData = (data) => {
    console.log("loginUSerData", data);
    setuserLoginData(data);
  };
  const getUserNearestData = (data) => {
    setgetNearestData(data);
  };
  const ContextApiData = {
    getUserData,
    userLoginData,
    getUserNearestData,
    getNearestData,
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StoreData.Provider value={ContextApiData}>
        <NavigationContainer>
          <PaperProvider>
            <NavigationComp />
          </PaperProvider>
        </NavigationContainer>
      </StoreData.Provider>
    </SafeAreaView>
  );
}
