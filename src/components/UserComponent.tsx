import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet } from 'react-native';

const UserComponent = ({ item, onSelect }:any) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
      <View style={styles.info}>
        <TouchableOpacity onPress={() => onSelect(item.login)}>
          <Text style={styles.username}>{item.login}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(item.html_url)}>
          <Text style={styles.link}>View Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  info: { marginLeft: 10 },
  username: { fontSize: 16, fontWeight: 'bold' },
  link: { color: 'red', marginTop: 5 },
});

export default UserComponent;
