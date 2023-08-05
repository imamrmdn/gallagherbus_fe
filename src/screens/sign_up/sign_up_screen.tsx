import React from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Button as Btn,
} from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DatePicker from "react-datepicker";
import { useRegister } from "../../zustand/services/auth";

export function SignUpScreen() {
  //
  const { registerUser, erroRegister } = useRegister();

  //
  const [vPassword, setVPassword] = React.useState<boolean>(false);
  const [cPassword, setCPassword] = React.useState<boolean>(false);

  //
  const [username, setUsername] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [alamat, setAlamat] = React.useState<string>("");
  const [tgl, setTgl] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [cpassword, setcPassword] = React.useState<string>("");

  const [date, setDate] = React.useState<Date | null>(new Date());
  const [open, setOpen] = React.useState(false);

  //
  const [errMessage, setErrMessage] = React.useState<string>("");
  const [errRegister, setErrRegister] = React.useState<boolean>(false);
  const [errColor, setErrColor] = React.useState<string>("");
  const [loadButton, setLoadButton] = React.useState<boolean>(false);

  //
  const onHandleSignUp = async () => {
    Keyboard.dismiss();
    if (password !== cpassword) {
      setErrColor("red");
      setErrMessage("Password & Confirm Password Not Same");
      setErrRegister(!errRegister);
    } else if (
      username == "" ||
      email == "" ||
      alamat == "" ||
      password == ""
    ) {
      setErrColor("red");
      setErrMessage("Value Cannot be null");
      setErrRegister(!errRegister);
    } else {
      setLoadButton(true);
      registerUser({
        name: username,
        email,
        alamat,
        password,
      })
        .then((response) => {
          if (response?.success) {
            setLoadButton(false);
            setErrColor("green");
            setErrRegister(response?.success);
            setErrMessage(response?.message);
            setUsername("");
            setEmail("");
            setAlamat("");
            setPassword("");
            setcPassword("");
          }
        })
        .catch((err) => {
          setLoadButton(false);
          setErrColor("red");
          setErrRegister(true);
          setErrMessage("Upps something wrong or user already exist");
        });
    }
  };

  return (
    <>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View style={styles.centerTitle}>
            <Text style={{ textAlign: "center" }}>
              Gallagher Bus{"\n"}
              Sign Up
            </Text>
          </View>

          <TextInput
            mode="outlined"
            label="Id/Username"
            textContentType="name"
            placeholder="type your username"
            value={username}
            onChangeText={setUsername}
          />

          <View style={styles.boxInput} />
          <TextInput
            mode="outlined"
            label="Email"
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholder="type your email address"
            value={email}
            onChangeText={setEmail}
          />

          <View style={styles.boxInput} />
          <TextInput
            mode="outlined"
            label="Alamat"
            textContentType="addressCity"
            placeholder="type your alamat"
            value={alamat}
            onChangeText={setAlamat}
          />

          <View style={styles.boxInput} />
          <TextInput
            mode="outlined"
            label="Password"
            textContentType="password"
            secureTextEntry={!vPassword}
            right={
              <TextInput.Icon
                icon={vPassword ? "eye" : "eye-off"}
                onPress={() => setVPassword(!vPassword)}
              />
            }
            placeholder="type your password"
            value={password}
            onChangeText={setPassword}
          />
          <View style={styles.boxInput} />
          <TextInput
            mode="outlined"
            label="Password Confirmation"
            textContentType="password"
            secureTextEntry={!cPassword}
            right={
              <TextInput.Icon
                icon={cPassword ? "eye" : "eye-off"}
                onPress={() => setCPassword(!cPassword)}
              />
            }
            placeholder="type your password confirmation"
            value={cpassword}
            onChangeText={setcPassword}
          />
          <View style={styles.boxButton} />
          <Button
            style={styles.button}
            buttonColor="#40C0E7"
            onPress={onHandleSignUp}
            loading={loadButton}
          >
            <Text style={{ color: "white" }}>Sign Up</Text>
          </Button>
        </SafeAreaView>
      </ScrollView>
      {/* Notif */}
      <Snackbar
        style={{ backgroundColor: errColor }}
        duration={700}
        visible={errRegister}
        onDismiss={() => setErrRegister(false)}
      >
        <Text>{errMessage}</Text>
      </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: wp("5%"),
  },
  centerTitle: {
    marginTop: hp("10%"),
    marginBottom: hp("5%"),
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
