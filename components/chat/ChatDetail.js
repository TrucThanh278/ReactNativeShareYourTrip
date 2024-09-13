import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { collection, query, where, onSnapshot, addDoc, orderBy, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebaseConfig';

const ChatDetail = ({ route }) => {
  const { user } = route.params;
  const currentUser = auth.currentUser;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      where('participants', 'array-contains', currentUser.uid),
      orderBy('timestamp')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const filteredMsgs = msgs.filter(msg => msg.participants.includes(user.id));
      setMessages(filteredMsgs);
    });

    return () => unsubscribe();
  }, [user.id]);

  const handleSend = async () => {
    if (newMessage.trim() === '') return;
    await addDoc(collection(db, 'messages'), {
      text: newMessage,
      senderId: currentUser.uid,
      receiverId: user.id,
      participants: [currentUser.uid, user.id],
      timestamp: serverTimestamp(),
    });
    setNewMessage('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.message, item.senderId === currentUser.uid ? styles.sent : styles.received]}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.messageInfo}>{item.senderId === currentUser.uid ? 'You' : user.username} • {item.timestamp ? item.timestamp.toDate().toLocaleString() : ''}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Nhập tin nhắn ..."
        />
        <Button title="Gửi" onPress={handleSend} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  message: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
  },
  messageInfo: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  sent: {
    backgroundColor: '#d1fcd3',
    alignSelf: 'flex-end',
  },
  received: {
    backgroundColor: '#f1f0f0',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default ChatDetail;
