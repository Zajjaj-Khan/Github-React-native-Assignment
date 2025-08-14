import { Button, Text } from '@react-navigation/elements';
import { ActivityIndicator, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import SearchComponent from '../../components/InputSearch';
import ListComponent from '../../components/ListComponent';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { fetchUserDetails, resetState } from '../../Redux/Slice/githubSlice';
import ModalComponent from '../../components/ModalComponent';
import { useNavigation } from '@react-navigation/native';
export function Home() {
    const dispatch = useAppDispatch();
  const { users, loading, selectedUser } = useAppSelector
((state:any) => state.github);

  const handleSelect = (username:string) => dispatch(fetchUserDetails(username));
  const navigation = useNavigation();

  const handleClick = () => {
    dispatch(resetState())
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
    <View style={styles.container}>
    {/* HEader */}
    <View style={styles.header}>
       <Pressable onPress={handleClick}>
      <Text style={styles.headerText}>Github Users</Text>
    </Pressable>

    </View>
    <SearchComponent />
     {/* No User Search Yet*/}
    {!loading && users.length === 0 && (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No users found. Please search for a user.</Text>
      </View>
    )}
    
    {/* User List */}
     {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ListComponent data={users} onSelect={handleSelect} />
      )}
    {/* Selected User Details */}
    {selectedUser && (<ModalComponent showModal={!!selectedUser} />)}
   
    
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    backgroundColor: '#fff',
  },
  header:{
    padding: 20, 
    backgroundColor: '#df4242',
    borderBottomWidth: 1, 
    borderColor: '#ddd',
    paddingVertical: 30,
  },
  headerText:{
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign:'center'
  }
  
});
