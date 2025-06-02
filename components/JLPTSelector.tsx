import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

export default function JLPTSelector() {
  const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];

  return (
    <View style={styles.jlptButtons}>
      {levels.map((level) => (
        <TouchableOpacity key={level} style={styles.jlptButton}>
          <Text style={styles.jlptButtonText}>{level}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
