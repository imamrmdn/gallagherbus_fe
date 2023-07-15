import {
  Text,
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Card, Title } from "react-native-paper";

const dataBerita = [
  {
    key: 1,
    source: require("../../../assets/image_news/bus2.jpg"),
    title: "Bus Nasional",
    desc: "Kemenperin: Industri bus nasional mampu bertahan di saat pandemi ...",
    date: "20/07/2023",
  },
  {
    key: 2,
    source: require("../../../assets/image_news/bus1.jpeg"),
    title: "Transporasi Umum",
    desc: "Kemenhub: Banyak Pemda Tak Punya Perencanaan Jelas Soal Transporasi Umum ...",
    date: "01/07/2023",
  },
  {
    key: 3,
    source: require("../../../assets/image_news/bus3.jpeg"),
    title: "Bus Premium Karya Anak Bangsa",
    desc: "Ragam bus premium karya anak bangsa yang unjuk gigi di busworld 2023 ...",
    date: "10/07/2023",
  },
];

export function InfoScreen() {
  return (
    <>
      <ScrollView style={{ margin: wp("5%") }}>
        {dataBerita.map((e) => (
          <Card key={e.key} style={{ marginBottom: hp("2%") }}>
            <Card.Cover source={e.source} />
            <Card.Content>
              <Title style={{ fontSize: wp("5%") }}>{e.title}</Title>
              <Text style={{ fontWeight: "300", marginBottom: hp("1%") }}>
                {e.desc}
              </Text>
              <Text style={{ fontWeight: "200", fontSize: wp("3%") }}>
                {e.date}
              </Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: wp("5%"),
  },
});
