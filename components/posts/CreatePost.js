
// import React, { useEffect, useState, useContext } from 'react';
// import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
// import { MyUserContext } from '../../configs/Context';
// import { endpoints, authApi } from '../../configs/APIs';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import HashtagManager from './HashtagManager'; // Import component mới

// const CreatePost = ({ navigation }) => {
//   const [title, setTitle] = useState('');
//   const [startTime, setStartTime] = useState('2024-06-01T10:00:00Z');
//   const [endTime, setEndTime] = useState('2024-06-01T12:00:00Z');
//   const [cost, setCost] = useState('');
//   const [startingPoint, setStartingPoint] = useState('');
//   const [endPoint, setEndPoint] = useState('');
//   const [description, setDescription] = useState('');
//   const [createdHashtagsIds, setCreatedHashtagsIds] = useState([]);
//   const [token, setToken] = useState(null);

//   const user = useContext(MyUserContext);

//   useEffect(() => {
//     const getToken = async () => {
//       try {
//         const storedToken = await AsyncStorage.getItem('token');
//         if (storedToken) {
//           setToken(storedToken);
//         } else {
//           Alert.alert('Lỗi', 'Không tìm thấy token');
//         }
//       } catch (error) {
//         console.error('Lỗi khi lấy token:', error.message);
//         Alert.alert('Lỗi', 'Không thể lấy token');
//       }
//     };

//     getToken();
//   }, []);

//   const handleSubmit = async () => {
//     try {
//       if (!token) {
//         Alert.alert('Lỗi', 'Không tìm thấy token');
//         return;
//       }

//       const api = authApi(token);

//       const postPayload = {
//         title,
//         start_time: startTime,
//         end_time: endTime,
//         cost: parseFloat(cost),
//         starting_point: startingPoint,
//         end_point: endPoint,
//         status: true,
//         user: user.id,
//         hashtags: createdHashtagsIds,
//         description,
//       };

//       console.log('Post Payload:', postPayload); // Log thông tin payload để kiểm tra

//       const response = await api.post(endpoints.posts, postPayload);

//       console.log('Tạo bài viết thành công:', response.data);
//       Alert.alert('Thành công', 'Tạo bài viết thành công', [
//         { text: 'OK', onPress: () => navigation.navigate('AddImage', { postId: response.data.id, token }) }
//       ]);
//     } catch (error) {
//       console.error('Lỗi khi tạo bài viết:', error.response?.data || error.message);
//       Alert.alert('Lỗi', 'Tạo bài viết thất bại');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Tiêu đề"
//         value={title}
//         onChangeText={setTitle}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Thời gian bắt đầu (YYYY-MM-DDTHH:MM:SSZ)"
//         value={startTime}
//         onChangeText={setStartTime}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Thời gian kết thúc (YYYY-MM-DDTHH:MM:SSZ)"
//         value={endTime}
//         onChangeText={setEndTime}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Chi phí"
//         value={cost}
//         onChangeText={setCost}
//         keyboardType="numeric"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Điểm bắt đầu"
//         value={startingPoint}
//         onChangeText={setStartingPoint}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Điểm kết thúc"
//         value={endPoint}
//         onChangeText={setEndPoint}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Mô tả"
//         value={description}
//         onChangeText={setDescription}
//         multiline
//       />
//       <Text>
//       <HashtagManager token={token} setCreatedHashtagsIds={setCreatedHashtagsIds} />
//       </Text>
//       <Button
//         title="Tạo bài viết"
//         onPress={handleSubmit}
//         disabled={!token}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     justifyContent: 'center',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 12,
//     padding: 10,
//   },
// });

// export default CreatePost;
// import React, { useState, useEffect, useContext } from 'react';
// import { View, TextInput, Button, Alert, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
// import { MyUserContext } from '../../configs/Context';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import CreateHashtagPost from './CreateHashtagPost';
// import { endpoints, authApi } from '../../configs/APIs';

// const CreatePost = ({ navigation, route }) => {
//   const [title, setTitle] = useState('');
//   const [startTime, setStartTime] = useState('2024-06-01T10:00:00Z');
//   const [endTime, setEndTime] = useState('2024-06-01T12:00:00Z');
//   const [cost, setCost] = useState('');
//   const [startingPoint, setStartingPoint] = useState('');
//   const [endPoint, setEndPoint] = useState('');
//   const [description, setDescription] = useState('');
//   const [createdHashtagsIds, setCreatedHashtagsIds] = useState([]);
//   const [createdHashtagId, setCreatedHashtagId] = useState(null);
//   const [token, setToken] = useState(null);
//   const [createdHashtags, setCreatedHashtags] = useState([]); // State để lưu danh sách hashtag đã tạo
//   const user = useContext(MyUserContext);

//   useEffect(() => {
//     const getToken = async () => {
//       try {
//         const storedToken = await AsyncStorage.getItem('token');
//         if (storedToken) {
//           setToken(storedToken);
//         } else {
//           Alert.alert('Lỗi', 'Không tìm thấy token');
//         }
//       } catch (error) {
//         console.error('Lỗi khi lấy token:', error.message);
//         Alert.alert('Lỗi', 'Không thể lấy token');
//       }
//     };

//     getToken();
//   }, []);

//   useEffect(() => {
//     if (route.params && route.params.createdHashtagId) {
//       setCreatedHashtagId(route.params.createdHashtagId);
//     }
//   }, [route.params]);

//   // Hàm để thêm hashtag mới vào danh sách
//   const handleAddHashtag = (hashtag) => {
//     setCreatedHashtags([...createdHashtags, { id: createdHashtags.length + 1, hashtag }]);
//   };

//   const handleSubmit = async () => {
//     try {
//       if (!token) {
//         Alert.alert('Lỗi', 'Không tìm thấy token');
//         return;
//       }

//       const api = authApi(token);

//       const postPayload = {
//         title,
//         start_time: startTime,
//         end_time: endTime,
//         cost: parseFloat(cost),
//         starting_point: startingPoint,
//         end_point: endPoint,
//         status: true,
//         user: user.id,
//         hashtags: createdHashtagsIds.concat(createdHashtagId),
//         description,
//       };

//       const response = await api.post(endpoints.posts, postPayload);
      
//       Alert.alert('Thành công', 'Tạo bài viết thành công', [
//         { text: 'OK', onPress: () => navigation.navigate('AddImage', { postId: response.data.id, token }) },
//       ]);
//     } catch (error) {
//       console.error('Lỗi khi tạo bài viết:', error.response?.data || error.message);
//       Alert.alert('Lỗi', 'Tạo bài viết thất bại');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Tiêu đề"
//         value={title}
//         onChangeText={setTitle}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Thời gian bắt đầu (YYYY-MM-DDTHH:MM:SSZ)"
//         value={startTime}
//         onChangeText={setStartTime}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Thời gian kết thúc (YYYY-MM-DDTHH:MM:SSZ)"
//         value={endTime}
//         onChangeText={setEndTime}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Chi phí"
//         value={cost}
//         onChangeText={setCost}
//         keyboardType="numeric"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Điểm bắt đầu"
//         value={startingPoint}
//         onChangeText={setStartingPoint}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Điểm kết thúc"
//         value={endPoint}
//         onChangeText={setEndPoint}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Mô tả"
//         value={description}
//         onChangeText={setDescription}
//         multiline
//       />
//       {/* Render CreateHashtagPost component */}
//       <CreateHashtagPost navigation={navigation} onAddHashtag={handleAddHashtag} />
//       {/* Hiển thị danh sách các hashtag đã tạo */}
//       <FlatList
//         data={createdHashtags}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity onPress={() => setCreatedHashtagId(item.id)}>
//             <Text>{item.hashtag}</Text>
//           </TouchableOpacity>
//         )}
//       />
//       <Button
//         title="Tạo bài viết"
//         onPress={handleSubmit}
//         disabled={!token}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     justifyContent: 'center',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 12,
//     padding: 10,
//   },
// });

// export default CreatePost;
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
          Alert.alert('Lỗi', 'Không tìm thấy token');
        }
      } catch (error) {
        console.error('Lỗi khi lấy token:', error.message);
        Alert.alert('Lỗi', 'Không thể lấy token');
      }
    };

    getToken();
  }, []);

  const handleAddHashtag = (newHashtag) => {
    setCreatedHashtags([...createdHashtags, newHashtag]);
  };

  const toggleSelectHashtag = (hashtagId) => {
    if (selectedHashtagIds.includes(hashtagId)) {
      setSelectedHashtagIds(selectedHashtagIds.filter(id => id !== hashtagId));
    } else {
      setSelectedHashtagIds([...selectedHashtagIds, hashtagId]);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!token) {
        Alert.alert('Lỗi', 'Không tìm thấy token');
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
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Start time (YYYY-MM-DDTHH:MM:SSZ)"
        value={startTime}
        onChangeText={setStartTime}
      />
      <TextInput
        style={styles.input}
        placeholder="End time (YYYY-MM-DDTHH:MM:SSZ)"
        value={endTime}
        onChangeText={setEndTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Cost"
        value={cost}
        onChangeText={setCost}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Starting point"
        value={startingPoint}
        onChangeText={setStartingPoint}
      />
      <TextInput
        style={styles.input}
        placeholder="End point"
        value={endPoint}
        onChangeText={setEndPoint}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      {/* Render CreateHashtagPost component */}
      <CreateHashtagPost onAddHashtag={handleAddHashtag} />
      {/* Hiển thị danh sách các hashtag đã tạo */}
      <FlatList
        data={createdHashtags}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleSelectHashtag(item.id)}>
            <Text style={{ color: selectedHashtagIds.includes(item.id) ? 'blue' : 'black' }}>
              {item.hashtag}
            </Text>
          </TouchableOpacity>
        )}
      />
      <Button
        title="Create Post"
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
