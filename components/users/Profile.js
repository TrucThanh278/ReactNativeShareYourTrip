// import React, { useContext, useState } from "react";
// import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { Button } from "react-native-paper";
// import { MyDispatchContext, MyUserContext } from "../../configs/Context";
// import MyStyles from "../../styles/MyStyles";
// import Styles from "./Styles";
// import { FontAwesome } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';

// const Profile = () => {
//     const user = useContext(MyUserContext);
//     const dispatch = useContext(MyDispatchContext);
//     const [avatar, setAvatar] = useState(user.avatar);
//     const [coverPhoto, setCoverPhoto] = useState(null);

//     const renderRatingStars = () => {
//         const stars = [];
//         const averageRating = user.average_rating;

//         for (let i = 0; i < Math.floor(averageRating); i++) {
//             stars.push( <FontAwesome name="star" size={20} color="#FFD700" />);
//         }

//         return stars;
//     };

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


//     return (
//         <View style={[MyStyles.container, MyStyles.margin]}>
//             <TouchableOpacity onPress={pickCoverPhoto}>
//                 <Image source={coverPhoto ? { uri: coverPhoto } : require("./assets/images/default_cover.jpg")} style={styles.coverPhoto} />
//             </TouchableOpacity>
//             <View style={[styles.position, styles.margin_avatar]}>
//             <TouchableOpacity onPress={pickAvatar}>
//                 {avatar ? (
//                     <Image source={{ uri: avatar }} style={styles.avatar} />
//                 ) : (
//                     <Image source={require('./assets/images/default_avatar.jpg')} style={styles.avatar} />
//                 )}
//             </TouchableOpacity>
//             <Text>Name: {user.fullname}</Text>
//             <View style={styles.ratingContainer}>
//                 <Text style={styles.text}>Ratings: </Text>
//                 {renderRatingStars()}
//             </View>
//             <View style={[MyStyles.row]}>
//                 <Text style={[styles.text, MyStyles.margin]}>Follower: {user.followers_count}</Text>
//                 <Text style={[styles.text, MyStyles.margin]}>Following: {user.following_count}</Text>
//             </View>
//             <Text style={styles.text}>Email: {user.email}</Text>
//             <Text style={styles.text}>Phone: {user.phone_number}</Text>
//             <Text style={styles.text}>Date of birth: {user.date_of_birth}</Text>
//             <Text style={styles.text}>Address: {user.address}</Text>
//             <Text style={styles.text}>Gender: {user.gender}</Text>
//             <Button icon="logout" onPress={() => dispatch({type: "logout"})}>Logout</Button>
//             </View>
//         </View>
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
//         position: "absolute"
//     },
//     margin_avatar: {
//         marginTop: 125
//     }
// });

// export default Profile;

import React, { useEffect, useState, useContext } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity,ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { MyDispatchContext, MyUserContext } from "../../configs/Context";
import MyStyles from "../../styles/MyStyles";
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi, endpoints } from '../../configs/APIs'; // Import các cấu hình API

const Profile = ({ navigation }) => {
    const dispatch = useContext(MyDispatchContext);
    const [user, setUser] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [coverPhoto, setCoverPhoto] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    const response = await authApi(token).get(endpoints['current-user']);
                    setUser(response.data);
                    setAvatar(response.data.avatar);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserData();
    }, []);


    const pickAvatar = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setAvatar(result.uri);
        }
    };

    const pickCoverPhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.cancelled) {
            setCoverPhoto(result.uri);
        }
    };

    if (!user) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView style={[MyStyles.container, MyStyles.margin]}>

            <View>
                <TouchableOpacity onPress={pickCoverPhoto}>
                    <Image source={coverPhoto ? { uri: coverPhoto } : require("./assets/images/default_cover.jpg")} style={styles.coverPhoto} />
                </TouchableOpacity>
                <View style={[ styles.position ,styles.margin_avatar]}>
                    <TouchableOpacity onPress={pickAvatar}>
                        {avatar ? (
                            <Image source={{ uri: avatar }} style={styles.avatar} />
                        ) : (
                            <Image source={require('./assets/images/default_avatar.jpg')} style={styles.avatar} />
                        )}
                    </TouchableOpacity>
                </View>  
                <View style={{marginTop: 25}}>
                    <Text style={[styles.subject, styles.margin_left]}> {user.first_name} {user.last_name}</Text>
                    <View style={[MyStyles.row]}>
                            <Text style={[styles.text, MyStyles.margin]}>Follower: {user.followers}</Text>
                            <Text style={[styles.text, MyStyles.margin]}>Following: {user.following}</Text>
                    </View>
                    <View style={styles.ratingContainer}>
                            <Text style={[styles.text]}>Reports: {user.reporter} </Text>
                    </View>
                    <Text style={styles.text}>Email: {user.email}</Text>
                    <Text style={styles.text}>Phone: {user.phone_number}</Text>
                    <Button icon="pencil" buttonColor="rgb(79, 133, 13)" mode="contained" onPress={() => navigation.navigate('UpdateProfile')} >Update</Button>
                    <Button icon="logout"  onPress={() => dispatch({ type: "logout" })}>Logout</Button>

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

export default Profile;

