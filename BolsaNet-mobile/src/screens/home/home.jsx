import { Text, View, ScrollView } from "react-native";
import SpeedMeter from "../../components/speedMeter/speedMeter.jsx";
import Bubble from "../../components/speechBubble/speechBubble.jsx";
import { styles } from "./home.style.js";
import sharedStyles from "../../constants/sharedStyles.js";



function Home() {

  return (
    <View style={[sharedStyles.container, styles.container]}>
    <SpeedMeter speed={90} size={400} radius={170} strokeWidth={30} />
    <Text style={styles.title}>Ultimos Bimestres:</Text>


    <Bubble lines={2} sent={0} message="coloca animação no trem pf " />
    <Bubble lines={1} sent={1} message="A data para renovar BolsaNet está proxima!!!" />





  </View>
  )
}

export default Home;
