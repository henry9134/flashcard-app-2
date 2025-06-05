import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ead2a4',
  },
  topBar: {
    height: 40,
    backgroundColor: '#a60000',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  topBarText: {
    color: 'white',
    fontWeight: 'bold',
  },
  topBarRight: {
    position: 'absolute',
    right: 10,
    top: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sidebar: {
    position: 'absolute',
    right: 0,
    top: 40,
    backgroundColor: '#a60000',
    height: '100%',
    width: 150,
    padding: 10,
    zIndex: 100,
  },
  sidebarButton: {
    backgroundColor: '#ddd',
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  contentArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  selectorRow: {
    alignItems: 'center',
    marginBottom: 20,
  },
  levelSelectorLabel: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  levelButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  levelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  selectedLevelButton: {
    backgroundColor: '#666',
  },
  levelButtonText: {
    color: 'black',
  },
  flashcard: {
    backgroundColor: '#ddd',
    width: 300,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  wordText: {
    fontSize: 32,
  },
  meaningButton: {
    backgroundColor: '#ddd',
    padding: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
  saveButton: {
    backgroundColor: '#a60000',
    padding: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
  saveButtonText: {
    color: 'white',
  },
  correct: {
    color: 'blue',
    marginTop: 10,
  },
  wrong: {
    color: 'red',
    marginTop: 10,
  },
  startButton: {
    marginTop: 10,
    color: 'purple',
    fontWeight: 'bold',
  },
  levelSelector: {
  padding: 10,
  marginTop: 10,
  alignItems: 'center',
},
meaningBox: {
  backgroundColor: '#ddd',
  padding: 15,
  borderRadius: 8,
  marginTop: 10,
  alignItems: 'center',
  alignSelf: 'center',
  width: 300,
},
meaningText: {
  fontSize: 16,
  marginBottom: 5,
},
modeToggleContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: 10,
  marginBottom: 10,
},
toggleButton: {
  backgroundColor: '#ccc',
  paddingVertical: 8,
  paddingHorizontal: 20,
  marginHorizontal: 10,
  borderRadius: 5,
},
toggleButtonActive: {
  backgroundColor: '#a60000',
},
toggleButtonText: {
  color: 'white',
  fontWeight: 'bold',
},
choiceButton: {
  backgroundColor: '#eee',
  padding: 10,
  marginVertical: 5,
  borderRadius: 5,
  alignItems: 'center',
  width: 250,
},

correctChoice: {
  backgroundColor: 'lightgreen',
},

wrongChoice: {
  backgroundColor: '#ff9999',
},

});
