import { StyleSheet } from 'react-native';
import { colors } from './theme';

const sharedStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
    backgroundColor: colors.color_base,
  },
});

export default sharedStyles;