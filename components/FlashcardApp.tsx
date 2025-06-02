import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import JLPTSelector from './JLPTSelector';

export default function FlashcardApp({ user }) {
  return (
    <SafeAreaView style={styles.container}>
      <TopBar />
      <View style={styles.main}>
        <View style={styles.content}>
          <JLPTSelector />
          <View style={styles.flashcard}>
            <Text style={styles.kanji}>KANJI</Text>
          </View>
          <TouchableOpacity style={styles.meaningButton}>
            <Text>KANJI MEANING</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>SAVE</Text>
          </TouchableOpacity>
        </View>
        <Sidebar user={user} />
      </View>
    </SafeAreaView>
  );
}
