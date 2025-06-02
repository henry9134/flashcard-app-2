import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';
import { supabase } from '../supabaseClient';

export default function Sidebar({ user }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <View style={styles.sidebar}>
      <Text style={styles.username}>{user?.email}</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
}
