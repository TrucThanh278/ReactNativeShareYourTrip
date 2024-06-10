import React, { useReducer, useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Login from './components/Users/Login';
import Register from './components/Users/Register';
import Profile from './components/Users/Profile';
import UpdateProfile from './components/Users/UpdateProfile';
import Logout from './components/Users/Logout';
import MyUserReducer from './reducers/MyUserReducers';
import { MyUserContext, MyDispatchContext } from './configs/Context';
import Post from './components/posts/Post';
import ProfileUser from './components/Users/ProfileUser'; 
import ProfileNavigator from './components/Users/ProfileNavigator';
import CreatePost from './components/posts/CreatePost'; 
import AddImage from './components/posts/AddImage';
import CreateHashtagPost from './components/posts/CreateHashtagPost';
import RatingDetail from './components/Users/RatingDetail'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} options={{ title: 'My Profile' }} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{ title: 'Update Profile' }} />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Post} options={{ title: 'Home' }} />
      <Stack.Screen name="ProfileNavigator" component={ProfileNavigator} options={{ title: 'Profile' }} />
      <Stack.Screen name="CreatePost" component={CreatePost} options={{ title: 'Create Post' }} />
      <Stack.Screen name="AddImage" component={AddImage} options={{ title: 'Image Post' }} />
      <Stack.Screen name="CreateHashtagPost" component={CreateHashtagPostScreen} options={{ title: 'Create Hashtag Post' }} />
      <Stack.Screen name="RatingDetail" component={RatingDetail} />
    </Stack.Navigator>
  );
};

const CreateHashtagPostScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CreateHashtagPost />
    </View>
  );
};

const MyTab = () => {
  const user = useContext(MyUserContext);

  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="HomeStack" 
        component={HomeStack} 
        options={{
          title: 'Home', 
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size} />
        }} 
      />
      {user ? (
        <>
          <Tab.Screen 
            name="ProfileStack" 
            component={ProfileStack} 
            options={{
              title: user.username, 
              tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account" color={color} size={size} />
            }} 
          />
          <Tab.Screen 
            name="Logout" 
            component={Logout} 
            options={{
              tabBarButton: () => null 
            }} 
          />
        </>
      ) : (
        <>
          <Tab.Screen 
            name="Register" 
            component={Register} 
            options={{
              title: 'REGISTER', 
              tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account" color={color} size={size} />
            }} 
          />
          <Tab.Screen 
            name="Login" 
            component={Login} 
            options={{
              title: 'LOGIN', 
              tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="login" color={color} size={size} />
            }} 
          />
        </>
      )}
    </Tab.Navigator>
  );
};

const App = () => {
  const [user, dispatch] = useReducer(MyUserReducer, null);

  return (
    <NavigationContainer>
      <MyUserContext.Provider value={user}>
        <MyDispatchContext.Provider value={dispatch}>
          <MyTab />
        </MyDispatchContext.Provider>
      </MyUserContext.Provider>
    </NavigationContainer>
  );
};

export default App;

