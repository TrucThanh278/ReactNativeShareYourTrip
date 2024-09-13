import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { MyUserContext } from '../../configs/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateHashtagPost from './CreateHashtagPost';
import { endpoints, authApi } from '../../configs/APIs';

const CreatePost = ({ navigation, route }) => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('2024-06-01T10:00:00Z');
  const [endTime, setEndTime] = useState('2024-06-01T12:00:00Z');
  const [cost, setCost] = useState('');
  const [startingPoint, setStartingPoint] = useState('');
  const [endPoint, setEndPoint] = useState('');
  const [description, setDescription] = useState('');
  const [createdHashtags, setCreatedHashtags] = useState([]);
  const [selectedHashtagIds, setSelectedHashtagIds] = useState([]);
  const [token, setToken] = useState(null);
  const user = useContext(MyUserContext);

  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        } else {
          Alert.alert('Lỗi', 'Vui lòng đăng nhập');
        }
      } catch (error) {
        console.error('Lỗi khi lấy token:', error.message);
        Alert.alert('Lỗi', 'Vui lòng đăng nhập');
      }
    };

    getToken();
  }, []);

  const handleAddHashtag = (newHashtag) => {
    setCreatedHashtags([...createdHashtags, newHashtag]);
  };

  const toggleSelectHashtag = (hashtag) => {
    if (selectedHashtagIds.includes(hashtag.id)) {
      setSelectedHashtagIds(selectedHashtagIds.filter(id => id !== hashtag.id));
    } else {
      setSelectedHashtagIds([...selectedHashtagIds, hashtag.id]);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!token) {
        Alert.alert('Lỗi', 'Vui lòng đăng nhập');
        return;
      }

      const api = authApi(token);

      const postPayload = {
        title,
        start_time: startTime,
        end_time: endTime,
        cost: parseFloat(cost),
        starting_point: startingPoint,
        end_point: endPoint,
        status: true,
        user: user.id,
        hashtags: selectedHashtagIds,
        description,
      };

      const response = await api.post(endpoints.posts, postPayload);

      Alert.alert('Thành công', 'Tạo bài viết thành công', [
        { text: 'OK', onPress: () => navigation.navigate('AddImage', { postId: response.data.id, token }) },
      ]);
    } catch (error) {
      console.error('Lỗi khi tạo bài viết:', error.response?.data || error.message);
      Alert.alert('Lỗi', 'Tạo bài viết thất bại');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tiêu đề"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Thời gian bắt đầu (YYYY-MM-DDTHH:MM:SSZ)"
        value={startTime}
        onChangeText={setStartTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Thời gian kết thúc (YYYY-MM-DDTHH:MM:SSZ)"
        value={endTime}
        onChangeText={setEndTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Chi phí"
        value={cost}
        onChangeText={setCost}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Địa điểm bắt đầu"
        value={startingPoint}
        onChangeText={setStartingPoint}
      />
      <TextInput
        style={styles.input}
        placeholder="Địa điểm kết thúc"
        value={endPoint}
        onChangeText={setEndPoint}
      />
      <TextInput
        style={styles.input}
        placeholder="Nội dung"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <CreateHashtagPost onAddHashtag={handleAddHashtag} />
      <FlatList
        data={createdHashtags}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleSelectHashtag(item)}>
            <Text style={{ color: selectedHashtagIds.includes(item.id) ? 'blue' : 'black' }}>
              {item.hashtag}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Button
        title="Đăng bài viết"
        onPress={handleSubmit}
        disabled={!token}
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

export default CreatePost;
