import { ActivityIndicator } from 'react-native';
import { Colors } from '../../../assets/Colors';

export default function LoadingSpinner() {
  return (
    <ActivityIndicator
      style={{ flex: 1 }}
      size="large"
      color={Colors.magenta}
    />
  );
}
