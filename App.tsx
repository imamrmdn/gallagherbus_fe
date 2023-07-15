/**
 * 2023
 * Gallagher Bus App
 * Universitas Persada Indonesia Y.A.I
 * NIM: 1644190068
 * NAMA: Adam Muhammad Galib
 */

import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import { enGB, registerTranslation } from "react-native-paper-dates";
import * as ScreenOrientation from "expo-screen-orientation";

import Routes from "./src/routes/routes";

registerTranslation("en-GB", enGB);

export default function App() {
  // lock orientation
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }, []);

  return (
    <>
      <StatusBar backgroundColor={"#40C0E7"} />
      <Routes />
    </>
  );
}
