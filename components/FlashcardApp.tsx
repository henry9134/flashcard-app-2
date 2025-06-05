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
  const [mode, setMode] = useState<'practice' | 'test'>('practice');
  const [choices, setChoices] = useState<string[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [testComplete, setTestComplete] = useState(false);

  const startTest = () => {
    const wordsForLevel = jlptWords.filter(word => word.level === selectedLevel);
    const selected = wordsForLevel.sort(() => 0.5 - Math.random()).slice(0, 10);
    setTestWords(selected);
    setIndex(0);
    setScore(0);
    setShowAnswer(false);
    setSelectedChoice(null);
    setTestComplete(false);
    generateChoices(selected[0], wordsForLevel);
  };

  const generateChoices = (correctWord: Word, pool: Word[]) => {
    const otherOptions = pool
      .filter(word => word.english !== correctWord.english)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(word => word.english);

    const options = [...otherOptions, correctWord.english].sort(() => 0.5 - Math.random());
    setChoices(options);
  };

  const checkAnswer = (isCorrect: boolean) => {
    if (isCorrect) setScore(prev => prev + 1);
    if (index < testWords.length - 1) {
      setIndex(index + 1);
      setShowAnswer(false);
    } else {
      Alert.alert('Practice complete!', `You finished your review.`);
      setTestWords([]);
    }
  };

  const handleSelectChoice = (choice: string) => {
    if (selectedChoice !== null) return;

    setSelectedChoice(choice);
    const isCorrect = choice === currentWord.english;
    if (isCorrect) setScore(prev => prev + 1);

    setTimeout(() => {
      if (index < testWords.length - 1) {
        const nextIndex = index + 1;
        setIndex(nextIndex);
        setSelectedChoice(null);
        setShowAnswer(false);
        generateChoices(testWords[nextIndex], jlptWords.filter(word => word.level === selectedLevel));
      } else {
        setTestComplete(true);
        setTestWords([]);
        setChoices([]);
        setSelectedChoice(null);
      }
    }, 1000);
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

        <View style={styles.modeToggleContainer}>
          <TouchableOpacity
            onPress={() => setMode('practice')}
            style={[
              styles.toggleButton,
              mode === 'practice' && styles.toggleButtonActive,
            ]}
          >
            <Text style={styles.toggleButtonText}>Practice</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setMode('test')}
            style={[
              styles.toggleButton,
              mode === 'test' && styles.toggleButtonActive,
            ]}
          >
            <Text style={styles.toggleButtonText}>Test</Text>
          </TouchableOpacity>
        </View>

        {testComplete ? (
          <View style={styles.meaningBox}>
            <Text style={styles.meaningText}>Test Complete!</Text>
            <Text style={styles.meaningText}>Your score: {score}/10</Text>
            <TouchableOpacity onPress={startTest} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Retry Test</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.flashcard}>
              <Text style={styles.wordText}>{currentWord.japanese}</Text>
            </View>

            {mode === 'test' && testWords.length > 0 ? (
              <View style={styles.meaningBox}>
                {choices.map((choice, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => handleSelectChoice(choice)}
                    style={[
                      styles.choiceButton,
                      selectedChoice === choice &&
                        (choice === currentWord.english
                          ? styles.correctChoice
                          : styles.wrongChoice),
                    ]}
                  >
                    <Text>{choice}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : testWords.length > 0 && showAnswer ? (
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
          </>
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
