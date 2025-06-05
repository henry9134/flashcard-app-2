import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';
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
  const [missedWords, setMissedWords] = useState<Word[]>([]);
  const [savedWords, setSavedWords] = useState<Word[]>([]);
  const [savedLists, setSavedLists] = useState<{ name: string; words: Word[] }[]>([]);
  const [listName, setListName] = useState('');
  const [showSavePrompt, setShowSavePrompt] = useState(false);
  const [showSavedLists, setShowSavedLists] = useState(false);
  const [selectedListIndex, setSelectedListIndex] = useState<number | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const currentWord: Word =
    showSavedLists && selectedListIndex !== null
      ? savedLists[selectedListIndex].words[index] || {
          japanese: 'KANJI',
          english: '',
          romaji: '',
          level: selectedLevel,
        }
      : testWords[index] || {
          japanese: 'KANJI',
          english: '',
          romaji: '',
          level: selectedLevel,
        };

  const startTest = () => {
    const wordsForLevel = jlptWords.filter(word => word.level === selectedLevel);
    const selected = wordsForLevel.sort(() => 0.5 - Math.random()).slice(0, 10);
    setTestWords(selected);
    setIndex(0);
    setScore(0);
    setShowAnswer(false);
    setSelectedChoice(null);
    setTestComplete(false);
    setMissedWords([]);
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
    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      setMissedWords(prev => [...prev, currentWord]);
    }

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

  const handleRenameList = () => {
    if (selectedListIndex === null || renameValue.trim() === '') return;
    const updated = [...savedLists];
    updated[selectedListIndex].name = renameValue.trim();
    setSavedLists(updated);
    setRenameValue('');
    setSelectedListIndex(null);
  };

  const handleDeleteList = () => {
    if (selectedListIndex === null) return;
    const updated = [...savedLists];
    updated.splice(selectedListIndex, 1);
    setSavedLists(updated);
    setSelectedListIndex(null);
  };

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
                style={[styles.levelButton, selectedLevel === level && styles.selectedLevelButton]}
                onPress={() => setSelectedLevel(level)}
              >
                <Text style={styles.levelButtonText}>{level}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {!showSavedLists && (
          <View style={styles.modeToggleContainer}>
            <TouchableOpacity
              onPress={() => setMode('practice')}
              style={[styles.toggleButton, mode === 'practice' && styles.toggleButtonActive]}
            >
              <Text style={styles.toggleButtonText}>Practice</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setMode('test')}
              style={[styles.toggleButton, mode === 'test' && styles.toggleButtonActive]}
            >
              <Text style={styles.toggleButtonText}>Test</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.flashcard}>
          <Text style={styles.wordText}>{currentWord.japanese}</Text>
        </View>

        {testComplete && (
          <View style={styles.meaningBox}>
            <Text style={styles.meaningText}>Test Complete!</Text>
            <Text style={styles.meaningText}>Your score: {score}/10</Text>
            <TouchableOpacity onPress={startTest} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Retry Test</Text>
            </TouchableOpacity>
          </View>
        )}

        {testWords.length > 0 && mode === 'test' && (
          <View style={styles.meaningBox}>
            {choices.map((choice, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => handleSelectChoice(choice)}
                style={[
                  styles.choiceButton,
                  selectedChoice === choice &&
                    (choice === currentWord.english ? styles.correctChoice : styles.wrongChoice),
                ]}
              >
                <Text>{choice}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {mode === 'practice' && testWords.length > 0 && (
          <>
            {showAnswer ? (
              <>
                <View style={styles.meaningBox}>
                  <Text style={styles.meaningText}>English: {currentWord.english}</Text>
                  <Text style={styles.meaningText}>Romaji: {currentWord.romaji}</Text>
                </View>
                <TouchableOpacity onPress={() => checkAnswer(true)}>
                  <Text>I knew it</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => checkAnswer(false)}>
                  <Text>I didn’t</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (!savedWords.some(w => w.japanese === currentWord.japanese)) {
                      setSavedWords(prev => [...prev, currentWord]);
                      Alert.alert('Saved!', 'This word has been saved.');
                    } else {
                      Alert.alert('Already saved', 'This word is already in your saved list.');
                    }
                  }}
                  style={styles.saveButton}
                >
                  <Text style={styles.saveButtonText}>Save this Word</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity onPress={() => setShowAnswer(true)} style={styles.meaningButton}>
                <Text>KANJI MEANING</Text>
              </TouchableOpacity>
            )}
          </>
        )}

        {showSavedLists && selectedListIndex === null && (
          <ScrollView style={{ maxHeight: 300 }}>
            <View style={styles.meaningBox}>
              <Text style={styles.meaningText}>Your Saved Lists:</Text>
              {savedLists.map((list, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.choiceButton}
                  onPress={() => setSelectedListIndex(idx)}
                >
                  <Text>{list.name}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity onPress={() => setShowSavedLists(false)} style={styles.logoutButton}>
                <Text style={styles.logoutText}>Back</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}

        {showSavedLists && selectedListIndex !== null && (
          <View style={styles.meaningBox}>
            <Text style={styles.meaningText}>
              List: {savedLists[selectedListIndex].name}
            </Text>
            <Text style={styles.meaningText}>
              English: {currentWord.english}
            </Text>
            <Text style={styles.meaningText}>
              Romaji: {currentWord.romaji}
            </Text>
            <TouchableOpacity
              onPress={() =>
                setIndex((prev) =>
                  prev < savedLists[selectedListIndex].words.length - 1 ? prev + 1 : 0
                )
              }
              style={styles.saveButton}
            >
              <Text style={styles.saveButtonText}>Next</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={renameValue}
              onChangeText={setRenameValue}
              placeholder="Rename list"
            />
            <TouchableOpacity onPress={handleRenameList} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Rename</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeleteList} style={styles.logoutButton}>
              <Text style={styles.logoutText}>Delete List</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedListIndex(null)} style={styles.logoutButton}>
              <Text style={styles.logoutText}>Back to Lists</Text>
            </TouchableOpacity>
          </View>
        )}

        {(missedWords.length > 0 || savedWords.length > 0) && !showSavePrompt && (
          <TouchableOpacity onPress={() => setShowSavePrompt(true)} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save {missedWords.length > 0 ? 'Missed' : 'Practice'} Words</Text>
          </TouchableOpacity>
        )}

        {showSavePrompt && (
          <View style={styles.meaningBox}>
            <Text style={styles.meaningText}>Name this list:</Text>
            <TextInput
              style={styles.input}
              value={listName}
              onChangeText={setListName}
              placeholder="e.g. N5 Mistakes"
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                if (listName.trim() === '') return;
                const wordsToSave = missedWords.length > 0 ? missedWords : savedWords;
                setSavedLists(prev => [...prev, { name: listName.trim(), words: wordsToSave }]);
                setListName('');
                setShowSavePrompt(false);
                setMissedWords([]);
                setSavedWords([]);
              }}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}

        {testWords.length === 0 && !testComplete && !showSavedLists && (
          <TouchableOpacity onPress={startTest} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Start</Text>
          </TouchableOpacity>
        )}
      </View>

      {sidebarVisible && (
        <Sidebar
          onCollapse={() => setSidebarVisible(false)}
          onOpenSavedLists={() => {
            setShowSavedLists(true);
            setTestWords([]);
          }}
        />
      )}
    </View>
  );
}
