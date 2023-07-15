//state
import { useState } from "react";

//component
import { Text, StyleSheet, View, Image, SafeAreaView } from "react-native";

//thir party
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export function SignInScreen() {
  //
  const navigation = useNavigation() as any;

  const onHandleSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* Logo app & Logo text */}
        <View style={styles.centerLogo}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../../../assets/icon_app.png")}
            />
          </View>
          <Text style={styles.textLogo}>Gallagher Bus App</Text>
        </View>

        {/* Form input id & password */}
        <TextInput
          mode="outlined"
          label="Id"
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
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            marginTop: hp("2%"),
          }}
        >
          <Text>sudah punya akun?</Text>
          <Text
            style={{ textDecorationLine: "underline" }}
            onPress={onHandleSignUp}
          >
            {" "}
            Sign Up
          </Text>
        </View>

        <View style={styles.boxButton} />

        <Button
          style={styles.button}
          buttonColor="#40C0E7"
          onPress={() => console.log("Sign In")}
        >
          <Text style={{ color: "white" }}>Sign In</Text>
        </Button>

        <View style={styles.boxDescApp} />

        <Text
          style={{
            textAlign: "center",
            fontSize: wp("3.5%"),
            fontWeight: "300",
          }}
        >
          Aplikasi penjadwalan bus{"\n"}
          dengan algoritma greedy{"\n"}
          version 0.1
        </Text>

        {/* Sign in button */}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: wp("5%"),
    // flex: 1,
  },
  boxInput: {
    padding: hp("1%"),
  },
  boxButton: {
    padding: hp("2%"),
  },
  boxDescApp: {
    padding: hp("5%"),
  },
  centerLogo: {
    marginTop: hp("10%"),
    alignItems: "center",
  },
  logoContainer: {
    height: wp("40%"),
    width: wp("40%"),
    borderRadius: wp("30%"),
    overflow: "hidden",
    borderColor: "#40C0E7",
    borderWidth: 3,
  },
  logo: {
    height: wp("40%"),
    width: wp("40%"),
    borderRadius: wp("30%"),
  },
  textLogo: {
    marginTop: hp("3%"),
    marginBottom: hp("5%"),
    fontWeight: "500",
  },
  button: {
    height: hp("6%"),
    justifyContent: "center",
  },
});
