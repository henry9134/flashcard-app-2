import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import { jlptWords } from '../data/JLPTWords';
import { styles } from '../styles';

type Word = {
  japanese: string;
  romaji: string;
  english: string;
  level: string;
};

type FlashcardAppProps = {
  user: any;
};

export default function FlashcardApp({ user }: FlashcardAppProps) {
  const [selectedLevel, setSelectedLevel] = useState<string>('N5');
  const [testWords, setTestWords] = useState<Word[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const startTest = () => {
    const wordsForLevel = jlptWords.filter(word => word.level === selectedLevel);
    const selected = wordsForLevel.sort(() => 0.5 - Math.random()).slice(0, 15);
    setTestWords(selected);
    setIndex(0);
    setScore(0);
    setShowAnswer(false);
  };

  const checkAnswer = (isCorrect: boolean) => {
    if (isCorrect) setScore(score + 1);
    if (index < testWords.length - 1) {
      setIndex(index + 1);
      setShowAnswer(false);
    } else {
      Alert.alert(`Test complete!`, `Your score: ${score + (isCorrect ? 1 : 0)}/15`);
      setTestWords([]);
    }
  };

  const currentWord = testWords[index] || { japanese: 'KANJI', english: '', romaji: '' };

  return (
    <View style={styles.container}>
      <TopBar user={user} onToggleSidebar={() => setSidebarVisible(!sidebarVisible)} />

      <View style={styles.contentArea}>
        <View style={styles.selectorRow}>
          <Text style={styles.levelSelectorLabel}>Select JLPT Level:</Text>
          <View style={styles.levelButtons}>
            {['N5', 'N4', 'N3', 'N2', 'N1'].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.levelButton,
                  selectedLevel === level && styles.selectedLevelButton,
                ]}
                onPress={() => setSelectedLevel(level)}
              >
                <Text style={styles.levelButtonText}>{level}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.flashcard}>
          <Text style={styles.wordText}>{currentWord.japanese}</Text>
        </View>

        {testWords.length > 0 && showAnswer ? (
  <>
    <View style={styles.meaningBox}>
      <Text style={styles.meaningText}>English: {currentWord.english}</Text>
      <Text style={styles.meaningText}>Romaji: {currentWord.romaji}</Text>
    </View>

    <TouchableOpacity onPress={() => checkAnswer(true)}>
      <Text style={styles.correct}>I knew it</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => checkAnswer(false)}>
      <Text style={styles.wrong}>I didn’t</Text>
    </TouchableOpacity>
  </>
) : (
  <TouchableOpacity onPress={() => setShowAnswer(true)} style={styles.meaningButton}>
    <Text>KANJI MEANING</Text>
  </TouchableOpacity>
)}

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={startTest}>
          <Text style={styles.startButton}>Start</Text>
        </TouchableOpacity>
      </View>

      {sidebarVisible && <Sidebar onCollapse={() => setSidebarVisible(false)} />}
    </View>
  );
}
