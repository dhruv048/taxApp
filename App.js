import { StyleSheet, Text, View } from 'react-native';
import InputPage from './ntax';

export default function App() {
  return (
    <InputPage/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
