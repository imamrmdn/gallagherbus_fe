import React from "react";

import { Text, StyleSheet, View, Image, SafeAreaView } from "react-native";
import {
  Button,
  List,
  PaperProvider,
  Portal,
  Modal,
  TextInput,
  Divider,
  Snackbar,
} from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useLogin } from "../../zustand/services/auth";
import { Loading } from "../../components/loading";
import { useEditProfile, useGetProfile } from "../../zustand/services/profile";

export function ProfileScreen() {
  //
  const { token, logoutUser } = useLogin();
  const { stateGetProfile, getProfile } = useGetProfile();
  const { editProfile } = useEditProfile();

  const [visible, setVisible] = React.useState<boolean>(false);
  const [editNama, setEditNama] = React.useState<string>("");
  const [editEmail, setEditEmail] = React.useState<string>("");

  //
  const [msgEditProfile, setMsgEditProfile] = React.useState<string>();
  const [msg, setMsg] = React.useState<boolean>(false);
  const [colorMsg, setColorMsg] = React.useState<string>("");
  const [loadBtn, setLoadBtn] = React.useState<boolean>(false);

  //
  const showModal = () => {
    setEditNama(stateGetProfile?.name);
    setEditEmail(stateGetProfile?.email);
    setVisible(true);
  };
  const hideModal = () => setVisible(false);

  //
  const onHandleEditProfile = () => {
    setLoadBtn(true);
    editProfile({ nama: editNama, email: editEmail }, token)
      .then((response) => {
        setLoadBtn(false);
        setColorMsg("green");
        setMsgEditProfile(response?.message);
        setMsg(true);
        setVisible(false);
        getProfile(token);
      })
      .catch((err) => {
        setLoadBtn(false);
        setColorMsg("red");
        setMsgEditProfile("Error Edit Profile");
        setMsg(true);
      });
  };

  React.useEffect(() => {
    if (token) {
      getProfile(token);
    }
  }, []);

  return (
    <>
      <PaperProvider>
        <View style={{ margin: wp("5%") }}>
          {!stateGetProfile?.name ? (
            <Loading />
          ) : (
            <>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 10,
                  padding: wp("5%"),
                  height: hp("25%"),
                  shadowColor: "grey",
                }}
              >
                <List.Item
                  title={stateGetProfile?.name}
                  left={(props) => <List.Icon {...props} icon="account" />}
                />
                <List.Item
                  title={stateGetProfile?.email}
                  left={(props) => <List.Icon {...props} icon="email" />}
                />

                <Button style={{ marginTop: hp("3%") }} onPress={showModal}>
                  <Text style={{ fontSize: wp("3.5%"), color: "#40C0E7" }}>
                    Edit Profile
                  </Text>
                </Button>
                <Portal>
                  <Modal
                    visible={visible}
                    onDismiss={hideModal}
                    contentContainerStyle={{
                      backgroundColor: "white",
                      padding: wp("5%"),
                      margin: wp("5%"),
                    }}
                  >
                    <Text style={{ marginBottom: hp("1%") }}>Edit Profile</Text>
                    <Divider style={{ marginBottom: hp("3%") }} />
                    <TextInput
                      style={{ height: hp("4%") }}
                      mode="outlined"
                      label="Id/Username"
                      placeholder="type your username"
                      value={editNama}
                      onChangeText={setEditNama}
                    />
                    <TextInput
                      style={{ height: hp("4%") }}
                      mode="outlined"
                      label="Email"
                      placeholder="type your email"
                      value={editEmail}
                      onChangeText={setEditEmail}
                    />
                    <Button
                      style={{ marginTop: hp("3%") }}
                      onPress={onHandleEditProfile}
                      loading={loadBtn}
                    >
                      <Text style={{ fontSize: wp("3.5%"), color: "#40C0E7" }}>
                        Save Profile
                      </Text>
                    </Button>
                  </Modal>
                </Portal>
              </View>
              <Button
                style={{ marginTop: hp("5%"), backgroundColor: "#FCC21B" }}
                onPress={logoutUser}
              >
                <Text style={{ color: "white" }}>Sign Out</Text>
              </Button>
            </>
          )}
        </View>
      </PaperProvider>
      <Snackbar
        style={{ backgroundColor: colorMsg }}
        duration={700}
        visible={msg}
        onDismiss={() => setMsg(false)}
      >
        <Text>{msgEditProfile}</Text>
      </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: wp("5%"),
  },
});
