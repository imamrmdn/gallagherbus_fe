import { useState } from "react";

import { Text, StyleSheet, View, Image, SafeAreaView } from "react-native";
import {
  Button,
  List,
  PaperProvider,
  Portal,
  Modal,
  TextInput,
  Divider,
} from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export function ProfileScreen() {
  const [visible, setVisible] = useState<boolean>(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <>
      <PaperProvider>
        <View style={{ margin: wp("5%") }}>
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
              title="glb123456"
              left={(props) => <List.Icon {...props} icon="account" />}
            />
            <List.Item
              title="gholibsoekamti@gmail.com"
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
                  label="Id"
                  placeholder="Type something"
                  right={<TextInput.Affix text="/100" />}
                />
                <TextInput
                  style={{ height: hp("4%") }}
                  mode="outlined"
                  label="Email"
                  placeholder="Type something"
                  right={<TextInput.Affix text="/100" />}
                />
                <Button style={{ marginTop: hp("3%") }} onPress={hideModal}>
                  <Text style={{ fontSize: wp("3.5%"), color: "#40C0E7" }}>
                    Save Profile
                  </Text>
                </Button>
              </Modal>
            </Portal>
          </View>
          <Button style={{ marginTop: hp("5%"), backgroundColor: "#FCC21B" }}>
            <Text style={{ color: "white" }}>Sign Out</Text>
          </Button>
        </View>
      </PaperProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: wp("5%"),
  },
});
