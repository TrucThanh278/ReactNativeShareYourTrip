import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { endpoints, authApi } from '../../configs/APIs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateHashtagPost = ({ onAddHashtag }) => {
  const [hashtag, setHashtag] = useState('');
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        } else {
          Alert.alert('Lỗi', 'Không tìm thấy token');
        }
      } catch (error) {
        console.error('Lỗi khi lấy token:', error.message);
        Alert.alert('Lỗi', 'Vui lòng đăng nhập');
      }
    };

    getToken();
  }, []);

  const createHashtag = async () => {
    try {
      if (!token) {
        Alert.alert('Lỗi', 'Vui lòng đăng nhập');
        return;
      }

      const api = authApi(token);
      const response = await api.post(endpoints.hashtags, { hashtag });

      if (response.data && response.data.id) {
        Alert.alert('Thành công', `Hashtag "${hashtag}" đã được tạo thành công`);
        onAddHashtag({ id: response.data.id, hashtag });
        setHashtag('');
      }
    } catch (error) {
      console.error('Lỗi khi tạo hashtag:', error.response?.data || error.message);
      Alert.alert('Lỗi', 'Tạo hashtag thất bại');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nhập hashtag mới"
        value={hashtag}
        onChangeText={setHashtag}
      />
      <Button
        title="Tạo Hashtag"
        onPress={createHashtag}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
  },
});

export default CreateHashtagPost;
