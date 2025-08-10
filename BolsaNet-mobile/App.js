import { StatusBar } from 'react-native';
import { colors } from './src/Constants/theme.js';
import SetRoute from './src/setRoute.js';
import { AuthProvider } from './src/Contexts/auth.js';

export default function App() {
  return (
    <>
      <AuthProvider>
        <SetRoute/>
      </AuthProvider>

      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.second}
        translucent={false}
      />
      
    </>
  );
}