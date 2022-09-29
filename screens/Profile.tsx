import { StyleSheet, Text, View } from 'react-native';
import ProfilePicture from '../components/ProfilePicture'

export default function Profile () {
  return (
    <View style={styles.container}>
      <Text style={styles.row}>Edit Profile</Text>
      <View style={styles.row}>
      <ProfilePicture/>
      <Text>Name</Text>
      </View>
      <Text style={styles.row}>Uhhhh pfp data goes here :(</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  }
});