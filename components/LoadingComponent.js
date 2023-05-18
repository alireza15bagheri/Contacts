import React from "react";
import { View, ActivityIndicator } from "react-native";

const LoadingComponent = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
      }}
    >
      <ActivityIndicator size={100} color="blue" />
    </View>
  );
};

export default LoadingComponent;
