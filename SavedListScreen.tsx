import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { styles } from './styles';


type Word = {
  japanese: string;
  english: string;
  romaji: string;
  level: string;
};

type SavedListRouteProp = RouteProp<
  { SavedList: { name: string; words: Word[]; index: number } },
  'SavedList'
>;

export default function SavedListScreen() {
  const route = useRoute<SavedListRouteProp>();
  const { name, words, index } = route.params;

  const [renameValue, setRenameValue] = useState(name);

  return (
    <ScrollView contentContainerStyle={styles.contentArea}>
      <View style={styles.meaningBox}>
        <Text style={styles.meaningText}>Editing List: {renameValue}</Text>

        {words.map((word, i) => (
          <Text key={i} style={styles.meaningText}>
            • {word.japanese} - {word.english}
          </Text>
        ))}

        <TextInput
          style={styles.input}
          value={renameValue}
          onChangeText={setRenameValue}
          placeholder="Rename this list"
        />

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Name (not yet wired)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Delete List (not yet wired)</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
