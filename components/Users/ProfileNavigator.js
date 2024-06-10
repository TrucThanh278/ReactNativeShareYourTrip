import React, { useEffect, useState, useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { MyUserContext } from '../../configs/Context';
import Profile from './Profile';
import ProfileUser from './ProfileUser';

const ProfileNavigator = ({ navigation, route }) => {
  const { userId } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const user = useContext(MyUserContext);

  useEffect(() => {
    // Kiểm tra xem userId từ route params có khớp với userId của user đang đăng nhập không
    setIsCurrentUser(user && user.id === userId);
    setIsLoading(false);
  }, [user, userId]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (isCurrentUser) {
    // Nếu userId trùng khớp với userId của user đang đăng nhập, hiển thị Profile
    return <Profile navigation={navigation} />;
  } else {
    // Nếu userId không trùng khớp, hiển thị ProfileUser
    return <ProfileUser route={route} />;
  }
};

export default ProfileNavigator;
