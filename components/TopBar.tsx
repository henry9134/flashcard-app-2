import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type TopBarProps = {
  user: any;
  onToggleSidebar: () => void;
};

export default function TopBar({ user, onToggleSidebar }: TopBarProps) {
  return (
    <View style={styles.topBar}>
      <Text style={styles.title}>FLASHCARD APP</Text>
      <View style={styles.right}>
        <Text style={styles.email}>{user.email}</Text>
        <TouchableOpacity onPress={onToggleSidebar}>
          <Text style={styles.toggle}>Open Sidebar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    height: 50,
    backgroundColor: '#a00000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
  },
  right: {
    alignItems: 'flex-end',
  },
  email: {
    color: 'white',
    fontSize: 12,
  },
  toggle: {
    color: 'lightblue',
    textDecorationLine: 'underline',
  },
});
