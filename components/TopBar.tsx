import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';

export default function TopBar() {
  return (
    <View style={styles.topBar}>
      <Text style={styles.topBarText}>FLASHCARD APP</Text>
    </View>
  );
}
