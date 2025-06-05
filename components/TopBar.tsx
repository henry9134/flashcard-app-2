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
        <Text style={styles.email}>{user?.email || 'Guest'}</Text>
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
    backgroundColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  email: {
    color: '#fff',
    marginRight: 10,
  },
  toggle: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
});
