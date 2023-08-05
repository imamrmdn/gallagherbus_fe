import React from "react";
import { Text, StyleSheet, View, Image, SafeAreaView } from "react-native";

//thir party
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TextInput, Button, Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useLogin } from "../../zustand/services/auth";

export function SignInScreen() {
  //
  const navigation = useNavigation() as any;

  const { loginUser } = useLogin();

  //
  const [name, setName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [secure, setSecure] = React.useState<boolean>(false);

  //
  const [errLogin, setErrLogin] = React.useState<boolean>(false);
  const [errMsg, setErrMsg] = React.useState<string>("");
  const [loadBtn, setLoadBtn] = React.useState<boolean>(false);

  //
  const onHandleSignIn = () => {
    setLoadBtn(true);
    if (name === "" || password === "") {
      setLoadBtn(false);
      setErrLogin(true);
      setErrMsg("Name and Password cannot be null");
    }

    if (name !== "" && password !== "") {
      loginUser({ name, password })
        .then((response) => {
          setLoadBtn(false);

          if (response?.success) {
            console.log(response?.message);
          }
          //setName('')
          //setPassword('')
        })
        .catch((err) => {
          setLoadBtn(false);
          setErrLogin(true);
          setErrMsg("Something wrong or user not found");
        });
    }
  };

  const onHandleToSignUp = () => {
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
          label="Id/Username"
          placeholder="type your id/username"
          textContentType="emailAddress"
          value={name}
          onChangeText={setName}
        />

        <View style={styles.boxInput} />

        <TextInput
          mode="outlined"
          label="Password"
          placeholder="type your password"
          textContentType="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!secure}
          right={
            <TextInput.Icon
              icon={secure ? "eye" : "eye-off"}
              onPress={() => setSecure(!secure)}
            />
          }
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
            onPress={onHandleToSignUp}
          >
            {" "}
            Sign Up
          </Text>
        </View>

        <View style={styles.boxButton} />

        <Button
          style={styles.button}
          buttonColor="#40C0E7"
          loading={loadBtn}
          onPress={() => onHandleSignIn()}
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
      <Snackbar
        style={{ backgroundColor: "red" }}
        duration={700}
        visible={errLogin}
        onDismiss={() => setErrLogin(false)}
      >
        <Text>{errMsg}</Text>
      </Snackbar>
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
