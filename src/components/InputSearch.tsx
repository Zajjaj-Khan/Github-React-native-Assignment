import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../Redux/store';
import { fetchUsers, resetState } from '../Redux/Slice/githubSlice';
//import { fetchUsers } from '../../redux/githubSlice';
import { X } from 'lucide-react';

export default function SearchComponent() {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('');
  const [debounceTimer, setDebounceTimer] = useState(null);

  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  const handleChange = (text:any) => {
    setQuery(text);
    if (debounceTimer) clearTimeout(debounceTimer);

    const timer:any = setTimeout(() => {
      if (text.trim()) {
        dispatch(fetchUsers(text.trim()));
      }
    }, 1000);

    setDebounceTimer(timer);
  };

   const clearSearch = () => {
    setQuery('');
    dispatch(resetState()); // clears users if needed
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search GitHub users..."
        style={styles.input}
        value={query}
        onChangeText={handleChange}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 30,
    paddingVertical: 8,
    fontSize: 16,
  },
   iconContainer: {
    paddingLeft: 5,
  },
});
