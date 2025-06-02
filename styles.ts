import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6cfa4',
  },
  topBar: {
    height: 50,
    backgroundColor: '#a10000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  main: {
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jlptButtons: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  jlptButton: {
    backgroundColor: '#eee',
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  jlptButtonText: {
    fontWeight: 'bold',
  },
  flashcard: {
    width: 200,
    height: 200,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  kanji: {
    fontSize: 32,
  },
  meaningButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#a10000',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sidebar: {
    width: 120,
    backgroundColor: '#a10000',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  username: {
    color: 'white',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#ccc',
    padding: 10,
  },
});
