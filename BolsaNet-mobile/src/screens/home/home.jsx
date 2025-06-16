import { LogBox, Text, View, } from "react-native";
import SpeedMeter from "../../components/speedMeter/speedMeter.jsx";
import Bubble from "../../components/speechBubble/bubble.jsx";



function Home() {

  return (
    <View style={{ justifyContent: 'center', flex: 1 }}>
      <SpeedMeter speed={60} size={400} radius={170} strokeWidth={30} />
      <Text style={{ margin: 10 }}>Ultimos Bimestres:</Text>
      <Bubble />


      <Text>coloque pf animação no velocimetro, e coloque uma descrição na sua api</Text>
    </View>
  );
}

export default Home;
