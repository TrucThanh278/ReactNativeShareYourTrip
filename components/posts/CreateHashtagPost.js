
// import React, { useState } from 'react';
// import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
// import { endpoints, authApi } from '../../configs/APIs';

// const HashtagManager = ({ token, setCreatedHashtagsIds }) => {
//   const [hashtags, setHashtags] = useState('');

//   const createOrFindHashtags = async (api, tags) => {
//     const createdHashtagsIds = [];
//     for (let tag of tags) {
//       try {
//         const formData = new FormData();
//         formData.append('hashtag', tag);
        
//         const response = await api.post(endpoints.hashtags, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
        
//         if (response.data && response.data.id) {
//           createdHashtagsIds.push(response.data.id);
//           console.log(`Hashtag "${tag}" đã được tạo hoặc tìm thấy với ID: ${response.data.id}`);
//         }
//       } catch (error) {
//         console.error(`Lỗi khi tạo hoặc kiểm tra hashtag "${tag}":`, error.response?.data || error.message);
//       }
//     }
//     return createdHashtagsIds;
//   };

//   const handleHashtagSubmit = async () => {
//     try {
//       if (!token) {
//         Alert.alert('Lỗi', 'Không tìm thấy token');
//         return;
//       }

//       const api = authApi(token);
//       const hashtagsArray = hashtags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

//       if (hashtagsArray.length === 0) {
//         Alert.alert('Lỗi', 'Vui lòng nhập ít nhất một hashtag');
//         return;
//       }

//       const createdHashtags = await createOrFindHashtags(api, hashtagsArray);

//       if (createdHashtags.length === 0) {
//         Alert.alert('Lỗi', 'Không thể tạo hoặc tìm thấy một hoặc nhiều hashtags');
//         return;
//       }

//       setCreatedHashtagsIds(createdHashtags);
//       Alert.alert('Thành công', 'Hashtags đã được lưu');
//     } catch (error) {
//       console.error('Lỗi khi tạo hashtags:', error.response?.data || error.message);
//       Alert.alert('Lỗi', 'Tạo hashtags thất bại');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Hashtags (ngăn cách bởi dấu phẩy)"
//         value={hashtags}
//         onChangeText={setHashtags}
//       />
//       <Button
//         title="Lưu"
//         onPress={handleHashtagSubmit}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 12,
//     padding: 10,
//   },
// });

// export default HashtagManager;
// import React, { useState, useEffect } from 'react';
// import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
// import { endpoints, authApi } from '../../configs/APIs';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const CreateHashtagPost = ({ navigation }) => {
//   const [hashtag, setHashtag] = useState('');
//   const [token, setToken] = useState(null);

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

//   const createHashtag = async () => {
//     try {
//       if (!token) {
//         Alert.alert('Lỗi', 'Không tìm thấy token');
//         return;
//       }

//       const api = authApi(token);
//       const response = await api.post(endpoints.hashtags, { hashtag });

//       if (response.data && response.data.id) {
//         Alert.alert('Thành công', `Hashtag "${hashtag}" đã được tạo thành công`);
//         navigation.navigate('CreatePost', { createdHashtagId: response.data.id });
//       }
//     } catch (error) {
//       console.error('Lỗi khi tạo hashtag:', error.response?.data || error.message);
//       Alert.alert('Lỗi', 'Tạo hashtag thất bại');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Nhập hashtag mới"
//         value={hashtag}
//         onChangeText={setHashtag}
//       />
//       <Button
//         title="Tạo Hashtag"
//         onPress={createHashtag}
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

// export default CreateHashtagPost;

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
        Alert.alert('Lỗi', 'Không thể lấy token');
      }
    };

    getToken();
  }, []);

  const createHashtag = async () => {
    try {
      if (!token) {
        Alert.alert('Lỗi', 'Không tìm thấy token');
        return;
      }

      const api = authApi(token);
      const response = await api.post(endpoints.hashtags, { hashtag });

      if (response.data && response.data.id) {
        Alert.alert('Thành công', `Hashtag "${hashtag}" đã được tạo thành công`);
        onAddHashtag({ id: response.data.id, hashtag }); // Gọi callback với hashtag mới
        setHashtag(''); // Xóa nội dung trong TextInput sau khi tạo thành công
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
        placeholder="Enter new hashtag"
        value={hashtag}
        onChangeText={setHashtag}
      />
      <Button
        title="Create Hashtag"
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
