import { Text, View } from 'react-native';
import SpeedMeter from '../../Components/SpeedMeter/SpeedMeter.jsx';
import MeasureInternetSpeed from '../../Components/SpeedMeter/measureInternetSpeed.js';
import SpeechBubble from '../../Components/SpeechBubble/SpeechBubble.jsx';
import { useContext, useEffect, useState } from 'react';
import { styles } from './home.style.js';
import sharedStyles from '../../Constants/sharedStyles.js';
import api from '../../Constants/api.js';
import { AuthContext } from '../../Contexts/auth.js';

function Home() {
  const { user } = useContext(AuthContext);
  const [speed, setSpeed] = useState(0);
  const [recentAvg, setRecentAvg] = useState(0);
  const [recentMegas, setRecentMegas] = useState(0);


  useEffect(() => {
    // Speed test (igual)
    async function measure() {
      const result = await MeasureInternetSpeed();
      if (result && !isNaN(result)) {
        setSpeed(Number(result.toFixed(2)));
      } else {
        setSpeed(0);
      }
    }
    measure();
    const interval = setInterval(measure, 30000);

 
    async function loadPerformanceData() {
      if (!user?.iduser) return;

      try {
        const response = await api.get(`/studentPerformance/user/${user.iduser}`);
        
      
        const performances = response.data.data || [];
        
        console.log('📊 Performances:', performances); 
        
        if (performances) {
          const recent = performances;
         
          setRecentAvg(parseFloat(recent.studentAverage) || 0);
          setRecentMegas(recent.megasGranted || 0);
        }
        

      } catch (error) {
        console.error('Erro performance:', error);
      }
    }

    loadPerformanceData();
    return () => clearInterval(interval);
  }, [user?.iduser]);

  const recentMessage = `Média:${recentAvg.toFixed(1)} Megas:${recentMegas.toLocaleString()}`;

  return (
    <View style={[sharedStyles.container, styles.container]}>
      <SpeedMeter speed={speed} size={400} radius={170} strokeWidth={30} />
      <Text style={styles.title}>Bimestres atual:</Text>
      <SpeechBubble
        isGradeAverage={true}
        recentMessage={recentMessage}
        recentAverage={recentAvg}
      />
      <SpeechBubble lines={1} sent={1} message='aproveite cada segundo para aprender!' />
    </View>
  );
}

export default Home;
