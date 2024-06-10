// import React, { useEffect, useState } from 'react';
// import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Alert } from "react-native";
// import { Button } from 'react-native-paper';
// import MyStyles from '../../styles/MyStyles';
// import { FontAwesome } from '@expo/vector-icons';
// import { authApi, endpoints } from '../../configs/APIs';
// import ReportUserPage from './ReportUserPage'; 
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const ProfileUser = ({ route }) => {
//     const [user, setUser] = useState(null);
//     const [avatar, setAvatar] = useState(null);
//     const [coverPhoto, setCoverPhoto] = useState(null);
//     const [showReportModal, setShowReportModal] = useState(false);
//     const [token, setToken] = useState(null);
//     const [currentUserId, setCurrentUserId] = useState(null);
//     const [isFollowing, setIsFollowing] = useState(false);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const { userId } = route.params;
//                 const response = await authApi().get(`${endpoints['user-detail']}${userId}`);
//                 setUser(response.data);

//                 // Kiểm tra xem người dùng hiện tại đã follow người dùng trên trang ProfileUser hay chưa
//                 const token = await AsyncStorage.getItem('token');
//                 if (token) {
//                     const api = authApi(token);
//                     const currentUserResponse = await api.get(endpoints['current-user']);
//                     setCurrentUserId(currentUserResponse.data.id);
                    
//                     const followStatusResponse = await api.get(endpoints['follow-user'], {
//                         params: {
//                             follower_id: currentUserResponse.data.id,
//                             following_id: userId
//                         }
//                     });
//                     setIsFollowing(followStatusResponse.data.is_following);
//                 }
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         fetchUserData();

//         AsyncStorage.getItem('token').then(token => {
//             setToken(token);
//             if (token) {
//                 authApi(token).get(endpoints['current-user']).then(response => {
//                     setCurrentUserId(response.data.id);
//                 }).catch(error => {
//                     console.error('Error retrieving current user ID:', error);
//                 });
//             }
//         }).catch(error => {
//             console.error('Error retrieving token from AsyncStorage:', error);
//         });
//     }, [route.params]);

//     const pickAvatar = async () => {
//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.All,
//             allowsEditing: true,
//             aspect: [4, 3],
//             quality: 1,
//         });

//         if (!result.cancelled) {
//             setAvatar(result.uri);
//         }
//     };

//     const pickCoverPhoto = async () => {
//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.All,
//             allowsEditing: true,
//             aspect: [16, 9],
//             quality: 1,
//         });

//         if (!result.cancelled) {
//             setCoverPhoto(result.uri);
//         }
//     };

//     const handleReport = () => {
//         setShowReportModal(true);
//     };

//     const handleFollow = async () => {
//         try {
//             if (!token) {
//                 console.error('Token not found in AsyncStorage');
//                 return;
//             }

//             if (currentUserId === user.id) {
//                 Alert.alert('Error', 'You cannot follow yourself.');
//                 return;
//             }

//             const api = authApi(token);
//             if (isFollowing) {
//                 // Unfollow logic (if necessary)
//                 await api.delete(endpoints['follow-user'], {
//                     data: {
//                         follower_id: currentUserId,
//                         following_id: user.id
//                     }
//                 });
//                 setIsFollowing(false);
//                 console.log('Unfollowed successfully');
//             } else {
//                 const response = await api.post(endpoints['follow-user'], {
//                     follower_id: currentUserId,
//                     following_id: user.id
//                 });
//                 setIsFollowing(true);
//                 console.log('Followed successfully:', response.data);
//             }
//         } catch (error) {
//             if (error.response && error.response.data && error.response.data.error) {
//                 console.error('Follow failed:', error.response.data.error);
//                 Alert.alert('Follow failed', error.response.data.error);
//             } else {
//                 console.error('Follow failed:', error);
//                 Alert.alert('Follow failed', 'An error occurred. Please try again later.');
//             }
//         }
//     };

//     if (!user) {
//         return <Text>Loading...</Text>;
//     }

//     return (
//         <ScrollView style={[MyStyles.container, MyStyles.margin]}>

//             <View>
//                 <TouchableOpacity onPress={pickCoverPhoto}>
//                     <Image source={coverPhoto ? { uri: coverPhoto } : require("./assets/images/default_cover.jpg")} style={styles.coverPhoto} />
//                 </TouchableOpacity>
//                 <View style={[ styles.position ,styles.margin_avatar]}>
//                     <TouchableOpacity onPress={pickAvatar}>
//                         {avatar ? (
//                             <Image source={{ uri: avatar }} style={styles.avatar} />
//                         ) : (
//                             <Image source={require('./assets/images/default_avatar.jpg')} style={styles.avatar} />
//                         )}
//                     </TouchableOpacity>
//                 </View>  
//                 <View style={{marginTop: 25}}>
//                     <View style={[MyStyles.row]}>
//                         <Text style={[styles.subject, styles.margin_left]}> {user.first_name} {user.last_name}</Text>
//                         <Button 
//                             icon={isFollowing ? "account-check-outline" : "account-plus-outline"}
//                             onPress={handleFollow}
//                         >
//                             {isFollowing ? "Following" : "Follow"}
//                         </Button>
//                     </View>
//                     <View style={[MyStyles.row]}>
//                             <Text style={[styles.text, MyStyles.margin]}>Follower: {user.followers}</Text>
//                             <Text style={[styles.text, MyStyles.margin]}>Following: {user.following}</Text>

//                     </View>
//                     <View style={styles.ratingContainer}>
//                             <Text style={[styles.text]}>Reports: {user.reported_user} </Text>
//                     </View>
//                     <Text style={styles.text}>Email: {user.email}</Text>
//                     <Text style={styles.text}>Phone: {user.phone_number}</Text>
//                     <Button  icon="message"  buttonColor="rgb(79, 133, 13)" mode="contained">Chat</Button>
//             <View>
//                 {/* Content của ProfileUser */}
//                 {/* ... */}
                
//                 {/* Button để báo cáo */}
//                 <Button icon="alert-circle" title="Report" onPress={handleReport}>Report</Button>

//                 {/* Modal hiển thị trang báo cáo */}
//                 <Modal
//                     visible={showReportModal}
//                     animationType="slide"
//                     onRequestClose={() => setShowReportModal(false)}
//                 >
//                     {/* Truyền userId và token xuống ReportUserPage */}
//                     <ReportUserPage userId={user.id} token={token} />
//                 </Modal>

//                 {/* Content khác của ProfileUser */}
//                 {/* ... */}
//             </View>

//                     <View style={styles.collections}>
//                     <Text style={styles.sectionTitle}>Personal Collections</Text>
//                     <ScrollView horizontal style={{ height: 150 }}>
//                         <View
//                             style={{
//                                 height: "100%",
//                                 position: "relative",
//                                 width: 250,
//                                 margin: 5,
//                             }}
//                         >
//                             <Image
//                                 source={{
//                                     uri: "https://res.cloudinary.com/djyggobeq/image/upload/v1715852352/dzvud8wptqigfnbsoemr.jpg",
//                                 }}
//                                 style={{ width: "100%", height: "100%" }}
//                             />
//                             <View
//                                 style={{
//                                     position: "absolute",
//                                     top: 0,
//                                     bottom: 0,
//                                     right: 0,
//                                     left: 0,
//                                     backgroundColor: "rgba(0,0,0,0.2)",
//                                     justifyContent: "center",
//                                     alignItems: "center",
//                                 }}
//                             >
//                                 <Text>Content</Text>
//                             </View>
//                         </View>

//                         <View
//                             style={{
//                                 height: "100%",
//                                 position: "relative",
//                                 width: 250,
//                                 margin: 5,
//                             }}
//                         >
//                             <Image
//                                 source={{
//                                     uri: "https://res.cloudinary.com/djyggobeq/image/upload/v1715852352/dzvud8wptqigfnbsoemr.jpg",
//                                 }}
//                                 style={{ width: "100%", height: "100%" }}
//                             />
//                             <View
//                                 style={{
//                                     position: "absolute",
//                                     top: 0,
//                                     bottom: 0,
//                                     right: 0,
//                                     left: 0,
//                                     backgroundColor: "rgba(0,0,0,0.2)",
//                                     justifyContent: "center",
//                                     alignItems: "center",
//                                 }}
//                             >
//                                 <Text>Content</Text>
//                             </View>
//                         </View>

//                         <View
//                             style={{
//                                 height: "100%",
//                                 position: "relative",
//                                 width: 250,
//                                 margin: 5,
//                             }}
//                         >
//                             <Image
//                                 source={{
//                                     uri: "https://res.cloudinary.com/djyggobeq/image/upload/v1715852352/dzvud8wptqigfnbsoemr.jpg",
//                                 }}
//                                 style={{ width: "100%", height: "100%" }}
//                             />
//                             <View
//                                 style={{
//                                     position: "absolute",
//                                     top: 0,
//                                     bottom: 0,
//                                     right: 0,
//                                     left: 0,
//                                     backgroundColor: "rgba(0,0,0,0.2)",
//                                     justifyContent: "center",
//                                     alignItems: "center",
//                                 }}
//                             >
//                                 <Text>Content</Text>
//                             </View>
//                         </View>
//                     </ScrollView>
//                 </View>
// 			</View>

// 			<View style={styles.stats}>
// 				<Text style={styles.sectionTitle}>Tours</Text>
// 				<View style={styles.statItem}>
// 					<Text style={styles.statLabel}>Planned</Text>
// 					<Text style={styles.statValue}>441</Text>
// 				</View>
// 				<View style={styles.statItem}>
// 					<Text style={styles.statLabel}>Completed</Text>
// 					<Text style={styles.statValue}>825</Text>
// 				</View>

// 				<Text style={styles.sectionTitle}>Highlights</Text>
// 				<View style={styles.statItem}>
// 					<Text style={styles.statLabel}>Recommended</Text>
// 					<Text style={styles.statValue}>1674</Text>
// 				</View>
// 			</View>
                
//             </View>
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     subject: {
//         fontSize: 20,
//         fontWeight: "bold",
//         marginBottom: 10,
//     },
//     avatar: {
//         width: 100,
//         height: 100,
//         borderRadius: 50,
//         marginBottom: 10,
//     },
//     coverPhoto: {
//         width: "100%",
//         height: 200,
//         marginBottom: 10,
//     },
//     text: {
//         marginBottom: 5,
//     },
//     ratingContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//     },
//     position: {
//         position: "absolute",
//         top: 100,
//         left: 10,
//     },
//     margin_left_fo:{
//         marginLeft:190,
//         position: "absolute",
//     },
//     margin_avatar: {
//         marginTop: 30,
//         alignItems: 'center',
//     },
//     margin_right: {
//         marginRight:15
//     },
// 	collections: {
// 		padding: 20,
// 	},
// 	sectionTitle: {
// 		fontSize: 20,
// 		fontWeight: "bold",
// 		marginBottom: 10,
// 	},
// 	stats: {
// 		padding: 20,
// 	},
// 	statItem: {
// 		flexDirection: "row",
// 		justifyContent: "space-between",
// 		paddingVertical: 10,
// 	},
// 	statLabel: {
// 		fontSize: 18,
// 	},
// 	statValue: {
// 		fontSize: 18,
// 		color: "#888",
// 	},
//     margin_left :{
//         marginLeft:20
//     }
// });

// export default ProfileUser;
import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Alert } from "react-native";
import { Button } from 'react-native-paper';
import MyStyles from '../../styles/MyStyles';
import { FontAwesome } from '@expo/vector-icons';
import { authApi, endpoints } from '../../configs/APIs';
import ReportUserPage from './ReportUserPage'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileUser = ({ route }) => {
    const [user, setUser] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [showReportModal, setShowReportModal] = useState(false);
    const [token, setToken] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { userId } = route.params;
                const response = await authApi().get(`${endpoints['user-detail']}${userId}`);
                setUser(response.data);

                // Lấy hình ảnh avatar từ dữ liệu người dùng
                setAvatar(response.data.avatar); // Giả sử avatar được trả về từ API là một URL hợp lệ
                setCoverPhoto(response.data.coverPhoto); // Tương tự cho cover photo

                // Kiểm tra xem người dùng hiện tại đã follow người dùng trên trang ProfileUser hay chưa
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    const api = authApi(token);
                    const currentUserResponse = await api.get(endpoints['current-user']);
                    setCurrentUserId(currentUserResponse.data.id);
                    
                    const followStatusResponse = await api.get(endpoints['follow-user'], {
                        params: {
                            follower_id: currentUserResponse.data.id,
                            following_id: userId
                        }
                    });
                    setIsFollowing(followStatusResponse.data.is_following);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserData();

        AsyncStorage.getItem('token').then(token => {
            setToken(token);
            if (token) {
                authApi(token).get(endpoints['current-user']).then(response => {
                    setCurrentUserId(response.data.id);
                }).catch(error => {
                    console.error('Error retrieving current user ID:', error);
                });
            }
        }).catch(error => {
            console.error('Error retrieving token from AsyncStorage:', error);
        });
    }, [route.params]);

    const handleReport = () => {
        setShowReportModal(true);
    };

    const handleFollow = async () => {
        try {
            if (!token) {
                console.error('Token not found in AsyncStorage');
                return;
            }

            if (currentUserId === user.id) {
                Alert.alert('Error', 'You cannot follow yourself.');
                return;
            }

            const api = authApi(token);
            if (isFollowing) {
                // Unfollow logic (if necessary)
                await api.delete(endpoints['follow-user'], {
                    data: {
                        follower_id: currentUserId,
                        following_id: user.id
                    }
                });
                setIsFollowing(false);
                console.log('Unfollowed successfully');
            } else {
                const response = await api.post(endpoints['follow-user'], {
                    follower_id: currentUserId,
                    following_id: user.id
                });
                setIsFollowing(true);
                console.log('Followed successfully:', response.data);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                console.error('Follow failed:', error.response.data.error);
                Alert.alert('Follow failed', error.response.data.error);
            } else {
                console.error('Follow failed:', error);
                Alert.alert('Follow failed', 'An error occurred. Please try again later.');
            }
        }
    };

    if (!user) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView style={[MyStyles.container, MyStyles.margin]}>

            <View>
                <TouchableOpacity>
                    <Image source={coverPhoto ? { uri: coverPhoto } : require("./assets/images/default_cover.jpg")} style={styles.coverPhoto} />
                </TouchableOpacity>
                <View style={[ styles.position ,styles.margin_avatar]}>
                    <TouchableOpacity>
                        {avatar ? (
                            <Image source={{ uri: avatar }} style={styles.avatar} />
                        ) : (
                            <Image source={require('./assets/images/default_avatar.jpg')} style={styles.avatar} />
                        )}
                    </TouchableOpacity>
                </View>  
                <View style={{marginTop: 25}}>
                    <View style={[MyStyles.row]}>
                        <Text style={[styles.subject, styles.margin_left]}> {user.first_name} {user.last_name}</Text>
                        <Button 
                            icon={isFollowing ? "account-check-outline" : "account-plus-outline"}
                            onPress={handleFollow}
                        >
                            {isFollowing ? "Following" : "Follow"}
                        </Button>
                    </View>
                    <View style={[MyStyles.row]}>
                            <Text style={[styles.text, MyStyles.margin]}>Follower: {user.followers}</Text>
                            <Text style={[styles.text, MyStyles.margin]}>Following: {user.following}</Text>

                    </View>
                    <View style={styles.ratingContainer}>
                            <Text style={[styles.text]}>Reports: {user.reported_user} </Text>
                    </View>
                    <Text style={styles.text}>Email: {user.email}</Text>
                    <Text style={styles.text}>Phone: {user.phone_number}</Text>
                    <Button  icon="message"  buttonColor="rgb(79, 133, 13)" mode="contained">Chat</Button>
            <View>
                {/* Content của ProfileUser */}
                {/* ... */}
                
                {/* Button để báo cáo */}
                <Button icon="alert-circle" title="Report" onPress={handleReport}>Report</Button>

                {/* Modal hiển thị trang báo cáo */}
                <Modal
                    visible={showReportModal}
                    animationType="slide"
                    onRequestClose={() => setShowReportModal(false)}
                >
                    {/* Truyền userId và token xuống ReportUserPage */}
                    <ReportUserPage userId={user.id} token={token} />
                </Modal>

                {/* Content khác của ProfileUser */}
                {/* ... */}
            </View>

                    <View style={styles.collections}>
                    <Text style={styles.sectionTitle}>Personal Collections</Text>
                    <ScrollView horizontal style={{ height: 150 }}>
                        <View
                            style={{
                                height: "100%",
                                position: "relative",
                                width: 250,
                                margin: 5,
                            }}
                        >
                            <Image
                                source={{
                                    uri: "https://res.cloudinary.com/djyggobeq/image/upload/v1715852352/dzvud8wptqigfnbsoemr.jpg",
                                }}
                                style={{ width: "100%", height: "100%" }}
                            />
                            <View
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    bottom: 0,
                                    right: 0,
                                    left: 0,
                                    backgroundColor: "rgba(0,0,0,0.2)",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text>Content</Text>
                            </View>
                        </View>

                        <View
                            style={{
                                height: "100%",
                                position: "relative",
                                width: 250,
                                margin: 5,
                            }}
                        >
                            <Image
                                source={{
                                    uri: "https://res.cloudinary.com/djyggobeq/image/upload/v1715852352/dzvud8wptqigfnbsoemr.jpg",
                                }}
                                style={{ width: "100%", height: "100%" }}
                            />
                            <View
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    bottom: 0,
                                    right: 0,
                                    left: 0,
                                    backgroundColor: "rgba(0,0,0,0.2)",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text>Content</Text>
                            </View>
                        </View>

                        <View
                            style={{
                                height: "100%",
                                position: "relative",
                                width: 250,
                                margin: 5,
                            }}
                        >
                            <Image
                                source={{
                                    uri: "https://res.cloudinary.com/djyggobeq/image/upload/v1715852352/dzvud8wptqigfnbsoemr.jpg",
                                }}
                                style={{ width: "100%", height: "100%" }}
                            />
                            <View
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    bottom: 0,
                                    right: 0,
                                    left: 0,
                                    backgroundColor: "rgba(0,0,0,0.2)",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text>Content</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
			</View>

			<View style={styles.stats}>
				<Text style={styles.sectionTitle}>Tours</Text>
				<View style={styles.statItem}>
					<Text style={styles.statLabel}>Planned</Text>
					<Text style={styles.statValue}>441</Text>
				</View>
				<View style={styles.statItem}>
					<Text style={styles.statLabel}>Completed</Text>
					<Text style={styles.statValue}>825</Text>
				</View>

				<Text style={styles.sectionTitle}>Highlights</Text>
				<View style={styles.statItem}>
					<Text style={styles.statLabel}>Recommended</Text>
					<Text style={styles.statValue}>1674</Text>
				</View>
			</View>
                
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    subject: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    coverPhoto: {
        width: "100%",
        height: 200,
        marginBottom: 10,
    },
    text: {
        marginBottom: 5,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    position: {
        position: "absolute",
        top: 100,
        left: 10,
    },
    margin_left_fo:{
        marginLeft:190,
        position: "absolute",
    },
    margin_avatar: {
        marginTop: 30,
        alignItems: 'center',
    },
    margin_right: {
        marginRight:15
    },
	collections: {
		padding: 20,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	stats: {
		padding: 20,
	},
	statItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 10,
	},
	statLabel: {
		fontSize: 18,
	},
	statValue: {
		fontSize: 18,
		color: "#888",
	},
    margin_left :{
        marginLeft:20
    }
});

export default ProfileUser;