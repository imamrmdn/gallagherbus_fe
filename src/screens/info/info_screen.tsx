import { Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Card, Title } from "react-native-paper";
import { useGetInformasi } from "../../zustand/services/informasi";
import { Loading } from "../../components/loading";
import { dataSourceInfo } from "../../utils/data/infor_source";

import moment from "moment";
import * as Linking from "expo-linking";

export function InfoScreen() {
  //
  const { stateGetInformasi, getInformasi } = useGetInformasi();

  React.useEffect(() => {
    getInformasi();
  }, []);

  return (
    <>
      <ScrollView style={{ margin: wp("5%") }}>
        {!stateGetInformasi?.data ? (
          <Loading />
        ) : (
          stateGetInformasi?.data.map((e, i) => (
            <TouchableOpacity key={i} onPress={() => Linking.openURL(e.url)}>
              <Card key={e.id} style={{ marginBottom: hp("2%") }}>
                <Card.Cover
                  source={
                    dataSourceInfo[i]?.source ??
                    require("../../../assets/image_news/bus.jpeg")
                  }
                />
                <Card.Content>
                  <Title style={{ fontSize: wp("5%") }}>{e.title}</Title>
                  <Text style={{ fontWeight: "300", marginBottom: hp("1%") }}>
                    {e.title}
                  </Text>
                  <Text style={{ fontWeight: "200", fontSize: wp("3%") }}>
                    {e.desc_informasi}
                  </Text>
                  <Text
                    style={{
                      marginTop: hp("1%"),
                      fontWeight: "200",
                      fontSize: wp("3%"),
                    }}
                  >
                    {`Tanggal: ${moment(e.created_at).format("DD-MM-YYYY")}`}
                  </Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </>
  );
}
