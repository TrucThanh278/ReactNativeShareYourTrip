import React, { useState, useContext } from 'react';
import { View, Button, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { MyDispatchContext } from '../../configs/Context';
import APIs, { endpoints, authApi } from '../../configs/APIs';
import { Picker } from '@react-native-picker/picker';

const RatingDetail = ({ route }) => {
  const navigation = useNavigation();
  const { postId } = route.params;
  const [stars, setStars] = useState('1'); 
  const dispatch = useContext(MyDispatchContext);

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Chưa đăng nhập', 'Vui lòng đăng nhập để gửi đánh giá');
        return;
      }

      console.log('Token lấy được:', token);

      const userId = await getCurrentUserId(token);
      console.log('User ID:', userId);

      const response = await APIs.post(
        endpoints['rating-post'],
        {
          rater: userId,
          post: postId,
          stars: parseInt(stars),
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );

      console.log('Response:', response);

      if (response.status !== 200 && response.status !== 201) {
        console.error('Response status:', response.status);
        console.error('Response data:', response.data);
        throw new Error('Network response was not ok');
      }

      Alert.alert('Thành công', 'Đánh giá đã được gửi thành công');
      navigation.goBack();
    } catch (error) {
      console.log('Lỗi khi gửi đánh giá:', error);
      Alert.alert('Lỗi', 'Không thể gửi đánh giá. Vui lòng thử lại sau.');
    }
  };

  const getCurrentUserId = async (token) => {
    try {
      const user = await authApi(token).get(endpoints['current-user']);
      return user.data.id;
    } catch (error) {
      console.error('Lỗi khi lấy user id hiện tại:', error);
      throw new Error('Không thể lấy user id hiện tại');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Chọn số sao:</Text>
      <Picker
        selectedValue={stars}
        style={{ height: 40, width: 200 }}
        onValueChange={(itemValue, itemIndex) =>
          setStars(itemValue)
        }
      >
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
      </Picker>
      <Button title="Gửi" onPress={handleSubmit} />
    </View>
  );
};

export default RatingDetail;