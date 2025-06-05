import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

type JLPTSelectorProps = {
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
};

export default function JLPTSelector({ selectedLevel, setSelectedLevel }: JLPTSelectorProps) {
  const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];

  return (
    <View style={styles.levelSelector}>
      <Text style={styles.levelSelectorLabel}>Select JLPT Level:</Text>
      {levels.map(level => (
        <TouchableOpacity
          key={level}
          style={[styles.levelButton, selectedLevel === level && { backgroundColor: '#aaa' }]}
          onPress={() => setSelectedLevel(level)}
        >
          <Text style={styles.levelButtonText}>{level}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
