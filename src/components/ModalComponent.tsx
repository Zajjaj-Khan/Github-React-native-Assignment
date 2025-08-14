import React from "react";
import {
  Alert,
  Modal,
  Pressable,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../Redux/store";
import { clearSelectedUser } from "../Redux/Slice/githubSlice";

function ModalComponent({ showModal }: any) {
  const dispatch = useAppDispatch();
  const { loading, selectedUser } = useAppSelector(
    (state: any) => state.github
  );
console.log(loading)
  const handleClose = () => {
    dispatch(clearSelectedUser()); // clears Redux selectedUser
  };

  return (
    <View>
      {loading ? (
        <ActivityIndicator size={'large'} />
      ) : (

        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
            !showModal;
          }}
        >
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Image source={{ uri: selectedUser.avatar_url }} style={styles.avatar} />
                 <Text style={styles.name}>{selectedUser.name || 'No Name'}</Text>
          <Text style={styles.username}>@{selectedUser.login}</Text>
           <TouchableOpacity onPress={() => Linking.openURL(selectedUser.html_url)}>
            <Text style={styles.link}>View GitHub Profile</Text>
          </TouchableOpacity>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handleClose}
              >
                <Text style={styles.textStyle}>Colse</Text>
              </Pressable>
            </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 55,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
    button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    minWidth: 80,
    alignItems: 'center',
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#c53e15",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
   avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
    name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
   link: {
    color: '#1e90ff',
    marginTop: 10,
    marginBottom: 15,
    textDecorationLine: 'underline',
  },
});

export default ModalComponent;
