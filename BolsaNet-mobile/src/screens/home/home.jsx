import { Text, View } from 'react-native';
import SpeedMeter from '../../components/SpeedMeter/SpeedMeter.jsx';
import MeasureInternetSpeed from '../../components/SpeedMeter/measureInternetSpeed.js';
import SpeechBubble from '../../components/SpeechBubble/SpeechBubble.jsx';
import { useEffect, useState } from 'react';
import { styles } from './home.style.js';
import sharedStyles from '../../Constants/sharedStyles.js';


function Home() {

  const [speed, setSpeed] = useState(0);
 useEffect(() => {
  const interval = setInterval(async () => {
    const result = await MeasureInternetSpeed();
    if (result && !isNaN(result)) {
      setSpeed(Number(result.toFixed(2)));
    } else {
      setSpeed(0);
    }
  }, 5000); // 

  return () => clearInterval(interval); // limpa o intervalo quando o componente desmonta
}, []);


 
  const recentAvg = 6.0;
  const previousAvg = 7;
  return (
    <View style={[sharedStyles.container, styles.container]}>
      <SpeedMeter speed={speed} size={400} radius={170} strokeWidth={30} />
      <Text style={styles.title}>Ultimos Bimestres:</Text>
      <SpeechBubble
        isGradeAverage={true}
        recentMessage={`Média:${recentAvg} Velocidade:50GB`}
        recentAverage={recentAvg}
        previousMessage={`Média:${previousAvg} Velocidade:50GB`}
        previousAverage={previousAvg}

      />
      <SpeechBubble lines={1} sent={1} message='A data para renovar BolsaNet está proxima!!!' />
    </View>
  )
}

export default Home;
