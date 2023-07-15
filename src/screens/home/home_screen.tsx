import { ReactNode, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  Divider,
  List,
  PaperProvider,
  Portal,
  Modal,
  RadioButton,
  Button,
} from "react-native-paper";
import { dataJadwalBus } from "../../utils/data/jadwal_bus";
import { koridor_schedule } from "../../utils/data/example_data";

export function HomeScreen() {
  //
  const [visible, setVisible] = useState<boolean>(false);
  const [detail, setDetail] = useState<boolean>(false);
  const [valueKoridor, setValueKoridor] = useState("");
  const [koridorName, setKoridorName] = useState("");
  const [scheduleKoridor, setScheduleKoridor] = useState<any>([]);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const showDetail = () => setDetail(true);
  const hideDetail = () => setDetail(false);

  //koridor name
  const koridor_name = koridor_schedule.map((e) => ({
    key: e.koridor_key,
    name: e.koridor_name,
  }));

  const onHandleFilterKoridor = () => {
    //
    const koridor_name = koridor_schedule.map((e) => ({
      key: e.koridor_key,
      name: e.koridor_name,
    }));

    console.log("new_data", koridor_name);

    showModal();
  };

  const onChangeFilterKoridor = (val: string) => {
    console.log({ val });
    setValueKoridor(val);
  };

  const onOkFilterKoridor = () => {
    console.log("koridor name:", valueKoridor);
    const new_schedule_koridor = koridor_schedule.filter(
      (e) => e.koridor_name === valueKoridor
    );

    console.log(
      "new jadwal koridor:",
      new_schedule_koridor[0].koridor_schedule
    );
    setKoridorName(valueKoridor);
    setScheduleKoridor(new_schedule_koridor[0].koridor_schedule);
    hideModal();
  };

  return (
    <>
      <PaperProvider>
        <View style={{ margin: wp("5%") }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: hp("3%"),
            }}
          >
            <View>
              <Text
                style={{
                  marginTop: hp("3%"),
                  fontSize: wp("4.5%"),
                  fontWeight: "300",
                }}
              >
                Koridor Name: {koridorName}
              </Text>
              <Text style={{ fontWeight: "300" }}>13/07/2023 19:43</Text>
            </View>
            <TouchableOpacity onPress={() => onHandleFilterKoridor()}>
              <MaterialCommunityIcons
                style={{ marginTop: hp("4%"), marginRight: wp("2%") }}
                name="filter"
                color="#FCC21B"
                size={26}
              />
            </TouchableOpacity>
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
                <View>
                  <Text style={{ marginBottom: hp("2%") }}>Filter Koridor</Text>
                  <Divider />
                  <RadioButton.Group
                    onValueChange={(newValue) =>
                      onChangeFilterKoridor(newValue)
                    }
                    value={valueKoridor}
                  >
                    {koridor_name.map((e) => (
                      <View key={e.key} style={{ flexDirection: "row" }}>
                        <RadioButton value={e.name} />
                        <Text style={{ marginTop: hp("1%") }}>
                          {"Koridor " + e.name}
                        </Text>
                      </View>
                    ))}
                  </RadioButton.Group>
                  <Button
                    style={{ marginTop: hp("2%") }}
                    buttonColor="#FCC21B"
                    onPress={() => onOkFilterKoridor()}
                  >
                    <Text style={{ color: "white" }}>Ok</Text>
                  </Button>
                </View>
              </Modal>
            </Portal>
          </View>
          <Divider />
          <ScrollView style={{ marginTop: hp("2%"), marginBottom: hp("10%") }}>
            {/* Table list of content */}

            {scheduleKoridor.length === 0 ? (
              <View style={{ alignItems: "center", marginTop: hp("10%") }}>
                <Text>No Data</Text>
                <MaterialCommunityIcons
                  style={{ marginRight: wp("2%") }}
                  name="folder-remove-outline"
                  color="black"
                  size={50}
                />
              </View>
            ) : (
              scheduleKoridor.map((e: any) => (
                <View
                  key={e.key}
                  style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    shadowColor: "grey",
                    marginBottom: hp("1%"),
                  }}
                >
                  <List.Item
                    title={"Halte: " + e.halte}
                    description={
                      <View style={{ flexDirection: "column" }}>
                        <Text
                          style={{
                            fontSize: wp("3%"),
                            fontWeight: "300",
                          }}
                        >
                          date: {e.date}
                        </Text>
                        <Text
                          style={{
                            fontSize: wp("3%"),
                            fontWeight: "300",
                          }}
                        >
                          departure time: {e.deparature_time_in_koridor}
                        </Text>
                        <Text
                          style={{
                            fontSize: wp("3%"),
                            fontWeight: "300",
                          }}
                        >
                          arrival time: {e.arrival_time_in_koridor}
                        </Text>
                      </View>
                    }
                    left={(props) => (
                      <List.Icon {...props} icon="bus" color="#FCC21B" />
                    )}
                    right={(props) => (
                      <>
                        <TouchableOpacity onPress={showDetail}>
                          <List.Icon {...props} icon="dots-vertical" />
                        </TouchableOpacity>
                        <Portal>
                          <Modal
                            visible={detail}
                            onDismiss={hideDetail}
                            contentContainerStyle={{
                              backgroundColor: "white",
                              padding: wp("5%"),
                              margin: wp("5%"),
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                //marginBottom: hp("3%"),
                              }}
                            >
                              <Text>Detail Halte</Text>
                              <TouchableOpacity onPress={showModal}>
                                <MaterialCommunityIcons
                                  style={{
                                    marginRight: wp("2%"),
                                  }}
                                  name="filter"
                                  color="#FCC21B"
                                  size={26}
                                />
                              </TouchableOpacity>
                            </View>
                            <Divider
                              style={{
                                marginTop: hp("1%"),
                                marginBottom: hp("3%"),
                              }}
                            />
                            {e.schedule_koridor.map((e: any) => (
                              <List.Item
                                key={e.index}
                                title={"Bus: " + e.bus_queue}
                                description={
                                  <View style={{ flexDirection: "column" }}>
                                    <Text>
                                      {"departure time bus: " +
                                        e.deparature_time_bus}
                                    </Text>
                                    <Text>
                                      {"arrival time bus: " +
                                        e.arrival_time_bus}
                                    </Text>
                                  </View>
                                }
                              />
                            ))}
                            <Button onPress={hideDetail}>
                              <Text style={{ color: "#40C0E7" }}>Close</Text>
                            </Button>
                          </Modal>
                        </Portal>
                      </>
                    )}
                  />
                </View>
              ))
            )}
          </ScrollView>
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
