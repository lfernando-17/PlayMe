import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from "react";
import Routes from './Routes';
export default function App() {

  return (
    <View style = {{flex : 1}}>
      <Routes/>
    </View>
  );
}
