import { Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { ActivityIndicator } from "react-native-paper";

export function Loading() {
  return (
    <View style={{ flexDirection: "row" }}>
      <ActivityIndicator animating={true} color={"#FCC21B"} />
      <Text style={{ marginLeft: wp("2%") }}>wait a minute ...</Text>
    </View>
  );
}
