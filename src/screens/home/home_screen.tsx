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

const dataJadwalBus = [
  {
    key: 1,
    halte: "Museum Fatahila",
    date: "13/07/2023",
    deparature_time_in_koridor: "10:00",
    arrival_time_in_koridor: "12:00",
    schedule_koridor: [
      {
        index: "a11",
        bus_queue: "bus1",
        deparature_time_bus: "10:00",
        arrival_time_bus: "10:45",
      },
      {
        index: "a12",
        bus_queue: "bus2",
        deparature_time_bus: "10:45",
        arrival_time_bus: "11:25",
      },
      {
        index: "a13",
        bus_queue: "bus3",
        deparature_time_bus: "11:25",
        arrival_time_bus: "12:00",
      },
    ],
  },
  {
    key: 2,
    halte: "Kota",
    date: "13/07/2023",
    deparature_time_in_koridor: "12:00",
    arrival_time_in_koridor: "14:00",
    schedule_koridor: [
      {
        index: "a21",
        bus_queue: "bus1",
        deparature_time_bus: "12:00",
        arrival_time_bus: "12:45",
      },
      {
        index: "a22",
        bus_queue: "bus2",
        deparature_time_bus: "12:45",
        arrival_time_bus: "13:25",
      },
      {
        index: "a23",
        bus_queue: "bus3",
        deparature_time_bus: "13:25",
        arrival_time_bus: "14:00",
      },
    ],
  },
  {
    key: 3,
    halte: "Glodok",
    date: "13/07/2023",
    deparature_time_in_koridor: "14:00",
    arrival_time_in_koridor: "16:00",
    schedule_koridor: [
      {
        index: "a31",
        bus_queue: "bus1",
        deparature_time_bus: "14:00",
        arrival_time_bus: "14:45",
      },
      {
        index: "a32",
        bus_queue: "bus2",
        deparature_time_bus: "14:45",
        arrival_time_bus: "15:25",
      },
      {
        index: "a33",
        bus_queue: "bus3",
        deparature_time_bus: "15:25",
        arrival_time_bus: "16:00",
      },
    ],
  },
  {
    key: 4,
    halte: "Olimo",
    date: "13/07/2023",
    deparature_time_in_koridor: "16:00",
    arrival_time_in_koridor: "18:00",
    schedule_koridor: [
      {
        index: "a31",
        bus_queue: "bus1",
        deparature_time_bus: "14:00",
        arrival_time_bus: "14:45",
      },
      {
        index: "a32",
        bus_queue: "bus2",
        deparature_time_bus: "14:45",
        arrival_time_bus: "15:25",
      },
      {
        index: "a33",
        bus_queue: "bus3",
        deparature_time_bus: "15:25",
        arrival_time_bus: "16:00",
      },
    ],
  },
  {
    key: 5,
    halte: "Mangga besar",
    date: "13/07/2023",
    deparature_time_in_koridor: "18:00",
    arrival_time_in_koridor: "20:00",
    schedule_koridor: [
      {
        index: "a31",
        bus_queue: "bus1",
        deparature_time_bus: "14:00",
        arrival_time_bus: "14:45",
      },
      {
        index: "a32",
        bus_queue: "bus2",
        deparature_time_bus: "14:45",
        arrival_time_bus: "15:25",
      },
      {
        index: "a33",
        bus_queue: "bus3",
        deparature_time_bus: "15:25",
        arrival_time_bus: "16:00",
      },
    ],
  },
  {
    key: 6,
    halte: "Sawah besar",
    date: "13/07/2023",
    deparature_time_in_koridor: "14:00",
    arrival_time_in_koridor: "16:00",
    schedule_koridor: [
      {
        index: "a31",
        bus_queue: "bus1",
        deparature_time_bus: "14:00",
        arrival_time_bus: "14:45",
      },
      {
        index: "a32",
        bus_queue: "bus2",
        deparature_time_bus: "14:45",
        arrival_time_bus: "15:25",
      },
      {
        index: "a33",
        bus_queue: "bus3",
        deparature_time_bus: "15:25",
        arrival_time_bus: "16:00",
      },
    ],
  },
];

export function HomeScreen() {
  //
  const [visible, setVisible] = useState<boolean>(false);
  const [detail, setDetail] = useState<boolean>(false);
  const [value, setValue] = useState("");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const showDetail = () => setDetail(true);
  const hideDetail = () => setDetail(false);

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
                Koridor Name: 1
              </Text>
              <Text style={{ fontWeight: "300" }}>13/07/2023 19:43</Text>
            </View>
            <TouchableOpacity onPress={showModal}>
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
                    onValueChange={(newValue) => setValue(newValue)}
                    value={value}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <RadioButton value="routes" />
                      <Text style={{ marginTop: hp("1%") }}>Koridor 1</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <RadioButton value="day" />
                      <Text style={{ marginTop: hp("1%") }}>Koridor 2</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <RadioButton value="day" />
                      <Text style={{ marginTop: hp("1%") }}>Koridor 2A</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <RadioButton value="a3" />
                      <Text style={{ marginTop: hp("1%") }}>Koridor 3</Text>
                    </View>
                  </RadioButton.Group>
                  <Button
                    style={{ marginTop: hp("2%") }}
                    buttonColor="#FCC21B"
                    onPress={() => {
                      setValue("");
                      hideModal();
                    }}
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
            {dataJadwalBus.map((e) => (
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
                          {e.schedule_koridor.map((e) => (
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
                                    {"arrival time bus: " + e.arrival_time_bus}
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
            ))}
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
