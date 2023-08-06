import React from "react";
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
  Snackbar,
} from "react-native-paper";
import moment from "moment";
import {
  useGetJadwalKoridor,
  useGetKoridorName,
} from "../../zustand/services/jadwal";
import { Loading } from "../../components/loading";
import { HalteSchedule } from "../../zustand/interface/response.interface";

export function HomeScreen() {
  //
  const { stateGetJadwalKoridor, getJadwalKoridor } = useGetJadwalKoridor();
  const { stateGetKoridorName, getKoridorName } = useGetKoridorName();

  //
  const [visible, setVisible] = React.useState<boolean>(false);
  const [detail, setDetail] = React.useState<boolean>(false);
  const [valueKoridor, setValueKoridor] = React.useState("");
  const [koridorName, setKoridorName] = React.useState("0");
  const [date, setDate] = React.useState(new Date());
  const [detailHalte, setDetailHalte] = React.useState<HalteSchedule[]>([]);
  const [okFilter, setOkFilter] = React.useState<boolean>(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const showDetail = (e: HalteSchedule[]) => {
    setDetailHalte(e);
    setDetail(true);
  };
  const hideDetail = () => {
    setDetail(!detail);
  };

  const onHandleFilterKoridor = () => showModal();

  const onChangeFilterKoridor = (val: string) => {
    setValueKoridor(val);
  };

  const onOkFilterKoridor = () => {
    if (valueKoridor == "" || valueKoridor === "0") {
      setOkFilter(true);
    } else {
      setKoridorName(valueKoridor);
    }
    hideModal();
  };

  React.useEffect(() => {
    getKoridorName();
    getJadwalKoridor(koridorName, 1);

    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [koridorName]);

  if (!stateGetKoridorName?.data) {
    return (
      <View style={{ margin: wp("5%") }}>
        <Loading />
      </View>
    );
  }

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
                Koridor Name: {stateGetJadwalKoridor?.koridor_name ?? ""}
              </Text>
              <Text style={{ fontWeight: "300", fontSize: wp("3.5%") }}>
                tanggal/jam: {moment(date).format("DD-MM-YYYY")}{" "}
                {date.toLocaleTimeString()}
              </Text>
            </View>
            {/* Filter koridor */}
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
                  {!stateGetKoridorName?.data ? (
                    <View
                      style={{ alignItems: "center", marginTop: hp("10%") }}
                    >
                      <Text>No Data</Text>
                      <MaterialCommunityIcons
                        style={{ marginRight: wp("2%") }}
                        name="folder-remove-outline"
                        color="black"
                        size={50}
                      />
                    </View>
                  ) : (
                    <>
                      <RadioButton.Group
                        onValueChange={(newValue) =>
                          onChangeFilterKoridor(newValue)
                        }
                        value={valueKoridor}
                      >
                        {stateGetKoridorName?.data.map((e) => (
                          <View key={e.id} style={{ flexDirection: "row" }}>
                            <RadioButton value={e.koridor_name} />
                            <Text style={{ marginTop: hp("1%") }}>
                              {"Koridor " + e.koridor_name}
                            </Text>
                          </View>
                        ))}
                      </RadioButton.Group>
                    </>
                  )}

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
          {/* List halte  */}
          <ScrollView style={{ marginTop: hp("2%"), marginBottom: hp("10%") }}>
            {/* Table list of content */}
            {!stateGetJadwalKoridor?.halte ? (
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
              stateGetJadwalKoridor?.halte.map((e, i) => (
                <View
                  key={e.id}
                  style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    shadowColor: "grey",
                    marginBottom: hp("1%"),
                  }}
                >
                  <List.Item
                    key={e.id + "s"}
                    title={"Halte: " + e.halte_name}
                    description={
                      <View
                        key={e.id + "t"}
                        style={{ flexDirection: "column" }}
                      >
                        <Text
                          key={e.id + "p"}
                          style={{
                            fontSize: wp("3%"),
                            fontWeight: "300",
                          }}
                        >
                          date: {moment(e.created_at).format("DD-MM-YYYY")}
                        </Text>
                        <Text
                          key={i + 2}
                          style={{
                            fontSize: wp("3%"),
                            fontWeight: "300",
                          }}
                        >
                          arrival time: {e.arrival_time_in_halte}
                        </Text>
                        <Text
                          key={e.id + "1"}
                          style={{
                            fontSize: wp("3%"),
                            fontWeight: "300",
                          }}
                        >
                          departure time: {e.departure_time_in_halte}
                        </Text>
                      </View>
                    }
                    left={(props) => (
                      <List.Icon
                        key={e.id + "u"}
                        {...props}
                        icon="bus"
                        color="#FCC21B"
                      />
                    )}
                    right={(props) => (
                      <>
                        <Portal key={i + 45}>
                          <Modal
                            key={i + 6}
                            visible={detail}
                            onDismiss={hideDetail}
                            contentContainerStyle={{
                              backgroundColor: "white",
                              padding: wp("5%"),
                              margin: wp("5%"),
                            }}
                          >
                            <Text>Detail Halte</Text>
                            <Divider
                              style={{
                                marginTop: hp("1%"),
                                marginBottom: hp("3%"),
                              }}
                            />
                            {detailHalte.map((e, i) => (
                              <ScrollView key={e.id}>
                                <View style={{ marginBottom: hp("4%") }}>
                                  <Text
                                    key={i + 1}
                                    style={{ fontWeight: "300" }}
                                  >{`Bus Name: ${e.bus_name}`}</Text>
                                  <Text
                                    key={i + 2}
                                    style={{ fontWeight: "300" }}
                                  >{`Arrival time bus: ${e.arrival_time_bus}`}</Text>
                                  <Text
                                    key={i + 3}
                                    style={{ fontWeight: "300" }}
                                  >{`Departure time bus: ${e.departure_time_bus}`}</Text>
                                </View>
                              </ScrollView>
                            ))}
                          </Modal>
                        </Portal>
                        <TouchableOpacity
                          key={e.id + "l"}
                          onPress={() => showDetail(e.halte_schedule)}
                        >
                          <List.Icon
                            key={i + 8}
                            {...props}
                            icon="dots-vertical"
                          />
                        </TouchableOpacity>
                      </>
                    )}
                  />
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </PaperProvider>
      <Snackbar
        style={{ backgroundColor: "yellow" }}
        duration={700}
        visible={okFilter}
        onDismiss={() => setOkFilter(false)}
      >
        <Text>Nothing is filtered</Text>
      </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: wp("5%"),
  },
});
