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
    setIsCurrentUser(user && user.id === userId);
    setIsLoading(false);
  }, [user, userId]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (isCurrentUser) {
    return <Profile navigation={navigation} />;
  } else {
    return <ProfileUser route={route} />;
  }
};

export default ProfileNavigator;
