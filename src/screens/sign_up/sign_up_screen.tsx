import { Text, StyleSheet, View, Image, SafeAreaView } from "react-native";
import { TextInput, Button } from "react-native-paper";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export function SignUpScreen() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.centerTitle}>
          <Text style={{ textAlign: "center" }}>
            Gallagher Bus{"\n"}
            Sign Up
          </Text>
        </View>
        <TextInput
          mode="outlined"
          label="Id"
          placeholder="Type something"
          right={<TextInput.Affix text="/100" />}
        />

        <View style={styles.boxInput} />
        <TextInput
          mode="outlined"
          label="Email"
          placeholder="Type something"
          right={<TextInput.Affix text="/100" />}
        />

        <View style={styles.boxInput} />
        <TextInput
          mode="outlined"
          label="Password"
          placeholder="Type something"
          right={<TextInput.Affix text="/100" />}
        />
        <View style={styles.boxInput} />
        <TextInput
          mode="outlined"
          label="Password Confirmation"
          placeholder="Type something"
          right={<TextInput.Affix text="/100" />}
        />
        <View style={styles.boxButton} />
        <Button
          style={styles.button}
          buttonColor="#40C0E7"
          onPress={() => console.log("Sign Up")}
        >
          <Text style={{ color: "white" }}>Sign Up</Text>
        </Button>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: wp("5%"),
  },
  centerTitle: {
    marginTop: hp("10%"),
    marginBottom: hp("10%"),
    alignItems: "center",
  },
  boxInput: {
    padding: hp("1%"),
  },
  boxButton: {
    padding: hp("2%"),
  },
  button: {
    height: hp("6%"),
    justifyContent: "center",
  },
});
