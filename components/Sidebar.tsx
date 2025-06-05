import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { supabase } from '../supabaseClient';

type SidebarProps = {
  onCollapse: () => void;
  onOpenSavedLists: () => void;
};

export default function Sidebar({ onCollapse, onOpenSavedLists }: SidebarProps) {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <View style={styles.sidebar}>
      <TouchableOpacity onPress={onCollapse} style={styles.close}>
        <Text style={styles.closeText}>Close Sidebar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onOpenSavedLists} style={styles.listButton}>
        <Text style={styles.listText}>Saved Lists</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    right: 0,
    top: 50,
    width: 150,
    height: '100%',
    backgroundColor: '#a00000',
    padding: 10,
  },
  close: {
    marginBottom: 20,
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 4,
  },
  closeText: {
    fontSize: 12,
  },
  listButton: {
    backgroundColor: '#ddd',
    padding: 10,
    marginTop: 10,
    borderRadius: 4,
  },
  listText: {
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#ddd',
    padding: 10,
    marginTop: 20,
    borderRadius: 4,
  },
  logoutText: {
    color: 'black',
  },
});
